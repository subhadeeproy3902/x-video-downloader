import "server-only";
import type { MediaKind, ResolvedAsset, ResolvedPost, VideoVariant } from "@/lib/types";
import { bitrateToLabel } from "@/lib/utils";

const SYNDICATION_ENDPOINT = "https://cdn.syndication.twimg.com/tweet-result";

export class ResolveError extends Error {
  code: "NOT_FOUND" | "NO_MEDIA" | "UPSTREAM_UNAVAILABLE" | "RATE_LIMITED";
  constructor(code: ResolveError["code"], message: string) {
    super(message);
    this.code = code;
  }
}

/**
 * X's syndication endpoint (the same one its own embed widget calls) expects
 * a short proof-of-work-style token derived from the post id. There is no
 * secret key involved, just this fixed transform.
 */
function deriveToken(id: string): string {
  return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}

interface RawVideoVariant {
  bitrate?: number;
  content_type: string;
  url: string;
}

interface RawMedia {
  type: "photo" | "video" | "animated_gif";
  media_url_https: string;
  original_info?: { width: number; height: number };
  video_info?: {
    aspect_ratio?: [number, number];
    variants: RawVideoVariant[];
  };
}

interface RawTweet {
  __typename?: string;
  id_str: string;
  created_at?: string;
  user?: { name: string; screen_name: string };
  mediaDetails?: RawMedia[];
}

/** Builds the highest-resolution pbs.twimg.com URL for a photo asset. */
function toOriginalPhotoUrl(url: string): string {
  const base = url.split("?")[0] ?? url;
  return `${base}?format=${base.endsWith(".png") ? "png" : "jpg"}&name=orig`;
}

function normalizeVideoVariants(raw: RawVideoVariant[]): VideoVariant[] {
  const seen = new Set<string>();
  return raw
    .filter((v) => v.content_type === "video/mp4")
    .filter((v) => (seen.has(v.url) ? false : (seen.add(v.url), true)))
    .map((v) => ({
      bitrate: v.bitrate ?? 0,
      url: v.url,
      label: bitrateToLabel(v.bitrate ?? 0),
    }))
    .sort((a, b) => b.bitrate - a.bitrate);
}

function normalizeAsset(media: RawMedia, index: number): ResolvedAsset | null {
  const width = media.original_info?.width ?? 0;
  const height = media.original_info?.height ?? 0;

  if (media.type === "photo") {
    return {
      kind: "photo" as MediaKind,
      id: `photo-${index}`,
      previewUrl: toOriginalPhotoUrl(media.media_url_https),
      width,
      height,
    };
  }

  const variants = normalizeVideoVariants(media.video_info?.variants ?? []);
  if (variants.length === 0) return null;

  return {
    kind: (media.type === "animated_gif" ? "gif" : "video") as MediaKind,
    id: `${media.type}-${index}`,
    previewUrl: media.media_url_https,
    width,
    height,
    variants,
  };
}

async function fetchRawTweet(id: string): Promise<RawTweet> {
  const url = new URL(SYNDICATION_ENDPOINT);
  url.searchParams.set("id", id);
  url.searchParams.set("lang", "en");
  url.searchParams.set("token", deriveToken(id));

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    });
  } catch {
    throw new ResolveError("UPSTREAM_UNAVAILABLE", "Could not reach X right now.");
  }

  if (response.status === 404) {
    throw new ResolveError("NOT_FOUND", "That post does not exist, was deleted, or is private.");
  }
  if (response.status === 429) {
    throw new ResolveError("RATE_LIMITED", "X is throttling requests right now. Try again shortly.");
  }
  if (!response.ok) {
    throw new ResolveError("UPSTREAM_UNAVAILABLE", `X returned an unexpected response (${response.status}).`);
  }

  const data = (await response.json().catch(() => null)) as RawTweet | Record<string, never> | null;
  if (!data || Object.keys(data).length === 0) {
    throw new ResolveError("NOT_FOUND", "That post does not exist, was deleted, or is private.");
  }
  if (data.__typename === "TweetTombstone") {
    throw new ResolveError("NOT_FOUND", "That post is protected or no longer available.");
  }

  return data as RawTweet;
}

export async function resolvePost(tweetId: string): Promise<ResolvedPost> {
  const raw = await fetchRawTweet(tweetId);

  const assets = (raw.mediaDetails ?? [])
    .map((media, index) => normalizeAsset(media, index))
    .filter((asset): asset is ResolvedAsset => asset !== null);

  if (assets.length === 0) {
    throw new ResolveError("NO_MEDIA", "That post does not contain a video, photo, or GIF.");
  }

  return {
    id: raw.id_str ?? tweetId,
    sourceUrl: `https://x.com/${raw.user?.screen_name ?? "i"}/status/${tweetId}`,
    author: {
      name: raw.user?.name ?? "Unknown",
      handle: raw.user?.screen_name ?? "",
    },
    assets,
    createdAt: raw.created_at,
  };
}

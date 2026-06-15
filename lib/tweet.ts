// Tweet media extraction via X's PUBLIC syndication endpoint —
// the same unauthenticated endpoint that powers embedded tweets.
// No API key, no paid tier, no third-party service: we talk to X directly.

const SYNDICATION = "https://cdn.syndication.twimg.com/tweet-result";

// Feature flags the syndication endpoint expects (mirrors react-tweet).
const FEATURES = [
  "tfw_timeline_list:",
  "tfw_follower_count_sunset:true",
  "tfw_tweet_edit_backend:on",
  "tfw_refsrc_session:on",
  "tfw_fosnr_soft_interventions_enabled:on",
  "tfw_show_birdwatch_pivots_enabled:on",
  "tfw_show_business_verified_badge:on",
  "tfw_duplicate_scribes_to_settings:on",
  "tfw_use_profile_image_shape_enabled:on",
  "tfw_show_blue_verified_badge:on",
  "tfw_legacy_timeline_sunset:on",
  "tfw_show_gov_verified_badge:on",
  "tfw_show_business_affiliate_badge:on",
  "tfw_tweet_edit_frontend:on",
].join(";");

/** Token the syndication endpoint derives from the tweet id. */
export function tweetToken(id: string): string {
  return ((Number(id) / 1e15) * Math.PI)
    .toString(6 ** 2) // base 36
    .replace(/(0+|\.)/g, "");
}

/** Accept a full x.com / twitter.com link, a bare status URL, or a raw id. */
export function parseTweetId(input: string): string | null {
  const s = (input || "").trim();
  if (!s) return null;
  if (/^\d{5,25}$/.test(s)) return s;
  const m = s.match(
    /(?:twitter\.com|x\.com|vxtwitter\.com|fxtwitter\.com|nitter\.[^/]+)\/(?:[^/]+\/)?status(?:es)?\/(\d+)/i
  );
  return m ? m[1] : null;
}

export type MediaVariant = {
  quality: string; // e.g. "1280×720" or "Original"
  url: string;
  bitrate?: number;
  ext: string; // "mp4" | "jpg" ...
  width?: number;
  height?: number;
};

export type MediaItem = {
  type: "video" | "gif" | "photo";
  thumbnail: string;
  durationMs?: number;
  width?: number;
  height?: number;
  variants: MediaVariant[]; // best first
};

export type TweetResult = {
  id: string;
  url: string;
  text: string;
  createdAt?: string;
  likes?: number;
  views?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  media: MediaItem[];
};

export type ExtractError =
  | "invalid_url"
  | "not_found"
  | "deleted"
  | "protected"
  | "no_media"
  | "rate_limited"
  | "upstream";

export class TweetExtractError extends Error {
  constructor(public code: ExtractError, message?: string) {
    super(message ?? code);
  }
}

function biggerAvatar(url?: string): string {
  return (url ?? "").replace("_normal", "_400x400");
}

function dims(url: string): { w?: number; h?: number } {
  const m = url.match(/\/(\d{2,4})x(\d{2,4})\//);
  return m ? { w: Number(m[1]), h: Number(m[2]) } : {};
}

function originalPhoto(mediaUrl: string): MediaVariant[] {
  // pbs.twimg.com/media/ABC.jpg -> request original + a large fallback
  const base = mediaUrl.replace(/\.(jpg|jpeg|png|webp)(?:\?.*)?$/i, "");
  const ext = (mediaUrl.match(/\.(jpg|jpeg|png|webp)/i)?.[1] ?? "jpg").toLowerCase();
  const fmt = ext === "png" ? "png" : "jpg";
  return [
    { quality: "Original", url: `${base}?format=${fmt}&name=orig`, ext: fmt },
    { quality: "Large", url: `${base}?format=${fmt}&name=large`, ext: fmt },
  ];
}

// Minimal shape of the fields we read from the syndication payload.
type SynVariant = { content_type?: string; url?: string; bitrate?: number };
type SynVideoInfo = { duration_millis?: number; variants?: SynVariant[] };
type SynMedia = {
  type?: string;
  media_url_https?: string;
  original_info?: { width?: number; height?: number };
  sizes?: { large?: { w?: number; h?: number } };
  video_info?: SynVideoInfo;
};
type SynUser = {
  name?: string;
  screen_name?: string;
  profile_image_url_https?: string;
  verified?: boolean;
  is_blue_verified?: boolean;
};
type SynResponse = {
  __typename?: string;
  tombstone?: { text?: { text?: string } };
  text?: string;
  created_at?: string;
  favorite_count?: number;
  view_count_info?: { count?: string };
  mediaDetails?: SynMedia[];
  extended_entities?: { media?: SynMedia[] };
  entities?: { media?: SynMedia[] };
  user?: SynUser;
};

function videoVariants(info?: SynVideoInfo): MediaVariant[] {
  const variants = (info?.variants ?? [])
    .filter((v: SynVariant) => v.content_type === "video/mp4" && v.url)
    .map((v: SynVariant) => {
      const { w, h } = dims(v.url!);
      return {
        quality: w && h ? `${w}×${h}` : v.bitrate ? `${Math.round(v.bitrate / 1000)}k` : "MP4",
        url: v.url as string,
        bitrate: v.bitrate as number | undefined,
        ext: "mp4",
        width: w,
        height: h,
      } as MediaVariant;
    })
    .sort((a: MediaVariant, b: MediaVariant) => (b.bitrate ?? 0) - (a.bitrate ?? 0));
  return variants;
}

/** Fetch + normalize. Throws TweetExtractError with a typed code on failure. */
export async function extractTweet(id: string): Promise<TweetResult> {
  const url = `${SYNDICATION}?id=${id}&lang=en&token=${tweetToken(id)}&features=${encodeURIComponent(
    FEATURES
  )}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
      },
      // Cache identical lookups briefly to stay friendly to the endpoint.
      next: { revalidate: 1800 },
    });
  } catch {
    throw new TweetExtractError("upstream", "Could not reach X.");
  }

  if (res.status === 404) throw new TweetExtractError("not_found");
  if (res.status === 429) throw new TweetExtractError("rate_limited");
  if (!res.ok) throw new TweetExtractError("upstream", `Upstream ${res.status}`);

  let data: SynResponse;
  try {
    data = (await res.json()) as SynResponse;
  } catch {
    throw new TweetExtractError("upstream", "Unexpected response from X.");
  }

  if (!data || data.__typename === "TweetTombstone") {
    const t = (data?.tombstone?.text?.text ?? "").toLowerCase();
    if (t.includes("age") || t.includes("protected") || t.includes("not authorized")) {
      throw new TweetExtractError("protected");
    }
    throw new TweetExtractError("deleted");
  }

  const rawMedia: SynMedia[] =
    data.mediaDetails ?? data.extended_entities?.media ?? data.entities?.media ?? [];

  const media: MediaItem[] = rawMedia.map((m: SynMedia): MediaItem => {
    const thumb = m.media_url_https ?? "";
    if (m.type === "photo") {
      return {
        type: "photo",
        thumbnail: thumb,
        width: m.original_info?.width ?? m.sizes?.large?.w,
        height: m.original_info?.height ?? m.sizes?.large?.h,
        variants: originalPhoto(thumb),
      };
    }
    const isGif = m.type === "animated_gif";
    return {
      type: isGif ? "gif" : "video",
      thumbnail: thumb,
      durationMs: m.video_info?.duration_millis,
      width: m.original_info?.width,
      height: m.original_info?.height,
      variants: videoVariants(m.video_info),
    };
  });

  if (media.length === 0) throw new TweetExtractError("no_media");

  return {
    id,
    url: `https://x.com/${data.user?.screen_name ?? "i"}/status/${id}`,
    text: data.text ?? "",
    createdAt: data.created_at,
    likes: data.favorite_count,
    views: data.view_count_info?.count,
    author: {
      name: data.user?.name ?? "Unknown",
      handle: data.user?.screen_name ?? "unknown",
      avatar: biggerAvatar(data.user?.profile_image_url_https),
      verified: Boolean(data.user?.verified || data.user?.is_blue_verified),
    },
    media,
  };
}

/** Human label for a typed error code. */
export const ERROR_MESSAGES: Record<ExtractError, string> = {
  invalid_url: "That doesn't look like an X post link. Paste a link like x.com/user/status/123…",
  not_found: "We couldn't find that post. Check the link and try again.",
  deleted: "That post was deleted, so there's nothing to download.",
  protected: "That post is from a protected or age-restricted account and can't be fetched.",
  no_media: "That post has no video, photo or GIF to download.",
  rate_limited: "X is rate-limiting us right now. Give it a few seconds and try again.",
  upstream: "X didn't respond as expected. Please try again in a moment.",
};

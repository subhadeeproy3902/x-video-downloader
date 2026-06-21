export type MediaKind = "video" | "gif" | "photo";

export interface VideoVariant {
  /** Bitrate in bits per second, used to label and sort quality options. */
  bitrate: number;
  /** Direct, playable MP4 URL. */
  url: string;
  /** Human label, e.g. "1080p", "720p". Derived from bitrate when unknown. */
  label: string;
}

export interface ResolvedAsset {
  kind: MediaKind;
  /** Stable id used as a React key and as the download filename seed. */
  id: string;
  /** Poster/preview image. For photos this is the photo itself at full res. */
  previewUrl: string;
  width: number;
  height: number;
  /** Present for kind "video" and "gif". GIFs ship as a single silent MP4 variant. */
  variants?: VideoVariant[];
  /** Duration in milliseconds, video/gif only. */
  durationMs?: number;
}

export interface ResolvedPost {
  id: string;
  /** Canonical x.com URL for the source post. */
  sourceUrl: string;
  author: {
    name: string;
    handle: string;
  };
  assets: ResolvedAsset[];
  createdAt?: string;
}

export interface ResolveErrorBody {
  error: string;
  code:
    | "INVALID_URL"
    | "NOT_FOUND"
    | "NO_MEDIA"
    | "UPSTREAM_UNAVAILABLE"
    | "RATE_LIMITED";
}

export type ResolveResponse =
  | { ok: true; post: ResolvedPost }
  | ({ ok: false } & ResolveErrorBody);

import { NextRequest } from "next/server";

// Streaming proxy so downloads are first-party, original-quality, and land
// with a clean filename (a cross-origin <a download> can't rename or even
// force a save). Locked to X's own media hosts so it can't be used as an
// open proxy.
export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_HOST = /(^|\.)twimg\.com$/i;

function safeName(name: string, fallbackExt: string): string {
  const cleaned = (name || "")
    .replace(/[/\\?%*:|"<>\x00-\x1f]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80)
    .trim();
  const base = cleaned || `riptweet-${Date.now()}`;
  return /\.[a-z0-9]{2,4}$/i.test(base) ? base : `${base}.${fallbackExt}`;
}

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");
  const nameParam = req.nextUrl.searchParams.get("name") ?? "";
  if (!target) return new Response("Missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new Response("Bad url", { status: 400 });
  }
  if (parsed.protocol !== "https:" || !ALLOWED_HOST.test(parsed.hostname)) {
    return new Response("Forbidden host", { status: 403 });
  }

  const upstream = await fetch(parsed.toString(), {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://x.com/" },
  });
  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream error", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  const ext = contentType.includes("mp4")
    ? "mp4"
    : contentType.includes("png")
      ? "png"
      : contentType.includes("jpeg") || contentType.includes("jpg")
        ? "jpg"
        : "bin";
  const filename = safeName(nameParam, ext);

  const headers = new Headers({
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "public, max-age=31536000, immutable",
  });
  const len = upstream.headers.get("content-length");
  if (len) headers.set("Content-Length", len);

  return new Response(upstream.body, { status: 200, headers });
}

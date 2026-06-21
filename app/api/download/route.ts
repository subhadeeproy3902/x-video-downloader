import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Only ever proxy X's own media CDNs. This is not an open proxy.
const ALLOWED_HOSTS = new Set(["video.twimg.com", "pbs.twimg.com", "abs.twimg.com"]);

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80) || "riptweet-download";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  const filename = sanitizeFilename(searchParams.get("name") ?? "riptweet-download");
  // mode=inline is used for <video>/<img> playback (same-origin, no CORS or
  // hotlink issues, and Range-aware so seeking works). mode=attachment (the
  // default) forces a save-as download.
  const inline = searchParams.get("mode") === "inline";

  if (!target) {
    return NextResponse.json({ error: "Missing url parameter." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ error: "Invalid url parameter." }, { status: 400 });
  }

  if (parsed.protocol !== "https:" || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: "That host is not allowed." }, { status: 400 });
  }

  // Forward Range so <video> can seek and so Safari, which refuses to play
  // video that isn't served with a proper 206 Partial Content response, works.
  const range = request.headers.get("range");
  const upstream = await fetch(parsed, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; RipTweet/2.0)",
      ...(range ? { Range: range } : {}),
    },
  });

  if (!upstream.ok && upstream.status !== 206) {
    return NextResponse.json({ error: "Could not fetch that file from X." }, { status: 502 });
  }
  if (!upstream.body) {
    return NextResponse.json({ error: "X returned an empty response." }, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  const contentLength = upstream.headers.get("content-length");
  const contentRange = upstream.headers.get("content-range");
  const extension = contentType.includes("mp4") ? "mp4" : contentType.includes("png") ? "png" : "jpg";

  const headers = new Headers({
    "Content-Type": contentType,
    "Accept-Ranges": "bytes",
    "Cache-Control": inline ? "public, max-age=3600" : "private, max-age=0, no-store",
  });
  if (!inline) {
    headers.set("Content-Disposition", `attachment; filename="${filename}.${extension}"`);
  }
  if (contentLength) headers.set("Content-Length", contentLength);
  if (contentRange) headers.set("Content-Range", contentRange);

  return new NextResponse(upstream.body, {
    status: upstream.status === 206 ? 206 : 200,
    headers,
  });
}

import { NextResponse } from "next/server";
import { extractTweetId } from "@/lib/utils";
import { resolvePost, ResolveError } from "@/lib/twitter";
import type { ResolveResponse } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse<ResolveResponse>> {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_URL", error: "Send a JSON body with a url field." },
      { status: 400 },
    );
  }

  const tweetId = body.url ? extractTweetId(body.url) : null;
  if (!tweetId) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_URL",
        error: "That does not look like an x.com or twitter.com post link.",
      },
      { status: 422 },
    );
  }

  try {
    const post = await resolvePost(tweetId);
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    if (error instanceof ResolveError) {
      const status = error.code === "NOT_FOUND" ? 404 : error.code === "RATE_LIMITED" ? 429 : 502;
      return NextResponse.json({ ok: false, code: error.code, error: error.message }, { status });
    }
    return NextResponse.json(
      { ok: false, code: "UPSTREAM_UNAVAILABLE", error: "Something went wrong resolving that link." },
      { status: 502 },
    );
  }
}

import { NextRequest } from "next/server";
import {
  parseTweetId,
  extractTweet,
  TweetExtractError,
  ERROR_MESSAGES,
  type ExtractError,
} from "@/lib/tweet";

export const runtime = "nodejs";

function fail(code: ExtractError, status: number) {
  return Response.json(
    { ok: false, code, error: ERROR_MESSAGES[code] },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("url") ?? "";
  const id = parseTweetId(input);
  if (!id) return fail("invalid_url", 400);

  try {
    const tweet = await extractTweet(id);
    return Response.json(
      { ok: true, tweet },
      {
        headers: {
          // Cache successful lookups at the edge; media URLs are stable.
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (e) {
    if (e instanceof TweetExtractError) {
      const status =
        e.code === "not_found" || e.code === "deleted"
          ? 404
          : e.code === "rate_limited"
            ? 429
            : e.code === "protected"
              ? 403
              : e.code === "no_media"
                ? 422
                : 502;
      return fail(e.code, status);
    }
    return fail("upstream", 502);
  }
}

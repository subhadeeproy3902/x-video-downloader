import "server-only";

const TITLE_REGEX = /<title[^>]*>([^<]+)<\/title>/;
const OG_TITLE_REGEX = /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/;
const DESCRIPTION_REGEX = /<meta[^>]*name="description"[^>]*content="([^"]+)"/;
const OG_DESCRIPTION_REGEX = /<meta[^>]*property="og:description"[^>]*content="([^"]+)"/;
const OG_IMAGE_REGEX = /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/;

export interface GlimpseData {
  title: string | null;
  description: string | null;
  image: string | null;
}

/**
 * Fetches the og:title / og:description / og:image of a URL for the Glimpse
 * hover preview. Runs server-side only (React Server Component), cached for
 * a day since profile metadata rarely changes mid-session.
 */
export async function glimpse(url: string): Promise<GlimpseData> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RipTweetBot/1.0)" },
      next: { revalidate: 86_400 },
    });
    const html = await response.text();

    const titleMatch = html.match(TITLE_REGEX) ?? html.match(OG_TITLE_REGEX);
    const descriptionMatch = html.match(DESCRIPTION_REGEX) ?? html.match(OG_DESCRIPTION_REGEX);
    const imageMatch = html.match(OG_IMAGE_REGEX);

    return {
      title: titleMatch?.[1]?.trim() ?? null,
      description: descriptionMatch?.[1]?.trim() ?? null,
      image: imageMatch?.[1] ?? null,
    };
  } catch {
    return { title: null, description: null, image: null };
  }
}

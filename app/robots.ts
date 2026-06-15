import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Open to everyone, including AI answer-engine crawlers (GPTBot, ClaudeBot,
    // PerplexityBot, Google-Extended) — only the API endpoints are off-limits.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

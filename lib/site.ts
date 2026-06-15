// Single source of truth for brand + canonical URL.
// Change SITE.url here when you point a custom domain at it.
export const SITE = {
  name: "RipTweet",
  domain: "rip-tweet.vercel.app",
  url: "https://rip-tweet.vercel.app",
  tagline: "Rip any video, photo or GIF off X.",
  description:
    "Paste an X (Twitter) post link and download the original-quality video, photo or GIF in one click. Free, no sign-up, no watermark — no API and no third-party services.",
  keywords: [
    "x video downloader",
    "twitter video downloader",
    "download x videos",
    "save twitter video",
    "x gif downloader",
    "twitter photo downloader",
    "download tweet video",
    "x media downloader",
    "rip tweet",
    "twitter mp4 download",
  ],
  author: "RipTweet",
  twitterHandle: "@riptweet",
} as const;

export const ogImageAlt = `${SITE.name} — ${SITE.tagline}`;

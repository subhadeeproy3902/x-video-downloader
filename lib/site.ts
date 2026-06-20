// Single source of truth for brand + canonical URL.
// Change SITE.url here when you point a custom domain at it.
export const SITE = {
  name: "RipTweet",
  domain: "rip-tweet.vercel.app",
  url: "https://rip-tweet.vercel.app",
  tagline: "Rip any video, photo or GIF off X.",
  description:
    "Paste any X (Twitter) post link and download the video, photo, or GIF at original quality. Free, instant, no sign-up, no watermark — just paste and download.",
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
    "x.com video downloader",
    "download video from x",
    "free twitter video downloader online",
  ],
  author: "RipTweet",
  twitterHandle: "@riptweet",
} as const;

export const ogImageAlt = `${SITE.name} — ${SITE.tagline}`;

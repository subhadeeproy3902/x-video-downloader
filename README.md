# RipTweet

Paste an X (Twitter) post link → download the **original-quality video, photo, or GIF** in one click.
Free, no sign-up, no watermark — and crucially: **no API keys, no paid tier, and no third-party download service.**

## How it works (no API, no 3rd party)

RipTweet talks to **X's own public syndication endpoint** (`cdn.syndication.twimg.com/tweet-result`) — the
same unauthenticated endpoint that powers embedded tweets. A small Next.js route handler:

1. Parses the tweet ID from any `x.com` / `twitter.com` link.
2. Derives the syndication token and fetches the post's public media (server-side, which also sidesteps CORS).
3. Normalizes it into video MP4 variants, full-resolution photos, and GIFs.

Downloads are streamed back through a first-party proxy (`/api/download`) so the file saves with a clean
name (a cross-origin `<a download>` can't rename or force a save). The proxy is locked to `*.twimg.com`.

## Run locally

```bash
bun install
bun run dev      # http://localhost:3000
```

## Deploy

Push to a Git repo and import it on [Vercel](https://vercel.com/new) — zero config. The home page
prerenders as static HTML; `/api/extract` and `/api/download` run as serverless functions.
Set the canonical URL in [`lib/site.ts`](lib/site.ts) when you point a custom domain at it.

## Stack & layout

- **Next.js 16** (App Router) · **React 19** · **Tailwind CSS v4** · **bun**
- Design: Framer dark-canvas system from [`DESIGN-framer.md`](DESIGN-framer.md), expressed entirely
  through Tailwind theme tokens in [`app/globals.css`](app/globals.css) (no hand-written CSS classes).
- SEO/AEO/AIO: generated OG + Twitter card image, JSON-LD (`WebApplication` + `HowTo` + `FAQPage`),
  `sitemap.xml`, `robots.txt`, web manifest, and `public/llms.txt`.

```text
app/            page, layout, metadata routes (og image, sitemap, robots, manifest), /api routes
lib/            tweet extraction, site config, shared UI class strings, page content
utils/          downloader (client component)
```

## Disclaimer

RipTweet is an independent tool and is not affiliated with, endorsed by, or sponsored by X Corp.
Only download content you have the right to use.

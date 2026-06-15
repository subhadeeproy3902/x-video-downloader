// Shared, indexable content. Rendered on the page AND emitted as JSON-LD so
// search + answer engines (Google, Bing, ChatGPT, Perplexity) read the same facts.

export const STEPS = [
  {
    n: "01",
    title: "Copy the post link",
    body: "On X, tap Share → Copy link. Works from the app, the website, anywhere.",
  },
  {
    n: "02",
    title: "Paste it above",
    body: "Drop the link in the box. RipTweet reads the post's public media in a blink.",
  },
  {
    n: "03",
    title: "Download the file",
    body: "Pick a quality and save the original video, photo or GIF straight to your device.",
  },
] as const;

export const FEATURES = [
  {
    title: "Original quality",
    body: "Every resolution X serves, up to the source file — no re-compression, no quality loss.",
  },
  {
    title: "No watermark",
    body: "Files come straight from X's own servers. Nothing stamped, branded, or cropped on top.",
  },
  {
    title: "Nothing to install",
    body: "Runs in your browser on any phone or laptop. No app, no extension, no setup.",
  },
  {
    title: "No sign-up, ever",
    body: "No account, no email, no login wall. Paste a link and you're done.",
  },
  {
    title: "We store nothing",
    body: "Links and files pass straight through and vanish. No history, no tracking pixels.",
  },
  {
    title: "Always free",
    body: "No paywall, no daily cap, no API keys. Rip as many posts as you like.",
  },
] as const;

export const SHOWCASE = [
  {
    kind: "Videos",
    tone: "violet" as const,
    body: "Save any X video as a clean MP4 — from 6-second clips to long uploads — at the highest resolution available.",
  },
  {
    kind: "Photos",
    tone: "magenta" as const,
    body: "Pull full-resolution images, not the shrunken previews. Single shots or an entire photo gallery.",
  },
  {
    kind: "GIFs",
    tone: "orange" as const,
    body: "Grab animated GIFs as tidy MP4 files, ready to repost, edit, or drop into a deck.",
  },
] as const;

export const FAQ = [
  {
    q: "Is RipTweet free?",
    a: "Yes — completely free and unlimited. There's no account, no paywall, no daily limit, and no API keys to set up. Paste a link and download.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. RipTweet runs entirely in your web browser. There's nothing to download or install before you can use it.",
  },
  {
    q: "Does it work on iPhone and Android?",
    a: "Yes. It works in any modern mobile or desktop browser — Safari, Chrome, Firefox, Edge — on phones, tablets, and computers alike.",
  },
  {
    q: "Will the downloaded video have a watermark?",
    a: "No. Files are pulled directly from X's media servers, so they arrive exactly as uploaded — with no watermark and no added branding.",
  },
  {
    q: "What quality can I download?",
    a: "Up to the original resolution the poster uploaded. RipTweet lists every available quality (for example 1280×720 and lower) so you can pick the size you want.",
  },
  {
    q: "Can I download photos and GIFs too, not just videos?",
    a: "Yes. RipTweet saves videos as MP4, photos at full original resolution, and animated GIFs as MP4 files. Posts with multiple images are all available.",
  },
  {
    q: "Do you store my links or the files I download?",
    a: "No. Your link is used only to look up the post's public media, and files stream straight through to you. Nothing is logged, saved, or shared.",
  },
  {
    q: "Why won't some posts download?",
    a: "Posts that are deleted, from protected or private accounts, age-restricted, or that contain no media can't be fetched. Double-check the link is a public post with a video, photo, or GIF.",
  },
  {
    q: "Is it legal to download videos from X?",
    a: "Downloading public media for personal use is generally fine, but you should only download content you have the right to use and respect the original creators' rights and X's Terms of Service. RipTweet is not affiliated with X Corp.",
  },
  {
    q: "How is RipTweet different from other X video downloaders?",
    a: "It talks directly to X's own public embed data — no third-party download service, no API keys, no ad-laden redirects, and no watermark. It's just a clean, fast, private tool.",
  },
] as const;

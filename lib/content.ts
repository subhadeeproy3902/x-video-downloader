export interface Step {
  n: string;
  title: string;
  body: string;
}

export const STEPS: Step[] = [
  {
    n: "1",
    title: "Paste the link",
    body: "Copy a post's link from X, the Share icon or the address bar both work, and drop it into the box above.",
  },
  {
    n: "2",
    title: "Pick a file",
    body: "RipTweet reads the post and shows only the video, photo, or GIF inside it. Choose a quality if more than one is offered.",
  },
  {
    n: "3",
    title: "Save it",
    body: "Press download. The file saves straight to your device at its original quality, no extra steps.",
  },
];

export interface AssetType {
  kind: "Video" | "Photo" | "GIF";
  body: string;
  tags: string[];
}

export const ASSET_TYPES: AssetType[] = [
  {
    kind: "Video",
    body: "Grabs the original MP4 X stored for the post, in every resolution X offers for it, up to 4K when the uploader posted that high.",
    tags: ["MP4", "Up to 4K"],
  },
  {
    kind: "Photo",
    body: "Pulls the full-resolution file X has on record, not the cropped, compressed preview your timeline shows.",
    tags: ["Original resolution", "Multi-photo posts"],
  },
  {
    kind: "GIF",
    body: "X stores GIFs as silent, looping MP4 files. RipTweet saves them exactly that way, ready for Photos, Slack, or a doc.",
    tags: ["MP4", "Loops natively"],
  },
];

export interface Feature {
  title: string;
  body: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Original quality, every time",
    body: "No re-encoding and no extra compression. The file you get is the same one X already hosts on its own servers.",
  },
  {
    title: "Nothing else loads",
    body: "Only the media renders. Not the reply count, not the avatar, not the rest of the timeline sitting around it.",
  },
  {
    title: "Runs in your browser",
    body: "No app to install and no account to create. Paste a link, get a file, close the tab.",
  },
  {
    title: "Nothing is kept",
    body: "RipTweet doesn't store the links you paste or the files you download. Each request lives only as long as it takes to serve it.",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: "Do I need an X or Twitter account?",
    a: "No. RipTweet reads public post data the same way X's own embed widget does, so no login or API key is required on your end.",
  },
  {
    q: "Why did my link fail to resolve?",
    a: "The most common causes: the post is from a protected or suspended account, the post was deleted, the link points to a profile or a reply instead of the post with the media, or the post simply has no video, photo, or GIF attached.",
  },
  {
    q: "What's the highest quality I can get?",
    a: "Whatever the uploader posted. Video tops out at the highest bitrate X stored for that post, commonly 1080p and sometimes 4K. Photos come back at their full original resolution, not the compressed thumbnail shown in a timeline.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes. Open the link in your phone's browser, paste the post link, and download. On iOS, Safari prompts you to save the file; on Android, it lands in your Downloads folder.",
  },
  {
    q: "Is RipTweet affiliated with X?",
    a: "No. RipTweet is an independent tool, not affiliated with, endorsed by, or sponsored by X Corp.",
  },
  {
    q: "Is it legal to download someone else's post?",
    a: "Saving a copy for personal use is generally fine. Reposting or redistributing someone else's video or photo without their permission can violate copyright or X's own terms, so get permission before sharing it further.",
  },
];

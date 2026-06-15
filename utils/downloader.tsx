"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, useState } from "react";
import type { TweetResult, MediaItem } from "@/lib/tweet";
import { t, ui } from "@/lib/ui";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "done"; tweet: TweetResult };

function downloadHref(url: string, name: string) {
  return `/api/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
}

function fmtDuration(ms?: number) {
  if (!ms) return null;
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function Downloader() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const run = useCallback(async (raw: string) => {
    const url = raw.trim();
    if (!url) {
      setStatus({ state: "error", message: "Paste an X post link to get started." });
      inputRef.current?.focus();
      return;
    }
    setStatus({ state: "loading" });
    try {
      const res = await fetch(`/api/extract?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ state: "error", message: data.error ?? "Something went wrong." });
        return;
      }
      setStatus({ state: "done", tweet: data.tweet as TweetResult });
    } catch {
      setStatus({ state: "error", message: "Network error. Check your connection and retry." });
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(value);
  };

  const onPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setValue(text);
        run(text);
      }
    } catch {
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    setValue("");
    setStatus({ state: "idle" });
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className={`${ui.field} flex-1 py-1`}>
          <LinkIcon />
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="url"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="X or Twitter post link"
            placeholder="Paste an X / Twitter post link…"
            className="w-full bg-transparent py-2.5 text-base text-ink outline-none placeholder:text-ink-faint"
          />
          {value && (
            <button
              type="button"
              onClick={reset}
              aria-label="Clear"
              className="rounded-full p-1 text-ink-faint transition hover:text-ink"
            >
              <CloseIcon />
            </button>
          )}
          <button
            type="button"
            onClick={onPaste}
            className={`${ui.btn} ${ui.btnSecondary} hidden px-4 py-2 text-[13px] sm:inline-flex`}
          >
            <PasteIcon /> Paste
          </button>
        </div>
        <button
          type="submit"
          className={`${ui.btn} ${ui.btnPrimary} px-7 py-3.5 text-base`}
          disabled={status.state === "loading"}
        >
          {status.state === "loading" ? (
            <>
              <span className="size-[1.05rem] animate-spin rounded-full border-2 border-black/25 border-t-black" />
              Ripping…
            </>
          ) : (
            <>
              Rip it <ArrowIcon />
            </>
          )}
        </button>
      </form>

      <p className={`${t.caption} mt-3`}>We never store your links or files.</p>

      <div aria-live="polite" className="mt-5">
        {status.state === "error" && <ErrorCard message={status.message} onRetry={reset} />}
        {status.state === "loading" && <LoadingCard />}
        {status.state === "done" && <ResultCard tweet={status.tweet} />}
      </div>
    </div>
  );
}

/* ---------------- result ---------------- */

function ResultCard({ tweet }: { tweet: TweetResult }) {
  return (
    <div className={`${ui.card} overflow-hidden text-left`}>
      <div className="flex items-center gap-3 border-b border-hairline p-4">
        <img
          src={tweet.author.avatar}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-full bg-surface-2 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate font-semibold text-ink">{tweet.author.name}</span>
            {tweet.author.verified && <VerifiedIcon />}
          </div>
          <a
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${t.caption} ${ui.linkAccent}`}
          >
            @{tweet.author.handle}
          </a>
        </div>
        <span className="rounded-full bg-surface-2 px-3 py-1 text-[12px] font-medium text-ink-muted">
          {tweet.media.length} {tweet.media.length === 1 ? "item" : "items"}
        </span>
      </div>

      {tweet.text && <p className={`${t.body} line-clamp-3 px-4 pt-4`}>{tweet.text}</p>}

      <div className="flex flex-col gap-4 p-4">
        {tweet.media.map((m, i) => (
          <MediaBlock key={i} media={m} index={i} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

function MediaBlock({ media, index, tweet }: { media: MediaItem; index: number; tweet: TweetResult }) {
  const suffix = tweet.media.length > 1 ? `_${index + 1}` : "";
  const base = `${tweet.author.handle}_${tweet.id}${suffix}`;
  const duration = fmtDuration(media.durationMs);
  const ratio = media.width && media.height ? `${media.width} / ${media.height}` : "16 / 9";
  const best = media.variants[0];
  const rest = media.variants.slice(1);

  return (
    <div className="overflow-hidden rounded-[15px] border border-hairline bg-canvas">
      <div className="relative bg-black" style={{ aspectRatio: ratio, maxHeight: 420 }}>
        <img
          src={media.thumbnail}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          {media.type}
        </span>
        {(media.type === "video" || media.type === "gif") && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-black/55 backdrop-blur">
              <PlayIcon />
            </span>
          </span>
        )}
        {duration && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[12px] font-medium tabular-nums text-white">
            {duration}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 p-3">
        <a
          href={downloadHref(best.url, `${base}.${best.ext}`)}
          className={`${ui.btn} ${ui.btnPrimary} px-5 py-2.5`}
          download
        >
          <DownloadIcon />
          {media.type === "photo" ? "Download original" : `Download ${best.quality}`}
        </a>
        {rest.map((v, i) => (
          <a
            key={i}
            href={downloadHref(v.url, `${base}_${v.quality}.${v.ext}`)}
            className={`${ui.btn} ${ui.btnSecondary} px-4 py-2.5 text-[13px]`}
            download
          >
            {v.quality}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------------- states ---------------- */

function LoadingCard() {
  return (
    <div className={`${ui.card} flex items-center gap-3 p-5`}>
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-hairline border-t-accent" />
      <div>
        <p className="font-medium text-ink">Fetching media from X…</p>
        <p className={t.caption}>Reading the post&apos;s public embed data.</p>
      </div>
    </div>
  );
}

function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-[20px] border border-coral/30 bg-coral/[0.06] p-5">
      <span className="mt-0.5 text-coral">
        <AlertIcon />
      </span>
      <div className="flex-1">
        <p className="font-medium text-ink">{message}</p>
        <button onClick={onRetry} className={`${t.caption} ${ui.linkAccent} mt-1`}>
          Try another link →
        </button>
      </div>
    </div>
  );
}

/* ---------------- icons ---------------- */

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-faint">
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PasteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 4a2 2 0 0 0-4 0M4 8v12a2 2 0 0 0 2 2h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function VerifiedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0 text-accent" fill="currentColor">
      <path d="m12 1 2.4 2 3.1-.4 1 3 2.8 1.4-1 3 1 3-2.8 1.4-1 3-3.1-.4L12 23l-2.4-2-3.1.4-1-3L2.7 17l1-3-1-3 2.8-1.4 1-3 3.1.4z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.8" stroke="#090909" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 8v5m0 3h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

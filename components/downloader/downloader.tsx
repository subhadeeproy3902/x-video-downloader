"use client";

import { useCallback, useReducer, useRef } from "react";
import { ExclamationTriangleIcon, Link2Icon } from "@radix-ui/react-icons";
import type { ResolveResponse, ResolvedPost } from "@/lib/types";
import { extractTweetId } from "@/lib/utils";
import { RipLoader } from "@/components/ui/loader";
import { MediaPreview } from "@/components/downloader/media-preview";

interface State {
  phase: "idle" | "loading" | "error" | "success";
  post: ResolvedPost | null;
  message: string | null;
}

type Action =
  | { type: "START" }
  | { type: "SUCCESS"; post: ResolvedPost }
  | { type: "ERROR"; message: string }
  | { type: "RESET" };

const initialState: State = { phase: "idle", post: null, message: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      // Keep the previous result mounted (and visible, dimmed) while a new
      // one resolves, instead of collapsing the section to zero height.
      return { phase: "loading", post: state.post, message: null };
    case "SUCCESS":
      return { phase: "success", post: action.post, message: null };
    case "ERROR":
      return { phase: "error", post: null, message: action.message };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Downloader() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const inFlight = useRef(false);
  const requestSeq = useRef(0);

  const resolve = useCallback(async (rawUrl: string) => {
    if (inFlight.current) return;
    const tweetId = extractTweetId(rawUrl);
    if (!tweetId) {
      dispatch({ type: "ERROR", message: "That doesn't look like an x.com or twitter.com post link." });
      return;
    }
    inFlight.current = true;
    const seq = ++requestSeq.current;
    dispatch({ type: "START" });
    try {
      const res = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: rawUrl }),
      });
      const data: ResolveResponse = await res.json();
      // A newer request superseded this one (rapid re-submits): drop the stale response.
      if (seq !== requestSeq.current) return;
      if (data.ok) {
        dispatch({ type: "SUCCESS", post: data.post });
      } else {
        dispatch({ type: "ERROR", message: data.error });
      }
    } catch {
      if (seq === requestSeq.current) {
        dispatch({ type: "ERROR", message: "Could not reach RipTweet right now. Check your connection and try again." });
      }
    } finally {
      inFlight.current = false;
    }
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      resolve(inputRef.current?.value ?? "");
    },
    [resolve],
  );

  // Paste-and-go: if a valid post link lands in the field via paste, submit
  // immediately so there is nothing else to click.
  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pasted = event.clipboardData.getData("text");
      if (extractTweetId(pasted)) {
        requestAnimationFrame(() => resolve(pasted));
      }
    },
    [resolve],
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
  }, []);

  const hasPanel = state.post !== null || state.message !== null;

  return (
    <div id="downloader" className="scroll-mt-24">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative flex-1">
          <Link2Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            inputMode="url"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onPaste={handlePaste}
            placeholder="https://x.com/username/status/..."
            aria-label="X or Twitter post link"
            className="h-12 w-full border border-line-strong bg-surface-1 pl-10 pr-3 font-mono text-[13px] text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          />
        </div>
        <button
          type="submit"
          className="flex h-12 shrink-0 items-center justify-center gap-2.5 border border-ink bg-ink px-6 font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-canvas transition-opacity duration-100 hover:opacity-90 active:translate-y-px"
        >
          {state.phase === "loading" ? (
            <>
              <RipLoader dotSize={3} gap={2} duration={1.1} className="text-canvas" label="Reading post" />
              Reading
            </>
          ) : (
            "Rip it"
          )}
        </button>
      </form>

      {/* Animating grid-template-rows (0fr -> 1fr) grows/shrinks this panel
          smoothly instead of the content snapping in or out, which is what
          caused the flash of the next section underneath on rapid re-submits. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: hasPanel ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pt-4">
            {state.message && (
              <div className="flex items-start gap-3 border border-line-strong bg-surface-1 p-4">
                <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                <p className="text-[13px] leading-relaxed text-ink-muted">{state.message}</p>
              </div>
            )}

            {state.post && (
              <div
                className={`transition-opacity duration-200 ${state.phase === "loading" ? "pointer-events-none opacity-40" : "opacity-100"}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                    {state.post.assets.length} asset{state.post.assets.length > 1 ? "s" : ""} found
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
                  >
                    Rip another
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {state.post.assets.map((asset, i) => (
                    <MediaPreview
                      key={asset.id}
                      asset={asset}
                      filenameSeed={`riptweet-${state.post!.id}`}
                      position={i + 1}
                      total={state.post!.assets.length}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

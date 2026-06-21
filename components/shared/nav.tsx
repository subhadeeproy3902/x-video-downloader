import { SITE } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { SHELL } from "@/lib/utils";
import Logo from "./logo";
import GitHubStars from "./github-stars";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-sm">
      <div className={`${SHELL} flex h-14 items-center justify-between`}>
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Logo />
          <span className="font-pixel text-[0.95rem] tracking-tight text-ink">{SITE.name}</span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 font-mono text-[12px] uppercase tracking-wider text-ink-muted sm:flex">
          <a href="#how" className="transition-colors hover:text-ink">How it works</a>
          <a href="#faq" className="transition-colors hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {/* Github */}
          <GitHubStars repo="subhadeeproy3902/x-video-downloader" />
          <a
            href="#downloader"
            className="hidden items-center border border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-canvas transition-opacity h-8 hover:opacity-90 active:translate-y-px sm:flex"
          >
            Paste a link
          </a>
        </div>
      </div>
    </header>
  );
}
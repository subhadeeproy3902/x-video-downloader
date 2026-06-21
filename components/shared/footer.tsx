import { SITE, CREATORS } from "@/lib/site";
import { SHELL } from "@/lib/utils";
import Logo from "./logo";
import { glimpse } from "@/lib/glimpse-fetch";
import { Glimpse, GlimpseContent, GlimpseDescription, GlimpseImage, GlimpseTitle, GlimpseTrigger } from "@/components/ui/glimpse";
import { GitHub } from "./github-logo";

export async function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={`${SHELL} py-14`}>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-pixel text-[0.95rem] tracking-tight text-ink">{SITE.name}</span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
              Download X videos, photos, and GIFs in original quality. No account, no watermark, no hassle.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex gap-16 font-mono text-[12px]">
            <div className="flex flex-col gap-3">
              <span className="text-ink-faint uppercase tracking-[0.06em]">Product</span>
              <a href="#downloader" className="text-ink-muted transition-colors hover:text-ink">Downloader</a>
              <a href="#how" className="text-ink-muted transition-colors hover:text-ink">How it works</a>
              <a href="#faq" className="text-ink-muted transition-colors hover:text-ink">FAQ</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-ink-faint uppercase tracking-[0.06em]">Saves</span>
              <span className="text-ink-muted">X videos (MP4)</span>
              <span className="text-ink-muted">Full-res photos</span>
              <span className="text-ink-muted">Animated GIFs</span>
            </div>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-ink-faint">Built by</span>
            <div className="flex flex-col gap-2.5">
              {await Promise.all(CREATORS.map(async (creator) => <CreatorGlimpse key={creator.handle} creator={creator} />))}
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-line" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[12px] leading-relaxed text-ink-faint">
            {SITE.name} is an independent tool and is not affiliated with, endorsed by, or sponsored by X Corp. Only
            download content you have the right to use.
          </p>
          <p className="shrink-0 font-mono text-[12px] text-ink-faint">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

async function CreatorGlimpse({ creator }: { creator: (typeof CREATORS)[number] }) {
  const data = await glimpse(creator.url);
  return (
    <Glimpse openDelay={150} closeDelay={80}>
      <GlimpseTrigger asChild>
        <a
          href={creator.url}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
        >
          <GitHub className="h-3.5 w-3.5" aria-hidden="true" />
          {creator.name}
        </a>
      </GlimpseTrigger>
      <GlimpseContent>
        {data.image && <GlimpseImage className="h-48" src={data.image} alt="" />}
        <GlimpseTitle>{data.title ?? creator.name}</GlimpseTitle>
        <GlimpseDescription>{data.description ?? `@${creator.handle} on GitHub`}</GlimpseDescription>
      </GlimpseContent>
    </Glimpse>
  );
}
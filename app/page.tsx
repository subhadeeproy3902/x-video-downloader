import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  ClipboardPaste,
  MousePointerClick,
  Download,
  Video,
  Image as ImageIcon,
  Repeat,
  Gem,
  Focus,
  Globe,
  ShieldCheck,
  type LucideIcon,
  Github,
} from "lucide-react";
import Downloader from "@/components/downloader/downloader";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";
import { Glimpse, GlimpseContent, GlimpseDescription, GlimpseImage, GlimpseTitle, GlimpseTrigger } from "@/components/ui/glimpse";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { glimpse } from "@/lib/glimpse-fetch";
import { SITE, CREATORS } from "@/lib/site";
import { STEPS, ASSET_TYPES, FEATURES, FAQ } from "@/lib/content";

const SHELL = "mx-auto w-full max-w-5xl px-5 sm:px-8";

/** Icons for the "how it works" steps, indexed to STEPS. */
const STEP_ICONS: LucideIcon[] = [ClipboardPaste, MousePointerClick, Download];

/** Icons for each post asset type. */
const ASSET_ICONS: Record<"Video" | "Photo" | "GIF", LucideIcon> = {
  Video: Video,
  Photo: ImageIcon,
  GIF: Repeat,
};

/** Icons for the feature grid, indexed to FEATURES. */
const FEATURE_ICONS: LucideIcon[] = [Gem, Focus, Globe, ShieldCheck];

export default function Home() {
  return (
    <>
      <StructuredData />

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:border focus:border-ink focus:bg-canvas focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:text-ink"
      >
        Skip to main content
      </a>

      <Nav />

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className={`${SHELL} relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20`}>
          <HeroDotField />
          <Reveal>
            <DotMark />
            <h1 className="mt-5 max-w-2xl font-pixel text-[clamp(1.9rem,5.2vw,3.4rem)] leading-[1.08] tracking-tight text-ink">
              Rip any video, photo, or GIF off X.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink-muted">
              Paste a post link. Get the original file. No app, no account, no watermark, nothing else loaded.
            </p>

            <div className="mt-8 max-w-2xl">
              <Downloader />
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">
              <li>Free</li>
              <li className="h-3 w-px bg-line-strong" aria-hidden="true" />
              <li>No sign-up</li>
              <li className="h-3 w-px bg-line-strong" aria-hidden="true" />
              <li>No watermark</li>
            </ul>
          </Reveal>
        </section>

        {/* ---------------- How it works ---------------- */}
        <Section id="how" title="Three steps. About five seconds.">
          <ol className="grid gap-px border border-line bg-line sm:grid-cols-3">
            {STEPS.map((s, i) => {
              const StepIcon = STEP_ICONS[i];
              return (
                <Reveal
                  key={s.n}
                  as="li"
                  delay={i * 80}
                  className="corner-mark group relative flex flex-col gap-5 bg-canvas p-6 transition-colors duration-200 hover:bg-surface-2"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-pixel text-2xl text-ink-faint transition-colors duration-200 group-hover:text-ink-muted">
                      {s.n}
                    </span>
                    <StepIcon
                      className="h-6 w-6 text-ink-muted transition-transform duration-200 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-ink">{s.title}</h3>
                    <p className="text-[13px] leading-relaxed text-ink-muted">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </Section>

        {/* ---------------- Asset types ---------------- */}
        <Section title="Built for every kind of post.">
          <div className="grid divide-y divide-line border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {ASSET_TYPES.map((c, i) => {
              const AssetIcon = ASSET_ICONS[c.kind];
              return (
                <Reveal
                  key={c.kind}
                  delay={i * 80}
                  className="corner-mark group relative flex flex-col gap-4 p-6 transition-colors duration-200 hover:bg-surface-2"
                >
                  <AssetIcon
                    className="h-7 w-7 text-ink-muted transition-transform duration-200 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <h3 className="font-pixel text-lg tracking-tight text-ink">{c.kind}</h3>
                  <p className="flex-1 text-[13px] leading-relaxed text-ink-muted">{c.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span key={tag} className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-ink-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* ---------------- Features ---------------- */}
        <Section title="A downloader that respects you.">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {FEATURES.map((f, i) => {
              const FeatureIcon = FEATURE_ICONS[i];
              return (
                <Reveal
                  key={f.title}
                  delay={i * 60}
                  className="corner-mark group relative flex items-start gap-4 bg-canvas p-6 transition-colors duration-200 hover:bg-surface-2"
                >
                  <FeatureIcon
                    className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-ink">{f.title}</h3>
                    <p className="text-[13px] leading-relaxed text-ink-muted">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* ---------------- FAQ ---------------- */}
        <Section id="faq" title="Frequently asked questions.">
          <Reveal>
            <Accordion type="single" collapsible defaultValue="item-0">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-[15px] tracking-[-0.01em]">{item.q}</AccordionTrigger>
                  <AccordionContent className="max-w-2xl text-[14px] leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Section>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- layout pieces ---------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-sm">
      <div className={`${SHELL} flex h-14 items-center justify-between`}>
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Logo />
          <span className="font-pixel text-[0.95rem] tracking-tight text-ink">{SITE.name}</span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 font-mono text-[12px] uppercase tracking-[0.05em] text-ink-muted sm:flex">
          <a href="#how" className="transition-colors hover:text-ink">How it works</a>
          <a href="#faq" className="transition-colors hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {/* Github */}
          <a
            href="https://github.com/subhadeeproy3902/x-video-downloader"
            target="_blank"
            rel="noreferrer noopener"
            className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-line text-ink transition-colors hover:border-line-strong hover:bg-surface-2 active:translate-y-px"
          >
            <Github className="absolute h-[15px] w-[15px] transition-all duration-200" />
          </a>
          <a
            href="#downloader"
            className="hidden items-center border border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.05em] text-canvas transition-opacity h-8 hover:opacity-90 active:translate-y-px sm:flex"
          >
            Paste a link
          </a>
        </div>
      </div>
    </header>
  );
}

async function Footer() {
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
          <GitHubLogoIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {creator.name}
        </a>
      </GlimpseTrigger>
      <GlimpseContent>
        {data.image && <GlimpseImage src={data.image} alt="" />}
        <GlimpseTitle>{data.title ?? creator.name}</GlimpseTitle>
        <GlimpseDescription>{data.description ?? `@${creator.handle} on GitHub`}</GlimpseDescription>
      </GlimpseContent>
    </Glimpse>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${SHELL} scroll-mt-20 border-t border-line py-16 sm:py-20`}>
      <div className="mb-8 flex items-center gap-3">
        <DotMark />
        <h2 className="font-pixel text-[clamp(1.25rem,2.4vw,1.7rem)] tracking-tight text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ---------------- marks ---------------- */

/** Faint ambient dot-grid behind the hero, a single SVG pattern (cheap), not decorative DOM bloat. */
function HeroDotField() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -right-10 -top-16 hidden h-[420px] w-[420px] text-ink opacity-[0.06] sm:block"
      viewBox="0 0 420 420"
    >
      <defs>
        <pattern id="hero-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="currentColor" />
        </pattern>
        <radialGradient id="hero-fade" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-mask">
          <rect width="420" height="420" fill="url(#hero-fade)" />
        </mask>
      </defs>
      <rect width="420" height="420" fill="url(#hero-dots)" mask="url(#hero-mask)" />
    </svg>
  );
}

/** A static 5-dot fading row, used as a section marker instead of an eyebrow label. */
function DotMark() {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[1, 0.7, 0.45, 0.25, 0.12].map((o, i) => (
        <span key={i} className="h-1 w-1 bg-ink" style={{ opacity: o }} />
      ))}
    </span>
  );
}

function Logo() {
  return (
    <img src="/logo.png" alt="" className="h-7 w-7" width={24} height={24} />
  );
}

/* ---------------- structured data (SEO / AEO / AIO) ---------------- */

function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE.url}/#app`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any (web browser)",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Download X (Twitter) videos as MP4, original resolution",
          "Download full-resolution photos",
          "Download animated GIFs as looping MP4",
          "No watermark, no account, no app install",
          "Shows only the media asset, not the surrounding post",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.svg`,
      },
      {
        "@type": "HowTo",
        name: "How to download a video, photo, or GIF from X (Twitter)",
        description: "Save X media to your device in three steps with RipTweet.",
        totalTime: "PT5S",
        step: STEPS.map((s) => ({ "@type": "HowToStep", position: Number(s.n), name: s.title, text: s.body })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
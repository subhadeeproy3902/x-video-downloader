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
} from "lucide-react";
import Downloader from "@/components/downloader/downloader";
import { Reveal } from "@/components/reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { STEPS, ASSET_TYPES, FEATURES, FAQ } from "@/lib/content";
import { StructuredData } from "@/components/shared/structured-data";
import Nav from "@/components/shared/nav";
import { SHELL } from "@/lib/utils";
import { DotMark } from "@/components/shared/dotmark";
import Section from "@/components/shared/section";
import { Footer } from "@/components/shared/footer";

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
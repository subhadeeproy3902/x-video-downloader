/* eslint-disable @next/next/no-img-element */
import Downloader from "@/utils/downloader";
import { SITE } from "@/lib/site";
import { STEPS, FEATURES, SHOWCASE, FAQ } from "@/lib/content";
import { t, ui, grad } from "@/lib/ui";

export default function Home() {
  return (
    <>
      <StructuredData />
      {/* ambient violet/magenta glow high on the page (Framer atmosphere) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(900px_520px_at_50%_-12%,rgba(106,76,245,0.16),transparent_70%),radial-gradient(680px_460px_at_88%_2%,rgba(212,77,240,0.08),transparent_72%)]"
      />

      <Nav />

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className={`${ui.shell} pt-16 pb-20 text-center sm:pt-24 sm:pb-28`}>
          <div className="mx-auto max-w-4xl">
            <p className={`${t.eyebrow} mb-6 flex items-center justify-center gap-2`}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
              Free · No sign-up · No watermark
            </p>
            <h1 className={t.displayXl}>Rip any video, photo or GIF off X.</h1>
            <p className={`${t.subhead} mx-auto mt-6 max-w-xl`}>
              Paste a post link and download the original-quality file — no app, no API, no
              third-party services. Just the media, in one click.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <Downloader />
          </div>

          <p className={`${t.caption} mx-auto mt-8 max-w-lg`}>
            Works with X &amp; Twitter links · MP4 video, full-res photos, animated GIFs
          </p>
        </section>

        {/* ---------------- How it works ---------------- */}
        <Section id="how" eyebrow="How it works" title="Three steps. About five seconds.">
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`${ui.card} flex flex-col gap-5 p-6`}>
                <div className="flex items-center justify-between">
                  <StepArt index={i} />
                  <span className={`${t.displayMd} tabular-nums text-ink-faint`}>{s.n}</span>
                </div>
                <div>
                  <h3 className={`${t.headline} mb-1.5`}>{s.title}</h3>
                  <p className={t.body}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- Showcase (the one gradient moment) ---------------- */}
        <Section eyebrow="What you can rip" title="Built for every kind of post.">
          <div className="grid gap-4 md:grid-cols-3">
            {SHOWCASE.map((c) => (
              <article
                key={c.kind}
                className={`${ui.spotlight} ${grad[c.tone]} flex min-h-[260px] flex-col justify-between p-7`}
              >
                <ShowcaseGlyph kind={c.kind} />
                <div>
                  <h3 className={`${t.displayMd} text-white`}>{c.kind}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/85">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ---------------- Features ---------------- */}
        <Section eyebrow="Why RipTweet" title="A downloader that respects you.">
          <div className="grid gap-px overflow-hidden rounded-[20px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-surface-1 p-6">
                <span className="mb-4 grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-accent">
                  <CheckIcon />
                </span>
                <h3 className={`${t.headline} mb-1.5 text-[1.1rem]`}>{f.title}</h3>
                <p className={t.body}>{f.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- FAQ ---------------- */}
        <Section id="faq" eyebrow="FAQ" title="Questions, answered." narrow>
          <div className="mx-auto max-w-3xl">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group border-b border-hairline-soft py-5"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className={`${t.headline} text-[1.05rem]`}>{item.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-1 text-ink-muted transition-transform duration-200 group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className={`${t.bodyLg} mt-3 max-w-2xl pr-10`}>{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* ---------------- Final CTA ---------------- */}
        <section className={`${ui.shell} py-24 text-center sm:py-32`}>
          <h2 className={`${t.displayXl} mx-auto max-w-2xl`}>Got a link? Rip it.</h2>
          <p className={`${t.subhead} mx-auto mt-5 max-w-md`}>
            Free, instant, and private. No account, no catch.
          </p>
          <a href="#top" className={`${ui.btn} ${ui.btnPrimary} mt-8 px-7 py-3.5 text-base`}>
            Paste a link
            <UpIcon />
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- layout pieces ---------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline-soft bg-canvas/80 backdrop-blur-xl">
      <div className={`${ui.shell} flex h-14 items-center justify-between`}>
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <Logo />
          <span className="font-display text-[1.05rem] font-semibold tracking-tight">
            {SITE.name}
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-[14px] font-medium text-ink-muted sm:flex">
          <a href="#how" className="transition-colors hover:text-ink">
            How it works
          </a>
          <a href="#faq" className="transition-colors hover:text-ink">
            FAQ
          </a>
        </nav>
        <a href="#top" className={`${ui.btn} ${ui.btnPrimary} px-4 py-2 text-[13px]`}>
          Paste a link
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline-soft">
      <div className={`${ui.shell} py-14`}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-[1.05rem] font-semibold tracking-tight">
                {SITE.name}
              </span>
            </div>
            <p className={`${t.body} mt-4`}>{SITE.tagline} Free, private, and watermark-free.</p>
          </div>
          <nav className="flex gap-16 text-[14px]">
            <div className="flex flex-col gap-3">
              <span className={`${t.caption} text-ink-faint`}>Product</span>
              <a href="#top" className="text-ink-muted hover:text-ink">Downloader</a>
              <a href="#how" className="text-ink-muted hover:text-ink">How it works</a>
              <a href="#faq" className="text-ink-muted hover:text-ink">FAQ</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className={`${t.caption} text-ink-faint`}>Saves</span>
              <span className="text-ink-muted">X videos (MP4)</span>
              <span className="text-ink-muted">Full-res photos</span>
              <span className="text-ink-muted">Animated GIFs</span>
            </div>
          </nav>
        </div>

        <div className="my-10 h-px bg-hairline-soft" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className={`${t.caption} max-w-2xl text-ink-faint`}>
            {SITE.name} is an independent tool and is not affiliated with, endorsed by, or
            sponsored by X Corp. Only download content you have the right to use.
          </p>
          <p className={`${t.caption} shrink-0 text-ink-faint`}>
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  narrow,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <section id={id} className={`${ui.shell} scroll-mt-20 border-t border-hairline-soft py-20 sm:py-24`}>
      <div className={`mb-10 ${narrow ? "text-center" : ""}`}>
        <p className={`${t.eyebrow} mb-4`}>{eyebrow}</p>
        <h2 className={`${t.displayLg} max-w-2xl ${narrow ? "mx-auto" : ""}`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ---------------- brand + art ---------------- */

function Logo() {
  return <img src="/logo.svg" alt="" width={30} height={30} className="h-[30px] w-[30px] rounded-[8px]" />;
}

function StepArt({ index }: { index: number }) {
  const accent = "var(--color-accent)";
  const ink = "var(--color-ink)";
  const common = { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none" } as const;
  if (index === 0)
    return (
      <svg {...common} aria-hidden>
        <rect x="5" y="9" width="20" height="13" rx="4" stroke={ink} strokeWidth="1.6" />
        <rect x="15" y="18" width="20" height="13" rx="4" fill="var(--color-surface-2)" stroke={accent} strokeWidth="1.6" />
        <path d="M19 24.5h12M19 28h7" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  if (index === 1)
    return (
      <svg {...common} aria-hidden>
        <rect x="7" y="6" width="26" height="22" rx="5" stroke={ink} strokeWidth="1.6" />
        <path d="M14 17h12" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 10v12m0 0 4.5-4.5M20 22l-4.5-4.5" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 33h16" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden>
      <path d="M20 6v17m0 0 6-6m-6 6-6-6" stroke={accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 26v4a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-4" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShowcaseGlyph({ kind }: { kind: string }) {
  const s = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: 1.7 } as const;
  if (kind === "Videos")
    return (
      <svg {...s} aria-hidden>
        <rect x="3" y="6" width="13" height="12" rx="3" />
        <path d="m16 10 5-3v10l-5-3z" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "Photos")
    return (
      <svg {...s} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <circle cx="8.5" cy="10" r="1.6" />
        <path d="m4 18 5-4 4 3 3-2 4 3" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...s} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M8 9v6M8 9h2.5a2 2 0 0 1 0 4H8M16 9h-2.5v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function UpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 19V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
          "Download X (Twitter) videos as MP4",
          "Download full-resolution photos",
          "Download animated GIFs as MP4",
          "No watermark",
          "No sign-up or app required",
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
        name: "How to download a video, photo or GIF from X (Twitter)",
        description: "Save X media to your device in three steps with RipTweet.",
        totalTime: "PT5S",
        step: STEPS.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.body,
        })),
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
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

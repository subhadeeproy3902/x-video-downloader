// Shared Tailwind class strings (NOT custom CSS — just reusable utility strings
// so the type scale + component shapes stay consistent and DRY across files).
// All values trace back to DESIGN-framer.md tokens registered in globals.css.

// Type scale — Framer's poster cadence: tight negative tracking that scales with size.
export const t = {
  displayXxl:
    "font-display font-semibold text-[clamp(2.75rem,8.5vw,6.75rem)] leading-1 tracking-[-0.05em]",
  displayXl:
    "font-display font-semibold text-[clamp(2.25rem,6vw,5rem)] leading-[1.1] tracking-[-0.045em]",
  displayLg:
    "font-display font-semibold text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] tracking-[-0.04em]",
  displayMd:
    "font-display font-semibold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.03em]",
  headline: "font-display font-semibold text-[1.375rem] leading-tight tracking-[-0.025em] text-ink",
  subhead: "text-[clamp(1.05rem,1.6vw,1.5rem)] leading-snug tracking-[-0.01em] text-ink-muted",
  bodyLg: "text-lg leading-relaxed tracking-[-0.011em] text-ink-muted",
  body: "text-[0.9375rem] leading-relaxed tracking-[-0.01em] text-ink-muted",
  caption: "text-[0.8125rem] font-medium leading-snug tracking-[-0.01em] text-ink-muted",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint",
};

// Shapes / surfaces
export const ui = {
  shell: "mx-auto w-full max-w-[1180px] px-5 sm:px-8",
  card: "rounded-[20px] border border-hairline bg-surface-1",
  field:
    "flex items-center gap-2 rounded-[12px] border border-hairline bg-surface-1 px-3 transition focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/15",
  spotlight:
    "relative overflow-hidden rounded-[30px] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_60px_-28px_rgba(0,0,0,0.85)]",
  // Pills — the only CTA shape in the system.
  btn: "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:ring-accent/70 disabled:opacity-45 disabled:pointer-events-none",
  btnPrimary: "bg-ink text-black hover:bg-white/90",
  btnSecondary: "border border-hairline bg-surface-1 text-ink hover:bg-surface-2",
  btnGhost: "text-ink-muted hover:text-ink",
  linkAccent: "text-accent transition hover:opacity-80",
};

// Spotlight gradients — built from DESIGN-framer.md gradient anchors.
export const grad = {
  violet: "bg-[linear-gradient(135deg,var(--color-grad-violet),var(--color-grad-violet-deep))]",
  magenta: "bg-[linear-gradient(135deg,var(--color-grad-magenta),var(--color-grad-magenta-deep))]",
  orange: "bg-[linear-gradient(135deg,var(--color-grad-orange),var(--color-grad-orange-deep))]",
};

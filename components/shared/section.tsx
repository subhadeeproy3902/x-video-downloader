import { SHELL } from "@/lib/utils";
import { DotMark } from "./dotmark";

export default function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
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
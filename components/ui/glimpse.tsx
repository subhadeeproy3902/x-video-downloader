"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export type GlimpseProps = ComponentProps<typeof HoverCard>;

export function Glimpse(props: GlimpseProps) {
  return <HoverCard {...props} />;
}

export type GlimpseTriggerProps = ComponentProps<typeof HoverCardTrigger>;

export function GlimpseTrigger(props: GlimpseTriggerProps) {
  return <HoverCardTrigger {...props} />;
}

export type GlimpseContentProps = ComponentProps<typeof HoverCardContent>;

export function GlimpseContent({ className, ...props }: GlimpseContentProps) {
  return <HoverCardContent className={cn("w-72", className)} {...props} />;
}

export type GlimpseTitleProps = ComponentProps<"p">;

export function GlimpseTitle({ className, ...props }: GlimpseTitleProps) {
  return <p className={cn("truncate font-sans text-sm font-semibold text-ink", className)} {...props} />;
}

export type GlimpseDescriptionProps = ComponentProps<"p">;

export function GlimpseDescription({ className, ...props }: GlimpseDescriptionProps) {
  return (
    <p className={cn("mt-1 line-clamp-2 font-sans text-[13px] leading-relaxed text-ink-muted", className)} {...props} />
  );
}

export type GlimpseImageProps = ComponentProps<"img">;

// eslint-disable-next-line @next/next/no-img-element -- arbitrary remote og:image URLs, not worth a remotePatterns entry per domain
export function GlimpseImage({ className, alt, ...props }: GlimpseImageProps) {
  return (
    <img
      alt={alt ?? ""}
      className={cn("mb-3 aspect-[120/63] w-full border border-line object-cover", className)}
      loading="lazy"
      {...props}
    />
  );
}

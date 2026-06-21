"use client";

import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

const GRID = 5;

interface RipLoaderProps {
  /** Pixel size of a single dot. */
  dotSize?: number;
  /** Pixel gap between dots. */
  gap?: number;
  /** Full ripple cycle duration in seconds. */
  duration?: number;
  className?: string;
  /** Accessible label announced to screen readers while active. */
  label?: string;
}

/**
 * A 5x5 grid of square dots with a diagonal opacity wave, evoking a scan in
 * progress. Built from scratch (positions memoized once per size/gap, no
 * per-frame React work) rather than relying on third-party JS; the visual
 * technique is the dot-matrix loader pattern from
 * https://dotmatrix.zzzzshawn.cloud/.
 */
function RipLoaderImpl({ dotSize = 4, gap = 4, duration = 1.4, className, label = "Loading" }: RipLoaderProps) {
  const dots = useMemo(() => {
    const items: { key: string; delay: number }[] = [];
    const maxStep = (GRID - 1) * 2;
    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        const step = row + col;
        items.push({
          key: `${row}-${col}`,
          delay: (step / maxStep) * duration * 0.6,
        });
      }
    }
    return items;
  }, [duration]);

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-grid shrink-0", className)}
      style={{
        gridTemplateColumns: `repeat(${GRID}, ${dotSize}px)`,
        gridTemplateRows: `repeat(${GRID}, ${dotSize}px)`,
        gap,
      }}
    >
      {dots.map((dot) => (
        <span
          key={dot.key}
          aria-hidden="true"
          className="dmx-dot bg-current"
          style={
            {
              width: dotSize,
              height: dotSize,
              "--dmx-delay": `${dot.delay}s`,
              "--dmx-duration": `${duration}s`,
              "--dmx-floor": 0.14,
            } as React.CSSProperties
          }
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export const RipLoader = memo(RipLoaderImpl);

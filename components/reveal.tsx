"use client";

import { memo, useEffect, useRef, useState, createElement } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms, for revealing a row of cards in sequence. */
  delay?: number;
  /** HTML tag to render, defaults to "div". Use "li" inside <ol>/<ul>. */
  as?: "div" | "li";
}

function RevealImpl({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate once, then stop observing entirely
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    // eslint-disable-next-line react-hooks/refs
    {
      ref,
      className: `reveal ${visible ? "is-visible" : ""} ${className ?? ""}`,
      style: { transitionDelay: visible ? `${delay}ms` : "0ms" },
    },
    children,
  );
}

export const Reveal = memo(RevealImpl);

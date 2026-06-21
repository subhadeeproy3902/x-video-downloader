"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

function ThemeToggleImpl({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme is only known after hydration; render a stable placeholder until then
  // so the toggle never flashes the wrong icon or shifts layout.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const toggle = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    document.startViewTransition(() => setTheme(nextTheme));
  }, [resolvedTheme, setTheme]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center border border-line text-ink",
        "transition-colors duration-150 hover:border-line-strong hover:bg-surface-2 active:translate-y-px",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute h-[15px] w-[15px] transition-all duration-200",
          mounted && isDark ? "scale-50 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute h-[15px] w-[15px] transition-all duration-200",
          mounted && isDark ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
    </button>
  );
}

export const ThemeToggle = memo(ThemeToggleImpl);

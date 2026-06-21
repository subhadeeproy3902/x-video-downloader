import { GitHub } from "./github-logo";

async function fetchStarCount(repo: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export default async function GitHubStars({ repo }: { repo: string }) {
  const stars = await fetchStarCount(repo);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer noopener"
      title={
        stars != null && stars > 0
          ? `${new Intl.NumberFormat("en-US").format(stars)} stars`
          : undefined
      }
      className="relative flex h-8 shrink-0 items-center justify-center gap-1.5 border border-line px-2 text-ink transition-colors hover:border-line-strong hover:bg-surface-2 active:translate-y-px"
    >
      <GitHub className="size-[18px] shrink-0" />
      {stars != null && stars > 0 && (
        <span className="font-mono text-[11px] text-ink-muted tabular-nums">
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
          })
            .format(stars)
            .toLowerCase()}
        </span>
      )}
    </a>
  );
}

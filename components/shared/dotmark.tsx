export function DotMark() {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[1, 0.7, 0.45, 0.25, 0.12].map((o, i) => (
        <span key={i} className="h-1 w-1 bg-ink" style={{ opacity: o }} />
      ))}
    </span>
  );
}
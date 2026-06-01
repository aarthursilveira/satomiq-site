import type { ReactNode } from "react";

/** Eyebrow editorial com diamond bullet. */
export function SectionLabel({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "paper" | "accent";
}) {
  const color =
    tone === "paper" ? "text-paper/60" : tone === "accent" ? "text-accent" : "text-ink/55";
  return (
    <span className={`inline-flex items-center gap-2.5 ${color}`}>
      <span className="diamond opacity-80" />
      <span className="font-mono text-[11px] uppercase tracking-eyebrow">{children}</span>
    </span>
  );
}

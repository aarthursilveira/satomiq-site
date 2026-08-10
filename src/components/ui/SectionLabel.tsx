import type { ReactNode } from "react";

/**
 * Rótulo de seção. Abre com uma régua curta, não com um losango: o losango
 * agora é a marca da SAtomiq e não pode virar bullet decorativo em toda seção.
 */
export function SectionLabel({
  children,
  tone = "sea",
}: {
  children: ReactNode;
  tone?: "sea" | "cobre" | "aco" | "latao";
}) {
  const color =
    tone === "cobre"
      ? "text-cobre"
      : tone === "aco"
        ? "text-aco"
        : tone === "latao"
          ? "text-latao"
          : "text-sea";
  return (
    <span className={`inline-flex items-center gap-3 ${color}`}>
      <span className="tick" />
      <span className="font-mono text-[11px] uppercase tracking-eyebrow">{children}</span>
    </span>
  );
}

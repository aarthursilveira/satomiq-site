/** Monograma SA + wordmark. */
export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const color = tone === "paper" ? "text-paper" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${color}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current font-display text-[13px]">
        SA
      </span>
      <span className="font-sans text-[15px] font-semibold tracking-tight">SAtomiq</span>
    </span>
  );
}

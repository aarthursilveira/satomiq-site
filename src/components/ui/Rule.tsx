/** Linha hairline (marca editorial). */
export function Rule({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const c = tone === "paper" ? "bg-paper/15" : "bg-ink/15";
  return <div className={`h-px w-full ${c} ${className}`} />;
}

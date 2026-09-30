/**
 * ENCHE: "resolveu, parcialmente". A palavra enche de latão só até onde
 * a frase deixa. Duas camadas iguais; a de cima é cortada na altura.
 */
export function Enche({ texto = "RESOLVEU", pct = 58 }: { texto?: string; pct?: number }) {
  const corte = `inset(${100 - pct}% 0 0 0)`;
  return (
    <span className="relative inline-block" role="img" aria-label={`${texto}, ${pct}%`}>
      <span aria-hidden className="heroi block text-[clamp(2.2rem,5.5vw,3.2rem)] text-ghost" style={{ fontWeight: 900 }}>
        {texto}
      </span>
      <span
        aria-hidden
        className="heroi absolute inset-0 block text-[clamp(2.2rem,5.5vw,3.2rem)]"
        style={{
          fontWeight: 900,
          color: "var(--latao)",
          clipPath: corte,
          transition: "clip-path .8s var(--ease)",
        }}
      >
        {texto}
      </span>
      <span
        aria-hidden
        className="absolute -right-1.5 translate-x-full font-mono text-[11px] text-dim num"
        style={{ bottom: `calc(${pct}% - 0.5em)`, transition: "bottom .8s var(--ease)" }}
      >
        ← {pct}%
      </span>
    </span>
  );
}

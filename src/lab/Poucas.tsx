import { useMemo, useState } from "react";

/**
 * POUCAS: "poucas pessoas" acende só algumas letras. Clica pra sortear quais.
 */
export function Poucas({ texto = "pessoas", quantas = 2 }: { texto?: string; quantas?: number }) {
  const [semente, setSemente] = useState(1);

  const acesas = useMemo(() => {
    // Sorteio determinístico pela semente: o HTML do servidor e o do navegador
    // saem iguais na primeira pintura.
    const ordem = Array.from(texto, (_, i) => i).sort(
      (a, b) => Math.sin(a * 12.9898 + semente * 78.233) - Math.sin(b * 12.9898 + semente * 78.233),
    );
    return new Set(ordem.slice(0, quantas));
  }, [texto, quantas, semente]);

  return (
    <button
      type="button"
      onClick={() => setSemente((s) => s + 1)}
      className="heroi text-[clamp(2.6rem,7vw,4rem)]"
      style={{ fontWeight: 800 }}
      aria-label={`${quantas} de ${texto.length} letras acesas em ${texto}. Clique pra sortear de novo.`}
    >
      {Array.from(texto).map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            color: acesas.has(i) ? "var(--latao)" : "var(--ghost)",
            transition: "color .5s var(--ease)",
          }}
        >
          {c}
        </span>
      ))}
    </button>
  );
}

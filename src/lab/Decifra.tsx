import { useEffect, useRef, useState } from "react";

const GLIFOS = "▚▞▖▗▘▝#/<>_=+*01{}";

/**
 * DECIFRA: a palavra chega embaralhada e resolve da esquerda pra direita.
 * Passa o mouse (ou toca) pra embaralhar de novo.
 */
export function Decifra({
  palavras = ["decifra", "compila", "resolve"],
  quadros = 24,
}: {
  palavras?: string[];
  /** Quantos quadros até resolver. Menos é mais rápido. */
  quadros?: number;
}) {
  const [texto, setTexto] = useState(palavras[0]);
  const idx = useRef(0);
  const raf = useRef(0);

  const roda = (alvo: string) => {
    cancelAnimationFrame(raf.current);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setTexto(alvo);
    let q = 0;
    const passo = () => {
      q++;
      const prontas = Math.floor((q / quadros) * alvo.length);
      setTexto(
        Array.from(alvo)
          .map((c, i) => (i < prontas ? c : GLIFOS[(Math.random() * GLIFOS.length) | 0]))
          .join(""),
      );
      if (q < quadros) raf.current = requestAnimationFrame(passo);
      else setTexto(alvo);
    };
    passo();
  };

  useEffect(() => {
    const t = setInterval(() => {
      idx.current = (idx.current + 1) % palavras.length;
      roda(palavras[idx.current]);
    }, 3200);
    return () => {
      clearInterval(t);
      cancelAnimationFrame(raf.current);
    };
  }, [quadros, palavras.join()]);

  return (
    <button
      type="button"
      onPointerEnter={() => roda(palavras[idx.current])}
      onClick={() => roda(palavras[idx.current])}
      className="font-mono text-[clamp(2rem,5vw,2.8rem)] font-medium text-latao"
      aria-label={palavras[idx.current]}
    >
      <span aria-hidden>{`{ ${texto} }`}</span>
    </button>
  );
}

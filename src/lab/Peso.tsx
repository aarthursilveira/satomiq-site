import { useEffect, useRef } from "react";
import type { CSSProperties, RefObject } from "react";

type Props = {
  texto: string;
  /** Até onde o cursor alcança, em px. */
  raio?: number;
  /** wght longe → perto (Roboto Flex vai de 100 a 1000). */
  peso?: [number, number];
  /** wdth longe → perto (de 25 a 151). */
  largura?: [number, number];
  /** Onde o cursor conta. Sem isso, só em cima da palavra. */
  area?: RefObject<HTMLElement>;
  /** Sem cursor (celular), um ponteiro invisível passeia pela palavra. */
  fantasma?: boolean;
  className?: string;
};

/**
 * PESO: a letra engorda perto do cursor.
 * Parente do VariableProximity do React Bits, escrito do zero pra Roboto Flex
 * mexer peso E largura juntos.
 */
export function Peso({
  texto,
  raio = 220,
  peso = [260, 1000],
  largura = [70, 125],
  area,
  fantasma = true,
  className = "",
}: Props) {
  const raiz = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const letras = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    const zona = area?.current ?? el;
    const parado = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let px = -1e4;
    let py = -1e4;
    let comCursor = false;
    let raf = 0;
    let naTela = true;
    const t0 = performance.now();

    const quadro = () => {
      const caixa = el.getBoundingClientRect();
      if (!comCursor && fantasma && !parado) {
        const t = (performance.now() - t0) / 1000;
        px = caixa.left + caixa.width * (0.5 + 0.6 * Math.sin(t * 0.8));
        py = caixa.top + caixa.height * 0.5;
      }
      // Lê tudo, depois escreve tudo: intercalar força layout a cada letra.
      const centros = letras.map((l) => {
        const b = l.getBoundingClientRect();
        return [b.left + b.width / 2, b.top + b.height / 2];
      });
      letras.forEach((l, i) => {
        const d = Math.hypot(px - centros[i][0], py - centros[i][1]);
        const k = Math.max(0, 1 - d / raio);
        const e = k * k * (3 - 2 * k);
        l.style.setProperty("--w", String(Math.round(peso[0] + (peso[1] - peso[0]) * e)));
        l.style.setProperty("--l", `${(largura[0] + (largura[1] - largura[0]) * e).toFixed(1)}%`);
      });
      raf = naTela && (comCursor || (fantasma && !parado)) ? requestAnimationFrame(quadro) : 0;
    };
    const liga = () => {
      if (!raf) raf = requestAnimationFrame(quadro);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      comCursor = true;
      px = e.clientX;
      py = e.clientY;
      liga();
    };
    const sai = () => {
      comCursor = false;
      px = py = -1e4;
      liga();
    };

    const io = new IntersectionObserver(([en]) => {
      naTela = en.isIntersecting;
      if (naTela) liga();
    });
    io.observe(el);
    zona.addEventListener("pointermove", move);
    zona.addEventListener("pointerleave", sai);
    liga();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      zona.removeEventListener("pointermove", move);
      zona.removeEventListener("pointerleave", sai);
    };
  }, [raio, peso[0], peso[1], largura[0], largura[1], area, fantasma]);

  // Repouso (HTML pré-renderizado, sem JS): meio do caminho, legível.
  // `--impulso` vem de fora (no hero, o recado que a pessoa digita) e soma
  // no peso de todas as letras.
  const repouso = {
    "--w": String(Math.round((peso[0] + peso[1]) / 2 + 150)),
    "--l": "100%",
    fontWeight: "clamp(100, calc(var(--w) + var(--impulso, 0)), 1000)",
    fontStretch: "var(--l)",
  } as CSSProperties;

  return (
    <span ref={raiz} className={`heroi inline-block whitespace-nowrap ${className}`} aria-label={texto} role="img">
      {Array.from(texto).map((c, i) => (
        <span
          key={i}
          data-l
          aria-hidden
          className="inline-block"
          style={repouso}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * Entrada por scroll sem framer-motion.
 *
 * O framer era 57% do JavaScript da página (medido com rollup-plugin-visualizer)
 * para fazer texto aparecer. Isto faz o mesmo com IntersectionObserver + CSS.
 *
 * E resolve um segundo problema: com o HTML pré-renderizado, o estado inicial do
 * framer (opacity 0) ia parar no HTML estático — quem chegasse sem JS veria uma
 * página em branco. Aqui o padrão é VISÍVEL; a classe `js` no <html>, posta por
 * um script inline antes da pintura, é que arma a animação.
 */
export function useReveal() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!alvos.length) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      alvos.forEach((el) => el.classList.add("vis"));
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            obs.unobserve(e.target); // uma vez só
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

type Props = { children: ReactNode; delay?: number; className?: string };

/**
 * `aoCarregar` troca o gatilho: em vez de esperar o scroll (e o JS), a entrada
 * roda no carregamento, só com CSS. É o que a primeira dobra usa.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  aoCarregar = false,
}: Props & { aoCarregar?: boolean }) {
  const estilo = delay ? ({ "--atraso": `${delay}s` } as React.CSSProperties) : undefined;
  if (aoCarregar) {
    return (
      <div className={`entra ${className}`} style={estilo}>
        {children}
      </div>
    );
  }
  return (
    <div data-reveal className={`reveal ${className}`} style={estilo}>
      {children}
    </div>
  );
}

/** Grupo com escada: cada filho entra com um atraso a mais. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.09,
}: Props & { stagger?: number }) {
  return (
    <div className={className} style={{ "--escada": `${stagger}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className = "",
  index = 0,
}: Props & { index?: number }) {
  return (
    <div
      data-reveal
      className={`reveal ${className}`}
      style={{ "--atraso": `calc(var(--escada, 0.09s) * ${index})` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

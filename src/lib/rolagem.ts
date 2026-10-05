import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// ──────────────────────────────────────────────────────────────
// Rolagem da página: Lenis por baixo, GSAP ScrollTrigger por cima, os dois
// no mesmo relógio. Quem precisa de ScrollTrigger importa daqui, pra
// garantir o registro antes do primeiro efeito.
// ──────────────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

let lenis: Lenis | null = null;

export const movimentoReduzido = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Liga o Lenis e a âncora suave. Devolve a função de desligar. */
export function ligaRolagem() {
  // A barra do navegador do Instagram aparece e some rolando: sem isto o
  // ScrollTrigger recalcula tudo a cada vez e a cena dá um tranco.
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (import.meta.env.DEV) Object.assign(window, { ScrollTrigger });

  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = a?.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector<HTMLElement>(id);
    if (!el) return;
    e.preventDefault();
    rolaPara(el, id === "#topo" ? 0 : -72);
    history.replaceState(null, "", id);
  };
  document.addEventListener("click", onClick);

  if (movimentoReduzido()) return () => document.removeEventListener("click", onClick);

  lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  if (import.meta.env.DEV) Object.assign(window, { __lenis: lenis });
  lenis.on("scroll", ScrollTrigger.update);
  const tique = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tique);
  gsap.ticker.lagSmoothing(0);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(tique);
    lenis?.destroy();
    lenis = null;
  };
}

export function rolaPara(alvo: HTMLElement | number, offset = -72) {
  if (lenis) return lenis.scrollTo(alvo, { offset });
  const y = typeof alvo === "number" ? alvo : alvo.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: movimentoReduzido() ? "auto" : "smooth" });
}

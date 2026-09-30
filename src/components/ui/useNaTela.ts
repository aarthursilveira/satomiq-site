import { useEffect, useRef } from "react";

/**
 * Põe `.na-tela` no elemento enquanto ele está visível. Junto com a classe
 * `.pausa-fora`, isso pausa toda animação CSS da peça quando ela sai da tela:
 * quatro demos em loop rodando fora da vista é bateria jogada fora.
 */
export function useNaTela<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("na-tela");
      return;
    }
    const io = new IntersectionObserver(([e]) => el.classList.toggle("na-tela", e.isIntersecting), {
      rootMargin: "80px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Eletrons } from "./components/Eletrons";
import { Nucleo } from "./components/Nucleo";
import { Metodo } from "./components/Metodo";
import { Producao } from "./components/Producao";
import { Contato } from "./components/Contato";
import { Footer } from "./components/Footer";
import { useReveal } from "./components/ui/Reveal";

export default function App() {
  useReveal();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!alvo) return;
      const id = alvo.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Eletrons />
        <Nucleo />
        <Metodo />
        <Producao />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}

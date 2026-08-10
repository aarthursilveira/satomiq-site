import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { OQueE } from "./components/OQueE";
import { Pilares } from "./components/Pilares";
import { Onde } from "./components/Onde";
import { Arthur } from "./components/Arthur";
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
      {/* WCAG 2.4.1: a barra fixa põe cinco links na frente do conteúdo em
          toda visita. Quem navega por teclado precisa de uma saída. */}
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <OQueE />
        <Pilares />
        <Onde />
        <Arthur />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}

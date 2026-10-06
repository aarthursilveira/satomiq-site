import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Lenis from "lenis";
import type { Dia } from "./dia-em-pontos";
import type { Shaders } from "./shaders";

// ──────────────────────────────────────────────────────────────
// Todo o movimento da página. Este módulo inteiro chega por import()
// dinâmico, depois da primeira pintura: quem chega pelo Instagram lê o topo
// antes de baixar GSAP e Lenis. Devolve a função que desfaz tudo.
// ──────────────────────────────────────────────────────────────

type Alvos = {
  raiz: HTMLElement;
  caixaCeu: HTMLElement | null;
  titulo: HTMLElement | null;
  slug: HTMLElement | null;
  secaoDia: HTMLElement | null;
  dia: Dia;
  shaders: () => Shaders | null;
  cancelado: () => boolean;
};

export async function ligarMovimento(a: Alvos): Promise<() => void> {
  await (document.fonts?.ready ?? Promise.resolve());
  if (a.cancelado()) return () => {};
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, Draggable, InertiaPlugin);
  // A barra do navegador do Instagram aparece e some rolando: sem isto o
  // ScrollTrigger recalcula tudo a cada vez e a cena fixa dá um tranco.
  ScrollTrigger.config({ ignoreMobileResize: true });

  const r = a.raiz;
  const desfazer: Array<() => void> = [];

  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const tique = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tique);
  gsap.ticker.lagSmoothing(0);
  desfazer.push(() => {
    gsap.ticker.remove(tique);
    lenis.destroy();
  });

  // Âncoras pela mesma rolagem suave.
  const aoClicar = (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || !r.contains(link)) return;
    const id = link.getAttribute("href")!;
    const alvo = id.length > 1 ? r.querySelector<HTMLElement>(id) : null;
    if (!alvo) return;
    e.preventDefault();
    lenis.scrollTo(alvo, { offset: id === "#topo" ? 0 : -8, duration: 1.4 });
    history.replaceState(null, "", id);
  };
  r.addEventListener("click", aoClicar);
  desfazer.push(() => r.removeEventListener("click", aoClicar));

  const arrastaveis: Array<{ kill: () => void }> = [];
  let slugTimer = 0;
  const ctx = gsap.context(() => {
    // janelas do topo, presas ao céu
    let z = 10;
    r.querySelectorAll<HTMLElement>("[data-arrasta]").forEach((j) => {
      const barra = j.querySelector<HTMLElement>("header");
      arrastaveis.push(
        ...Draggable.create(j, {
          type: "x,y",
          trigger: barra ?? j,
          bounds: a.caixaCeu ?? undefined,
          inertia: true,
          edgeResistance: 0.75,
          onPress() {
            j.style.zIndex = String(++z);
          },
        }),
      );
    });

    // entrada do topo
    // O CSS esconde o topo (html.js .entra) até aqui. Mostra ANTES de montar
    // os .from(): eles leem o valor atual como destino, e com opacidade 0 lida
    // daqui o topo animaria de 0 pra 0.
    gsap.set(".entra", { opacity: 1 });
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (a.titulo) {
      const split = SplitText.create(a.titulo, { type: "lines,chars", mask: "lines" });
      tl.from(split.chars, { yPercent: 115, duration: 1.15, stagger: 0.022 }, 0);
    }
    tl.from(".pontilhado", { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 0.1)
      .from(".hero-linha > span:not(.pontilhado)", { opacity: 0, y: 10, duration: 0.8, stagger: 0.1 }, 0.05)
      .from([".hero-sub", ".hero-ctas"], { opacity: 0, y: 20, duration: 0.9, stagger: 0.08 }, 0.45)
      .from("[data-arrasta]", { opacity: 0, y: 26, scale: 0.94, duration: 0.8, stagger: 0.12, ease: "back.out(1.6)" }, 0.3);

    // revelações por rolagem
    gsap.utils.toArray<HTMLElement>("[data-revela]").forEach((el) =>
      gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } }),
    );
    ScrollTrigger.batch("[data-celula]", {
      start: "top 88%",
      once: true,
      onEnter: (els) => {
        gsap.from(els, { y: 36, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 });
      },
    });

    // o diário acende ponto a ponto, na ordem dos dias
    const pontos = gsap.utils.toArray<HTMLElement>("[data-diario-ponto]");
    if (pontos.length) {
      gsap.from(pontos, {
        scale: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { each: 0.004, from: "start" },
        scrollTrigger: { trigger: ".diario-grade", start: "top 85%", once: true },
      });
    }

    // o endereço que troca sozinho, só enquanto a célula está na tela
    if (a.slug) {
      const slugs = ["teu-salao", "barbearia-norte", "studio-lume", "espaco-flor", "dom-barbeiro", "atelie-cachos"];
      let si = 0;
      ScrollTrigger.create({
        trigger: a.slug,
        start: "top bottom",
        end: "bottom top",
        onToggle(self) {
          window.clearInterval(slugTimer);
          if (!self.isActive) return;
          slugTimer = window.setInterval(() => {
            si = (si + 1) % slugs.length;
            gsap.to(a.slug, { duration: 1.1, ease: "none", scrambleText: { text: slugs[si], chars: "abcdefghijklmnopqrstuvwxyz-", speed: 0.5, revealDelay: 0.2 } });
          }, 2600);
        },
      });
    }

    // o dia em pontos: varredura ao entrar, pino com progresso suavizado
    const d = a.dia;
    d.medir();
    d.desenhar(0);
    const proxy = { p: 0 };
    const v = { f: 0 };
    ScrollTrigger.create({
      trigger: a.secaoDia,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(v, { f: 1, duration: 1.8, ease: "power2.out", onUpdate: () => d.varrer(v.f) });
      },
    });
    gsap.to(proxy, {
      p: 1,
      ease: "none",
      // No celular o trecho fixo é mais curto: quem vem do Instagram tem menos paciência.
      scrollTrigger: {
        trigger: a.secaoDia,
        start: "top top",
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        end: () => "+=" + Math.round(innerHeight * (innerWidth < 760 ? 2.2 : 3.2)),
        onRefresh: () => {
          d.medir();
          d.desenhar(proxy.p);
        },
      },
      onUpdate: () => d.desenhar(proxy.p),
    });

    // o céu engrossa o ponto e o vapor sobe enquanto o topo sai
    ScrollTrigger.create({
      trigger: a.caixaCeu,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => a.shaders()?.definirRolagem(self.progress),
    });

    // o título do fim aperta a largura enquanto chega
    gsap.fromTo(
      ".fim h2",
      { "--largura": 125 },
      { "--largura": 100, ease: "none", scrollTrigger: { trigger: ".fim h2", start: "top bottom", end: "top 40%", scrub: true } },
    );
    gsap.from(".rodape-marca", { yPercent: 40, ease: "none", scrollTrigger: { trigger: ".rodape", start: "top bottom", end: "bottom bottom", scrub: true } });
  }, r);

  desfazer.push(() => {
    window.clearInterval(slugTimer);
    arrastaveis.forEach((x) => x.kill());
    ctx.revert();
  });
  ScrollTrigger.refresh();

  return () => desfazer.reverse().forEach((f) => f());
}

import { useEffect, useRef } from "react";
import { HERO, LINKS, DIARIO } from "../lib/content";
import { Peso } from "../lab/Peso";

const data = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");

/** Ecos do diário atrás da palavra: a conversa de ontem, quase ilegível. */
const ECOS = DIARIO.recentes.slice(0, 18).map((c) => c.msg);

export function Hero() {
  const secao = useRef<HTMLElement>(null);

  // Mancha de luz que segue o cursor devagar. Fundo nunca chapado.
  useEffect(() => {
    const el = secao.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alvoX = 0.3, alvoY = 0.45, x = alvoX, y = alvoY, raf = 0;
    const passo = () => {
      x += (alvoX - x) * 0.05;
      y += (alvoY - y) * 0.05;
      el.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
      raf = Math.abs(alvoX - x) + Math.abs(alvoY - y) > 0.001 ? requestAnimationFrame(passo) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      alvoX = (e.clientX - r.left) / r.width;
      alvoY = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(passo);
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="topo"
      ref={secao}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-32 md:px-8"
      style={{
        background:
          "radial-gradient(900px circle at var(--mx, 30%) var(--my, 45%), rgb(167 141 81 / 0.16), transparent 60%)",
      }}
    >
      {/* Ecos: coluna de commits subindo devagar, cor ghost. Decorativo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-4%] top-0 hidden h-full w-[46%] overflow-hidden md:block"
        style={{ maskImage: "linear-gradient(transparent, #000 25%, #000 70%, transparent)" }}
      >
        <div className="ecos flex flex-col gap-3 font-mono text-[13px] text-ghost">
          {[...ECOS, ...ECOS].map((m, i) => (
            <span key={i} className="whitespace-nowrap" style={{ paddingLeft: `${(i * 37) % 120}px` }}>
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-pagina">
        <p className="eyebrow entra">{HERO.tag}</p>

        <p className="entra mt-6 font-gente text-conector text-creme" style={{ "--atraso": ".1s" } as React.CSSProperties}>
          {HERO.antes}
        </p>

        <h1 className="entra mt-2 leading-none" style={{ "--atraso": ".2s" } as React.CSSProperties}>
          <span className="block font-serif text-[clamp(2.4rem,6vw,5rem)] italic leading-none text-latao">{HERO.eu}</span>
          <Peso
            texto={HERO.heroi}
            area={secao}
            raio={260}
            peso={[220, 1000]}
            largura={[62, 116]}
            className="-ml-[0.04em] text-[clamp(4rem,17vw,15.5rem)]"
          />
        </h1>

        <div
          className="entra mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          style={{ "--atraso": ".35s" } as React.CSSProperties}
        >
          <p className="max-w-[54ch] text-corpo text-creme">{HERO.depois}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#rodando" className="btn-cheio">
              {HERO.ctaPrincipal} <span aria-hidden>↓</span>
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-vazio">
              {HERO.ctaSecundario} <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div
          className="entra mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 font-mono text-[12px] text-dim"
          style={{ "--atraso": ".5s" } as React.CSSProperties}
        >
          <span className="flex items-center gap-2.5">
            <span className="ponto-vivo" aria-hidden />
            <span className="text-creme num">{HERO.vivo.commits}</span> commits desde {HERO.vivo.desde}
          </span>
          <span>
            <span className="text-creme num">{HERO.vivo.projetos}</span> projetos
          </span>
          <span>
            último: <span className="text-latao">{HERO.vivo.ultimo.repo}</span>, {data(HERO.vivo.ultimo.data)}
          </span>
        </div>
      </div>
    </section>
  );
}

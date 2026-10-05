import { useEffect, useRef } from "react";
import { HERO, DIARIO } from "../lib/content";
import { useLinkDoRecado } from "../lib/recado";
import { Peso } from "../lab/Peso";
import { Escolha } from "./Escolha";

/** Ecos do diário atrás da palavra: a conversa de ontem, quase ilegível. */
const ECOS = DIARIO.recentes.slice(0, 18).map((c) => c.msg);

/** Mancha de luz que segue o cursor devagar. Fundo nunca chapado. */
export function useLuz(secao: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = secao.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alvoX = 0.3,
      alvoY = 0.45,
      x = alvoX,
      y = alvoY,
      raf = 0;
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
  }, [secao]);
}

export function Ecos() {
  return (
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
  );
}

const atraso = (s: number) => ({ "--atraso": `${s}s` }) as React.CSSProperties;

/** O topo da página de quem contrata: a promessa e a primeira pergunta. */
export function Hero() {
  const secao = useRef<HTMLElement>(null);
  const zap = useLinkDoRecado();
  useLuz(secao);

  return (
    <section
      id="topo"
      ref={secao}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32"
      style={{ background: "radial-gradient(900px circle at var(--mx, 30%) var(--my, 45%), rgb(167 141 81 / 0.16), transparent 60%)" }}
    >
      <Ecos />

      <div className="relative mx-auto w-full max-w-pagina">
        <p className="eyebrow entra">{HERO.tag}</p>

        <p className="entra mt-5 font-gente text-conector text-creme" style={atraso(0.1)}>
          {HERO.antes}
        </p>

        <h1 className="entra mt-1 leading-none" style={atraso(0.2)}>
          <span className="block font-serif text-[clamp(2.2rem,6vw,5rem)] italic leading-none text-latao">{HERO.eu}</span>
          <Peso texto={HERO.heroi} area={secao} raio={260} peso={[220, 1000]} largura={[62, 116]} className="-ml-[0.04em] text-[clamp(4rem,17vw,15.5rem)]" />
          <span className="mt-1 block font-gente text-conector font-normal text-creme">{HERO.depois}</span>
        </h1>

        <div className="entra mt-8 grid gap-7 md:mt-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end md:gap-14" style={atraso(0.35)}>
          <p className="max-w-[44ch] text-corpo text-creme">{HERO.sub}</p>
          <Escolha variante="grande" rotulo={HERO.pergunta} irPara="#dia" />
        </div>

        <div className="entra mt-8 flex flex-col gap-3 border-t border-border pt-5 font-mono text-[12px] text-dim md:mt-12 md:flex-row md:items-center md:justify-between" style={atraso(0.5)}>
          <span className="flex items-start gap-2.5 md:items-center">
            <span className="ponto-vivo mt-1 shrink-0 md:mt-0" aria-hidden />
            {HERO.vivo}
          </span>
          <a href={zap} target="_blank" rel="noopener noreferrer" className="shrink-0 text-latao transition-colors hover:text-texto">
            {HERO.ouZap} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

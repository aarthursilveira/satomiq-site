import type { ReactNode } from "react";
import { RODANDO_INTRO, SISTEMAS, TAMBEM } from "../lib/content";
import type { Sistema } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { useNaTela } from "./ui/useNaTela";
import { MiniGluten, MiniMaarkio, MiniNectarq, MiniOutreach } from "./Minis";

const MINI: Record<Sistema["slug"], () => ReactNode> = {
  maarkio: MiniMaarkio,
  nectarq: MiniNectarq,
  gluten: MiniGluten,
  outreach: MiniOutreach,
};

const TOM = {
  oliva: "text-oliva ring-oliva/40",
  azul: "text-azul ring-azul/40",
  latao: "text-latao ring-latao/40",
};

function Cartao({ s, index }: { s: Sistema; index: number }) {
  const palco = useNaTela<HTMLDivElement>();
  const Mini = MINI[s.slug];
  return (
    <Reveal delay={(index % 2) * 0.1} className="h-full">
      <article className="cartao flex h-full flex-col overflow-hidden">
        <div ref={palco} className="pausa-fora grid h-72 place-items-center overflow-hidden border-b border-border bg-terminal px-6">
          <Mini />
        </div>

        <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="heroi text-[2.4rem]" style={{ fontWeight: 900, fontStretch: "112%" }}>
                {s.nome}
              </h3>
              <p className="mt-1.5 font-mono text-miudo text-dim">{s.categoria}</p>
            </div>
            <span className={`chip ${TOM[s.status.tom]}`}>
              {s.status.tom === "oliva" && <span className="ponto-vivo h-1.5 w-1.5" aria-hidden />}
              {s.status.texto}
            </span>
          </div>

          <p className="text-corpo text-creme">{s.tese}</p>

          <div className="rounded-xl bg-terminal p-4 ring-1 ring-inset ring-border">
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-dim">decisão que importa</p>
            <p className="mt-2 font-mono text-miudo text-texto">{s.decisao.texto}</p>
            <p className="mt-1.5 font-mono text-[11px] text-latao">{s.decisao.fonte}</p>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
            {s.stack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 font-mono text-[12px] text-dim">
            <span>
              <span className="text-creme num">{s.commits}</span> commits desde abril
            </span>
            {s.link && (
              <a href={s.link.href} target="_blank" rel="noopener noreferrer" className="text-latao hover:text-texto">
                {s.link.label} ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Rodando() {
  return (
    <section id="rodando" className="mx-auto max-w-pagina scroll-mt-24 px-5 pt-32 md:px-8">
      <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
        <Reveal>
          <p className="eyebrow flex items-center gap-2.5">
            <span className="ponto-vivo" aria-hidden /> {RODANDO_INTRO.eyebrow}
          </p>
          <h2 className="heroi respira mt-3 text-titulo" style={{ fontWeight: 1000, fontStretch: "100%" }}>
            {RODANDO_INTRO.heroi}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[50ch] font-gente text-conector text-creme">{RODANDO_INTRO.corpo}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {SISTEMAS.map((s, i) => (
          <Cartao key={s.slug} s={s} index={i} />
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="eyebrow">{TAMBEM.titulo}</p>
        <ul className="mt-5 grid gap-x-10 border-t border-border sm:grid-cols-2">
          {TAMBEM.itens.map((it) => (
            <li key={it.nome} className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="shrink-0 font-mono text-miudo text-latao sm:w-40">{it.nome}</span>
              <span className="text-miudo text-creme">{it.texto}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

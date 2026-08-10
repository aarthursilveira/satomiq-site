import { ELETRONS, ELETRONS_INTRO, type Eletron } from "../lib/content";
import { Secao } from "./ui/Secao";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { MarcaNectarq, MarcaMaarkio } from "./Marks";
import { ArrowUpRight } from "@phosphor-icons/react";

/**
 * TRAVA 3 da paleta — um acento por dobra — tem exatamente uma exceção, e é
 * esta: a dobra da família precisa mostrar os dois filhos. Funciona porque
 * latão e aço foram escolhidos no eixo amarelo↔azul, com 11,1 pontos de L* de
 * distância, e sobrevivem juntos a deuteranopia. O que NÃO entra aqui é o
 * cobre: ele está a ΔE 7 do latão e viraria uma terceira cor briguenta.
 */

const TEMA = {
  nectarq: {
    Marca: MarcaNectarq,
    texto: "text-aco",
    borda: "hover:border-aco/50",
    ponto: "bg-aco",
  },
  maarkio: {
    Marca: MarcaMaarkio,
    texto: "text-latao",
    borda: "hover:border-latao/50",
    ponto: "bg-latao",
  },
} as const;

function Cartao({ e }: { e: Eletron }) {
  const t = TEMA[e.slug];
  const { Marca } = t;

  return (
    // `relative` + o link esticado embaixo: o cartão inteiro vira alvo, mas
    // continua sendo UM link só para leitor de tela. Antes o cartão tinha
    // hover de borda e só o rodapé navegava — afordância mentindo.
    <article
      className={`relative flex h-full flex-col gap-7 border border-line bg-surface p-7 transition-colors duration-500 ease-spring focus-within:border-sea sm:p-9 ${t.borda}`}
    >
      <header className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <Marca familia className="h-11 w-11 shrink-0 text-paper" />
          {/* Estado nunca é só cor (trava 4): o ponto vem sempre com o texto. */}
          <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-sea">
            <span
              className={`h-1.5 w-1.5 rounded-full ${e.emProducao ? t.ponto : "bg-sea"}`}
              aria-hidden
            />
            {e.status}
          </span>
        </div>

        <div>
          <h3 className="text-[1.75rem] font-semibold tracking-[-0.025em] text-paper">{e.nome}</h3>
          <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.14em] ${t.texto}`}>
            {e.categoria}
          </p>
        </div>
      </header>

      <p className="text-balance text-[1.2rem] font-medium leading-snug tracking-[-0.015em] text-paper">
        {e.tese}
      </p>
      <p className="leading-relaxed text-mist">{e.corpo}</p>

      <ul className="flex flex-col gap-2.5 border-t border-linesoft pt-6 text-[0.94rem] text-mist">
        {e.capacidades.map((c) => (
          <li key={c} className="flex gap-3">
            <span className={`mt-2.5 h-px w-3 shrink-0 ${t.ponto} opacity-70`} aria-hidden />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      {e.nota && (
        <p className="border-l-2 border-linesoft pl-5 text-[0.9rem] leading-relaxed text-sea">
          {e.nota}
        </p>
      )}

      <a
        href={e.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group mt-auto inline-flex items-center gap-2.5 pt-2 font-mono text-[11px] uppercase tracking-[0.14em] after:absolute after:inset-0 after:content-[''] ${t.texto}`}
      >
        {e.cta.label}
        <ArrowUpRight
          weight="bold"
          className="h-3.5 w-3.5 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </article>
  );
}

export function Eletrons() {
  return (
    <Secao id="eletrons" rotulo={ELETRONS_INTRO.eyebrow}>
      <Reveal>
        <h2 className="max-w-[20ch] text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper">
          {ELETRONS_INTRO.titulo}
        </h2>
        <p className="mt-6 max-w-[62ch] leading-relaxed text-mist">{ELETRONS_INTRO.corpo}</p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
        {ELETRONS.map((e, i) => (
          <RevealItem key={e.slug} index={i} className="h-full">
            <Cartao e={e} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Secao>
  );
}

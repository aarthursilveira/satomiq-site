import { useRef } from "react";
import type { ReactNode } from "react";
import { CASOS, NAV } from "../lib/content";
import { MATERIAL } from "../lib/material";
import { gsap, movimentoReduzido, useGSAP } from "../lib/rolagem";
import { MiniGluten, MiniMaarkio, MiniNectarq } from "./Minis";
import { Pendente } from "./ui/Pendente";
import { useNaTela } from "./ui/useNaTela";

type Caso = (typeof CASOS.itens)[number];

const MINI: Record<Caso["slug"], () => ReactNode> = { maarkio: MiniMaarkio, nectarq: MiniNectarq, gluten: MiniGluten };

/**
 * Os casos em cartões que se empilham: o de cima fica preso e afunda um
 * pouco quando o próximo chega. Sticky é CSS puro (funciona sem JS); o
 * afundar é GSAP, e some com movimento reduzido.
 */
export function Casos() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (movimentoReduzido()) return;
      // Só onde o cartão inteiro cabe na tela: no celular ele é mais alto que
      // a tela, e preso esconderia o próprio botão.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const cartoes = gsap.utils.toArray<HTMLElement>(".caso", raiz.current);
        cartoes.slice(0, -1).forEach((c, i) => {
          // Só afunda quando o próximo já está cobrindo: antes disso a pessoa ainda tá lendo.
          gsap.to(c.querySelector(".caso-corpo"), {
            scale: 0.95,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: { trigger: cartoes[i + 1], start: "top 70%", end: "top 15%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section id="casos" ref={raiz} className="mx-auto max-w-pagina scroll-mt-20 px-5 pt-28 md:px-8 md:pt-40" aria-labelledby="casos-titulo">
      <div className="max-w-[44rem]">
        <p className="eyebrow flex items-center gap-2.5">
          <span className="ponto-vivo" aria-hidden /> {CASOS.eyebrow}
        </p>
        <h2 id="casos-titulo" className="heroi mt-3 text-[clamp(2.6rem,7vw,5.6rem)]" style={{ fontWeight: 900, fontStretch: "92%" }}>
          {CASOS.titulo}
        </h2>
        <p className="mt-5 max-w-[44ch] font-gente text-conector text-creme">{CASOS.corpo}</p>
      </div>

      <ol className="mt-14 grid gap-6 md:gap-10">
        {CASOS.itens.map((c, i) => (
          <li key={c.slug} className="caso md:sticky" style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}>
            <Cartao c={c} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Cartao({ c }: { c: Caso }) {
  const palco = useNaTela<HTMLDivElement>();
  const Mini = MINI[c.slug];
  const material = c.slug in MATERIAL.casos ? MATERIAL.casos[c.slug as keyof typeof MATERIAL.casos] : null;

  return (
    <article className="caso-corpo origin-top overflow-hidden rounded-[1.75rem] bg-panel shadow-[0_-24px_48px_-28px_rgb(0_0_0/0.9)] ring-1 ring-inset ring-border">
      <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div ref={palco} className="pausa-fora grid min-h-[260px] place-items-center border-b border-border bg-terminal px-6 py-8 md:min-h-[440px] md:border-b-0 md:border-r">
          <Mini />
        </div>

        <div className="flex flex-col gap-6 p-6 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="heroi text-[2.6rem]" style={{ fontWeight: 900, fontStretch: "108%" }}>
                {c.nome}
              </h3>
              <p className="mt-1.5 font-mono text-miudo text-dim">{c.para}</p>
            </div>
            <span className="chip text-oliva ring-oliva/40">
              <span className="ponto-vivo h-1.5 w-1.5" aria-hidden /> {c.status}
            </span>
          </div>

          <dl className="grid gap-4">
            {(
              [
                ["problema", c.problema, "text-tijolo"],
                ["fiz", c.fiz, "text-latao"],
                ["mudou", c.mudou, "text-oliva"],
              ] as const
            ).map(([chave, texto, cor]) => (
              <div key={chave} className="grid gap-1 md:grid-cols-[120px_minmax(0,1fr)] md:gap-6">
                <dt className={`font-mono text-[11px] uppercase tracking-eyebrow ${cor}`}>{CASOS.rotulos[chave]}</dt>
                <dd className="text-corpo text-creme">{texto}</dd>
              </div>
            ))}
          </dl>

          {material && (
            <>
              {material.numeros.length ? (
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
                  {material.numeros.map((n) => (
                    <p key={n.legenda}>
                      <span className="num block font-flex text-[2.4rem] font-black leading-none tracking-tight text-latao">{n.valor}</span>
                      <span className="mt-1.5 block text-miudo text-creme">{n.legenda}</span>
                    </p>
                  ))}
                </div>
              ) : (
                <Pendente rotulo={`números reais do ${c.nome} (ex.: agendamentos/mês, faltas a menos)`} />
              )}
              {material.depoimento ? (
                <figure className="border-l-2 border-latao/60 pl-4">
                  <blockquote className="font-serif text-[1.35rem] italic leading-snug text-texto">"{material.depoimento.texto}"</blockquote>
                  <figcaption className="mt-2 font-mono text-[11px] text-dim">
                    {material.depoimento.quem} · {material.depoimento.negocio}
                  </figcaption>
                </figure>
              ) : (
                <Pendente rotulo={`depoimento de quem usa o ${c.nome}`} />
              )}
            </>
          )}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <a href={c.cta.href} target="_blank" rel="noopener noreferrer" className="btn-vazio">
              {c.cta.label} <span aria-hidden>↗</span>
            </a>
            <a href={`${NAV.irBastidores.href}#rodando`} className="font-mono text-[12px] text-dim transition-colors hover:text-latao">
              {CASOS.porDentro} →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

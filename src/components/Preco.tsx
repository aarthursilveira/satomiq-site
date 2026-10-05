import { ShieldCheck } from "@phosphor-icons/react";
import { PRECO } from "../lib/content";
import { MATERIAL } from "../lib/material";
import { ABERTURA } from "../lib/recado";
import { useSegmento } from "../lib/segmento";
import { wa } from "../lib/zap";
import { Pendente } from "./ui/Pendente";

/**
 * Quanto custa, honesto: as duas opções mais baratas vêm primeiro, com quando
 * elas bastam. Quem chega no sob medida chega sabendo por que paga mais.
 */
export function Preco() {
  const seg = useSegmento();
  const sm = PRECO.sobMedida;
  const pedido = wa(`${ABERTURA}. ${seg.escolhido ? `${seg.frase} ` : ""}Quero saber quanto fica pro meu caso.`);

  return (
    <section id="preco" className="mx-auto max-w-pagina scroll-mt-20 px-5 pt-28 md:px-8 md:pt-40" aria-labelledby="preco-titulo">
      <p className="eyebrow">{PRECO.eyebrow}</p>
      <h2 id="preco-titulo" className="mt-3 leading-[0.95]">
        <span className="heroi block text-[clamp(2.6rem,7vw,5.6rem)]" style={{ fontWeight: 900, fontStretch: "92%" }}>
          {PRECO.titulo}
        </span>
        <span className="mt-2 block font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] italic text-latao">{PRECO.sub}</span>
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8">
        <ul className="grid content-start border-t border-border">
          {PRECO.opcoes.map((o) => (
            <li key={o.nome} className="grid gap-2 border-b border-border py-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-mono text-[12px] uppercase tracking-eyebrow text-creme">{o.nome}</h3>
                <p className="num font-flex text-[1.5rem] font-bold tracking-tight text-dim sm:shrink-0">{o.preco}</p>
              </div>
              <p className="max-w-[42ch] text-miudo text-creme">{o.serve}</p>
              <p className="font-mono text-[10.5px] text-dim">{o.nota}</p>
            </li>
          ))}
        </ul>

        <div className="relative overflow-hidden rounded-[1.75rem] bg-panel p-7 ring-1 ring-inset ring-latao/45 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgb(167 141 81 / 0.18), transparent 65%)" }}
          />
          <h3 className="relative font-mono text-[12px] uppercase tracking-eyebrow text-latao">{sm.nome}</h3>
          {MATERIAL.preco ? (
            <p className="relative mt-4">
              <span className="block font-mono text-miudo text-dim">a partir de</span>
              <span className="num heroi block text-[clamp(3rem,7vw,4.8rem)]" style={{ fontWeight: 900 }}>
                {MATERIAL.preco.aPartirDe}
              </span>
              <span className="mt-2 block text-miudo text-creme">{MATERIAL.preco.como}</span>
            </p>
          ) : (
            <div className="relative mt-4">
              <p className="heroi text-[clamp(2.4rem,5.5vw,3.8rem)]" style={{ fontWeight: 850, fontStretch: "96%" }}>
                {sm.semPreco}
              </p>
              <p className="mt-3 max-w-[40ch] text-miudo text-creme">{sm.semPrecoNota}</p>
              <Pendente rotulo="preço a partir de (opcional, mas ajuda muito)" className="mt-4" />
            </div>
          )}

          <p className="relative mt-7 max-w-[46ch] text-corpo text-creme">{sm.serve}</p>

          {MATERIAL.garantia ? (
            <p className="relative mt-6 flex items-start gap-3 rounded-xl bg-oliva/[0.08] px-4 py-3 text-miudo text-texto ring-1 ring-inset ring-oliva/40">
              <ShieldCheck weight="duotone" className="mt-0.5 h-5 w-5 shrink-0 text-oliva" />
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-eyebrow text-oliva">{PRECO.garantia}</span>
                {MATERIAL.garantia}
              </span>
            </p>
          ) : (
            <Pendente rotulo="garantia (se você oferecer)" className="mt-6" />
          )}

          <a href={pedido} target="_blank" rel="noopener noreferrer" className="btn-cheio relative mt-8">
            {sm.cta} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

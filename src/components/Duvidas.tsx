import { Plus } from "@phosphor-icons/react";
import { DUVIDAS } from "../lib/content";
import { MATERIAL } from "../lib/material";
import { Pendente } from "./ui/Pendente";

/** Pergunta que todo mundo faz. As que dependem de material só entram quando ele existe. */
export function Duvidas() {
  const itens = [
    ...DUVIDAS.fixas,
    ...(MATERIAL.prazo ? [{ q: DUVIDAS.prazo, a: `${MATERIAL.prazo[0].toUpperCase()}${MATERIAL.prazo.slice(1)}. Na primeira conversa eu te digo o prazo do teu caso.` }] : []),
    ...(MATERIAL.contrato ? [{ q: DUVIDAS.contrato, a: MATERIAL.contrato }] : []),
  ];

  return (
    <section id="duvidas" className="mx-auto max-w-pagina scroll-mt-20 px-5 pt-28 md:px-8 md:pt-40" aria-labelledby="duvidas-titulo">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
        <div>
          <p className="eyebrow">{DUVIDAS.eyebrow}</p>
          <h2 id="duvidas-titulo" className="heroi mt-3 max-w-[10ch] text-[clamp(2.4rem,6vw,4.6rem)]" style={{ fontWeight: 900, fontStretch: "92%" }}>
            {DUVIDAS.titulo}
          </h2>
        </div>
        <div>
          <ul className="border-t border-border">
            {itens.map((d) => (
              <li key={d.q} className="border-b border-border">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left transition-colors hover:text-latao [&::-webkit-details-marker]:hidden">
                    <span className="font-flex text-[1.25rem] font-semibold leading-snug tracking-tight text-texto group-hover:text-latao md:text-[1.4rem]">
                      {d.q}
                    </span>
                    <Plus weight="bold" className="h-4 w-4 shrink-0 text-latao transition-transform duration-300 ease-out group-open:rotate-45" />
                  </summary>
                  <p className="max-w-[58ch] pb-6 text-corpo text-creme">{d.a}</p>
                </details>
              </li>
            ))}
          </ul>
          {!MATERIAL.prazo && <Pendente rotulo="resposta: quanto tempo leva" className="mt-4" />}
          {!MATERIAL.contrato && <Pendente rotulo="resposta: tem mensalidade? fidelidade?" className="mt-3" />}
        </div>
      </div>
    </section>
  );
}

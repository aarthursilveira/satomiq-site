import { COMO } from "../lib/content";
import { MATERIAL } from "../lib/material";
import { Pendente } from "./ui/Pendente";
import { Reveal } from "./ui/Reveal";

/** Do primeiro oi ao sistema rodando: uma linha do tempo, não quatro cartões iguais. */
export function Como() {
  return (
    <section id="como" className="mx-auto max-w-pagina scroll-mt-20 px-5 pt-28 md:px-8 md:pt-40" aria-labelledby="como-titulo">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] md:items-end">
        <div>
          <p className="eyebrow">{COMO.eyebrow}</p>
          <h2 id="como-titulo" className="heroi mt-3 max-w-[12ch] text-[clamp(2.6rem,7vw,5.6rem)]" style={{ fontWeight: 900, fontStretch: "92%" }}>
            {COMO.titulo}
          </h2>
        </div>
        <div className="md:pb-3">
          <p className="max-w-[40ch] font-gente text-conector text-creme">{COMO.voce}</p>
          {MATERIAL.prazo ? (
            <p className="mt-4 font-mono text-miudo text-dim">
              {COMO.prazo} <span className="text-latao">{MATERIAL.prazo}</span>
            </p>
          ) : (
            <Pendente rotulo="prazo típico (do sim ao ar)" className="mt-4" />
          )}
        </div>
      </div>

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        {/* a linha que liga os passos */}
        <span aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px bg-border md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
        {COMO.passos.map((p, i) => (
          <li key={p.nome} className="relative pl-10 md:pl-0 md:pt-10">
            {/* fora do Reveal: o transform dele viraria a referência do absolute */}
            <span
              aria-hidden
              className={`absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full font-mono text-[10px] ring-1 ring-inset ${
                i === COMO.passos.length - 1 ? "bg-oliva text-bg ring-oliva" : "bg-bg text-latao ring-latao/60"
              }`}
            >
              {i + 1}
            </span>
            <Reveal delay={i * 0.08}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-dim">{p.quando}</p>
              <h3 className="heroi mt-2 text-[2rem]" style={{ fontWeight: 850, fontStretch: "104%" }}>
                {p.nome}
              </h3>
              <p className="mt-3 max-w-[34ch] text-miudo text-creme">{p.texto}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

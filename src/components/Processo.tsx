import { PROCESSO } from "../lib/content";
import { Reveal } from "./ui/Reveal";

export function Processo() {
  const { conversa } = PROCESSO;
  return (
    <section id="processo" className="mx-auto max-w-pagina scroll-mt-24 px-5 pt-24 md:px-8 md:pt-40">
      <Reveal>
        <p className="eyebrow">{PROCESSO.eyebrow}</p>
        {/* con/versa: metade gente (serif), metade máquina (mono). */}
        <h2 className="mt-2 flex flex-wrap items-baseline leading-[0.9]" aria-label="conversa">
          <span aria-hidden className="font-serif text-[clamp(4.5rem,15vw,12rem)] italic text-creme">
            {PROCESSO.titulo[0]}
          </span>
          <span aria-hidden className="font-mono text-[clamp(3.6rem,12vw,9.6rem)] font-medium tracking-tight text-latao">
            {PROCESSO.titulo[1]}
          </span>
        </h2>
        <p className="mt-6 max-w-[56ch] font-gente text-conector text-creme">{PROCESSO.corpo}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal className="cartao p-5 md:p-7">
          <div className="grid gap-4">
            <div className="max-w-[88%] justify-self-start">
              <p className="mb-1.5 font-serif text-lg italic text-dim">Arthur</p>
              <p className="rounded-2xl rounded-tl-sm bg-terminal px-4 py-3 font-gente text-corpo text-texto ring-1 ring-inset ring-border">
                {conversa.arthur}
              </p>
            </div>
            <div className="max-w-[92%] justify-self-end">
              <p className="mb-1.5 text-right font-mono text-[12px] text-azul">claude code</p>
              <pre className="whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-terminal px-4 py-3 font-mono text-[13px] leading-relaxed text-creme ring-1 ring-inset ring-azul/30">
                {conversa.claude}
              </pre>
            </div>
            <div className="mt-2 border-t border-border pt-4">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-dim">virou</p>
              <ul className="mt-2.5 grid gap-1.5 font-mono text-[12px]">
                {conversa.commits.map((c) => (
                  <li key={c} className="flex gap-2 text-creme">
                    <span className="text-oliva">✓</span>
                    <span className="min-w-0">{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-serif text-base italic text-dim">{conversa.legenda}</p>
            </div>
          </div>
        </Reveal>

        <ol className="grid content-start gap-0 border-t border-border">
          {PROCESSO.passos.map((p, i) => (
            <li
              key={p.nome}
              data-reveal
              className="reveal grid grid-cols-[40px_1fr] gap-x-3 gap-y-1 border-b border-border py-5"
              style={{ "--atraso": `${i * 0.08}s` } as React.CSSProperties}
            >
                <span className="row-span-2 pt-1.5 font-mono text-[12px] text-latao num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="heroi text-[1.9rem]" style={{ fontWeight: 800, fontStretch: "108%" }}>
                  {p.nome}
                </h3>
                <p className="text-miudo text-creme">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

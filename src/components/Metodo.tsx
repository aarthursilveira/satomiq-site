import { METODO } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

/**
 * Três atos. Foge da grade de folha de especificação de propósito: é a única
 * seção que é argumento, não inventário — e por isso ocupa a largura inteira,
 * com o ato do meio (a virada) marcado no cobre.
 */
export function Metodo() {
  return (
    <section id="metodo" className="scroll-mt-24 border-t border-linesoft bg-surface px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-20 sm:gap-28">
        {METODO.map((ato, i) => (
          <Reveal key={ato.eyebrow} delay={i * 0.04}>
            <div
              className={`grid gap-x-12 gap-y-6 lg:grid-cols-[160px_minmax(0,1fr)] ${
                ato.acento ? "border-l-2 border-cobre pl-6 lg:border-l-0 lg:pl-0" : ""
              }`}
            >
              <div className="lg:pt-3">
                <SectionLabel tone={ato.acento ? "cobre" : "sea"}>{ato.eyebrow}</SectionLabel>
              </div>
              <div>
                <h2
                  className={`text-balance text-[clamp(1.8rem,4.6vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.032em] ${
                    ato.acento ? "text-cobre" : "text-paper"
                  }`}
                >
                  {ato.titulo.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </h2>
                <p className="mt-7 max-w-[58ch] text-[1.05rem] leading-relaxed text-mist">
                  {ato.corpo}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

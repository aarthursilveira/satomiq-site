import { PILARES, PILARES_INTRO, type Pilar } from "../lib/content";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Eficiencia, Automacao, Inovacao } from "./Solidos";

/**
 * O capítulo visual da página. Os sólidos não são ilustração colada: em
 * projeção isométrica, o losango da marca é a face de cima de um cubo — então
 * as figuras são o próprio símbolo em volume.
 *
 * Composições de propósito diferentes entre si (vertical, radial, horizontal):
 * três variações do mesmo arranjo leriam como a mesma figura repetida.
 */
const FIGURA = { eficiencia: Eficiencia, automacao: Automacao, inovacao: Inovacao };

function Coluna({ p }: { p: Pilar }) {
  const Figura = FIGURA[p.chave];
  return (
    <div className="flex h-full flex-col gap-7 px-6 py-10 sm:px-9 sm:py-12">
      <div className="flex h-52 w-full items-center justify-center sm:h-60">
        <Figura className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-[1.6rem] font-semibold tracking-[-0.025em] text-paper">{p.nome}</h3>
        <p className="text-balance text-[1.05rem] font-medium leading-snug text-cobre">{p.tese}</p>
        <p className="leading-relaxed text-mist">{p.corpo}</p>
      </div>
      <p className="mt-auto border-t border-linesoft pt-5 font-mono text-[11px] leading-relaxed text-sea">
        {p.legenda}
      </p>
    </div>
  );
}

export function Pilares() {
  return (
    <section
      id="pilares"
      className="scroll-mt-24 border-t border-linesoft bg-surface px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionLabel tone="cobre">{PILARES_INTRO.eyebrow}</SectionLabel>
          <h2 className="mt-8 max-w-[16ch] text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper">
            {PILARES_INTRO.titulo}
          </h2>
          <p className="mt-6 max-w-[58ch] leading-relaxed text-mist">{PILARES_INTRO.corpo}</p>
        </Reveal>

        <RevealGroup
          className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3"
          stagger={0.12}
        >
          {PILARES.map((p, i) => (
            <RevealItem key={p.chave} index={i} className="bg-surface">
              <Coluna p={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

import { CONTATO, LINKS } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { MarcaSAtomiq } from "./Marks";

/**
 * Sem tabela de preço e sem dois caminhos concorrentes: preço é do produto, e
 * dois CTAs de mesmo peso não são hierarquia, são indecisão.
 */
export function Contato() {
  return (
    <section id="contato" className="scroll-mt-24 border-t border-linesoft px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionLabel tone="cobre">{CONTATO.eyebrow}</SectionLabel>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-[24ch]">
              <h2 className="text-balance text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] text-paper">
                {CONTATO.titulo}
              </h2>
            </div>
            <MarcaSAtomiq className="hidden h-16 w-16 text-line sm:block" />
          </div>
          <p className="mt-8 max-w-[56ch] text-[1.05rem] leading-relaxed text-mist">
            {CONTATO.corpo}
          </p>
          <div className="mt-11">
            <Button href={LINKS.contato} variant="cobre" icon="whatsapp">
              {CONTATO.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

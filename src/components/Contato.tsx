import { CONTATO, LINKS } from "../lib/content";
import { Secao } from "./ui/Secao";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { MarcaSAtomiq } from "./Marks";

/**
 * Sem tabela de preço e sem dois caminhos concorrentes: preço é do produto, e
 * dois CTAs de mesmo peso não são hierarquia, são indecisão.
 *
 * O fecho é o segundo maior tipo da página (4,2rem contra 5,6 do <h1>) — a
 * mesma razão ~1,35 que separa o <h1> dos <h2> de seção. Duas vozes, uma escala.
 */
export function Contato() {
  return (
    <Secao id="contato" rotulo={CONTATO.eyebrow} tone="cobre" className="sm:py-36">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <h2 className="max-w-[22ch] text-balance text-fecho font-semibold text-paper">
            {CONTATO.titulo}
          </h2>
          <MarcaSAtomiq className="hidden h-16 w-16 shrink-0 text-line sm:block" />
        </div>
        <p className="mt-8 max-w-[56ch] text-corpo text-mist">{CONTATO.corpo}</p>
        <div className="mt-11">
          <Button href={LINKS.contato} variant="cobre" icon="whatsapp">
            {CONTATO.cta}
          </Button>
        </div>
      </Reveal>
    </Secao>
  );
}

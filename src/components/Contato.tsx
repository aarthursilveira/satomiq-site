import { CONTATO } from "../lib/content";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { MarcaSAtomiq } from "./Marks";

/**
 * Sem tabela de preço. Preço é do produto, não da holding — e era exatamente
 * isso que estava errado no site anterior: preço por conversa na página da
 * empresa que não vende conversa.
 */
export function Contato() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 border-t border-line px-5 py-24 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <SectionLabel tone="cobre">{CONTATO.eyebrow}</SectionLabel>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <h2 className="text-balance text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.035em] text-paper">
              {CONTATO.titulo}
            </h2>
            <MarcaSAtomiq className="hidden h-16 w-16 text-line sm:block" />
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
          {/* Só o primeiro caminho leva o cobre cheio. Dois botões de acento na
              mesma dobra estouram a trava 3 — e, de quebra, dois CTAs de mesmo
              peso não são hierarquia, são indecisão. */}
          {CONTATO.caminhos.map((c, i) => (
            <RevealItem key={c.t} className="bg-ink">
              <div className="flex h-full flex-col gap-5 p-8 sm:p-10">
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-paper">
                  {c.t}
                </h3>
                <p className="max-w-[46ch] leading-relaxed text-mist">{c.b}</p>
                <div className="mt-auto pt-4">
                  <Button href={c.href} variant={i === 0 ? "cobre" : "ghost"} icon="whatsapp">
                    {c.cta}
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

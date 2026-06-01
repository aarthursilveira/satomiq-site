import { LINKS } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel tone="accent">Próximo passo</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Diagnóstico de 20 minutos.
              <br />
              <span className="italic text-paper/70">Plano específico para o seu caso.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-paper/75">
              A gente entende seu fluxo, identifica onde o lead esfria e mostra um
              plano com números — não proposta genérica.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={LINKS.diagnostico} variant="accent" icon="whatsapp">
                Falar com Arthur
              </Button>
              <Button href={LINKS.belaLive} variant="ghost" icon="arrow" className="!text-paper !ring-paper/30 hover:!bg-paper/10">
                Testar a Bela primeiro
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
              Respondo em até 24h · sem formulário, sem funil
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

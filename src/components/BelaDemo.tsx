import { LINKS } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";

export function BelaDemo() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-10 bg-ink px-7 py-14 text-paper lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-16">
          <div className="lg:col-span-7">
            <SectionLabel tone="paper">Antes de qualquer reunião</SectionLabel>
            <h3 className="mt-6 font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Mande uma mensagem
              <br />
              para a Bela agora.
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/80">
              Ela atende a Clínica Tainá em produção. Manda texto, manda áudio, faz
              uma pergunta real. Em 2 minutos você entende o produto melhor do que
              com qualquer slide.
            </p>
            <div className="mt-8">
              <Button href={LINKS.belaLive} variant="accent" icon="whatsapp">
                Conversar com a Bela
              </Button>
            </div>
          </div>

          {/* terminal mock */}
          <div className="lg:col-span-5">
            <div className="border border-paper/15 bg-paper/[0.03] p-5 font-mono text-[12px] leading-[1.9] text-paper/85">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              </div>
              <div className="text-paper/45">$ bela --persona=clinica-taina</div>
              <div className="text-paper/45">&nbsp;&nbsp;--channel=whatsapp</div>
              <div className="text-paper/45">&nbsp;&nbsp;--number={LINKS.belaNumeroDisplay}</div>
              <br />
              <div className="font-semibold text-paper">&gt; ready in 0.2s</div>
              <div className="font-semibold text-paper">
                &gt; awaiting your message
                <span className="ml-0.5 inline-block animate-blink">_</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

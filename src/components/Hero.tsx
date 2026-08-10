import { HERO, LINKS } from "../lib/content";
import { Button } from "./ui/Button";
import { SectionLabel } from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { MarcaSAtomiq, MarcaNectarq, MarcaMaarkio } from "./Marks";

/**
 * A dobra abre com a tese em tipo e, logo abaixo, a arquitetura desenhada com
 * as marcas de verdade: núcleo à esquerda, régua, os dois elétrons à direita.
 * É a página inteira explicada numa linha — sem diagrama de átomo, que era
 * justamente o erro do site anterior.
 */

const ARQUITETURA = [
  { Marca: MarcaNectarq, nome: "Nectarq", papel: "atendimento" },
  { Marca: MarcaMaarkio, nome: "Maarkio", papel: "agendamento" },
];

export function Hero() {
  return (
    <section id="topo" className="relative px-5 pb-24 pt-40 sm:px-8 sm:pt-48">
      <div className="mx-auto max-w-[1180px]">
        <Reveal aoCarregar>
          <SectionLabel>{HERO.eyebrow}</SectionLabel>
        </Reveal>

        <h1 className="mt-8 text-balance text-[clamp(2.6rem,8.5vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-paper">
          {/* A classe vai direto no span: um <div> dentro de <h1> é HTML
              inválido, e agora o HTML é pré-renderizado e realmente lido. */}
          <span className="entra block" style={{ "--atraso": "0.06s" } as React.CSSProperties}>
            {HERO.line1}
          </span>
          <span className="entra block" style={{ "--atraso": "0.12s" } as React.CSSProperties}>
            {HERO.line2}
          </span>
          <span
            className="entra block text-cobre"
            style={{ "--atraso": "0.18s" } as React.CSSProperties}
          >
            {HERO.line3}
          </span>
        </h1>

        <Reveal aoCarregar delay={0.26}>
          <p className="mt-9 max-w-[58ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-mist">
            {HERO.sub}
          </p>
        </Reveal>

        <Reveal aoCarregar delay={0.32}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Button href={LINKS.contato} variant="cobre" icon="whatsapp">
              Falar com Arthur
            </Button>
            <Button href="#eletrons" variant="ghost" icon="arrow">
              Ver os produtos
            </Button>
          </div>
        </Reveal>

        <Reveal aoCarregar delay={0.38}>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-sea">
            {HERO.meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Reveal>

        {/* A arquitetura, com as marcas reais */}
        <Reveal aoCarregar delay={0.46}>
          <div className="mt-20 border-t border-linesoft pt-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              <div className="flex items-center gap-3.5">
                <MarcaSAtomiq familia className="h-9 w-9 text-paper" />
                <div className="leading-tight">
                  <p className="text-[15px] font-semibold tracking-tight text-paper">SAtomiq</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-sea">
                    núcleo
                  </p>
                </div>
              </div>

              <div className="hidden h-px flex-1 bg-linesoft sm:block" />

              <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
                {ARQUITETURA.map(({ Marca, nome, papel }) => (
                  <div key={nome} className="flex items-center gap-3.5">
                    <Marca familia className="h-9 w-9 text-paper" />
                    <div className="leading-tight">
                      <p className="text-[15px] font-semibold tracking-tight text-paper">{nome}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-sea">
                        {papel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

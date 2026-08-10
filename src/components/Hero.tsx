import { HERO, LINKS } from "../lib/content";
import { Button } from "./ui/Button";
import { SectionLabel } from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { MarcaSAtomiq, MarcaNectarq, MarcaMaarkio } from "./Marks";

/**
 * A dobra abre com a definição em tipo e, logo abaixo, a arquitetura desenhada
 * com as marcas de verdade: núcleo à esquerda, régua, as duas marcas à direita.
 * É a página explicada numa linha — sem diagrama de átomo, que era justamente
 * o erro do site anterior.
 *
 * Saiu daqui a lista "Eficiência · Automação · Inovação": eram as três palavras
 * que abrem a seção Pilares logo abaixo, iguais. Numa página que existe para
 * explicar, spoiler de si mesma é peso morto na primeira dobra — e uma holding
 * se define pelo que ela detém, então quem fica é a arquitetura.
 */
const ARQUITETURA = [
  { Marca: MarcaNectarq, nome: "Nectarq", papel: "atendimento" },
  { Marca: MarcaMaarkio, nome: "Maarkio", papel: "agendamento" },
];

export function Hero() {
  return (
    <section id="topo" className="relative px-5 pb-28 pt-40 sm:px-8 sm:pt-48">
      <div className="mx-auto max-w-[1180px]">
        <Reveal aoCarregar>
          <SectionLabel>{HERO.eyebrow}</SectionLabel>
        </Reveal>

        <h1 className="mt-8 text-balance text-display font-semibold text-paper">
          {/* A classe vai direto no span: um <div> dentro de <h1> é HTML
              inválido, e o HTML agora é pré-renderizado e realmente lido. */}
          {HERO.linhas.map((linha, i) => (
            <span
              key={linha}
              className={`entra block ${i === HERO.linhas.length - 1 ? "text-cobre" : ""}`}
              style={{ "--atraso": `${0.06 * (i + 1)}s` } as React.CSSProperties}
            >
              {linha}
            </span>
          ))}
        </h1>

        <Reveal aoCarregar delay={0.28}>
          <p className="mt-9 max-w-[60ch] text-corpo text-mist">{HERO.sub}</p>
        </Reveal>

        <Reveal aoCarregar delay={0.34}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Button href="#o-que-e" variant="cobre" icon="arrow">
              Entender a SAtomiq
            </Button>
            <Button href={LINKS.contato} variant="ghost" icon="whatsapp">
              Falar com Arthur
            </Button>
          </div>
        </Reveal>

        <Reveal aoCarregar delay={0.42}>
          <div className="mt-20 border-t border-linesoft pt-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              <div className="flex items-center gap-3.5">
                <MarcaSAtomiq familia className="h-9 w-9 text-paper" />
                <div className="leading-tight">
                  <p className="text-miudo font-semibold tracking-tight text-paper">SAtomiq</p>
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-sea">núcleo</p>
                </div>
              </div>

              <div className="hidden h-px flex-1 bg-linesoft sm:block" />

              <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
                {ARQUITETURA.map(({ Marca, nome, papel }) => (
                  <div key={nome} className="flex items-center gap-3.5">
                    <Marca familia className="h-9 w-9 text-paper" />
                    <div className="leading-tight">
                      <p className="text-miudo font-semibold tracking-tight text-paper">{nome}</p>
                      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-sea">
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

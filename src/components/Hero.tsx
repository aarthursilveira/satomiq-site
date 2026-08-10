import { motion } from "framer-motion";
import { HERO, LINKS } from "../lib/content";
import { Button } from "./ui/Button";
import { SectionLabel } from "./ui/SectionLabel";
import { MarcaSAtomiq, MarcaNectarq, MarcaMaarkio } from "./Marks";

const SPRING = [0.16, 1, 0.3, 1] as const;

const linha = (i: number) => ({
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease: SPRING },
});

/**
 * A dobra abre com a tese em tipo e, logo abaixo, a arquitetura desenhada com
 * as marcas de verdade: núcleo à esquerda, régua, os dois elétrons à direita.
 * É a página inteira explicada numa linha — sem diagrama de átomo, que era
 * justamente o erro do site anterior.
 */
export function Hero() {
  return (
    <section id="topo" className="relative px-5 pb-24 pt-40 sm:px-8 sm:pt-48">
      <div className="mx-auto max-w-[1180px]">
        <motion.div {...linha(0)}>
          <SectionLabel>{HERO.eyebrow}</SectionLabel>
        </motion.div>

        <h1 className="mt-8 text-balance text-[clamp(2.6rem,8.5vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-paper">
          <motion.span className="block" {...linha(1)}>
            {HERO.line1}
          </motion.span>
          <motion.span className="block" {...linha(2)}>
            {HERO.line2}
          </motion.span>
          <motion.span className="block text-cobre" {...linha(3)}>
            {HERO.line3}
          </motion.span>
        </h1>

        <motion.p
          className="mt-9 max-w-[58ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-mist"
          {...linha(4)}
        >
          {HERO.sub}
        </motion.p>

        <motion.div className="mt-11 flex flex-wrap items-center gap-4" {...linha(5)}>
          <Button href={LINKS.contato} variant="cobre" icon="whatsapp">
            Falar com Arthur
          </Button>
          <Button href="#eletrons" variant="ghost" icon="arrow">
            Ver os produtos
          </Button>
        </motion.div>

        <motion.ul
          className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-sea"
          {...linha(6)}
        >
          {HERO.meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </motion.ul>

        {/* A arquitetura, com as marcas reais */}
        <motion.div
          className="mt-20 border-t border-line pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: SPRING }}
        >
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

            <div className="hidden h-px flex-1 bg-line sm:block" />

            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              <div className="flex items-center gap-3.5">
                <MarcaNectarq familia className="h-9 w-9 text-paper" />
                <div className="leading-tight">
                  <p className="text-[15px] font-semibold tracking-tight text-paper">Nectarq</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-sea">
                    atendimento
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <MarcaMaarkio familia className="h-9 w-9 text-paper" />
                <div className="leading-tight">
                  <p className="text-[15px] font-semibold tracking-tight text-paper">Maarkio</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-sea">
                    agendamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

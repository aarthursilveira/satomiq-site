import { motion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { HERO, LINKS } from "../lib/content";
import { Button } from "./ui/Button";
import { RedTeamViz } from "./RedTeamViz";

const SPRING = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] items-center px-5 pt-28 sm:px-8"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Esquerda — conteúdo */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SPRING, delay: 0.2 }}
            className="flex items-center gap-2.5 text-ink/55"
          >
            <span className="diamond opacity-80" />
            <span className="font-mono text-[11px] uppercase tracking-eyebrow">{HERO.eyebrow}</span>
          </motion.div>

          <h1 className="mt-7 font-display text-[12vw] font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
            <Line delay={0.28}>{HERO.line1}</Line>
            <Line delay={0.38}>{HERO.line2}</Line>
            <Line delay={0.48}>
              {HERO.line3a}
              <span className="italic text-accent">{HERO.line3accent}</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: SPRING, delay: 0.7 }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-soft"
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: SPRING, delay: 0.85 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href={LINKS.belaLive} variant="accent" icon="whatsapp">
              Testar a Bela ao vivo
            </Button>
            <Button href="#produto" variant="ghost" icon="arrow">
              Ver como funciona
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: SPRING, delay: 1.05 }}
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/15 pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55"
          >
            {HERO.meta.map((m, i) => (
              <span key={m} className="flex items-center gap-5">
                {i > 0 && <span className="text-ink/25">·</span>}
                {m}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Direita — viz red-team (protagonista) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: SPRING, delay: 0.5 }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md border border-ink/12 bg-paper-2/40 p-3">
            <RedTeamViz />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#manifesto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 sm:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown weight="bold" className="h-3 w-3" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: SPRING, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

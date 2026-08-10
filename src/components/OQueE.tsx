import { O_QUE_E } from "../lib/content";
import { Secao } from "./ui/Secao";
import { Reveal } from "./ui/Reveal";
import { MarcaSAtomiq } from "./Marks";

export function OQueE() {
  return (
    <Secao id="o-que-e" rotulo={O_QUE_E.eyebrow}>
      <Reveal>
        <h2 className="max-w-[18ch] text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper">
          {O_QUE_E.titulo}
        </h2>
        <div className="mt-8 flex max-w-[62ch] flex-col gap-5 text-[1.05rem] leading-relaxed text-mist">
          {O_QUE_E.paragrafos.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
        </div>
      </Reveal>

      {/* A frase que define a empresa ganha peso de citação, não de parágrafo. */}
      <Reveal delay={0.06}>
        <figure className="mt-14 flex flex-col gap-6 border-l-2 border-cobre pl-7 sm:flex-row sm:items-center sm:gap-9">
          <blockquote className="text-balance text-[clamp(1.25rem,2.4vw,1.7rem)] font-medium leading-snug tracking-[-0.02em] text-paper">
            {O_QUE_E.destaque}
          </blockquote>
          <MarcaSAtomiq className="hidden h-20 w-20 shrink-0 text-line sm:block" />
        </figure>
      </Reveal>
    </Secao>
  );
}

import { NUCLEO, NUCLEO_INTRO } from "../lib/content";
import { Secao } from "./ui/Secao";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

export function Nucleo() {
  return (
    <Secao id="nucleo" rotulo={NUCLEO_INTRO.eyebrow} tone="cobre">
      <Reveal>
        <h2 className="max-w-[18ch] text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper">
          {NUCLEO_INTRO.titulo}
        </h2>
        <p className="mt-6 max-w-[62ch] leading-relaxed text-mist">{NUCLEO_INTRO.corpo}</p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
        {NUCLEO.map((c, i) => (
          <RevealItem key={c.n} index={i} className="bg-ink">
            {/* Sem hover: o cartão não é clicável, e o estado que existia
                media 1,11:1 contra o fundo — ninguém enxergava mesmo. */}
            <div className="flex h-full flex-col gap-4 p-7 sm:p-9">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobre">
                {c.n}
              </span>
              <h3 className="text-balance text-[1.3rem] font-semibold leading-tight tracking-[-0.02em] text-paper">
                {c.t}
              </h3>
              <p className="leading-relaxed text-mist">{c.b}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Secao>
  );
}

import { CASE, LINKS } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";

export function CaseTaina() {
  return (
    <section id="caso" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <SectionLabel tone="accent">Caso real · Em produção</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Sistemas funcionando.
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 gap-10 border border-paper/12 p-8 sm:p-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] uppercase tracking-eyebrow text-paper/50">
                {CASE.segment}
              </span>
              <h3 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                {CASE.client}
              </h3>
              <p className="mt-2 font-display text-lg italic text-paper/70">{CASE.tagline}</p>

              <div className="my-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-paper/12 py-6">
                {CASE.meta.map((m) => (
                  <div key={m.k} className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45">
                      {m.k}
                    </span>
                    <span className="font-display text-[15px] text-paper">{m.v}</span>
                  </div>
                ))}
              </div>

              <ul className="flex flex-col gap-3">
                {CASE.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[14px] leading-snug text-paper/85">
                    <span className="diamond mt-1.5 shrink-0 !bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                {CASE.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-paper/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* convite */}
            <div className="lg:col-span-5">
              <div className="flex h-full flex-col gap-4 border border-dashed border-paper/25 bg-paper/[0.03] p-7">
                <SectionLabel tone="paper">Convite</SectionLabel>
                <p className="font-display text-xl leading-snug text-paper">
                  Antes de fechar, mostramos a Bela rodando ao vivo.
                </p>
                <p className="text-[13.5px] leading-relaxed text-paper/70">
                  Você manda mensagem, ela responde. Em 2 minutos você entende se faz
                  sentido para o seu negócio.
                </p>
                <span className="mt-1 font-display text-2xl italic text-paper">
                  {LINKS.belaNumeroDisplay}
                </span>
                <div className="mt-auto pt-2">
                  <Button href={LINKS.belaLive} variant="accent" icon="whatsapp">
                    Falar com a Bela
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

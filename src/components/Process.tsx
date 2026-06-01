import { PROCESS } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

export function Process() {
  return (
    <section id="processo" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel>Como trabalhamos</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Do diagnóstico ao sistema rodando.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-ink/15">
            {PROCESS.map((step) => (
              <Reveal key={step.num}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-ink/15 py-9 sm:gap-10">
                  <span className="font-mono text-[13px] font-medium text-accent">{step.num}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-ink">{step.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

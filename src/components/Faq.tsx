import { Plus } from "@phosphor-icons/react";
import { FAQ } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel>Dúvidas frequentes</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Antes da reunião.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <div className="border-t border-ink/15">
              {FAQ.map((item) => (
                <details key={item.q} className="group border-b border-ink/15 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="font-display text-lg font-medium text-ink sm:text-xl">
                      {item.q}
                    </span>
                    <Plus
                      weight="light"
                      className="h-5 w-5 shrink-0 text-ink/60 transition-transform duration-500 ease-spring group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

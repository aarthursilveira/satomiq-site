import { ArrowRight } from "@phosphor-icons/react";
import { APPS, FLOW, PROMISES } from "../lib/content";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

export function Product() {
  return (
    <section id="produto" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      {/* Header */}
      <div className="max-w-3xl">
        <Reveal>
          <SectionLabel>Atendente Digital SAtomiq</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Não é chatbot. É funcionário digital treinável.
          </h2>
        </Reveal>
      </div>

      {/* Promessas — lista editorial (sem 3-card genérico) */}
      <div className="mt-16 border-t border-ink/15">
        {PROMISES.map((p) => (
          <Reveal key={p.num}>
            <div className="grid grid-cols-1 gap-4 border-b border-ink/15 py-9 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  — {p.num} · {p.kicker}
                </span>
              </div>
              <div className="lg:col-span-9">
                <h3 className="font-display text-2xl font-medium leading-tight text-ink sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Fluxo */}
      <div className="mt-24">
        <Reveal>
          <SectionLabel>Como funciona</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-6 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
            Recebe <Arrow /> Qualifica <Arrow /> Passa o bastão.
          </h3>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-3">
          {FLOW.map((s) => (
            <RevealItem key={s.n} className="bg-paper p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">{s.n}</span>
              <h4 className="mt-5 font-display text-xl font-medium text-ink">{s.title}</h4>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Aplicações — bento assimétrico */}
      <div className="mt-24">
        <Reveal>
          <SectionLabel>Aplicações</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-6 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
            Mesma infraestrutura. Múltiplos fluxos.
          </h3>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12" stagger={0.07}>
          {APPS.map((a, i) => {
            const span =
              i === 0
                ? "lg:col-span-7"
                : i === 1
                  ? "lg:col-span-5"
                  : i === 5
                    ? "lg:col-span-12"
                    : "lg:col-span-4";
            return (
              <RevealItem key={a.num} className={span}>
                <div
                  className={`group h-full border p-7 transition-all duration-500 ease-spring hover:-translate-y-1 ${
                    a.dark
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/15 bg-paper hover:border-ink/35"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                      a.dark ? "text-paper/60" : "text-ink/45"
                    }`}
                  >
                    — {a.num} · {a.label}
                  </span>
                  <h4 className="mt-4 font-display text-xl font-medium leading-tight">{a.title}</h4>
                  <p
                    className={`mt-2.5 max-w-md text-[13.5px] leading-relaxed ${
                      a.dark ? "text-paper/80" : "text-ink-soft"
                    }`}
                  >
                    {a.body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <ArrowRight weight="light" className="mx-1 inline-block h-6 w-6 -translate-y-0.5 text-accent" />
  );
}

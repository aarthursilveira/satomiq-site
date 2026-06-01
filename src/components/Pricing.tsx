import { Check } from "@phosphor-icons/react";
import { PRICING, PRICING_NOTE } from "../lib/content";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";

export function Pricing() {
  return (
    <section id="investimento" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <SectionLabel>Investimento</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Três formatos. Setup grátis em 7 dias.
          </h2>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3" stagger={0.08}>
        {PRICING.map((tier) => (
          <RevealItem key={tier.name} className={tier.featured ? "lg:-mt-4" : ""}>
            <div
              className={`relative flex h-full flex-col border p-8 ${
                tier.featured ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-8 bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
                  {tier.badge}
                </span>
              )}
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.24em] ${
                  tier.featured ? "text-paper/70" : "text-ink/55"
                }`}
              >
                {tier.name}
              </span>

              <div className="mt-6">
                <div className="font-display text-5xl font-medium leading-none tracking-tight">
                  {tier.price}
                  <span
                    className={`ml-1 align-baseline font-mono text-xs uppercase tracking-wider ${
                      tier.featured ? "text-paper/60" : "text-ink/50"
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className={`mt-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
                    tier.featured ? "text-paper/55" : "text-ink/50"
                  }`}
                >
                  {tier.setup}
                </p>
              </div>

              <div className={`my-7 h-px w-full ${tier.featured ? "bg-paper/15" : "bg-ink/15"}`} />

              <ul className="flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug">
                    <Check
                      weight="bold"
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${tier.featured ? "text-accent-soft" : "text-accent"}`}
                    />
                    <span className={tier.featured ? "text-paper/90" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Button
                  href={tier.href}
                  variant={tier.featured ? "paper" : "ghost"}
                  icon="arrow"
                  className="w-full justify-center"
                >
                  {tier.cta}
                </Button>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink/50">
          {PRICING_NOTE}
        </p>
      </Reveal>
    </section>
  );
}

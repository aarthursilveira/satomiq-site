import { LINKS, PRODUCAO } from "../lib/content";
import { Secao } from "./ui/Secao";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { MarcaNectarq } from "./Marks";

/**
 * A prova. Fica no acento do produto (aço), não no cobre: quem está em produção
 * é o Nectarq — a SAtomiq só assina embaixo.
 */
export function Producao() {
  return (
    <Secao id="producao" rotulo={PRODUCAO.eyebrow} tone="aco">
      <Reveal>
        <h2 className="max-w-[22ch] text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper">
          {PRODUCAO.titulo}
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-14 border border-line bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line p-7 sm:p-9">
            <div className="flex items-center gap-4">
              <MarcaNectarq familia className="h-10 w-10 shrink-0 text-paper" />
              <div>
                <h3 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-paper">
                  {PRODUCAO.cliente}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-sea">
                  {PRODUCAO.segmento}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-aco">
              <span className="h-1.5 w-1.5 rounded-full bg-aco" aria-hidden />
              {PRODUCAO.produto} em produção
            </span>
          </div>

          <div className="p-7 sm:p-9">
            <p className="max-w-[52ch] text-balance text-[1.2rem] font-medium leading-snug tracking-[-0.015em] text-paper">
              {PRODUCAO.tagline}
            </p>

            <dl className="mt-9 grid gap-px border border-line bg-line sm:grid-cols-4">
              {PRODUCAO.meta.map((m) => (
                <div key={m.k} className="flex flex-col gap-1.5 bg-surface p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-sea">
                    {m.k}
                  </dt>
                  <dd className="text-[0.95rem] font-medium text-paper">{m.v}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-9 grid gap-x-10 gap-y-3 text-[0.94rem] text-mist sm:grid-cols-2">
              {PRODUCAO.capacidades.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-aco opacity-70" aria-hidden />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-2 border-t border-linesoft pt-7">
              {PRODUCAO.stack.map((s) => (
                <span
                  key={s}
                  className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sea"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-8 flex flex-col gap-6 border border-line p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="max-w-[52ch]">
            <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-paper">
              {PRODUCAO.demoTitulo}
            </h3>
            <p className="mt-3 leading-relaxed text-mist">{PRODUCAO.demoCorpo}</p>
            <p className="mt-4 font-mono text-[12px] tracking-[0.08em] text-sea num">
              {LINKS.belaNumeroDisplay}
            </p>
          </div>
          <Button href={LINKS.belaLive} variant="ghost" icon="whatsapp" className="shrink-0">
            Testar agora
          </Button>
        </div>
      </Reveal>
    </Secao>
  );
}

import { useId, useState } from "react";
import { CONTA } from "../lib/content";
import { useSegmento } from "../lib/segmento";
import type { Segmento } from "../lib/segmentos";
import { ABERTURA } from "../lib/recado";
import { wa } from "../lib/zap";

const reais = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** "Isso foi um dia. Faz a conta de um mês." A conta vai junto pro zap. */
export function Conta() {
  const seg = useSegmento();
  // Trocar de negócio volta pros números típicos dele.
  return <Calculadora key={seg.id} seg={seg} />;
}

function Calculadora({ seg }: { seg: Segmento & { escolhido: boolean } }) {
  const base = useId();
  const [porSemana, setPorSemana] = useState(seg.conta.porSemana);
  const [ticket, setTicket] = useState(seg.conta.ticket);
  const [perda, setPerda] = useState(3);

  const clientes = Math.round(porSemana * 4.33 * (perda / 10));
  const valor = Math.round((clientes * ticket) / 10) * 10;
  const mensagem = CONTA.mensagem({ frase: seg.escolhido ? seg.frase : "", porSemana, ticket: reais(ticket), valor: reais(valor) });

  const campos = [
    { id: "semana", rotulo: CONTA.semana, valor: porSemana, set: setPorSemana, min: 0, max: 100, passo: 1, mostra: String(porSemana) },
    { id: "ticket", rotulo: seg.conta.rotuloTicket, valor: ticket, set: setTicket, min: 10, max: seg.conta.ticketMax, passo: 10, mostra: reais(ticket) },
    { id: "perda", rotulo: CONTA.perda, valor: perda, set: setPerda, min: 0, max: 10, passo: 1, mostra: `${perda} de 10` },
  ];

  return (
    <div className="mx-auto max-w-pagina px-5 pt-20 md:px-8 md:pt-28">
      <div className="grid gap-10 rounded-[1.75rem] bg-panel/70 p-6 ring-1 ring-inset ring-border md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-14 md:p-10">
        <div>
          <h3 className="heroi text-[clamp(2rem,5vw,3.4rem)]" style={{ fontWeight: 850, fontStretch: "94%" }}>
            {CONTA.titulo}
          </h3>
          <div className="mt-8 grid gap-6">
            {campos.map((c) => {
              const id = `${base}-${c.id}`;
              return (
                <div key={c.id} className="grid gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={id} className="text-miudo text-creme">
                      {c.rotulo}
                    </label>
                    <output htmlFor={id} className="num shrink-0 font-mono text-[13px] text-texto">
                      {c.mostra}
                    </output>
                  </div>
                  <input
                    id={id}
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.passo}
                    value={c.valor}
                    onChange={(e) => c.set(Number(e.target.value))}
                    className="faixa w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 border-t border-border pt-8 md:border-l md:border-t-0 md:pl-14 md:pt-0">
          <div aria-live="polite">
            <p className="font-mono text-rotulo uppercase tracking-eyebrow text-dim">{CONTA.antesDoValor}</p>
            <p className="num mt-2 font-flex text-[clamp(3rem,8vw,5.6rem)] font-black leading-[0.9] tracking-[-0.035em] text-latao">
              {reais(valor)}
            </p>
            <p className="mt-3 font-gente text-conector text-creme">{CONTA.depoisDoValor(clientes)}</p>
          </div>
          <div>
            <a href={wa(`${ABERTURA}. ${mensagem}`)} target="_blank" rel="noopener noreferrer" className="btn-cheio">
              {CONTA.cta} <span aria-hidden>↗</span>
            </a>
            <p className="mt-4 max-w-[44ch] font-mono text-[11px] leading-relaxed text-dim">{CONTA.nota}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/*
 * Uma mini-demo por sistema, recriada em DOM. Nada de print genérico: dado de
 * exemplo, mas o fluxo é o do produto. Tudo é CSS em loop; `.pausa-fora` no
 * cartão pausa quando sai da tela. Os keyframes moram em index.css (.mini-*).
 */

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

// ── Maarkio: a agenda do dia enchendo sozinha ─────────────────────────────
const HORARIOS = [
  ["09:00", "Corte + barba", "Rafael"],
  ["10:00", "Luzes", "Camila"],
  ["11:30", "Corte", "Bruno"],
  ["14:00", "Escova", "Júlia"],
  ["15:00", "Barba", "Diego"],
];

const SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** A agenda é sempre a de hoje. O HTML pré-renderizado sai com uma data fixa. */
function useHoje() {
  const [hoje, setHoje] = useState("qui · 02 out");
  useEffect(() => {
    const d = new Date();
    setHoje(`${SEMANA[d.getDay()]} · ${String(d.getDate()).padStart(2, "0")} ${MESES[d.getMonth()]}`);
  }, []);
  return hoje;
}

export function MiniMaarkio() {
  const hoje = useHoje();
  return (
    <div className="w-full max-w-[340px] font-mono text-[11.5px]">
      <div className="mb-3 flex items-center justify-between text-dim">
        <span>{hoje}</span>
        <span className="text-latao">agenda de hoje</span>
      </div>
      <ul className="grid gap-1.5">
        {HORARIOS.map(([h, s, n], i) => (
          <li key={h} className="relative grid h-8 grid-cols-[48px_1fr] items-center rounded-md ring-1 ring-inset ring-border">
            <span className="pl-2.5 text-dim num">{h}</span>
            <span className="text-ghost">livre</span>
            <span
              className="mini-slot absolute inset-0 grid grid-cols-[48px_1fr] items-center rounded-md bg-latao/15 ring-1 ring-inset ring-latao/50"
              style={d(i * 0.9)}
            >
              <span className="pl-2.5 text-latao num">{h}</span>
              <span className="truncate text-creme">
                {s} <span className="text-dim">· {n}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mini-toast mt-3 flex items-center gap-2 rounded-md bg-panel px-3 py-2 text-creme ring-1 ring-inset ring-border">
        <span className="text-oliva">✓</span> lembrete no WhatsApp: amanhã 14:00
      </div>
    </div>
  );
}

// ── Nectarq: áudio chega, vira texto, Bela responde, passa pra equipe ──────
export function MiniNectarq() {
  return (
    <div className="grid w-full max-w-[340px] gap-2 text-[12.5px]">
      <div className="mini-msg max-w-[82%] justify-self-start rounded-2xl rounded-bl-sm bg-panel px-3 py-2.5 ring-1 ring-inset ring-border" style={d(0)}>
        <div className="flex h-5 items-center gap-[3px]">
          <span className="mr-1.5 text-dim">▶</span>
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} className="mini-onda w-[3px] rounded-full bg-creme/70" style={{ height: `${30 + ((i * 47) % 70)}%`, ...d(i * 0.05) }} />
          ))}
          <span className="ml-2 font-mono text-[10px] text-dim">0:14</span>
        </div>
      </div>
      <p className="mini-msg justify-self-start pl-1 font-mono text-[10.5px] text-azul" style={d(0.9)}>
        transcrito: "tem horário sábado cedo pra luzes?"
      </p>
      <div
        className="mini-msg max-w-[82%] justify-self-end rounded-2xl rounded-br-sm bg-latao/15 px-3 py-2.5 text-creme ring-1 ring-inset ring-latao/40"
        style={d(1.8)}
      >
        Tem sim! Sábado cedo ainda tem horário. Escolhe aqui:
        <span className="mt-1.5 block rounded-lg bg-bg/50 px-2.5 py-1.5 font-mono text-[10.5px] text-azul ring-1 ring-inset ring-border">
          teusalao.com.br/agenda ↗
        </span>
      </div>
      {/* Quem marca é o cliente, no link (Maarkio). A Bela cuida da conversa. */}
      <div className="mini-msg justify-self-end" style={d(2.9)}>
        <span className="chip text-oliva ring-oliva/40">✓ marcou sábado 9h pelo link</span>
      </div>
    </div>
  );
}

// ── Gluten: a comanda saindo da térmica ───────────────────────────────────
export function MiniGluten() {
  return (
    <div className="relative w-[230px]">
      <div className="relative z-10 h-3 rounded-full bg-panel ring-1 ring-inset ring-border" />
      <div className="-mt-1.5 overflow-hidden px-3">
        <div className="mini-comanda rounded-b-sm bg-texto px-4 pb-4 pt-5 font-mono text-[11px] leading-[1.7] text-bg">
          <div className="text-center font-semibold">PEDIDO #0142</div>
          <div className="text-center text-[10px] opacity-60">delivery · 19:42</div>
          <div className="my-2 border-t border-dashed border-bg/40" />
          <div className="flex justify-between"><span>1x Calabresa G</span><span className="num">54,90</span></div>
          <div className="flex justify-between"><span>1x Borda catupiry</span><span className="num">9,00</span></div>
          <div className="flex justify-between"><span>1x Guaraná 2L</span><span className="num">12,00</span></div>
          <div className="my-2 border-t border-dashed border-bg/40" />
          <div className="flex justify-between font-semibold"><span>TOTAL</span><span className="num">75,90</span></div>
          <div className="mt-1 font-semibold" style={{ color: "rgb(110 115 57)" /* paper.escuro.oliva do theme.ts */ }}>PIX ✓ recebido</div>
        </div>
      </div>
    </div>
  );
}

// ── Outreach: investigador → analista → dossiê com nota ──────────────────
export function MiniOutreach() {
  return (
    <div className="w-full max-w-[340px] font-mono text-[11px]">
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-6 top-1/2 h-px bg-border" />
        <span className="mini-bolinha absolute left-6 top-1/2 -mt-1 h-2 w-2 rounded-full bg-latao" />
        {["investigador", "analista", "dossiê"].map((n) => (
          <span key={n} className="relative z-10 rounded-md bg-panel px-2.5 py-1.5 text-creme ring-1 ring-inset ring-border">
            {n}
          </span>
        ))}
      </div>
      <div className="mt-6 rounded-lg bg-panel p-3.5 ring-1 ring-inset ring-border">
        <div className="flex justify-between text-dim">
          <span>Clínica exemplo · CNPJ ok</span>
          <span className="mini-nota text-latao">nota 78</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="mini-barra h-full origin-left rounded-full bg-latao" style={{ width: "78%" }} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="chip">site sem agenda</span>
          <span className="chip">WhatsApp ativo</span>
          <span className="mini-juiz chip text-oliva ring-oliva/40">juiz ✓</span>
        </div>
      </div>
    </div>
  );
}

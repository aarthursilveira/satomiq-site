import { Pizza, Scissors, Sparkle, Storefront } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { ORDEM, SEGMENTOS } from "../lib/segmentos";
import type { SegmentoId } from "../lib/segmentos";
import { escolhe, useSegmento } from "../lib/segmento";
import { rolaPara } from "../lib/rolagem";

const ICONE: Record<SegmentoId, Icon> = {
  salao: Scissors,
  clinica: Sparkle,
  delivery: Pizza,
  outro: Storefront,
};

/**
 * "Qual é o teu negócio?" A escolha reescreve a página inteira (o dia, a
 * demo, a conta, o recado). No hero ela também leva a pessoa pro dia.
 */
export function Escolha({ variante, rotulo, irPara }: { variante: "grande" | "compacta"; rotulo?: string; irPara?: string }) {
  const seg = useSegmento();

  const toca = (id: SegmentoId) => {
    escolhe(id);
    if (!irPara) return;
    const alvo = document.querySelector<HTMLElement>(irPara);
    // Espera o React redesenhar o dia antes de medir onde ele está.
    if (alvo) requestAnimationFrame(() => requestAnimationFrame(() => rolaPara(alvo, 0)));
  };

  if (variante === "compacta")
    return (
      <div role="group" aria-label={rotulo ?? "Trocar o tipo de negócio"} className="trilho -mx-1 flex gap-1.5 overflow-x-auto px-1 py-1">
        {ORDEM.map((id) => {
          const Ic = ICONE[id];
          const ativo = seg.id === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={ativo}
              onClick={() => toca(id)}
              className={`chip shrink-0 gap-1.5 px-3 py-1.5 text-[11.5px] transition-colors duration-200 hover:text-texto active:scale-[0.97] ${
                ativo ? "bg-latao/[0.12] text-latao ring-latao/60" : "bg-bg/40"
              }`}
            >
              <Ic weight={ativo ? "fill" : "regular"} className="h-3.5 w-3.5" />
              {SEGMENTOS[id].curto}
            </button>
          );
        })}
      </div>
    );

  return (
    <div>
      <p className="font-gente text-conector text-creme">{rotulo}</p>
      <div role="group" aria-label={rotulo} className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
        {ORDEM.map((id) => {
          const Ic = ICONE[id];
          const ativo = seg.escolhido && seg.id === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={ativo}
              onClick={() => toca(id)}
              className={`group relative flex min-h-[92px] flex-col justify-between rounded-2xl p-4 text-left ring-1 ring-inset transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] ${
                ativo ? "bg-realce ring-latao/70" : "bg-panel ring-border hover:bg-realce-leve hover:ring-latao/40"
              }`}
            >
              <Ic weight={ativo ? "fill" : "duotone"} className={`h-6 w-6 ${ativo ? "text-latao" : "text-creme group-hover:text-latao"}`} />
              <span className="mt-3 font-mono text-[12.5px] leading-tight text-texto">{SEGMENTOS[id].nome}</span>
              <span aria-hidden className="absolute right-4 top-4 font-mono text-[12px] text-dim transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-latao">
                ↓
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

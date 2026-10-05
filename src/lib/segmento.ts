import { useSyncExternalStore } from "react";
import { SEGMENTOS } from "./segmentos";
import type { Segmento, SegmentoId } from "./segmentos";

// ──────────────────────────────────────────────────────────────
// Qual negócio a pessoa escolheu. Antes da escolha a página conta o dia
// de um salão (`escolhido: false`), e o recado não fala de segmento.
// Fica guardado na sessão: recarregar não desfaz a escolha.
// ──────────────────────────────────────────────────────────────

type Estado = { id: SegmentoId; escolhido: boolean };

const CHAVE = "satomiq-segmento";
const INICIAL: Estado = { id: "salao", escolhido: false };

let estado: Estado = INICIAL;
let lido = false;
const ouvintes = new Set<() => void>();
const avisa = () => ouvintes.forEach((f) => f());

export function escolhe(id: SegmentoId) {
  estado = { id, escolhido: true };
  try {
    sessionStorage.setItem(CHAVE, id);
  } catch {}
  avisa();
}

const assina = (f: () => void) => {
  ouvintes.add(f);
  // A sessão só é lida depois de hidratar: o HTML do servidor sempre sai com o salão.
  if (!lido) {
    lido = true;
    queueMicrotask(() => {
      try {
        const salvo = sessionStorage.getItem(CHAVE) as SegmentoId | null;
        if (salvo && salvo in SEGMENTOS && salvo !== estado.id) {
          estado = { id: salvo, escolhido: true };
          avisa();
        }
      } catch {}
    });
  }
  return () => ouvintes.delete(f);
};

const agora = () => estado;
const noServidor = () => INICIAL;

export function useSegmento(): Segmento & { escolhido: boolean } {
  const e = useSyncExternalStore(assina, agora, noServidor);
  return { ...SEGMENTOS[e.id], escolhido: e.escolhido };
}

import { useEffect, useSyncExternalStore } from "react";
import type { RefObject } from "react";
import { wa } from "./zap";
import { useSegmento } from "./segmento";

// ──────────────────────────────────────────────────────────────
// O recado que a pessoa está escrevendo. Um só pra página toda: o que ela
// digitou no hero continua lá no BORA?, e qualquer botão de zap leva junto.
// ──────────────────────────────────────────────────────────────

export const ABERTURA = "Fala Arthur, vim pelo satomiq.com";

let texto = "";
const ouvintes = new Set<() => void>();

export function setRecado(novo: string) {
  if (novo === texto) return;
  texto = novo;
  ouvintes.forEach((f) => f());
}

const assina = (f: () => void) => {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
};
const agora = () => texto;
// No HTML pré-renderizado o recado é sempre vazio.
const noServidor = () => "";

export const useRecado = () => useSyncExternalStore(assina, agora, noServidor);

/**
 * Link do zap com o recado. Leva o tipo de negócio se a pessoa escolheu um
 * ("Tenho um salão."), e o que ela escreveu, se escreveu.
 */
export const linkDoRecado = (t: string, frase = "") => {
  const texto = t.trim();
  if (!texto && !frase) return wa(ABERTURA);
  return wa(`${ABERTURA}.${frase ? ` ${frase}` : ""}${texto ? `\n\n${texto}` : ""}`);
};

export function useLinkDoRecado() {
  const t = useRecado();
  const seg = useSegmento();
  return linkDoRecado(t, seg.escolhido ? seg.frase : "");
}

/**
 * Quanto mais a pessoa conta, mais a palavra pesa. Vira `--impulso` no
 * elemento (até +360 de peso), que o Peso soma no de cada letra.
 */
export function useImpulso(ref: RefObject<HTMLElement>) {
  const t = useRecado();
  useEffect(() => {
    ref.current?.style.setProperty("--impulso", String(Math.round(Math.min(t.trim().length, 140) * 2.6)));
  }, [t, ref]);
}

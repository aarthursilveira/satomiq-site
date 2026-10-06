import { useSyncExternalStore } from "react";
import { ABERTURA, RECADO } from "./conteudo";
import { wa } from "./zap";

// ──────────────────────────────────────────────────────────────
// O recado que a pessoa está escrevendo. Um só pra página toda: o que ela
// escreveu no meio da página continua valendo, e todo botão de zap (o do
// topo, a barra do celular, o do fim) leva junto.
// ──────────────────────────────────────────────────────────────

type Estado = { texto: string; negocio: string | null };

let estado: Estado = { texto: "", negocio: null };
const ouvintes = new Set<() => void>();
const avisa = () => ouvintes.forEach((f) => f());

export function setTexto(texto: string) {
  if (texto === estado.texto) return;
  estado = { ...estado, texto };
  avisa();
}

export function setNegocio(negocio: string | null) {
  estado = { ...estado, negocio };
  avisa();
}

const assina = (f: () => void) => {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
};
const agora = () => estado;
// No HTML pré-renderizado o recado é sempre vazio.
const VAZIO: Estado = { texto: "", negocio: null };
const noServidor = () => VAZIO;

export const useRecado = () => useSyncExternalStore(assina, agora, noServidor);

/** A mensagem inteira, do jeito que chega no WhatsApp do Arthur. */
export function mensagem(e: Estado, extra = "") {
  const frase = RECADO.negocios.find((n) => n.id === e.negocio)?.frase ?? "";
  const partes = [ABERTURA, frase, extra].filter(Boolean).join(" ");
  const texto = e.texto.trim();
  return texto ? `${partes}\n\n${texto}` : partes;
}

/** Link do zap com o recado. `extra` é o assunto do botão (ex.: "Quero uma Bela."). */
export function useLinkDoRecado(extra = "") {
  return wa(mensagem(useRecado(), extra));
}

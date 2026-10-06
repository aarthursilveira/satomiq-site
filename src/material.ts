// ──────────────────────────────────────────────────────────────
// Material que só o Arthur tem. Enquanto um campo estiver `null` (ou vazio),
// o site no ar se vira sem ele: a parte encolhe ou some, nunca mostra buraco
// nem número inventado. Com ?rascunho na URL (ou em `npm run dev`) cada
// lacuna aparece como uma caixa tracejada dizendo o que falta.
//
// `npm run build` lista o que ainda está pendente. A lista explicada, com
// formato e tamanho de cada coisa, está em MATERIAL.md.
// ──────────────────────────────────────────────────────────────

export type Numero = { valor: string; legenda: string };
export type Depoimento = { texto: string; quem: string; negocio: string };

export const MATERIAL = {
  arthur: {
    /**
     * Vídeo 4:3, 40 a 60s. Arquivo em public/arthur/, ex.:
     * { src: "/arthur/apresentacao.mp4", poster: "/arthur/capa.jpg" }.
     * Se vier em pé, `proporcao: "3/4"`. `legenda` é um .vtt, opcional.
     */
    video: null as null | { src: string; poster: string; proporcao?: "4/3" | "3/4"; legenda?: string },
    /** Retrato 4:3, usado quando não tem vídeo. Ex.: "/arthur/retrato.jpg". */
    foto: null as null | string,
  },
  /** Até 3 números reais por produto. Ex.: { valor: "412", legenda: "agendamentos pelo link em setembro" }. */
  maarkio: { numeros: [] as Numero[], depoimento: null as Depoimento | null },
  bela: { numeros: [] as Numero[], depoimento: null as Depoimento | null },
  /** O preço do Maarkio já é público (R$ 97/mês). Ex.: { bela: "a partir de R$ 297/mês", landing: "a partir de R$ 900" }. */
  preco: { bela: null as null | string, landing: null as null | string },
  /** Ex.: "de 3 a 10 dias, dependendo do tamanho". */
  prazo: null as null | string,
  /** Resposta pra "tem fidelidade?". */
  contrato: null as null | string,
  /** Se existir. Ex.: "Se em 30 dias não fizer diferença, devolvo o valor." */
  garantia: null as null | string,
};

export function pendencias(): string[] {
  const m = MATERIAL;
  const p: string[] = [];
  if (!m.arthur.video) p.push("vídeo do Arthur, 4:3 (public/arthur/apresentacao.mp4 + capa)");
  if (!m.arthur.foto) p.push("retrato do Arthur, 4:3 (public/arthur/retrato.jpg)");
  for (const nome of ["maarkio", "bela"] as const) {
    if (!m[nome].numeros.length) p.push(`números reais do ${nome}`);
    if (!m[nome].depoimento) p.push(`depoimento de quem usa o ${nome}`);
  }
  if (!m.preco.bela) p.push("preço da Bela");
  if (!m.preco.landing) p.push("preço da landing page");
  if (!m.prazo) p.push("prazo típico, do sim ao ar");
  if (!m.contrato) p.push("fidelidade / aviso pra sair");
  if (!m.garantia) p.push("garantia (se houver)");
  return p;
}

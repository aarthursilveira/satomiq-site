// ──────────────────────────────────────────────────────────────
// Material que só o Arthur tem. Enquanto um campo estiver `null` (ou vazio),
// o site no ar se vira sem ele: a seção encolhe ou some, nunca mostra
// buraco nem número inventado. Em desenvolvimento (ou com ?rascunho na URL)
// cada lacuna aparece como uma caixa tracejada dizendo o que falta.
//
// `npm run build` lista o que ainda está pendente.
// ──────────────────────────────────────────────────────────────

export type Numero = { valor: string; legenda: string };
export type Depoimento = { texto: string; quem: string; negocio: string };

export const MATERIAL = {
  arthur: {
    /**
     * Vídeo 4:3 (a identidade do @arthursilveira.ai), 40–60s. Arquivo em
     * public/arthur/, ex.: { src: "/arthur/apresentacao.mp4", poster: "/arthur/capa.jpg" }.
     * Se vier em pé, `proporcao: "3/4"`.
     */
    video: null as null | { src: string; poster: string; proporcao?: "4/3" | "3/4"; legenda?: string },
    /** Retrato 4:3, usado quando não tem vídeo. Ex.: "/arthur/retrato.jpg". */
    foto: null as null | string,
  },
  casos: {
    /** Até 3 números reais por caso. Ex.: { valor: "412", legenda: "agendamentos pelo link em setembro" }. */
    maarkio: { numeros: [] as Numero[], depoimento: null as Depoimento | null },
    nectarq: { numeros: [] as Numero[], depoimento: null as Depoimento | null },
  },
  /** Ex.: { aPartirDe: "R$ 1.500", como: "pra construir, e R$ 300/mês pra manter rodando" }. */
  preco: null as null | { aPartirDe: string; como: string },
  /** Ex.: "de 1 a 3 semanas, dependendo do tamanho". */
  prazo: null as null | string,
  /** Resposta pra "tem mensalidade? fidelidade?". */
  contrato: null as null | string,
  /** Se existir. Ex.: "Se em 30 dias não fizer diferença, devolvo o valor da construção." */
  garantia: null as null | string,
};

export function pendencias(): string[] {
  const m = MATERIAL;
  const p: string[] = [];
  if (!m.arthur.video) p.push("vídeo do Arthur, 4:3 (public/arthur/apresentacao.mp4 + capa)");
  if (!m.arthur.foto) p.push("retrato do Arthur, 4:3 (public/arthur/retrato.jpg)");
  for (const [nome, c] of Object.entries(m.casos)) {
    if (!c.numeros.length) p.push(`números reais do caso ${nome}`);
    if (!c.depoimento) p.push(`depoimento do caso ${nome}`);
  }
  if (!m.preco) p.push("preço (a partir de quanto)");
  if (!m.prazo) p.push("prazo típico de entrega");
  if (!m.contrato) p.push("mensalidade / fidelidade");
  if (!m.garantia) p.push("garantia (se houver)");
  return p;
}

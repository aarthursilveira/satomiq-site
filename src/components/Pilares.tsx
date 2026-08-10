import { PILARES, PILARES_INTRO, type Pilar } from "../lib/content";
import { Secao } from "./ui/Secao";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Eficiencia, Automacao, Inovacao } from "./Solidos";

/**
 * O capítulo visual da página. Os sólidos não são ilustração colada: em
 * projeção isométrica, o losango da marca é a face de cima de um cubo — então
 * as figuras são o próprio símbolo em volume.
 *
 * Composições de propósito diferentes entre si (rampa, circuito, fila): três
 * variações do mesmo arranjo leriam como a mesma figura repetida.
 *
 * As colunas são `bg-ink` DENTRO de uma faixa `bg-surface`. Não é gosto: a tese
 * de cada pilar é cobre, e cobre sobre surface dá 4,47:1 — reprova AA por três
 * centésimos. Sobre ink dá 4,97:1. Cartão recuado em vez de cartão elevado
 * resolve o contraste e ainda dá à faixa o único tratamento diferente da página.
 */
const FIGURA = { eficiencia: Eficiencia, automacao: Automacao, inovacao: Inovacao };

function Coluna({ p }: { p: Pilar }) {
  const Figura = FIGURA[p.chave];
  return (
    <div className="flex h-full flex-col gap-7 px-6 py-10 sm:px-8 sm:py-12">
      {/* `aspect-[4/3]` e não altura fixa: é exatamente a proporção do quadro
          compartilhado dos sólidos, então a figura preenche a caixa em qualquer
          largura de coluna. Com altura fixa sobrava faixa morta — e quanto,
          dependia da largura da tela. */}
      <div className="aspect-[4/3] w-full">
        <Figura className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-cartao font-semibold text-paper">{p.nome}</h3>
        <p className="text-balance text-tese font-medium text-cobre">{p.tese}</p>
        <p className="text-corpo text-mist">{p.corpo}</p>
      </div>
      <p className="mt-auto border-t border-linesoft pt-5 font-mono text-rotulo text-sea">
        {p.legenda}
      </p>
    </div>
  );
}

export function Pilares() {
  return (
    // rótulo em `sea` e não em cobre: cobre sobre surface dá 4,47:1 e este
    // rótulo é mono de 11px. O cobre da faixa vive dentro dos cartões, que são
    // ink — lá ele dá 4,97:1.
    <Secao id="pilares" rotulo={PILARES_INTRO.eyebrow} regua={false} className="bg-surface">
      <Reveal>
        <h2 className="max-w-[16ch] text-balance text-secao font-semibold text-paper">
          {PILARES_INTRO.titulo}
        </h2>
        <p className="mt-6 max-w-[58ch] text-corpo text-mist">{PILARES_INTRO.corpo}</p>
      </Reveal>

      <RevealGroup className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3" stagger={0.12}>
        {PILARES.map((p, i) => (
          <RevealItem key={p.chave} index={i} className="bg-ink">
            <Coluna p={p} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Secao>
  );
}

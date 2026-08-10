import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

/**
 * Layout de seção em folha de especificação: rótulo numa coluna estreita à
 * esquerda, conteúdo numa coluna larga. É a forma dos documentos que a casa
 * produz — a página lê como o produto dela.
 *
 * TODA seção passa por aqui. Antes, Pilares e Contato montavam o próprio
 * cabeçalho com o rótulo em cima do título: a página alternava duas gramáticas
 * sem que a alternância significasse coisa nenhuma.
 *
 * `regua={false}` para quando o fundo já muda de valor — risco mais troca de
 * chão é dizer a mesma coisa duas vezes.
 *
 * `scroll-mt-20` (80px) casa com o offset que o Lenis usa no scrollTo. Eram 96
 * e 80: sem JS a âncora parava num lugar, com JS noutro.
 */
export function Secao({
  id,
  rotulo,
  tone = "sea",
  regua = true,
  children,
  className = "",
}: {
  id?: string;
  rotulo: string;
  tone?: "sea" | "cobre" | "aco" | "latao";
  regua?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 ${regua ? "border-t border-linesoft" : ""} ${className}`}
    >
      <div className="mx-auto grid max-w-[1180px] gap-x-12 gap-y-10 lg:grid-cols-[160px_minmax(0,1fr)]">
        {/* O rótulo acompanha a leitura da seção em vez de sumir no topo dela.
            `self-start` é obrigatório: item de grid estica por padrão, e um
            item esticado não gruda. */}
        <div className="lg:sticky lg:top-24 lg:self-start lg:pt-1.5">
          <SectionLabel tone={tone}>{rotulo}</SectionLabel>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

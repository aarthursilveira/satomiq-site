import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

/**
 * Layout de seção em folha de especificação: rótulo numa coluna estreita à
 * esquerda, conteúdo numa coluna larga. É a forma dos documentos que a casa
 * produz — a página lê como o produto dela.
 */
export function Secao({
  id,
  rotulo,
  tone = "sea",
  children,
  className = "",
}: {
  id?: string;
  rotulo: string;
  tone?: "sea" | "cobre" | "aco" | "latao";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-line px-5 py-24 sm:px-8 sm:py-32 ${className}`}>
      <div className="mx-auto grid max-w-[1180px] gap-x-12 gap-y-10 lg:grid-cols-[160px_minmax(0,1fr)]">
        <div className="lg:pt-1.5">
          <SectionLabel tone={tone}>{rotulo}</SectionLabel>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

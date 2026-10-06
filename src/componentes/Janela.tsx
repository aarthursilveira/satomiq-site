import { useState } from "react";
import type { ReactNode } from "react";

export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

/**
 * Janela retrô, a mesma das janelas da landing do Maarkio: barra de título
 * preta com caixa e listras, corpo com borda dupla e sombra dura.
 *
 * As do topo são arrastáveis (GSAP Draggable, ligado em movimento.ts pelo
 * atributo data-arrasta) e recolhem como o WindowShade do Mac clássico, no
 * clique da caixa ou com dois cliques na barra.
 */
export function Janela({
  titulo,
  className,
  arrasta,
  rotulo,
  children,
}: {
  titulo: string;
  className?: string;
  arrasta?: boolean;
  rotulo?: string;
  children: ReactNode;
}) {
  const [recolhida, setRecolhida] = useState(false);
  return (
    <article
      className={cx("janela", !arrasta && "janela-fixa", className, recolhida && "recolhida")}
      data-arrasta={arrasta ? "" : undefined}
      aria-label={rotulo}
    >
      <header className="janela-barra" onDoubleClick={arrasta ? () => setRecolhida((r) => !r) : undefined}>
        {arrasta ? (
          <button
            type="button"
            className="janela-caixa"
            aria-label={recolhida ? "Abrir janela" : "Recolher janela"}
            aria-expanded={!recolhida}
            onClick={(e) => {
              e.stopPropagation();
              setRecolhida((r) => !r);
            }}
          />
        ) : (
          <span className="janela-caixa" aria-hidden="true" />
        )}
        <span className="janela-titulo">{titulo}</span>
        <span className="janela-listras" aria-hidden="true" />
      </header>
      <div className="janela-corpo">
        <div className="janela-miolo">
          <div className="janela-conteudo">{children}</div>
        </div>
      </div>
    </article>
  );
}

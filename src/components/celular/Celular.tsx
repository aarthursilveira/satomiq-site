import type { ReactNode } from "react";

/**
 * Um celular desenhado em CSS. Nada de print: o que aparece na tela é DOM de
 * verdade, então fica nítido em qualquer densidade e muda com o segmento.
 */
export function Celular({
  hora,
  children,
  className = "",
  rotulo,
}: {
  hora: ReactNode;
  children: ReactNode;
  className?: string;
  /** Descrição pra leitor de tela (o conteúdo da tela é ilustração). */
  rotulo?: string;
}) {
  return (
    <div
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      className={`relative rounded-[2.6rem] bg-aparelho p-[7px] shadow-[0_2px_0_rgb(255_255_255/0.04)_inset,0_40px_80px_-30px_rgb(0_0_0/0.85),0_12px_24px_-12px_rgb(0_0_0/0.6)] ring-1 ring-moldura ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[2.15rem] bg-terminal" aria-hidden={rotulo ? true : undefined}>
        {/* barra de status + ilha */}
        <div className="absolute inset-x-0 top-0 z-30 flex h-10 items-center justify-between px-7 font-mono text-[11px] font-medium text-texto">
          <span className="num">{hora}</span>
          <span className="flex items-center gap-1.5">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-[1px] bg-texto" style={{ height: h }} />
              ))}
            </span>
            <span className="relative h-[10px] w-[20px] rounded-[3px] ring-1 ring-texto/70">
              <span className="absolute inset-[1.5px] right-[5px] rounded-[1px] bg-texto" />
            </span>
          </span>
        </div>
        <div className="absolute left-1/2 top-[9px] z-40 h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-ilha" />
        <div className="absolute inset-0 pt-10">{children}</div>
      </div>
    </div>
  );
}

import { LINKS, NAV, RODAPE } from "../lib/content";
import type { Rota } from "../App";
import { Logo } from "./Logo";

export function Footer({ rota }: { rota: Rota }) {
  const outra = rota === "inicio" ? NAV.irBastidores : NAV.irInicio;
  return (
    <footer className="border-t border-border px-5 pb-28 pt-10 md:px-8 md:pb-10">
      <div className="mx-auto flex max-w-pagina flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          <Logo className="h-[20px]" />
          <span className="font-serif text-lg italic text-creme">{RODAPE.assinatura}</span>
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-dim">
          <a href={outra.href} className="transition-colors hover:text-latao">
            {outra.label}
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-latao">
            {LINKS.instagramHandle}
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-latao">
            github
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-pagina font-mono text-[11px] text-dim">
        {RODAPE.feito} © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

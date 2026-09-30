import { RODAPE } from "../lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-pagina flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <Logo className="h-[20px]" />
          <span className="font-serif text-lg italic text-creme">{RODAPE.assinatura}</span>
        </div>
        <p className="max-w-[46ch] font-mono text-[11px] text-dim md:text-right">
          {RODAPE.feito} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

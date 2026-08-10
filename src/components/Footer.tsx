import { LINKS, NAV, RODAPE } from "../lib/content";
import { Logo } from "./Logo";

/**
 * Sem régua no topo: o rodapé já troca o chão para `surface`. Risco mais troca
 * de valor é a mesma separação dita duas vezes.
 */
export function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-[36ch] text-miudo text-sea">{RODAPE.linha}</p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-rotulo uppercase tracking-eyebrow text-sea transition-colors hover:text-paper"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-linesoft pt-8 font-mono text-rotulo uppercase tracking-eyebrow text-sea sm:flex-row sm:items-center sm:justify-between">
          <span className="num">
            © {new Date().getFullYear()} SAtomiq — Arthur Silveira · {RODAPE.produtos}
          </span>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-paper"
          >
            {LINKS.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}

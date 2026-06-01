import { LINKS, NAV } from "../lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-12 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo tone="paper" />

        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/55 transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/40 sm:items-end">
          <span>© {new Date().getFullYear()} SAtomiq — Arthur Silveira</span>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
            {LINKS.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}

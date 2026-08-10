import { useEffect, useState } from "react";
import { LINKS, NAV } from "../lib/content";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";

/**
 * Sem framer-motion. O menu fica sempre montado e alterna por CSS — assim ele
 * também existe no HTML pré-renderizado, em vez de aparecer só depois do JS.
 */
export function Nav() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  // Esc fecha o menu — teclado não pode ficar preso dentro dele.
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <nav
        className={`mt-4 flex w-full max-w-[1180px] items-center justify-between px-5 py-3 transition-all duration-500 ease-spring ${
          rolou ? "bg-ink/85 ring-1 ring-line backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a href="#topo" aria-label="SAtomiq — início">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.14em] text-sea transition-colors hover:text-paper"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-cobre transition-all duration-500 ease-spring group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href={LINKS.contato} variant="primary" icon="arrow">
            Falar com Arthur
          </Button>
        </div>

        <button
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-[1.5px] w-6 bg-paper transition-all duration-500 ease-spring ${
                aberto ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-[1.5px] w-6 bg-paper transition-all duration-500 ease-spring ${
                aberto ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* `visibility` (não só opacity) para o menu fechado sair da ordem de
          tabulação — senão o teclado navega dentro de um painel invisível.
          Transicionar visibility junto preserva o fade de saída. */}
      <div
        id="menu-mobile"
        aria-hidden={!aberto}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-ink/95 backdrop-blur-xl transition-[opacity,visibility] duration-500 ease-spring md:hidden ${
          aberto ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setAberto(false)}
            className="text-3xl font-semibold tracking-tight text-paper"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contato"
          onClick={() => setAberto(false)}
          className="text-3xl font-semibold tracking-tight text-paper"
        >
          Contato
        </a>
        <div className="mt-4">
          <Button href={LINKS.contato} variant="primary">
            Falar com Arthur
          </Button>
        </div>
      </div>
    </header>
  );
}

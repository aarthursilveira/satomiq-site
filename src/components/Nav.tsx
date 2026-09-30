import { useEffect, useState } from "react";
import { LINKS, NAV } from "../lib/content";
import { Logo } from "./Logo";

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
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3">
      <nav
        className={`mt-3 flex w-full max-w-pagina items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 transition-all duration-500 ${
          rolou ? "bg-bg/80 ring-1 ring-inset ring-border backdrop-blur-md" : ""
        }`}
      >
        <a href="#topo" aria-label="SAtomiq, voltar ao topo">
          <Logo className="h-[22px]" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="font-mono text-miudo text-dim transition-colors hover:text-latao">
              {item.label}
            </a>
          ))}
        </div>

        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-vazio hidden py-3 md:inline-flex">
          chamar no zap
        </a>

        <button
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-[1.5px] w-6 bg-texto transition-all duration-500 ${
                aberto ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-[1.5px] w-6 bg-texto transition-all duration-500 ${
                aberto ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="menu-mobile"
        aria-hidden={!aberto}
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-bg/95 px-8 backdrop-blur-xl transition-[opacity,visibility] duration-500 md:hidden ${
          aberto ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setAberto(false)}
            className="heroi text-6xl"
            style={{ fontWeight: 900, fontStretch: "115%" }}
          >
            {item.label}
          </a>
        ))}
        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-cheio mt-8 self-start">
          chamar no zap
        </a>
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";
import { RECADO } from "../lib/content";
import { useLinkDoRecado, useRecado } from "../lib/recado";

/**
 * O zap à mão no celular. No celular o botão da barra fica escondido atrás do
 * menu, e a página é longa. Aparece depois do topo e some:
 *  - no topo e no BORA?, que já têm o próprio botão;
 *  - nas partes imersivas marcadas com data-sem-flutuante (o dia de 24h, a
 *    demo), onde ele cobriria a régua de horas e o campo de mensagem.
 * Leva o que a pessoa já escreveu.
 */
export function ZapFlutuante() {
  const texto = useRecado();
  const href = useLinkDoRecado();
  const [mostra, setMostra] = useState(false);

  useEffect(() => {
    let raf = 0;
    const confere = () => {
      raf = 0;
      const h = window.innerHeight;
      // As zonas mudam (o dia troca de modo, a demo troca de negócio): busca a cada vez.
      const zonas = document.querySelectorAll<HTMLElement>("#topo, #contato, [data-sem-flutuante]");
      const naFrente = Array.from(zonas).some((z) => {
        const r = z.getBoundingClientRect();
        return r.top < h * 0.9 && r.bottom > h * 0.1;
      });
      setMostra(!naFrente);
    };
    const agenda = () => {
      if (!raf) raf = requestAnimationFrame(confere);
    };
    confere();
    window.addEventListener("scroll", agenda, { passive: true });
    window.addEventListener("resize", agenda);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", agenda);
      window.removeEventListener("resize", agenda);
    };
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!mostra}
      tabIndex={mostra ? undefined : -1}
      className={`btn-cheio fixed right-4 z-40 py-3.5 shadow-[0_18px_40px_-14px_rgb(0_0_0/0.9)] lg:hidden ${
        mostra ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[160%] opacity-0"
      }`}
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        transition: "transform .5s var(--mola), opacity .3s, background-color .25s",
      }}
    >
      <span className="ponto-vivo bg-bg" aria-hidden />
      {texto.trim() ? RECADO.enviar : RECADO.vazio} <span aria-hidden>↗</span>
    </a>
  );
}

import { useRef } from "react";
import { CONTATO, LINKS } from "../lib/content";
import { Peso } from "../lab/Peso";
import { Reveal } from "./ui/Reveal";

export function Contato() {
  const area = useRef<HTMLElement>(null);
  return (
    <section id="contato" ref={area} className="relative mt-40 overflow-hidden border-t border-border px-5 pb-16 pt-20 md:px-8">
      <div className="mx-auto max-w-pagina">
        {/* Largo demais pra caber: o convite estoura a página de propósito. */}
        <h2 className="-mx-[0.06em] leading-[0.8]">
          <Peso
            texto={CONTATO.heroi}
            area={area}
            raio={340}
            peso={[400, 1000]}
            largura={[100, 151]}
            className="text-[clamp(5rem,25vw,24rem)]"
          />
        </h2>
        <Reveal className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="max-w-[48ch] font-gente text-conector text-creme">{CONTATO.corpo}</p>
          <div className="flex flex-wrap gap-3">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-cheio">
              {CONTATO.cta} <span aria-hidden>↗</span>
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="btn-vazio">
              {LINKS.instagramHandle}
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-vazio">
              github
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

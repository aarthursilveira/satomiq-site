import { useRef } from "react";
import { CONTATO, LINKS } from "../lib/content";
import { useImpulso } from "../lib/recado";
import { Peso } from "../lab/Peso";
import { Recado } from "./Recado";
import { Reveal } from "./ui/Reveal";

export function Contato() {
  const area = useRef<HTMLElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  useImpulso(titulo);
  return (
    <section id="contato" ref={area} className="relative mt-24 overflow-hidden border-t border-border px-5 pb-16 pt-20 md:mt-40 md:px-8">
      <div className="mx-auto max-w-pagina">
        {/* Largo demais pra caber: o convite estoura a página de propósito. */}
        <h2 ref={titulo} className="impulso -mx-[0.06em] leading-[0.8]">
          <Peso
            texto={CONTATO.heroi}
            area={area}
            raio={340}
            peso={[400, 1000]}
            largura={[100, 151]}
            className="text-[clamp(5rem,25vw,24rem)]"
          />
        </h2>
        {/* Mesma ordem do hero: no celular texto, recado, links; no desktop o recado à direita. */}
        <Reveal className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-x-12 md:gap-y-6">
          <p className="max-w-[48ch] self-end font-gente text-conector text-creme md:col-start-1 md:row-start-1">{CONTATO.corpo}</p>
          <Recado id="recado-fim" className="md:col-start-2 md:row-span-2 md:row-start-1 md:self-end" />
          {/* Instagram e GitHub saem da fila de botões: aqui o único caminho
              cheio é o zap. Quem quer bastidor acha do mesmo jeito. */}
          <p className="self-start font-mono text-miudo text-dim md:col-start-1 md:row-start-2">
            {CONTATO.outros}{" "}
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-creme underline decoration-border underline-offset-4 hover:text-latao">
              {LINKS.instagramHandle}
            </a>{" "}
            e no{" "}
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-creme underline decoration-border underline-offset-4 hover:text-latao">
              github
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

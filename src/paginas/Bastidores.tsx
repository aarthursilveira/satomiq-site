import { useRef } from "react";
import { BASTIDORES, NAV } from "../lib/content";
import { Peso } from "../lab/Peso";
import { Ecos, useLuz } from "../components/Hero";
import { Rodando } from "../components/Rodando";
import { Lab } from "../components/Lab";
import { Diario } from "../components/Diario";
import { Processo } from "../components/Processo";
import { Contato } from "../components/Contato";

/** A página de dev: o que era o site inteiro antes, com a decisão técnica de cada sistema. */
export function Bastidores() {
  const secao = useRef<HTMLElement>(null);
  useLuz(secao);
  return (
    <>
      <section id="topo" ref={secao} className="relative overflow-hidden px-5 pb-6 pt-36 md:px-8 md:pt-44">
        {/* A luz vai sumindo antes do fim da seção: cabeçalho curto, sem linha seca embaixo. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(900px circle at var(--mx, 30%) var(--my, 45%), rgb(167 141 81 / 0.14), transparent 60%)",
            maskImage: "linear-gradient(#000 55%, transparent)",
          }}
        />
        <Ecos />
        <div className="relative mx-auto max-w-pagina">
          <p className="eyebrow entra">{BASTIDORES.eyebrow}</p>
          <h1 className="entra mt-3 leading-none" style={{ "--atraso": ".1s" } as React.CSSProperties}>
            <Peso texto={BASTIDORES.heroi} area={secao} raio={240} peso={[300, 1000]} largura={[70, 118]} className="-ml-[0.04em] text-[clamp(3.4rem,13vw,11rem)]" />
          </h1>
          <p className="entra mt-6 max-w-[56ch] font-gente text-conector text-creme" style={{ "--atraso": ".2s" } as React.CSSProperties}>
            {BASTIDORES.corpo}
          </p>
          <a href={NAV.irInicio.href} className="entra mt-6 inline-block font-mono text-miudo text-latao hover:text-texto" style={{ "--atraso": ".3s" } as React.CSSProperties}>
            {BASTIDORES.voltar}
          </a>
        </div>
      </section>
      <Rodando />
      <Lab />
      <Diario />
      <Processo />
      <Contato />
    </>
  );
}

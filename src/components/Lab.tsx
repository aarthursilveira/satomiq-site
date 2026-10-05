import { useId, useState } from "react";
import type { ReactNode } from "react";
import { LAB_INTRO } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { Peso } from "../lab/Peso";
import { Decifra } from "../lab/Decifra";
import { Enche } from "../lab/Enche";
import { Estoura } from "../lab/Estoura";
import { Magnetico } from "../lab/Magnetico";
import { Poucas } from "../lab/Poucas";
import pesoSrc from "../lab/Peso.tsx?raw";
import decifraSrc from "../lab/Decifra.tsx?raw";
import encheSrc from "../lab/Enche.tsx?raw";
import estouraSrc from "../lab/Estoura.tsx?raw";
import magneticoSrc from "../lab/Magnetico.tsx?raw";
import poucasSrc from "../lab/Poucas.tsx?raw";

type Controle = { chave: string; nome: string; min: number; max: number; passo: number; padrao: number; sufixo?: string };

type Peca = {
  id: string;
  nome: string;
  nota: string;
  credito?: string;
  codigo: string;
  controles: Controle[];
  render: (v: Record<string, number>) => ReactNode;
};

const PECAS: Peca[] = [
  {
    id: "peso",
    nome: "Peso",
    nota: "a letra engorda perto do cursor",
    credito: "parente do VariableProximity, do React Bits",
    codigo: pesoSrc,
    controles: [{ chave: "raio", nome: "alcance", min: 60, max: 320, passo: 10, padrao: 160, sufixo: "px" }],
    render: (v) => <Peso texto="PESO" raio={v.raio} className="text-[clamp(3.4rem,9vw,5.2rem)]" />,
  },
  {
    id: "enche",
    nome: "Enche",
    nota: "resolveu… parcialmente",
    codigo: encheSrc,
    controles: [{ chave: "pct", nome: "quanto resolveu", min: 0, max: 100, passo: 1, padrao: 58, sufixo: "%" }],
    render: (v) => <Enche pct={v.pct} />,
  },
  {
    id: "estoura",
    nome: "Estoura",
    nota: "largo demais pra caber, de propósito",
    codigo: estouraSrc,
    controles: [{ chave: "largura", nome: "largura", min: 25, max: 151, passo: 1, padrao: 151, sufixo: "%" }],
    render: (v) => <Estoura largura={v.largura} />,
  },
  {
    id: "decifra",
    nome: "Decifra",
    nota: "chega embaralhada e resolve",
    credito: "na linha do DecryptedText, do React Bits",
    codigo: decifraSrc,
    controles: [{ chave: "quadros", nome: "quadros até resolver", min: 6, max: 60, passo: 1, padrao: 24 }],
    render: (v) => <Decifra quadros={v.quadros} />,
  },
  {
    id: "magnetico",
    nome: "Magnético",
    nota: "o botão vem buscar o cursor",
    credito: "clássico do Uiverse, refeito sem lib",
    codigo: magneticoSrc,
    controles: [{ chave: "forca", nome: "força", min: 0, max: 0.8, passo: 0.05, padrao: 0.35 }],
    render: (v) => <Magnetico forca={v.forca} />,
  },
  {
    id: "poucas",
    nome: "Poucas",
    nota: "clica pra sortear quais letras acendem",
    codigo: poucasSrc,
    controles: [{ chave: "quantas", nome: "letras acesas", min: 0, max: 7, passo: 1, padrao: 2 }],
    render: (v) => <Poucas quantas={v.quantas} />,
  },
];

function Celula({ peca, index }: { peca: Peca; index: number }) {
  const [valores, setValores] = useState<Record<string, number>>(() =>
    Object.fromEntries(peca.controles.map((c) => [c.chave, c.padrao])),
  );
  const [verCodigo, setVerCodigo] = useState(false);
  const base = useId();

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full w-[82vw] max-w-[360px] shrink-0 snap-center sm:w-auto sm:max-w-none">
      <article className="cartao flex h-full flex-col overflow-hidden">
        <div className="relative grid h-56 place-items-center overflow-hidden border-b border-border bg-terminal px-4">
          {peca.render(valores)}
          <span className="absolute left-4 top-3 font-mono text-[11px] text-ghost num">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-flex text-xl font-semibold text-texto" style={{ fontStretch: "110%" }}>
              {peca.nome}
            </h3>
            <span className="font-gente text-miudo text-dim">{peca.nota}</span>
          </div>

          {peca.controles.map((c) => {
            const id = `${base}-${c.chave}`;
            return (
              <div key={c.chave} className="grid gap-1.5">
                <div className="flex justify-between font-mono text-[11px] text-dim">
                  <label htmlFor={id}>{c.nome}</label>
                  <output htmlFor={id} className="num text-creme">
                    {valores[c.chave]}
                    {c.sufixo}
                  </output>
                </div>
                <input
                  id={id}
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.passo}
                  value={valores[c.chave]}
                  onChange={(e) => setValores((v) => ({ ...v, [c.chave]: Number(e.target.value) }))}
                  className="w-full accent-latao"
                />
              </div>
            );
          })}

          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            {peca.credito ? <span className="font-mono text-[11px] text-dim">{peca.credito}</span> : <span />}
            <button
              type="button"
              onClick={() => setVerCodigo((v) => !v)}
              aria-expanded={verCodigo}
              className="shrink-0 font-mono text-[11px] uppercase tracking-eyebrow text-latao hover:text-texto"
            >
              {verCodigo ? "fechar código" : "ver código"}
            </button>
          </div>

          {verCodigo && (
            <pre className="max-h-72 overflow-auto rounded-lg bg-terminal p-4 font-mono text-[11.5px] leading-relaxed text-creme ring-1 ring-inset ring-border">
              <code>{peca.codigo}</code>
            </pre>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Lab() {
  return (
    <section id="lab" className="mx-auto max-w-pagina scroll-mt-24 px-5 pt-24 md:px-8 md:pt-40">
      <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
        <Reveal>
          <p className="eyebrow">{LAB_INTRO.eyebrow}</p>
          <h2 className="heroi mt-3 text-titulo" style={{ fontWeight: 1000, fontStretch: "125%" }}>
            {LAB_INTRO.heroi}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[52ch] font-gente text-conector text-creme">{LAB_INTRO.corpo}</p>
        </Reveal>
      </div>

      {/* Celular: trilho de arrastar (seis peças empilhadas eram seis telas no
          caminho do BORA?). Do sm pra cima, grade. */}
      <p className="mt-10 font-mono text-[11px] text-dim sm:hidden" aria-hidden>
        <span className="num text-creme">{String(PECAS.length).padStart(2, "0")}</span> {LAB_INTRO.arrasta}
      </p>
      <div className="trilho -mx-5 mt-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {PECAS.map((p, i) => (
          <Celula key={p.id} peca={p} index={i} />
        ))}
      </div>
    </section>
  );
}

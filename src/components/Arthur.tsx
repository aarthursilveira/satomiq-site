import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react";
import { ARTHUR, LINKS, NAV } from "../lib/content";
import { MATERIAL } from "../lib/material";
import { Pendente, useRascunho } from "./ui/Pendente";
import { Reveal } from "./ui/Reveal";

/**
 * Quem constrói. Com vídeo: 4:3, a moldura do @arthursilveira.ai, grande e só
 * carregando quando a pessoa dá play. Sem vídeo, com retrato: o retrato. Sem
 * nada: a frase vira citação, sem moldura vazia.
 */
export function Arthur() {
  const { video, foto } = MATERIAL.arthur;
  const rascunho = useRascunho();
  const temMidia = Boolean(video || foto);
  const [apresenta, assina] = ARTHUR.corpo;
  // Em pé (3:4) a mídia pede coluna estreita; deitado (4:3), a coluna larga.
  const emPe = video?.proporcao === "3/4";

  return (
    <section id="arthur" className="mx-auto max-w-pagina scroll-mt-20 px-5 pt-28 md:px-8 md:pt-40" aria-labelledby="arthur-titulo">
      <div
        className={`grid items-center gap-10 md:gap-14 ${
          temMidia ? (emPe ? "md:grid-cols-[minmax(0,1fr)_minmax(0,380px)]" : "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]") : "md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]"
        }`}
      >
        <Reveal>
          <p className="eyebrow">{ARTHUR.eyebrow}</p>
          <h2 id="arthur-titulo" className="mt-3 font-serif text-[clamp(3rem,8vw,6.4rem)] italic leading-[0.95] text-texto">
            {ARTHUR.titulo}
          </h2>
          <p className="mt-6 max-w-[48ch] font-gente text-conector text-creme">{apresenta}</p>
          {/* Com mídia, a frase fica no texto; sem, ela vira a citação da direita. */}
          {temMidia && <p className="mt-6 max-w-[48ch] font-gente text-conector text-creme">{assina}</p>}
          <p className="mt-8 flex items-center gap-2.5 font-mono text-miudo text-dim">
            <span className="ponto-vivo" aria-hidden />
            {ARTHUR.prova}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
            <a href={`${NAV.irBastidores.href}#diario`} className="text-latao underline decoration-latao/40 underline-offset-4 hover:text-texto">
              {ARTHUR.bastidores} →
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-creme underline decoration-border underline-offset-4 hover:text-latao">
              {ARTHUR.instagram}: {LINKS.instagramHandle} ↗
            </a>
          </p>
        </Reveal>

        <div>
          {video ? (
            <Video src={video.src} poster={video.poster} emPe={emPe} legenda={video.legenda} />
          ) : foto ? (
            <img
              src={foto}
              alt="Arthur Silveira"
              width={1440}
              height={1080}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[1.5rem] object-cover ring-1 ring-inset ring-border"
            />
          ) : (
            <>
              {rascunho && <Pendente rotulo="vídeo 4:3, 40–60s (ou um retrato 4:3)" className="mb-6 aspect-[4/3] w-full" />}
              <figure className="border-l-2 border-latao/60 pl-6">
                <blockquote className="font-serif text-[clamp(2rem,4vw,3rem)] italic leading-[1.05] text-latao">{assina}</blockquote>
              </figure>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Video({ src, poster, emPe, legenda }: { src: string; poster: string; emPe: boolean; legenda?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  return (
    <div
      className={`relative mx-auto w-full overflow-hidden bg-panel ring-1 ring-inset ring-border ${
        emPe ? "aspect-[3/4] max-w-[380px] rounded-[1.75rem]" : "aspect-[4/3] rounded-[1.5rem]"
      }`}
    >
      <video
        ref={ref}
        src={tocando ? src : undefined}
        poster={poster}
        controls={tocando}
        playsInline
        preload="none"
        className="h-full w-full object-cover"
        aria-label={ARTHUR.video}
      >
        {legenda && <track kind="captions" src={legenda} srcLang="pt-BR" label="Português" default />}
      </video>
      {!tocando && (
        <button
          type="button"
          onClick={() => {
            setTocando(true);
            requestAnimationFrame(() => ref.current?.play());
          }}
          className="group absolute inset-0 grid place-items-center bg-gradient-to-t from-bg/70 via-transparent to-transparent"
          aria-label={`Assistir: ${ARTHUR.video}`}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-latao text-bg transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            {/* o triângulo centralizado pela caixa parece torto: empurra um pouco pra direita */}
            <Play weight="fill" className="h-6 w-6 translate-x-[2px]" />
          </span>
        </button>
      )}
    </div>
  );
}

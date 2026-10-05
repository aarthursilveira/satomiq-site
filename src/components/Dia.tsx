import { useEffect, useRef, useState } from "react";
import { DIA } from "../lib/content";
import { useSegmento } from "../lib/segmento";
import type { Cena } from "../lib/segmentos";
import { gsap, movimentoReduzido, rolaPara, useGSAP } from "../lib/rolagem";
import { Celular } from "./celular/Celular";
import { TelaDe } from "./celular/Telas";
import { Escolha } from "./Escolha";
import { Conta } from "./Conta";

const minutos = (h: string) => {
  const [a, b] = h.split(":").map(Number);
  return a * 60 + b;
};
const relogio = (m: number) => {
  const t = Math.round(m) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

/** O "sol" atravessa o palco das 6h à meia-noite, e a cor muda com a hora. */
function ceu(hora: string) {
  const h = minutos(hora) / 60;
  const t = Math.min(1, Math.max(0, (h - 6) / 18));
  const cor =
    h < 9 ? "rgb(196 140 74 / 0.34)" : h < 16 ? "rgb(217 207 184 / 0.2)" : h < 20 ? "rgb(176 85 60 / 0.36)" : "rgb(110 143 168 / 0.26)";
  return { x: 0.1 + t * 0.8, y: 0.78 - Math.sin(t * Math.PI) * 0.62, cor };
}

/**
 * Um dia no negócio da pessoa, contado no scroll. Cada hora tem o "hoje"
 * (o problema) e o "rodando" (com o sistema), e uma linha de latão varre a
 * tela do celular de um pro outro.
 *
 * Sem JS ou com movimento reduzido, vira uma lista de cenas paradas, já no
 * "rodando": tudo legível, nada escondido atrás de animação.
 */
export function Dia() {
  const seg = useSegmento();
  const [modo, setModo] = useState<"lista" | "cena">("lista");
  useEffect(() => {
    if (!movimentoReduzido()) setModo("cena");
  }, []);

  return (
    <section id="dia" className="relative scroll-mt-0" aria-labelledby="dia-titulo">
      <div className="mx-auto max-w-pagina px-5 pt-24 md:px-8 md:pt-36">
        <p className="eyebrow">{DIA.eyebrow}</p>
        <h2 id="dia-titulo" className="heroi mt-3 max-w-[14ch] text-[clamp(2.8rem,8vw,6.5rem)]" style={{ fontWeight: 900, fontStretch: "92%" }}>
          {DIA.titulo(seg)}
        </h2>
        <p className="mt-5 max-w-[52ch] font-gente text-conector text-creme">{DIA.corpo}</p>
      </div>

      {modo === "cena" ? <DiaCena cenas={seg.dia} chave={seg.id} /> : <DiaLista cenas={seg.dia} />}

      <Conta />
    </section>
  );
}

// ── Sem animação: as cenas uma embaixo da outra, já resolvidas ────────────
function DiaLista({ cenas }: { cenas: Cena[] }) {
  return (
    <ol className="mx-auto mt-14 grid max-w-pagina gap-16 px-5 md:px-8">
      {cenas.map((c) => (
        <li key={c.hora} className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:gap-14">
          <div>
            <p className="num font-flex text-[clamp(3rem,9vw,6rem)] font-black leading-none tracking-tight text-texto">{c.hora}</p>
            <p className="mt-2 font-mono text-rotulo uppercase tracking-eyebrow text-latao">{c.titulo}</p>
            <p className="mt-5 max-w-[46ch] text-corpo text-dim">
              <span className="text-tijolo">{DIA.hoje}: </span>
              {c.antes.texto}
            </p>
            <p className="mt-3 max-w-[46ch] text-corpo text-texto">
              <span className="text-oliva">{DIA.rodando}: </span>
              {c.depois.texto}
            </p>
          </div>
          <Celular hora={c.hora} rotulo={c.depois.texto} className="mx-auto h-[540px] w-[300px]">
            <TelaDe tela={c.depois.tela} />
          </Celular>
        </li>
      ))}
    </ol>
  );
}

// ── Com animação: palco preso, o scroll é o relógio ───────────────────────
function DiaCena({ cenas, chave }: { cenas: Cena[]; chave: string }) {
  const raiz = useRef<HTMLDivElement>(null);
  const n = cenas.length;
  const CAUDA = 0.35; // o "rodando" da última hora fica um pouco na tela antes de soltar

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      const palco = q<HTMLElement>(".dia-palco")[0];
      const sol = q<HTMLElement>(".dia-sol")[0];
      const textos = q<HTMLElement>(".dia-texto");
      const antes = q<HTMLElement>(".dia-antes");
      const depois = q<HTMLElement>(".dia-depois");
      const telas = q<HTMLElement>(".dia-tela");
      const camadas = q<HTMLElement>(".dia-camada-depois");
      const varreduras = q<HTMLElement>(".dia-varredura");
      const horas = q<HTMLElement>(".dia-hora");
      const relogios = q<HTMLElement>(".dia-relogio");
      const sem = q<HTMLElement>(".dia-estado-hoje")[0];
      const com = q<HTMLElement>(".dia-estado-rodando")[0];
      const barra = q<HTMLElement>(".dia-barra")[0];

      const t = { m: minutos(cenas[0].hora) };
      const escreve = () => relogios.forEach((r) => (r.textContent = relogio(t.m)));
      escreve();

      const posSol = (hora: string) => {
        const c = ceu(hora);
        return { x: () => c.x * palco.clientWidth, y: () => c.y * palco.clientHeight, "--sol-cor": c.cor };
      };

      gsap.set([...textos.slice(1), ...telas.slice(1)], { autoAlpha: 0 });
      gsap.set(depois, { autoAlpha: 0 });
      gsap.set(camadas, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(varreduras, { yPercent: -100, autoAlpha: 0 });
      gsap.set(com, { autoAlpha: 0 });
      gsap.set(sol, { xPercent: -50, yPercent: -50, ...posSol(cenas[0].hora) });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            const i = Math.min(n - 1, Math.floor(st.progress * (n + CAUDA)));
            horas.forEach((h, k) => h.toggleAttribute("data-ativa", k === i));
            gsap.set(barra, { scaleX: st.progress });
          },
        },
      });

      cenas.forEach((c, i) => {
        if (i > 0) {
          tl.to(textos[i - 1], { autoAlpha: 0, y: -14, duration: 0.1 }, i)
            .fromTo(textos[i], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.12 }, i + 0.05)
            .to(telas[i - 1], { autoAlpha: 0, duration: 0.1 }, i)
            .fromTo(telas[i], { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.12 }, i + 0.04)
            .to(com, { autoAlpha: 0, duration: 0.06 }, i)
            .to(sem, { autoAlpha: 1, duration: 0.06 }, i + 0.04)
            .to(t, { m: minutos(c.hora), duration: 0.16, onUpdate: escreve }, i)
            .to(sol, { ...posSol(c.hora), duration: 0.3, ease: "power1.inOut" }, i);
        }
        // a virada: a linha de latão desce e o "rodando" aparece por baixo dela
        const v = i + 0.42;
        tl.set(varreduras[i], { autoAlpha: 1 }, v)
          .to(varreduras[i], { yPercent: 0, duration: 0.2 }, v)
          .to(camadas[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.2 }, v)
          .to(varreduras[i], { autoAlpha: 0, duration: 0.04 }, v + 0.2)
          .to(antes[i], { autoAlpha: 0, y: -8, duration: 0.08 }, v + 0.04)
          .fromTo(depois[i], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.1 }, v + 0.1)
          .to(sem, { autoAlpha: 0, duration: 0.05 }, v + 0.08)
          .to(com, { autoAlpha: 1, duration: 0.05 }, v + 0.12);
      });
      // Cada hora ocupa uma unidade [i, i+1); a cauda fecha a conta em n + CAUDA,
      // que é o que a régua de horas e o vaiPara assumem.
      tl.to({}, { duration: CAUDA }, n);
    },
    { scope: raiz, dependencies: [chave], revertOnUpdate: true },
  );

  const vaiPara = (i: number) => {
    const el = raiz.current;
    if (!el) return;
    const curso = el.offsetHeight - window.innerHeight;
    rolaPara(el.getBoundingClientRect().top + window.scrollY + ((i + 0.62) / (n + CAUDA)) * curso, 0);
  };

  return (
    <div ref={raiz} data-sem-flutuante className="dia-trilho relative mt-10" style={{ height: `${n * 95 + 60}svh` }}>
      <div className="dia-palco sticky top-0 h-[100svh] overflow-hidden">
        {/* o céu: um brilho que atravessa o palco com a hora. A máscara apaga
            as bordas: sem ela, a entrada e a saída do palco viram uma linha seca. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ maskImage: "linear-gradient(transparent, #000 18%, #000 82%, transparent)" }}
        >
          <div
            className="dia-sol absolute left-0 top-0 h-[110vmax] w-[110vmax] rounded-full"
            style={{ background: "radial-gradient(circle, var(--sol-cor, rgb(196 140 74 / 0.34)) 0%, transparent 62%)" }}
          />
        </div>

        <div className="relative mx-auto grid h-full max-w-pagina grid-rows-[auto_minmax(0,1fr)_auto] gap-y-3 px-5 pb-5 pt-[76px] md:grid-cols-[minmax(0,1fr)_340px] md:grid-rows-[minmax(0,1fr)_auto] md:gap-x-16 md:px-8 md:pb-8 md:pt-24">
          {/* esquerda: troca de negócio, relógio, texto da hora */}
          <div className="flex min-w-0 flex-col md:justify-center">
            <Escolha variante="compacta" rotulo="Ver o dia de outro negócio" />
            <div className="mt-2 flex items-end justify-between gap-4 md:mt-8 md:block">
              <p className="dia-relogio num font-flex text-[clamp(3.2rem,15vw,10.5rem)] font-black leading-[0.82] tracking-[-0.04em] text-texto" aria-hidden>
                {cenas[0].hora}
              </p>
              <p className="relative mb-1 h-7 font-mono text-[11px] uppercase tracking-eyebrow md:mb-0 md:mt-6">
                <span className="dia-estado-hoje absolute inset-y-0 right-0 flex items-center gap-2 whitespace-nowrap text-tijolo md:left-0 md:right-auto">
                  <span className="h-2 w-2 rounded-full bg-tijolo" /> {DIA.hoje}
                </span>
                <span className="dia-estado-rodando absolute inset-y-0 right-0 flex items-center gap-2 whitespace-nowrap text-oliva md:left-0 md:right-auto">
                  <span className="ponto-vivo" /> {DIA.rodando}
                </span>
              </p>
            </div>
            <div className="mt-3 grid md:mt-8" aria-hidden>
              {cenas.map((c) => (
                <div key={c.hora} className="dia-texto [grid-area:1/1]">
                  <p className="font-mono text-rotulo uppercase tracking-eyebrow text-latao">{c.titulo}</p>
                  <div className="mt-2 grid md:mt-3">
                    <p className="dia-antes max-w-[40ch] text-[15px] leading-relaxed text-creme [grid-area:1/1] md:text-[1.2rem]">{c.antes.texto}</p>
                    <p className="dia-depois max-w-[40ch] text-[15px] leading-relaxed text-texto [grid-area:1/1] md:text-[1.2rem]">{c.depois.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* direita: o celular, com o antes e o depois de cada hora empilhados */}
          <div className="flex min-h-0 justify-center md:row-span-2 md:items-center" aria-hidden>
            <Celular
              hora={<span className="dia-relogio">{cenas[0].hora}</span>}
              className="h-full max-h-[660px] w-[min(310px,78vw)] md:h-[min(680px,78svh)] md:w-[330px]"
            >
              {cenas.map((c) => (
                <div key={c.hora} className="dia-tela absolute inset-0">
                  <div className="absolute inset-0 top-10">
                    <TelaDe tela={c.antes.tela} />
                  </div>
                  <div className="dia-camada-depois absolute inset-0 top-10 bg-terminal">
                    <TelaDe tela={c.depois.tela} />
                  </div>
                  <div className="dia-varredura pointer-events-none absolute inset-0 top-10 z-20">
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-latao shadow-[0_0_28px_6px_rgb(167_141_81/0.55)]" />
                  </div>
                </div>
              ))}
            </Celular>
          </div>

          {/* as horas do dia, clicáveis */}
          <div className="md:col-start-1">
            <div className="relative h-px bg-border">
              <div className="dia-barra absolute inset-0 origin-left scale-x-0 bg-latao" />
            </div>
            <ol className="mt-2.5 flex justify-between font-mono text-[11px] text-dim">
              {cenas.map((c, i) => (
                <li key={c.hora}>
                  <button
                    type="button"
                    onClick={() => vaiPara(i)}
                    className="dia-hora num rounded px-1 py-1 transition-colors hover:text-texto data-[ativa]:text-latao"
                    data-ativa={i === 0 ? "" : undefined}
                  >
                    {c.hora}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="sr-only">{cenas.map((c) => `${c.hora}, ${c.titulo}. Hoje: ${c.antes.texto} Rodando: ${c.depois.texto}`).join(" ")}</p>
      </div>
    </div>
  );
}

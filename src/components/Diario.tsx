import { useEffect, useRef, useState } from "react";
import { DIARIO, DIARIO_INTRO } from "../lib/content";
import { Reveal } from "./ui/Reveal";

const DIA = 86_400_000;
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
const curta = (s: string) => s.split("-").reverse().slice(0, 2).join("/");

/** Semanas (colunas) × dias (linhas), do domingo antes de `desde` até hoje. */
function montaGrade() {
  const fim = utc(DIARIO.geradoEm);
  let t = utc(DIARIO.desde);
  t -= new Date(t).getUTCDay() * DIA;
  const semanas: { data: string; n: number; fora: boolean }[][] = [];
  while (t <= fim) {
    const semana = [];
    for (let i = 0; i < 7; i++, t += DIA) {
      const data = iso(t);
      semana.push({ data, n: (DIARIO.porDia as Record<string, number>)[data] ?? 0, fora: data < DIARIO.desde || t > fim });
    }
    semanas.push(semana);
  }
  return semanas;
}

const nivel = (n: number) => (n === 0 ? 0 : n <= 2 ? 0.28 : n <= 5 ? 0.5 : n <= 9 ? 0.75 : 1);

// Prefixo do commit convencional ganha a cor do papel dele.
const COR_TIPO: Record<string, string> = {
  feat: "text-latao",
  fix: "text-tijolo",
  docs: "text-azul",
  test: "text-oliva",
};

function Mensagem({ msg }: { msg: string }) {
  const m = msg.match(/^(\w+)(\([^)]*\))?:\s*(.*)$/);
  if (!m) return <span className="text-creme">{msg}</span>;
  return (
    <span className="text-creme">
      <span className={COR_TIPO[m[1]] ?? "text-dim"}>
        {m[1]}
        {m[2]}:
      </span>{" "}
      {m[3]}
    </span>
  );
}

function Contador({ valor }: { valor: number }) {
  const [n, setN] = useState(valor);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const passo = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setN(Math.round(valor * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor]);
  return (
    <span ref={ref} className="num">
      {n}
    </span>
  );
}

export function Diario() {
  const semanas = montaGrade();
  const repos = Object.entries(DIARIO.porRepo).sort((a, b) => b[1] - a[1]);
  const maior = repos[0]?.[1] ?? 1;
  const [quantos, setQuantos] = useState(10);

  return (
    <section id="diario" className="mx-auto max-w-pagina scroll-mt-24 px-5 pt-40 md:px-8">
      <Reveal>
        <p className="eyebrow">{DIARIO_INTRO.eyebrow}</p>
        <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
          <span className="heroi text-titulo text-latao" style={{ fontWeight: 1000, fontStretch: "118%", color: "var(--latao)" }}>
            <Contador valor={DIARIO.total} />
          </span>
          <span className="pb-3 font-gente text-conector text-creme">{DIARIO_INTRO.conector}</span>
        </div>
        <p className="mt-6 max-w-[60ch] text-corpo text-creme">{DIARIO_INTRO.corpo}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Reveal className="cartao min-w-0 p-5 md:p-6">
          <div className="overflow-x-auto pb-1">
            <div
              className="grid min-w-[420px] gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${semanas.length}, minmax(0, 1fr))` }}
              role="img"
              aria-label={`Mapa de commits por dia desde ${curta(DIARIO.desde)}`}
            >
              {semanas.map((s, i) => (
                <div key={i} className="grid gap-[3px]">
                  {s.map((d) => (
                    <span
                      key={d.data}
                      title={d.fora ? undefined : `${curta(d.data)}: ${d.n} commit${d.n === 1 ? "" : "s"}`}
                      className="block aspect-square w-full rounded-[3px]"
                      style={{
                        background: d.fora
                          ? "transparent"
                          : d.n
                            ? `rgb(167 141 81 / ${nivel(d.n)})`
                            : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-dim">
            <span>{curta(DIARIO.desde)}</span>
            <span className="flex items-center gap-1.5">
              menos
              {[0, 0.28, 0.5, 0.75, 1].map((a) => (
                <span key={a} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: a ? `rgb(167 141 81 / ${a})` : "var(--border)" }} />
              ))}
              mais
            </span>
            <span>{curta(DIARIO.geradoEm)}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="cartao p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-dim">por projeto</p>
          <ul className="mt-4 grid gap-3">
            {repos.map(([nome, n]) => (
              <li key={nome} className="grid grid-cols-[88px_1fr_36px] items-center gap-3 font-mono text-[12px]">
                <span className="truncate text-creme">{nome}</span>
                <span className="h-2 overflow-hidden rounded-full bg-border">
                  <span className="block h-full rounded-full bg-latao" style={{ width: `${(n / maior) * 100}%` }} />
                </span>
                <span className="text-right text-dim num">{n}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-5">
        <div className="overflow-hidden rounded-2xl bg-terminal ring-1 ring-inset ring-border">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3 font-mono text-[11px] text-dim">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-3">git log --all-repos</span>
          </div>
          <ol className="grid gap-0.5 p-4 font-mono text-[12.5px] md:p-5">
            {DIARIO.recentes.slice(0, quantos).map((c, i) => (
              <li key={i} className="grid grid-cols-[46px_74px_minmax(0,1fr)] gap-3 rounded px-1 py-1 hover:bg-panel">
                <span className="text-dim num">{curta(c.data)}</span>
                <span className="truncate text-azul">{c.repo}</span>
                <span className="min-w-0 break-words">
                  <Mensagem msg={c.msg} />
                </span>
              </li>
            ))}
          </ol>
          <div className="flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[11px] text-dim">
            <span>{DIARIO_INTRO.rodape}</span>
            {quantos < DIARIO.recentes.length && (
              <button type="button" onClick={() => setQuantos((q) => q + 10)} className="uppercase tracking-eyebrow text-latao hover:text-texto">
                mais 10
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

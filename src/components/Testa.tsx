import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, Checks, Microphone, PaperPlaneRight, Play } from "@phosphor-icons/react";
import { APPS, TESTA } from "../lib/content";
import { ABRIR, ROTEIROS } from "../lib/demo";
import type { Cartao, Comanda, Ctx, Evento, Item, Prefill, Roteiro } from "../lib/demo";
import { useSegmento } from "../lib/segmento";
import type { Segmento } from "../lib/segmentos";
import { hhmm, useAgora } from "../lib/relogio";
import { Celular } from "./celular/Celular";
import { CartaoLink } from "./celular/Telas";
import { AgendaLink, CardapioLink, Qr } from "./celular/Apps";
import type { Marcacao, Pedido } from "./celular/Apps";
import { Marca } from "./Logo";

type Linha =
  | { k: number; de: "eu" | "bela"; texto: string; hora: string }
  | { k: number; de: "eu"; audio: string; transcricao: string; hora: string }
  | { k: number; de: "bela"; cartao: Cartao; hora: string }
  | { k: number; de: "sistema"; texto: string };

type Painel = {
  itens: (Item & { k?: number })[];
  comandas: (Comanda & { k: number })[];
  precisa: { k: number; quem: string; resumo: string; hora: string }[];
  log: { k: number; texto: string; hora: string }[];
};

let seq = 0;
const k = () => ++seq;

const painelInicial = (r: Roteiro): Painel => ({ itens: r.painel.itens, comandas: [], precisa: [], log: [] });

/** "Testa aqui": o celular do cliente de um lado, o painel do dono do outro. */
export function Testa() {
  const seg = useSegmento();
  return (
    <section id="testa" className="mx-auto max-w-pagina scroll-mt-20 px-5 pt-28 md:px-8 md:pt-40" aria-labelledby="testa-titulo">
      {/* Uma frase por linha no desktop: os dois lados, um em cima do outro. */}
      <p className="eyebrow">{TESTA.eyebrow}</p>
      <h2 id="testa-titulo" className="heroi mt-3 text-[clamp(2.1rem,5vw,4.6rem)]" style={{ fontWeight: 900, fontStretch: "90%" }}>
        <span className="block">{TESTA.titulo[0]}</span>
        <span className="block text-latao">{TESTA.titulo[1]}</span>
      </h2>
      <p className="mt-6 max-w-[56ch] font-gente text-conector text-creme">{TESTA.corpo(seg)}</p>
      {/* Trocar de negócio recomeça a conversa. */}
      <Demo key={seg.id} seg={seg} />
      <p className="mt-5 font-mono text-[11px] text-dim">{TESTA.aviso}</p>
    </section>
  );
}

function Demo({ seg }: { seg: Segmento }) {
  const roteiro = ROTEIROS[seg.id];
  const agora = useAgora();
  const [linhas, setLinhas] = useState<Linha[]>([{ k: 0, de: "bela", texto: roteiro.ola, hora: "" }]);
  const [chips, setChips] = useState(roteiro.chips);
  const [ctx, setCtx] = useState<Ctx>({ etapa: "livre" });
  const [digitando, setDigitando] = useState(false);
  const [painel, setPainel] = useState<Painel>(() => painelInicial(roteiro));
  const [texto, setTexto] = useState("");
  // O link que a Bela mandou por último, e o que está aberto no celular agora.
  const [ultimo, setUltimo] = useState<Prefill>({});
  const [aberto, setAberto] = useState<{ k: number; prefill: Prefill } | null>(null);
  const conversa = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);
  // O botão apertado some da tela (a sugestão, o áudio); sem isto o foco cai no
  // começo da página. Teclado (detail 0) vai pro campo; toque vai pra conversa,
  // que não abre o teclado do celular.
  const seguraFoco = (e: React.MouseEvent) =>
    (e.detail === 0 ? campo.current : conversa.current)?.focus({ preventScroll: true });

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const estavaAberto = useRef(false);
  useEffect(() => {
    if (estavaAberto.current && !aberto) conversa.current?.focus({ preventScroll: true });
    estavaAberto.current = Boolean(aberto);
  }, [aberto]);
  useEffect(() => {
    const el = conversa.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [linhas, digitando, aberto]);

  const aplica = (eventos: Evento[]) =>
    setPainel((p) => {
      const n = { ...p };
      const h = hhmm();
      for (const e of eventos) {
        if (e.tipo === "item") n.itens = [...n.itens, { ...e.item, k: k() }];
        if (e.tipo === "move") n.itens = n.itens.map((i) => (i.id === e.id ? { ...i, quando: e.quando, novo: true, viaLink: true, k: k() } : i));
        if (e.tipo === "comanda") n.comandas = [{ ...e.comanda, k: k() }, ...n.comandas];
        if (e.tipo === "precisa") n.precisa = [{ k: k(), quem: e.quem, resumo: e.resumo, hora: h }, ...n.precisa];
        if (e.tipo === "log") n.log = [{ k: k(), texto: e.texto, hora: h }, ...n.log].slice(0, 5);
      }
      return n;
    });

  const abre = (prefill: Prefill) => roteiro.link && setAberto({ k: k(), prefill });

  const envia = (entrada: string | "audio") => {
    if (digitando) return;
    if (entrada === ABRIR) return abre(ultimo);
    const conteudo = entrada === "audio" ? roteiro.audio.transcricao : entrada.trim();
    if (!conteudo) return;
    const h = hhmm();
    setLinhas((l) => [
      ...l,
      entrada === "audio"
        ? { k: k(), de: "eu", audio: roteiro.audio.duracao, transcricao: roteiro.audio.transcricao, hora: h }
        : { k: k(), de: "eu", texto: conteudo, hora: h },
    ]);
    setTexto("");
    setChips([]);

    const { r, ctx: proximo } = roteiro.responde(conteudo, ctx);
    setCtx(proximo);
    setDigitando(true);
    let espera = entrada === "audio" ? 1100 : 600;
    r.bolhas.forEach((b, i) => {
      espera += Math.min(1500, 420 + b.length * 13);
      timers.current.push(
        window.setTimeout(() => {
          setLinhas((l) => [...l, { k: k(), de: "bela", texto: b, hora: hhmm() }]);
          if (i < r.bolhas.length - 1) return;
          if (r.cartao) {
            const c = r.cartao;
            setLinhas((l) => [...l, { k: k(), de: "bela", cartao: c, hora: hhmm() }]);
            if (c.tipo === "link") setUltimo(c.prefill ?? {});
          }
          setDigitando(false);
          setChips(r.chips ?? []);
          if (r.eventos) aplica(r.eventos);
        }, espera),
      );
    });
  };

  // Marcou no link (Maarkio): entra na agenda; se era remarcação, move o horário.
  const marcou = (m: Marcacao, prefill: Prefill) => {
    const quando = `${m.dia} ${m.hora}`;
    const remarca = prefill.remarca && painel.itens.some((i) => i.id === prefill.remarca) ? prefill.remarca : null;
    aplica(
      remarca
        ? [
            { tipo: "move", id: remarca, quando },
            { tipo: "log", texto: `Maarkio · ${m.nome} remarcou pra ${quando} pelo link; o horário antigo liberou` },
          ]
        : [
            { tipo: "item", item: { id: `n${k()}`, quando, texto: `${m.servico} · ${m.nome}`, novo: true, viaLink: true } },
            { tipo: "log", texto: `Maarkio · ${m.nome} marcou ${m.servico.toLowerCase()}, ${quando}, pelo link` },
            { tipo: "log", texto: "Maarkio · lembrete no WhatsApp agendado pra véspera" },
          ],
    );
    setLinhas((l) => [...l, { k: k(), de: "sistema", texto: APPS.agenda.noChat({ remarcou: Boolean(remarca), dia: m.dia, hora: m.hora }) }]);
    setChips(["obrigada!"]);
  };

  // Pagou no cardápio (Gluten): a comanda sai na cozinha.
  const pediu = (p: Pedido) => {
    aplica([
      { tipo: "comanda", comanda: { numero: "#0143", itens: p.itens, total: p.total } },
      { tipo: "log", texto: `Gluten · PIX de R$ ${p.total} confirmado, comanda impressa` },
    ]);
    setLinhas((l) => [...l, { k: k(), de: "sistema", texto: APPS.cardapio.noChat(p.total) }]);
    setChips(["cadê meu pedido?", "obrigado!"]);
  };

  const recomeca = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLinhas([{ k: k(), de: "bela", texto: roteiro.ola, hora: hhmm() }]);
    setChips(roteiro.chips);
    setCtx({ etapa: "livre" });
    setDigitando(false);
    setPainel(painelInicial(roteiro));
    setAberto(null);
    setUltimo({});
  };

  const app = roteiro.link?.app;

  return (
    <div data-sem-flutuante className="mt-12 grid gap-5 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:gap-6">
      {/* ── o lado do cliente: o WhatsApp, ou o link que a Bela mandou ── */}
      <Celular hora={agora} className="mx-auto h-[min(600px,84svh)] w-full max-w-[400px] md:h-[680px]">
        {aberto && app ? (
          app.tipo === "agenda" ? (
            <AgendaLink key={aberto.k} app={app} prefill={aberto.prefill} onConclui={(m) => marcou(m, aberto.prefill)} onFecha={() => setAberto(null)} />
          ) : (
            <CardapioLink key={aberto.k} app={app} onConclui={pediu} onFecha={() => setAberto(null)} />
          )
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2.5 border-b border-border bg-panel/70 px-4 py-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-latao/20 text-latao">
                <Marca className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-texto">Bela · {seg.negocio}</span>
                <span className={`block font-mono text-[10px] ${digitando ? "text-oliva" : "text-dim"}`}>{digitando ? "digitando…" : "online"}</span>
              </span>
            </div>

            <div
              ref={conversa}
              role="log"
              aria-live="polite"
              aria-label="Conversa com a Bela"
              data-lenis-prevent
              tabIndex={-1}
              className="flex flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain px-3 py-3 focus:outline-none"
            >
              {linhas.map((l) => (
                <Fala key={l.k} l={l} roteiro={roteiro} abre={abre} />
              ))}
              {digitando && (
                <span className="digitando flex w-14 items-center justify-center gap-1 self-start rounded-2xl rounded-tl-sm bg-panel py-3 ring-1 ring-inset ring-border" aria-label="Bela está digitando">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>

            {chips.length > 0 && (
              <div className="trilho flex gap-1.5 overflow-x-auto px-3 pb-2">
                {chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={digitando}
                    onClick={(e) => {
                      envia(c);
                      seguraFoco(e);
                    }}
                    className={`chip shrink-0 px-3 py-2 text-[12px] transition-colors hover:text-texto hover:ring-latao/60 active:scale-[0.97] disabled:opacity-40 ${
                      c === ABRIR ? "bg-latao/15 text-latao ring-latao/60" : "bg-bg/50 text-creme"
                    }`}
                  >
                    {c}
                    {c === ABRIR && " ↗"}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                envia(texto);
              }}
              className="flex items-center gap-2 px-3 pb-4"
            >
              <label htmlFor={`testa-${seg.id}`} className="sr-only">
                {TESTA.campo}
              </label>
              <input
                ref={campo}
                id={`testa-${seg.id}`}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                maxLength={200}
                autoComplete="off"
                placeholder={TESTA.campo}
                className="min-w-0 flex-1 rounded-full bg-panel px-4 py-2.5 text-[16px] text-texto ring-1 ring-inset ring-border placeholder:text-dim focus:outline-none focus-visible:ring-latao/70"
              />
              {texto.trim() ? (
                <button type="submit" disabled={digitando} aria-label="Enviar" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-latao text-bg transition-transform active:scale-[0.94] disabled:opacity-50">
                  <PaperPlaneRight weight="fill" className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={digitando}
                  onClick={(e) => {
                    envia("audio");
                    seguraFoco(e);
                  }}
                  aria-label={TESTA.audio}
                  title={TESTA.audio}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-latao text-bg transition-transform active:scale-[0.94] disabled:opacity-50"
                >
                  <Microphone weight="fill" className="h-5 w-5" />
                </button>
              )}
            </form>
          </div>
        )}
      </Celular>

      {/* ── o lado do dono ── */}
      <PainelDono seg={seg} roteiro={roteiro} painel={painel} agora={agora} recomeca={recomeca} />
    </div>
  );
}

function Fala({ l, roteiro, abre }: { l: Linha; roteiro: Roteiro; abre: (p: Prefill) => void }) {
  if (l.de === "sistema")
    return (
      <p className="acende my-1 self-center rounded-full bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-oliva ring-1 ring-inset ring-oliva/35">{l.texto}</p>
    );
  const eu = l.de === "eu";
  const lado = eu ? "self-end rounded-tr-sm bg-latao/[0.16] text-texto ring-latao/35" : "self-start rounded-tl-sm bg-panel text-creme ring-border";
  if ("audio" in l)
    return (
      <div className="flex max-w-[86%] flex-col items-end gap-1 self-end">
        <div className={`flex items-center gap-2 rounded-2xl px-3 py-2 ring-1 ring-inset ${lado}`}>
          <Play weight="fill" className="h-3.5 w-3.5 shrink-0" />
          <span className="flex h-5 items-center gap-[2px]">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className="w-[2.5px] rounded-full bg-texto/60" style={{ height: `${28 + ((i * 53) % 72)}%` }} />
            ))}
          </span>
          <span className="num font-mono text-[10px] text-creme">{l.audio}</span>
        </div>
        <p className="px-1 text-right font-mono text-[10.5px] leading-snug text-azul">a Bela entendeu: "{l.transcricao}"</p>
      </div>
    );
  if ("cartao" in l) {
    const c = l.cartao;
    if (c.tipo === "link" && roteiro.link)
      return <CartaoLink titulo={roteiro.link.titulo} endereco={roteiro.link.app.endereco} lado="esquerda" onAbre={() => abre(c.prefill ?? {})} />;
    if (c.tipo === "pix")
      return (
        <div className="flex w-[82%] items-center gap-3 self-start rounded-2xl rounded-tl-sm bg-panel p-3 ring-1 ring-inset ring-border">
          <Qr />
          <span className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-eyebrow text-dim">PIX · copia e cola</span>
            <span className="num mt-0.5 block font-flex text-[22px] font-bold text-texto">R$ {c.valor}</span>
          </span>
        </div>
      );
    return null;
  }
  return (
    <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug ring-1 ring-inset ${lado}`}>
      {l.texto}
      {l.hora && (
        <span className="float-right ml-2 mt-1.5 flex items-center gap-0.5 font-mono text-[9px] text-dim">
          <span className="num">{l.hora}</span>
          {eu && <Checks weight="bold" className="h-3 w-3 text-azul" />}
        </span>
      )}
    </div>
  );
}

/** Rótulo de seção do painel com o nome da peça que cuida daquilo. */
function Titulo({ texto, peca, cor }: { texto: string; peca: string; cor: string }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow ${cor}`}>
      {texto}
      <span className="rounded-full px-1.5 py-[1px] text-[9.5px] normal-case tracking-normal text-dim ring-1 ring-inset ring-border">{peca}</span>
    </p>
  );
}

function PainelDono({ seg, roteiro, painel, agora, recomeca }: { seg: Segmento; roteiro: Roteiro; painel: Painel; agora: string; recomeca: () => void }) {
  return (
    <aside aria-label={`Painel de ${seg.negocio}`} className="flex min-w-0 flex-col rounded-[1.75rem] bg-panel/70 p-5 ring-1 ring-inset ring-border md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-dim">{TESTA.painel}</p>
          <p className="mt-1 font-flex text-[1.6rem] font-bold tracking-tight text-texto">{seg.negocio}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-[11px] text-oliva">
            <span className="ponto-vivo" aria-hidden /> <span className="num">{agora || "agora"}</span>
          </span>
          <button
            type="button"
            onClick={recomeca}
            className="flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[11px] text-dim ring-1 ring-inset ring-border transition-colors hover:text-texto hover:ring-latao/50 active:scale-[0.97]"
          >
            <ArrowCounterClockwise className="h-3.5 w-3.5" /> {TESTA.recomecar}
          </button>
        </div>
      </div>

      <div className="grid flex-1 gap-6 pt-5 lg:grid-cols-2">
        <div className="min-w-0">
          <Titulo texto={roteiro.painel.titulo} peca={roteiro.painel.peca} cor="text-latao" />
          {roteiro.painel.comandas ? (
            painel.comandas.length ? (
              <ul className="mt-3 grid gap-3">
                {painel.comandas.map((c) => (
                  <li key={c.k} className="acende rounded-md bg-papel px-3.5 py-3 font-mono text-[11px] leading-[1.7] text-bg">
                    <p className="font-bold">PEDIDO {c.numero} · PIX ✓</p>
                    {c.itens.map(([n, v]) => (
                      <p key={n} className="flex justify-between gap-2">
                        <span>{n}</span>
                        <span className="num">{v}</span>
                      </p>
                    ))}
                    <p className="mt-1 flex justify-between border-t border-dashed border-bg/40 pt-1 font-bold">
                      <span>TOTAL</span>
                      <span className="num">R$ {c.total}</span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-xl border border-dashed border-tracejado px-3 py-6 text-center font-mono text-[11.5px] text-dim">{roteiro.painel.vazio}</p>
            )
          ) : painel.itens.length ? (
            <ul className="mt-3 grid gap-2">
              {painel.itens.map((i) => (
                <li
                  key={`${i.id}-${i.k ?? 0}`}
                  className={`grid grid-cols-[minmax(84px,auto)_minmax(0,1fr)] items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] ring-1 ring-inset ${
                    i.novo ? "acende bg-latao/[0.12] text-texto ring-latao/60" : "bg-bg/40 text-creme ring-border"
                  }`}
                >
                  <span className={`num font-mono text-[11px] ${i.novo ? "text-latao" : "text-dim"}`}>{i.quando}</span>
                  <span className="min-w-0 break-words">
                    {i.texto}
                    {i.viaLink && <span className="ml-2 font-mono text-[10px] text-oliva">{TESTA.viaLink}</span>}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 font-mono text-[11.5px] text-oliva">{roteiro.painel.vazio}</p>
          )}
        </div>

        <div className="grid min-w-0 content-start gap-6">
          <div>
            <Titulo texto={TESTA.precisa} peca={TESTA.pecaPrecisa} cor="text-tijolo" />
            {painel.precisa.length ? (
              <ul className="mt-3 grid gap-2">
                {painel.precisa.map((p) => (
                  <li key={p.k} className="acende rounded-xl bg-tijolo/[0.08] px-3.5 py-3 ring-1 ring-inset ring-tijolo/45">
                    <p className="flex justify-between gap-3 font-mono text-[10.5px] text-tijolo">
                      <span>{p.quem}</span>
                      <span className="num">{p.hora}</span>
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-texto">"{p.resumo}"</p>
                    <p className="mt-1.5 font-mono text-[10.5px] text-dim">{TESTA.precisaNota}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 font-mono text-[11.5px] text-oliva">{TESTA.precisaVazio}</p>
            )}
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-dim">{TESTA.agora}</p>
            <ol className="mt-3 grid gap-1.5 font-mono text-[11.5px]">
              {painel.log.length ? (
                painel.log.map((g) => (
                  <li key={g.k} className="acende-texto grid grid-cols-[42px_minmax(0,1fr)] gap-2 text-creme">
                    <span className="num text-dim">{g.hora}</span>
                    <span className="min-w-0">{g.texto}</span>
                  </li>
                ))
              ) : (
                <li className="text-dim">{TESTA.logVazio}</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </aside>
  );
}

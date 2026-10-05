import { ArrowLeft, ArrowUpRight, CalendarCheck, Camera, Check, Checks, Clock, Microphone, Play, WhatsappLogo } from "@phosphor-icons/react";
import type { Msg, Tela, Tom } from "../../lib/segmentos";
import { Marca } from "../Logo";

/*
 * As telas que o celular sabe mostrar. Cada uma recebe só dado (de
 * lib/segmentos.ts): o mesmo componente desenha o "antes" e o "depois".
 */

const TOM: Record<Tom, string> = {
  oliva: "text-oliva ring-oliva/45",
  azul: "text-azul ring-azul/45",
  latao: "text-latao ring-latao/50",
  tijolo: "text-tijolo ring-tijolo/55",
};

const AVATAR = [
  "bg-latao/20 text-latao",
  "bg-azul/20 text-azul",
  "bg-oliva/20 text-oliva",
  "bg-tijolo/20 text-tijolo",
  "bg-creme/15 text-creme",
];
const corDe = (nome: string) => AVATAR[Array.from(nome).reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR.length];

function Avatar({ nome, tamanho = "h-10 w-10 text-[14px]" }: { nome: string; tamanho?: string }) {
  return <span className={`grid shrink-0 place-items-center rounded-full font-semibold ${tamanho} ${corDe(nome)}`}>{nome[0]}</span>;
}

/** Prévia com ícone no lugar do emoji do WhatsApp (::foto, ::audio 0:42). */
function Previa({ texto }: { texto: string }) {
  if (texto === "::foto")
    return (
      <span className="flex items-center gap-1">
        <Camera weight="fill" className="h-3.5 w-3.5" /> Foto
      </span>
    );
  if (texto.startsWith("::audio"))
    return (
      <span className="flex items-center gap-1">
        <Microphone weight="fill" className="h-3.5 w-3.5 text-azul" /> Áudio ({texto.split(" ")[1]})
      </span>
    );
  return <span className="truncate">{texto}</span>;
}

// ── Lista de conversas ────────────────────────────────────────────────────
function Inbox({ tela }: { tela: Extract<Tela, { tipo: "inbox" }> }) {
  return (
    <div className="flex h-full flex-col">
      <p className="px-5 pb-3 pt-2 font-flex text-[22px] font-bold tracking-tight text-texto">Conversas</p>
      <ul className="flex-1">
        {tela.itens.map((it) => (
          <li key={it.nome} className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 px-4 py-2.5">
            <Avatar nome={it.nome} />
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-texto">{it.nome}</span>
              <span className={`flex min-w-0 text-[12px] ${it.naoLidas ? "text-creme" : "text-dim"}`}>
                <Previa texto={it.previa} />
              </span>
            </span>
            <span className="flex flex-col items-end gap-1">
              <span className={`num font-mono text-[10px] ${it.naoLidas ? "text-latao" : "text-dim"}`}>{it.hora}</span>
              {it.naoLidas ? (
                <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-latao px-1 text-[10px] font-bold text-bg">
                  {it.naoLidas}
                </span>
              ) : it.selo ? (
                <span className={`rounded-full px-1.5 py-[1px] font-mono text-[9.5px] ring-1 ring-inset ${TOM[it.selo.tom]}`}>{it.selo.texto}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Conversa ──────────────────────────────────────────────────────────────
const ONDA = Array.from({ length: 26 }, (_, i) => 28 + ((i * 53) % 72));

export function Bolha({ m }: { m: Msg }) {
  if (m.de === "sistema")
    return (
      <p className="my-1 self-center rounded-full bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-oliva ring-1 ring-inset ring-oliva/35">
        {m.texto}
      </p>
    );
  if ("audio" in m)
    return (
      <div className="flex max-w-[86%] flex-col gap-1 self-start">
        <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-panel px-3 py-2 ring-1 ring-inset ring-border">
          <Play weight="fill" className="h-3.5 w-3.5 shrink-0 text-creme" />
          <span className="flex h-5 items-center gap-[2px]">
            {ONDA.map((h, i) => (
              <span key={i} className="w-[2.5px] rounded-full bg-creme/60" style={{ height: `${h}%` }} />
            ))}
          </span>
          <span className="num font-mono text-[10px] text-dim">{m.audio}</span>
        </div>
        {m.transcricao && (
          <p className="px-1 font-mono text-[10.5px] leading-snug text-azul">transcrito: "{m.transcricao}"</p>
        )}
      </div>
    );
  if ("link" in m) return <CartaoLink titulo={m.link.titulo} endereco={m.link.endereco} lado="direita" />;
  const bela = m.de === "bela";
  return (
    <div
      className={`max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ring-1 ring-inset ${
        bela ? "self-end rounded-tr-sm bg-latao/[0.16] text-texto ring-latao/35" : "self-start rounded-tl-sm bg-panel text-creme ring-border"
      }`}
    >
      {m.texto}
      <span className="float-right ml-2 mt-1.5 flex items-center gap-0.5 font-mono text-[9px] text-dim">
        <span className="num">{m.hora}</span>
        {bela && <Checks weight="bold" className="h-3 w-3 text-azul" />}
      </span>
    </div>
  );
}

/**
 * O link que a Bela manda (a agenda do Maarkio, o cardápio do Gluten). No
 * dia de 24h é ilustração; na demo vira botão que abre o link no celular.
 */
export function CartaoLink({
  titulo,
  endereco,
  lado,
  onAbre,
}: {
  titulo: string;
  endereco: string;
  lado: "esquerda" | "direita";
  onAbre?: () => void;
}) {
  const corpo = (
    <>
      <span className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-latao/15 text-latao">
          <CalendarCheck weight="duotone" className="h-4 w-4" />
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-[12.5px] font-semibold text-texto">{titulo}</span>
          <span className="block truncate font-mono text-[10px] text-azul">{endereco}</span>
        </span>
      </span>
      <span className="flex items-center justify-center gap-1.5 px-3 py-2 font-mono text-[11px] text-latao">
        {onAbre ? "toca pra abrir" : "abrir"} <ArrowUpRight weight="bold" className="h-3 w-3" />
      </span>
    </>
  );
  const classe = `w-[78%] overflow-hidden rounded-2xl bg-panel ring-1 ring-inset ${
    lado === "direita" ? "self-end rounded-tr-sm ring-latao/35" : "self-start rounded-tl-sm ring-border"
  }`;
  return onAbre ? (
    <button type="button" onClick={onAbre} className={`${classe} transition-[box-shadow,transform] duration-200 hover:ring-latao/70 active:scale-[0.98]`}>
      {corpo}
    </button>
  ) : (
    <div className={classe}>{corpo}</div>
  );
}

export function CabecalhoChat({ contato, status = "online" }: { contato: string; status?: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border bg-panel/70 px-3 py-2">
      <ArrowLeft className="h-4 w-4 text-creme" />
      <Avatar nome={contato} tamanho="h-8 w-8 text-[12px]" />
      <span className="leading-tight">
        <span className="block text-[13px] font-semibold text-texto">{contato}</span>
        <span className="block font-mono text-[10px] text-dim">{status}</span>
      </span>
    </div>
  );
}

function Chat({ tela }: { tela: Extract<Tela, { tipo: "chat" }> }) {
  return (
    <div className="flex h-full flex-col">
      <CabecalhoChat contato={tela.contato} />
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 py-3">
        {tela.msgs.map((m, i) => (
          <Bolha key={i} m={m} />
        ))}
        {tela.rodape && (
          <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[10.5px] text-tijolo">
            <Clock weight="bold" className="h-3 w-3" /> {tela.rodape}
          </p>
        )}
      </div>
      <div className="mx-3 mb-4 rounded-full bg-panel px-4 py-2 font-mono text-[11px] text-ghost ring-1 ring-inset ring-border">Mensagem</div>
    </div>
  );
}

// ── Agenda ────────────────────────────────────────────────────────────────
const SLOT = {
  ocupado: "bg-panel text-creme ring-border",
  livre: "border border-dashed border-tracejado text-dim ring-transparent",
  faltou: "bg-tijolo/10 text-tijolo ring-tijolo/50",
  novo: "bg-latao/[0.14] text-texto ring-latao/60",
};

function Agenda({ tela }: { tela: Extract<Tela, { tipo: "agenda" }> }) {
  return (
    <div className="flex h-full flex-col px-4">
      <div className="flex items-baseline justify-between pb-3 pt-2">
        <p className="font-flex text-[22px] font-bold tracking-tight text-texto">Agenda</p>
        <p className="font-mono text-[11px] text-latao">{tela.dia}</p>
      </div>
      <ul className="grid gap-2">
        {tela.slots.map((s) => (
          <li key={s.hora} className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-2">
            <span className="num font-mono text-[11px] text-dim">{s.hora}</span>
            <span className={`flex min-h-[46px] items-center justify-between gap-2 rounded-xl px-3 text-[12.5px] ring-1 ring-inset ${SLOT[s.estado]}`}>
              <span className={`min-w-0 ${s.estado === "faltou" ? "line-through decoration-tijolo/70" : ""}`}>{s.texto}</span>
              {s.estado === "faltou" && <span className="shrink-0 font-mono text-[9.5px] no-underline">não veio</span>}
              {s.estado === "novo" && <span className="shrink-0 font-mono text-[9.5px] text-latao">novo</span>}
            </span>
          </li>
        ))}
      </ul>
      {tela.aviso && (
        <p className="mt-auto mb-5 flex items-start gap-2 rounded-xl bg-panel px-3 py-2.5 text-[11.5px] leading-snug text-creme ring-1 ring-inset ring-oliva/40">
          <Check weight="bold" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-oliva" />
          {tela.aviso}
        </p>
      )}
    </div>
  );
}

// ── Tela de bloqueio ──────────────────────────────────────────────────────
// Cada peça assina a própria notificação: a Bela conversa, o Maarkio agenda.
const APP = { zap: "WhatsApp", bela: "Bela · conversas", maarkio: "Maarkio · agenda" };

function Bloqueio({ tela }: { tela: Extract<Tela, { tipo: "bloqueio" }> }) {
  return (
    <div
      className="-mt-10 flex h-[calc(100%+2.5rem)] flex-col items-center px-3 pt-16"
      style={{ background: "radial-gradient(120% 70% at 50% 0%, rgb(167 141 81 / 0.22), transparent 60%), var(--terminal)" }}
    >
      <p className="font-mono text-[11px] text-creme">{tela.data}</p>
      <p className="num font-flex text-[64px] font-light leading-none tracking-tight text-texto" style={{ fontStretch: "88%" }}>
        {tela.hora}
      </p>
      <ul className="mt-7 grid w-full gap-2">
        {tela.notifs.map((n, i) => (
          <li key={i} className="rounded-2xl bg-notificacao/85 p-3 ring-1 ring-inset ring-white/[0.06] backdrop-blur">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
              {n.app === "zap" ? (
                <WhatsappLogo weight="fill" className="h-3.5 w-3.5 text-oliva" />
              ) : n.app === "maarkio" ? (
                <CalendarCheck weight="fill" className="h-3.5 w-3.5 text-azul" />
              ) : (
                <span className="grid h-3.5 w-3.5 place-items-center text-latao">
                  <Marca className="h-3.5 w-3.5" />
                </span>
              )}
              {APP[n.app]}
              <span className="ml-auto">agora</span>
            </span>
            <span className="mt-1 block text-[12.5px] font-semibold text-texto">{n.titulo}</span>
            <span className="block text-[12px] leading-snug text-creme">{n.texto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Comanda na impressora ─────────────────────────────────────────────────
function Comanda({ tela }: { tela: Extract<Tela, { tipo: "comanda" }> }) {
  return (
    <div className="flex h-full flex-col items-center px-5 pt-4">
      <p className="self-start pb-4 font-flex text-[22px] font-bold tracking-tight text-texto">Cozinha</p>
      <div className="relative z-10 h-3 w-full rounded-full bg-panel ring-1 ring-inset ring-border" />
      <div className="-mt-1.5 w-[92%] rounded-b-md bg-papel px-4 pb-4 pt-5 font-mono text-[11px] leading-[1.75] text-bg shadow-[0_18px_30px_-18px_rgb(0_0_0/0.9)]">
        <p className="text-center text-[12px] font-bold">PEDIDO {tela.numero}</p>
        <p className="text-center text-[10px] opacity-60">delivery · {tela.hora}</p>
        <div className="my-2 border-t border-dashed border-bg/40" />
        {tela.itens.map(([n, v]) => (
          <p key={n} className="flex justify-between gap-3">
            <span>{n}</span>
            <span className="num shrink-0">{v}</span>
          </p>
        ))}
        {tela.obs && <p className="mt-1.5 rounded bg-bg/[0.08] px-1.5 font-bold">OBS: {tela.obs}</p>}
        <div className="my-2 border-t border-dashed border-bg/40" />
        <p className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span className="num">R$ {tela.total}</span>
        </p>
        {tela.pago && <p className="mt-1 font-bold text-papel-oliva">PIX ✓ recebido</p>}
      </div>
    </div>
  );
}

// ── Lista de tarefas ──────────────────────────────────────────────────────
function Lista({ tela }: { tela: Extract<Tela, { tipo: "lista" }> }) {
  return (
    <div className="flex h-full flex-col px-4">
      <p className="pb-3 pt-2 font-flex text-[22px] font-bold tracking-tight text-texto">{tela.titulo}</p>
      <ul className="grid gap-2">
        {tela.itens.map((it) => (
          <li key={it.texto} className="flex items-start gap-3 rounded-xl bg-panel px-3 py-3 ring-1 ring-inset ring-border">
            <span
              className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[5px] ring-1 ring-inset ${
                it.feito ? "bg-oliva ring-oliva" : "ring-dim"
              }`}
            >
              {it.feito && <Check weight="bold" className="h-3 w-3 text-bg" />}
            </span>
            <span className="min-w-0">
              <span className={`block text-[12.5px] leading-snug ${it.feito ? "text-dim line-through decoration-dim/60" : "text-texto"}`}>{it.texto}</span>
              {it.nota && <span className="mt-1 block font-mono text-[10px] text-oliva">{it.nota}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TelaDe({ tela }: { tela: Tela }) {
  switch (tela.tipo) {
    case "inbox":
      return <Inbox tela={tela} />;
    case "chat":
      return <Chat tela={tela} />;
    case "agenda":
      return <Agenda tela={tela} />;
    case "bloqueio":
      return <Bloqueio tela={tela} />;
    case "comanda":
      return <Comanda tela={tela} />;
    case "lista":
      return <Lista tela={tela} />;
  }
}

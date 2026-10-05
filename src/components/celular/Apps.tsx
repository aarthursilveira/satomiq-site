import { useEffect, useId, useRef, useState } from "react";
import type { RefObject } from "react";
import { ArrowLeft, CheckCircle, LockSimple, Minus, Plus } from "@phosphor-icons/react";
import { APPS } from "../../lib/content";
import { real } from "../../lib/demo";
import type { AppAgenda, AppCardapio, Prefill } from "../../lib/demo";

/*
 * O que o link da Bela abre, dentro do celular da demo: a agenda do Maarkio
 * ou o cardápio do Gluten. Funcionam de verdade (escolhe, confirma, paga) e
 * avisam a demo pra atualizar o painel do dono.
 */

/** Um QR desenhado: os três quadrados de canto (é por eles que o olho reconhece) e o miolo fixo. */
const QR = 21;
const canto = (x: number, y: number) => {
  for (const [cx, cy] of [
    [0, 0],
    [QR - 7, 0],
    [0, QR - 7],
  ]) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
      const borda = dx === 0 || dx === 6 || dy === 0 || dy === 6;
      const miolo = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      return borda || miolo ? 1 : 0;
    }
    if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) return 0;
  }
  return -1;
};
const MODULOS = Array.from({ length: QR * QR }, (_, i) => {
  const x = i % QR;
  const y = Math.floor(i / QR);
  const c = canto(x, y);
  return c >= 0 ? c === 1 : (x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0;
});

export function Qr({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox={`-1 -1 ${QR + 2} ${QR + 2}`} className={`shrink-0 rounded-md bg-texto ${className}`} aria-hidden shapeRendering="crispEdges">
      {MODULOS.map((on, i) => (on ? <rect key={i} x={i % QR} y={Math.floor(i / QR)} width={1} height={1} fill="var(--bg)" /> : null))}
    </svg>
  );
}

/** A barra de navegador de cima: o endereço do link e a volta pro WhatsApp. */
function Barra({ endereco, onFecha, volta }: { endereco: string; onFecha: () => void; volta?: RefObject<HTMLButtonElement> }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-bg/70 px-3 py-2">
      <button
        ref={volta}
        type="button"
        onClick={onFecha}
        className="flex shrink-0 items-center gap-1 rounded-full px-2 py-1 font-mono text-[10.5px] text-latao transition-colors hover:bg-latao/10"
      >
        <ArrowLeft weight="bold" className="h-3 w-3" /> {APPS.voltar}
      </button>
      <span className="flex min-w-0 flex-1 items-center justify-center gap-1 rounded-full bg-panel px-3 py-1 font-mono text-[10.5px] text-creme">
        <LockSimple weight="fill" className="h-2.5 w-2.5 shrink-0 text-oliva" />
        <span className="truncate">{endereco}</span>
      </span>
    </div>
  );
}

/**
 * O botão que a pessoa apertou some quando a tela troca; sem isto o foco cai no
 * começo da página. A cada etapa, o foco vai pro primeiro controle da tela nova.
 */
function useFocoNaTroca(etapa: string) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), [etapa]);
  return ref;
}

const Rotulo = ({ children }: { children: string }) => (
  <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-eyebrow text-dim first:mt-0">{children}</p>
);

// ── Agenda (Maarkio) ──────────────────────────────────────────────────────
export type Marcacao = { servico: string; dia: string; hora: string; nome: string };

export function AgendaLink({
  app,
  prefill,
  onConclui,
  onFecha,
}: {
  app: AppAgenda;
  prefill: Prefill;
  onConclui: (m: Marcacao) => void;
  onFecha: () => void;
}) {
  const base = useId();
  const t = APPS.agenda;
  const [servico, setServico] = useState(app.servicos.find((s) => s.nome === prefill.servico)?.nome ?? app.servicos[0].nome);
  const [dia, setDia] = useState(app.dias.find((d) => d.nome === prefill.dia)?.nome ?? app.dias[0].nome);
  const [hora, setHora] = useState<string | null>(null);
  const [nome, setNome] = useState(prefill.nome ?? "");
  const campoNome = useRef<HTMLInputElement>(null);
  const [feito, setFeito] = useState(false);
  const foco = useFocoNaTroca(feito ? "feito" : "agenda");
  const horarios = app.dias.find((d) => d.nome === dia)?.horarios ?? [];
  const pronto = Boolean(hora && nome.trim());

  if (feito)
    return (
      <div className="flex h-full flex-col">
        <Barra endereco={app.endereco} onFecha={onFecha} />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center" role="status">
          <CheckCircle weight="fill" className="acende h-14 w-14 text-oliva" />
          <p className="mt-4 font-flex text-[1.6rem] font-bold tracking-tight text-texto">{prefill.remarca ? t.remarcado : t.feito}</p>
          <p className="mt-1 text-[14px] text-creme">
            {dia[0].toUpperCase() + dia.slice(1)}, {hora} · {servico}
          </p>
          <p className="mt-4 max-w-[26ch] font-mono text-[11px] leading-relaxed text-dim">{t.lembrete}</p>
          <button ref={foco} type="button" onClick={onFecha} className="btn-cheio mt-7 py-3">
            <ArrowLeft weight="bold" className="h-3.5 w-3.5" /> {APPS.voltar}
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <Barra endereco={app.endereco} onFecha={onFecha} volta={foco} />
      <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-latao text-[15px] font-bold text-bg">{app.titulo.split(" ").pop()?.[0]}</span>
          <span>
            <span className="block text-[15px] font-semibold text-texto">{app.titulo}</span>
            <span className="block font-mono text-[10.5px] text-dim">{t.chamada}</span>
          </span>
        </div>

        <Rotulo>{t.servico}</Rotulo>
        <div role="radiogroup" aria-label={t.servico} className="grid gap-1.5">
          {app.servicos.map((s) => (
            <button
              key={s.nome}
              type="button"
              role="radio"
              aria-checked={servico === s.nome}
              onClick={() => setServico(s.nome)}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left ring-1 ring-inset transition-colors ${
                servico === s.nome ? "bg-latao/[0.12] text-texto ring-latao/60" : "text-creme ring-border hover:ring-latao/40"
              }`}
            >
              <span className="text-[13px] font-medium">{s.nome}</span>
              <span className="font-mono text-[10.5px] text-dim">{s.info}</span>
            </button>
          ))}
        </div>

        <Rotulo>{t.dia}</Rotulo>
        <div role="radiogroup" aria-label={t.dia} className="grid grid-cols-3 gap-1.5">
          {app.dias.map((d) => (
            <button
              key={d.nome}
              type="button"
              role="radio"
              aria-checked={dia === d.nome}
              onClick={() => {
                setDia(d.nome);
                setHora(null);
              }}
              className={`rounded-lg py-2 font-mono text-[11.5px] ring-1 ring-inset transition-colors ${
                dia === d.nome ? "bg-latao text-bg ring-latao" : "text-creme ring-border hover:ring-latao/40"
              }`}
            >
              {d.nome}
            </button>
          ))}
        </div>

        <Rotulo>{t.horario}</Rotulo>
        <div role="radiogroup" aria-label={t.horario} className="grid grid-cols-3 gap-1.5">
          {horarios.map(([h, livre]) => (
            <button
              key={h}
              type="button"
              role="radio"
              aria-checked={hora === h}
              disabled={!livre}
              aria-label={livre ? h : `${h}, ${t.ocupado}`}
              onClick={() => {
                setHora(h);
                // O nome fica abaixo da dobra dentro do celular: leva a pessoa até ele.
                if (!nome.trim()) requestAnimationFrame(() => campoNome.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
              }}
              className={`num rounded-lg py-2 font-mono text-[12px] ring-1 ring-inset transition-colors disabled:cursor-not-allowed disabled:text-ghost disabled:line-through disabled:ring-border/60 ${
                hora === h ? "bg-latao text-bg ring-latao" : "text-texto ring-border hover:ring-latao/40"
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        <Rotulo>{t.nome}</Rotulo>
        <label htmlFor={`${base}-nome`} className="sr-only">
          {t.nome}
        </label>
        <input
          ref={campoNome}
          id={`${base}-nome`}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder={t.nomeDica}
          autoComplete="off"
          className="w-full rounded-xl bg-bg/50 px-3 py-2.5 text-[16px] text-texto ring-1 ring-inset ring-border placeholder:text-dim focus:outline-none focus-visible:ring-latao/70"
        />
      </div>

      <div className="border-t border-border px-4 pb-4 pt-3">
        <button
          type="button"
          disabled={!pronto}
          onClick={() => {
            if (!hora) return;
            setFeito(true);
            onConclui({ servico, dia, hora, nome: nome.trim() });
          }}
          className="btn-cheio w-full justify-center py-3 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pronto ? `${t.confirmar} · ${dia} ${hora}` : hora ? t.faltaNome : t.confirmar}
        </button>
        <p className="mt-2 text-center font-mono text-[9.5px] text-dim">{t.assinatura}</p>
      </div>
    </div>
  );
}

// ── Cardápio (Gluten) ─────────────────────────────────────────────────────
export type Pedido = { itens: [string, string][]; total: string };

export function CardapioLink({ app, onConclui, onFecha }: { app: AppCardapio; onConclui: (p: Pedido) => void; onFecha: () => void }) {
  const t = APPS.cardapio;
  const [qtd, setQtd] = useState<Record<string, number>>({});
  const [etapa, setEtapa] = useState<"menu" | "pix" | "pago">("menu");
  const foco = useFocoNaTroca(etapa);
  const soma =app.itens.reduce((s, i) => s + (qtd[i.nome] ?? 0) * i.preco, 0);
  const total = soma ? soma + app.entrega : 0;
  const muda = (nome: string, d: number) => setQtd((q) => ({ ...q, [nome]: Math.max(0, Math.min(9, (q[nome] ?? 0) + d)) }));

  if (etapa === "pago")
    return (
      <div className="flex h-full flex-col">
        <Barra endereco={app.endereco} onFecha={onFecha} />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center" role="status">
          <CheckCircle weight="fill" className="acende h-14 w-14 text-oliva" />
          <p className="mt-4 font-flex text-[1.6rem] font-bold tracking-tight text-texto">{t.feito}</p>
          <p className="mt-1 font-mono text-[12px] text-creme">#0143 · R$ {real(total)}</p>
          <p className="mt-4 max-w-[26ch] text-[13px] leading-relaxed text-creme">{t.cozinha}</p>
          <button ref={foco} type="button" onClick={onFecha} className="btn-cheio mt-7 py-3">
            <ArrowLeft weight="bold" className="h-3.5 w-3.5" /> {APPS.voltar}
          </button>
        </div>
      </div>
    );

  if (etapa === "pix")
    return (
      <div className="flex h-full flex-col">
        <Barra endereco={app.endereco} onFecha={onFecha} />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-eyebrow text-dim">PIX</p>
          <p className="num mt-1 font-flex text-[2rem] font-bold tracking-tight text-texto">R$ {real(total)}</p>
          <Qr className="mt-5 h-36 w-36" />
          <p className="mt-4 font-mono text-[11px] text-dim">{t.pix}</p>
          <button
            ref={foco}
            type="button"
            onClick={() => {
              setEtapa("pago");
              const itens: [string, string][] = app.itens
                .filter((i) => qtd[i.nome])
                .map((i) => [`${qtd[i.nome]}x ${i.grupo === "pizzas" ? `Pizza G ${i.nome.toLowerCase()}` : i.nome}`, real(qtd[i.nome] * i.preco)]);
              onConclui({ itens: [...itens, [t.entrega, real(app.entrega)]], total: real(total) });
            }}
            className="btn-cheio mt-7 py-3"
          >
            {t.paguei}
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <Barra endereco={app.endereco} onFecha={onFecha} volta={foco} />
      <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <p className="text-[17px] font-semibold text-texto">{app.titulo}</p>
        <p className="font-mono text-[10.5px] text-oliva">{app.aviso}</p>
        {(["pizzas", "bebidas"] as const).map((g) => (
          <div key={g}>
            <Rotulo>{t[g]}</Rotulo>
            <ul className="grid gap-1.5">
              {app.itens
                .filter((i) => i.grupo === g)
                .map((i) => {
                  const n = qtd[i.nome] ?? 0;
                  return (
                    <li key={i.nome} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ring-1 ring-inset ${n ? "ring-latao/60" : "ring-border"}`}>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium text-texto">{i.nome}</span>
                        {i.detalhe && <span className="block truncate font-mono text-[10px] text-dim">{i.detalhe}</span>}
                        <span className="num block font-mono text-[11px] text-latao">R$ {real(i.preco)}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {n > 0 && (
                          <>
                            <button type="button" onClick={() => muda(i.nome, -1)} aria-label={`Tirar ${i.nome}`} className="grid h-7 w-7 place-items-center rounded-full ring-1 ring-inset ring-border text-creme hover:ring-latao/50">
                              <Minus weight="bold" className="h-3 w-3" />
                            </button>
                            <span className="num w-4 text-center font-mono text-[12px] text-texto" aria-live="polite">
                              {n}
                            </span>
                          </>
                        )}
                        <button type="button" onClick={() => muda(i.nome, 1)} aria-label={`Pôr ${i.nome}`} className="grid h-7 w-7 place-items-center rounded-full bg-latao text-bg active:scale-[0.94]">
                          <Plus weight="bold" className="h-3 w-3" />
                        </button>
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 pb-4 pt-3">
        <button type="button" disabled={!total} onClick={() => setEtapa("pix")} className="btn-cheio w-full justify-center py-3 disabled:cursor-not-allowed disabled:opacity-40">
          {t.pagar}
          {total ? ` · R$ ${real(total)}` : ""}
        </button>
        <p className="mt-2 text-center font-mono text-[9.5px] text-dim">{t.assinatura}</p>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { RECADO } from "../lib/content";
import { setRecado, useLinkDoRecado, useRecado } from "../lib/recado";
import { useSegmento } from "../lib/segmento";

/** Digita os exemplos no placeholder, um por vez, enquanto o campo está vazio e sem foco. */
function useDicaDigitada(parado: boolean) {
  const [dica, setDica] = useState(RECADO.exemplos[0]);
  // Começa com o primeiro exemplo inteiro (é o que o HTML pré-renderizado
  // mostra) e retoma de onde parou quando volta a rodar.
  const estado = useRef({ i: 0, n: RECADO.exemplos[0].length, apagando: true });
  useEffect(() => {
    if (parado || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = estado.current;
    let t = 0;
    const passo = () => {
      const alvo = RECADO.exemplos[s.i];
      if (!s.apagando) {
        s.n++;
        setDica(alvo.slice(0, s.n));
        if (s.n >= alvo.length) {
          s.apagando = true;
          t = window.setTimeout(passo, 1900);
          return;
        }
        t = window.setTimeout(passo, 38 + Math.random() * 40);
      } else {
        s.n = Math.max(0, s.n - 3);
        setDica(alvo.slice(0, s.n));
        if (s.n === 0) {
          s.apagando = false;
          s.i = (s.i + 1) % RECADO.exemplos.length;
          t = window.setTimeout(passo, 380);
          return;
        }
        t = window.setTimeout(passo, 16);
      }
    };
    t = window.setTimeout(passo, 1900);
    return () => window.clearTimeout(t);
  }, [parado]);
  return dica;
}

/**
 * O "cê me conta o problema" do hero, de verdade: o que a pessoa escreve aqui
 * vai pronto pro WhatsApp. O texto é o mesmo em todo lugar da página.
 */
export function Recado({ id, className = "" }: { id: string; className?: string }) {
  const texto = useRecado();
  const link = useLinkDoRecado();
  const seg = useSegmento();
  // Escolheu o negócio lá em cima? Os atalhos viram os problemas típicos dele.
  const atalhos = seg.escolhido ? seg.atalhos : RECADO.atalhos;
  const [foco, setFoco] = useState(false);
  const [naTela, setNaTela] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLTextAreaElement>(null);
  const envio = useRef<HTMLAnchorElement>(null);
  const dica = useDicaDigitada(foco || texto.length > 0 || !naTela);

  // Fora da tela o placeholder para de digitar: são dois campos na página.
  useEffect(() => {
    const el = raiz.current;
    if (!el || !("IntersectionObserver" in window)) return setNaTela(true);
    const io = new IntersectionObserver(([e]) => setNaTela(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // O campo cresce com o texto, até umas seis linhas.
  useEffect(() => {
    const el = campo.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [texto]);

  const usaAtalho = (frase: string) => {
    const atual = texto.trim();
    // Trocar de atalho troca a frase; texto da própria pessoa ganha a frase no fim.
    const soAtalho = !atual || atalhos.some((a) => a.texto === atual);
    setRecado(soAtalho ? frase : `${atual} ${frase}`);
    campo.current?.focus();
  };

  return (
    <div ref={raiz} className={className}>
      <div className="recado cartao p-2 transition-shadow duration-300 focus-within:ring-latao/70">
        <label htmlFor={id} className="block px-3 pt-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-dim">
          {RECADO.rotulo}
        </label>
        <textarea
          ref={campo}
          id={id}
          rows={2}
          maxLength={600}
          value={texto}
          placeholder={dica}
          onChange={(e) => setRecado(e.target.value)}
          onFocus={() => setFoco(true)}
          onBlur={() => setFoco(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) envio.current?.click();
          }}
          aria-describedby={`${id}-nota`}
          className="block w-full resize-none bg-transparent px-3 pb-3 pt-1.5 text-corpo text-texto placeholder:text-dim focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-1.5 px-1.5 pb-1.5 sm:gap-2">
          {atalhos.map((a) => {
            const ativo = texto.includes(a.texto);
            return (
              <button
                key={a.nome}
                type="button"
                aria-pressed={ativo}
                onClick={() => usaAtalho(a.texto)}
                className={`chip px-2.5 py-2 text-[11px] transition-colors hover:text-texto hover:ring-latao/60 sm:px-3 sm:text-[12px] ${
                  ativo ? "text-latao ring-latao/70" : ""
                }`}
              >
                {a.nome}
              </button>
            );
          })}
          <a
            ref={envio}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cheio mt-1 w-full justify-center sm:ml-auto sm:mt-0 sm:w-auto"
          >
            {texto.trim() ? RECADO.enviar : RECADO.vazio} <span aria-hidden>↗</span>
          </a>
        </div>
        <p id={`${id}-nota`} className="mt-1 border-t border-border px-3 pb-1.5 pt-2.5 font-mono text-[11px] text-dim">
          {RECADO.nota}
        </p>
      </div>
    </div>
  );
}

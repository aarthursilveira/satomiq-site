import { useEffect, useRef, useState } from "react";
import { RECADO } from "../conteudo";
import { mensagem, setNegocio, setTexto, useRecado } from "../recado";
import { wa } from "../zap";
import { Icone } from "./Icone";
import { Janela, cx } from "./Janela";

/** Digita os exemplos no placeholder, um por vez, enquanto o campo está vazio, sem foco e na tela. */
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
 * O "cê me conta" de verdade: o que a pessoa escreve aqui vai pronto pro
 * WhatsApp do Arthur, e a prévia mostra exatamente o que vai chegar.
 */
export function Recado() {
  const r = useRecado();
  const [foco, setFoco] = useState(false);
  const [naTela, setNaTela] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLTextAreaElement>(null);
  const envio = useRef<HTMLAnchorElement>(null);
  const dica = useDicaDigitada(foco || r.texto.length > 0 || !naTela);
  const texto = mensagem(r);

  useEffect(() => {
    const el = raiz.current;
    if (!el || !("IntersectionObserver" in window)) return setNaTela(true);
    const io = new IntersectionObserver(([e]) => setNaTela(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // O campo cresce com o texto, até umas sete linhas.
  useEffect(() => {
    const el = campo.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 196)}px`;
  }, [r.texto]);

  const alternaAtalho = (frase: string) => {
    const atual = r.texto.trim();
    if (atual.includes(frase)) {
      setTexto(atual.replace(frase, "").replace(/\s{2,}/g, " ").trim());
    } else {
      // Trocar de atalho troca a frase; texto da própria pessoa ganha a frase no fim.
      const soAtalho = !atual || RECADO.atalhos.some((a) => a.texto === atual);
      setTexto(soAtalho ? frase : `${atual} ${frase}`);
    }
    campo.current?.focus({ preventScroll: true });
  };

  return (
    <div ref={raiz} className="recado-demo">
      <Janela titulo={RECADO.janela} className="recado-janela">
        <fieldset className="recado-grupo">
          <legend>{RECADO.negocio}</legend>
          <div className="chips">
            {RECADO.negocios.map((n) => {
              const ativo = r.negocio === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  className="chip"
                  aria-pressed={ativo}
                  onClick={() => setNegocio(ativo ? null : n.id)}
                >
                  {n.nome}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="recado-grupo">
          <legend>{RECADO.assunto}</legend>
          <div className="chips">
            {RECADO.atalhos.map((a) => (
              <button
                key={a.nome}
                type="button"
                className="chip"
                aria-pressed={r.texto.includes(a.texto)}
                onClick={() => alternaAtalho(a.texto)}
              >
                {a.nome}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="recado-campo">
          <label htmlFor="recado-texto">{RECADO.rotulo}</label>
          <textarea
            ref={campo}
            id="recado-texto"
            rows={3}
            maxLength={600}
            value={r.texto}
            placeholder={dica}
            onChange={(e) => setTexto(e.target.value)}
            onFocus={() => setFoco(true)}
            onBlur={() => setFoco(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) envio.current?.click();
            }}
            aria-describedby="recado-nota"
          />
        </div>

        <div className="recado-previa">
          <span className="recado-previa-rotulo">{RECADO.previa}</span>
          <p className={cx("balao", "balao-meu")} aria-live="polite">
            {texto}
          </p>
        </div>

        <div className="recado-envio">
          <a ref={envio} className="botao" href={wa(texto)} target="_blank" rel="noopener">
            <Icone nome="whatsapp-logo" />
            {RECADO.enviar}
          </a>
          <p id="recado-nota" className="recado-nota">
            {RECADO.nota}
          </p>
        </div>
      </Janela>
    </div>
  );
}

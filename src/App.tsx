import { useEffect, useRef, useState } from "react";
import { ARTHUR, CTA, DIA, DIARIO_TXT, DUVIDAS, FIM, HERO, LINKS, NAV, PRECO, PRODUTOS, RECADO, RODAPE, COMO } from "./conteudo";
import { MATERIAL } from "./material";
import type { Depoimento, Numero } from "./material";
import { useLinkDoRecado } from "./recado";
import { ligaPonteDoZap } from "./zap";
import { Icone } from "./componentes/Icone";
import { Janela, cx } from "./componentes/Janela";
import { LOSANGO, Logo } from "./componentes/Logo";
import { Pendente, useRascunho } from "./componentes/Pendente";
import { Recado } from "./componentes/Recado";
import { Diario, ULTIMOS } from "./componentes/Diario";
import { criarDia } from "./dia-em-pontos";
import type { Dia } from "./dia-em-pontos";
import type { Shaders } from "./shaders";

/**
 * satomiq.com, a página do Arthur. Destino do funil lead → Instagram → site,
 * então é desenhada para o navegador DE DENTRO do Instagram, no celular: um
 * caminho só (o WhatsApp), barra fixa embaixo no celular, trecho fixado
 * curto, shader barato.
 *
 * Mesma régua da landing do maarkio.com (fio de 1px, canto reto, janela
 * retrô, pontilhado 1-bit, Archivo + Geist), com o café do perfil
 * @arthursilveira.ai no lugar do ultramar.
 *
 * Movimento (Lenis + GSAP) e shaders (Paper) entram por import() dinâmico,
 * fora do bundle inicial. Sem eles a página fica inteira, só parada.
 */

const CHAVE_TEMA = "satomiq-tema";
const SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Próximo dia em que o salão de exemplo abre (domingo fecha). */
function proximoDiaUtil(base: Date) {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d;
}

/** "qui, 9 out às 10:30". Só depois de montar: o servidor não sabe o hoje de quem abre. */
function Amanha() {
  const [txt, setTxt] = useState("amanhã às 10:30");
  useEffect(() => {
    const d = proximoDiaUtil(new Date());
    setTxt(`${SEMANA[d.getDay()]}, ${d.getDate()} ${MESES[d.getMonth()]} às 10:30`);
  }, []);
  return <>{txt}</>;
}

function BotaoZap({ className, extra = "", children }: { className?: string; extra?: string; children?: React.ReactNode }) {
  const link = useLinkDoRecado(extra);
  return (
    <a className={cx("botao", className)} href={link} target="_blank" rel="noopener">
      <Icone nome="whatsapp-logo" />
      {children ?? CTA}
    </a>
  );
}

function Numeros({ numeros, depoimento, nome }: { numeros: Numero[]; depoimento: Depoimento | null; nome: string }) {
  return (
    <>
      {numeros.length ? (
        <dl className="numeros" aria-label={PRODUTOS.numeros}>
          {numeros.map((n) => (
            <div key={n.legenda}>
              <dt>{n.legenda}</dt>
              <dd>{n.valor}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <Pendente rotulo={`números reais do ${nome} (ex.: agendamentos por mês)`} />
      )}
      {depoimento ? (
        <figure className="depoimento">
          <blockquote>“{depoimento.texto}”</blockquote>
          <figcaption>
            {depoimento.quem} · {depoimento.negocio}
          </figcaption>
        </figure>
      ) : (
        <Pendente rotulo={`depoimento de quem usa o ${nome}`} />
      )}
    </>
  );
}

const ONDA = [5, 9, 14, 8, 12, 16, 10, 6, 11, 15, 9, 5, 8, 12, 7, 4, 9, 6];

function Audio({ duracao }: { duracao: string }) {
  return (
    <span className="audio" aria-label={`Áudio de ${duracao}`}>
      <Icone nome="play" className="ico audio-play" />
      <span className="audio-onda" aria-hidden="true">
        {ONDA.map((h, i) => (
          <i key={i} style={{ height: `${h}px` }} />
        ))}
      </span>
      <span className="audio-tempo">{duracao}</span>
    </span>
  );
}

export default function App() {
  const raiz = useRef<HTMLDivElement>(null);
  const caixaCeu = useRef<HTMLDivElement>(null);
  const ceu = useRef<HTMLDivElement>(null);
  const fundoBela = useRef<HTMLDivElement>(null);
  const metalShader = useRef<HTMLDivElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const slug = useRef<HTMLSpanElement>(null);
  const secaoDia = useRef<HTMLElement>(null);
  const mapa = useRef<HTMLCanvasElement>(null);
  const passos = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const cTotal = useRef<HTMLElement>(null);
  const cSem = useRef<HTMLElement>(null);
  const cBela = useRef<HTMLElement>(null);
  const cVoce = useRef<HTMLElement>(null);
  const heroCtas = useRef<HTMLDivElement>(null);
  const ctaPreco = useRef<HTMLDivElement>(null);
  const ctaFim = useRef<HTMLDivElement>(null);
  const recado = useRef<HTMLElement>(null);
  const shaders = useRef<Shaders | null>(null);
  const dia = useRef<Dia | null>(null);

  const [ceuPronto, setCeuPronto] = useState(false);
  const [metalPronto, setMetalPronto] = useState(false);
  const [barraVisivel, setBarraVisivel] = useState(false);
  const [estatico, setEstatico] = useState(false);
  const rascunho = useRascunho();

  // Instagram → app do WhatsApp, sem passar pelo WhatsApp Web.
  useEffect(ligaPonteDoZap, []);

  // Barra de WhatsApp no celular: aparece depois que o CTA do topo sai por
  // cima, e some enquanto outro caminho pro zap (ou a seção fixada) está na tela.
  useEffect(() => {
    const vendo = new Set<Element>();
    let topoPassou = false;
    const atualizar = () => setBarraVisivel(topoPassou && vendo.size === 0);
    const ioTopo = new IntersectionObserver(([en]) => {
      topoPassou = !en.isIntersecting && en.boundingClientRect.top < 0;
      atualizar();
    });
    const io = new IntersectionObserver((ens) => {
      ens.forEach((en) => (en.isIntersecting ? vendo.add(en.target) : vendo.delete(en.target)));
      atualizar();
    });
    if (heroCtas.current) ioTopo.observe(heroCtas.current);
    [ctaPreco.current, ctaFim.current, secaoDia.current, recado.current].forEach((el) => el && io.observe(el));
    return () => {
      ioTopo.disconnect();
      io.disconnect();
    };
  }, []);

  // Canvas, shaders, Lenis e GSAP.
  useEffect(() => {
    const r = raiz.current;
    if (!r || !mapa.current || !passos.current || !trilho.current || !cTotal.current || !cSem.current || !cBela.current || !cVoce.current) return;
    const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelado = false;
    const desfazer: Array<() => void> = [];

    const d = criarDia(mapa.current, r, {
      passos: Array.from(passos.current.children) as HTMLElement[],
      trilhos: Array.from(trilho.current.querySelectorAll("i")) as HTMLElement[],
      total: cTotal.current,
      sem: cSem.current,
      bela: cBela.current,
      voce: cVoce.current,
      classeAtivo: "ativo",
    });
    dia.current = d;

    if (ceu.current && caixaCeu.current && fundoBela.current && metalShader.current) {
      void import("./shaders")
        .then(({ montarShaders }) =>
          montarShaders({
            raiz: r,
            ceu: ceu.current!,
            caixaCeu: caixaCeu.current!,
            fundoBela: fundoBela.current!,
            metal: metalShader.current!,
            reduz,
            aoCeuPronto: () => setCeuPronto(true),
            aoMetalPronto: () => setMetalPronto(true),
          }),
        )
        .then((m) => {
          if (cancelado) m.destruir();
          else shaders.current = m;
        });
    }

    const semMovimento = () => {
      setEstatico(true);
      d.varrer(1);
      requestAnimationFrame(() => {
        d.medir();
        d.desenhar(1);
      });
      const aoRedimensionar = () => {
        d.medir();
        d.desenhar(1);
      };
      addEventListener("resize", aoRedimensionar);
      desfazer.push(() => removeEventListener("resize", aoRedimensionar));
    };

    if (reduz) {
      void (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (!cancelado) semMovimento();
      });
    } else {
      void import("./movimento")
        .then(({ ligarMovimento }) =>
          ligarMovimento({
            raiz: r,
            caixaCeu: caixaCeu.current,
            titulo: titulo.current,
            slug: slug.current,
            secaoDia: secaoDia.current,
            dia: d,
            shaders: () => shaders.current,
            cancelado: () => cancelado,
          }),
        )
        .then((desligar) => {
          if (cancelado) desligar();
          else desfazer.push(desligar);
        })
        .catch((e) => {
          // Rede ruim no navegador do Instagram: a página fica inteira, só parada.
          console.warn("[site] movimento indisponível", e);
          document.documentElement.classList.add("solta");
          if (!cancelado) semMovimento();
        });
    }

    return () => {
      cancelado = true;
      desfazer.reverse().forEach((f) => f());
      shaders.current?.destruir();
      shaders.current = null;
    };
  }, []);

  function alternarTema(e: React.MouseEvent) {
    const html = document.documentElement;
    const atual = html.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const prox = atual === "dark" ? "light" : "dark";
    const aplicar = () => {
      html.dataset.theme = prox;
      try {
        localStorage.setItem(CHAVE_TEMA, prox);
      } catch {}
      shaders.current?.atualizarCores();
      dia.current?.atualizarCores();
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      aplicar();
      return;
    }
    const x = e.clientX || innerWidth - 40,
      y = e.clientY || 30;
    const raio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc
      .startViewTransition(aplicar)
      .ready.then(() => {
        html.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(0.77, 0, 0.175, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }

  const { maarkio, bela, landing, juntos } = PRODUTOS;
  const { video, foto } = MATERIAL.arthur;
  const duvidas = [
    ...DUVIDAS.fixas,
    ...(MATERIAL.prazo ? [{ q: DUVIDAS.prazo, a: `${MATERIAL.prazo[0].toUpperCase()}${MATERIAL.prazo.slice(1)}. Na primeira conversa eu te digo o prazo do teu caso.` }] : []),
    ...(MATERIAL.contrato ? [{ q: DUVIDAS.contrato, a: MATERIAL.contrato }] : []),
  ];

  return (
    <div ref={raiz} className="raiz">
      <div className="progresso" aria-hidden="true" />
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>

      <header className="nav">
        <a className="caixa marca" href="#topo" aria-label="SAtomiq, voltar ao topo">
          <Logo />
        </a>
        <nav className="nav-meio" aria-label="Seções">
          {NAV.map((n) => (
            <a key={n.href} className="caixa" href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav-fim">
          <button className="caixa caixa-icone tema" type="button" aria-label="Alternar tema claro e escuro" onClick={alternarTema}>
            <Icone nome="sun" className="ico sol" />
            <Icone nome="moon" className="ico lua" />
          </button>
          <BotaoZap className="caixa caixa-tinta nav-cta" />
        </div>
      </header>

      <main id="conteudo">
        {/* ─────────── topo ─────────── */}
        <section className="hero" id="topo">
          <div ref={caixaCeu} className="hero-ceu">
            <div ref={ceu} className={cx("hero-shader", ceuPronto && "pronto")} aria-hidden="true" />
            <Janela titulo={HERO.bela.titulo} className="j-bela" arrasta rotulo={HERO.bela.rotulo}>
              <div className="chat">
                <div className="balao balao-cliente">
                  <Audio duracao={HERO.bela.audio} />
                  <span className="balao-hora">{HERO.bela.horaCliente}</span>
                </div>
                <p className="balao balao-bela">
                  {HERO.bela.resposta}
                  <span className="balao-hora">{HERO.bela.horaBela}</span>
                </p>
              </div>
            </Janela>
            <Janela titulo={HERO.agenda.titulo} className="j-agenda" arrasta rotulo={HERO.agenda.rotulo}>
              <span className="grande">{HERO.agenda.servico}</span>
              <span>
                <Amanha />
              </span>
              <span className="miudo">{HERO.agenda.nota}</span>
              <a className="pxbotao" href="#produtos">
                {HERO.agenda.botao}
              </a>
            </Janela>
            <Janela titulo={HERO.log.titulo} className="j-log" arrasta rotulo={HERO.log.rotulo}>
              <ol className="log">
                {ULTIMOS.slice(0, 3).map((c, i) => (
                  <li key={i}>
                    <span className="log-meta">
                      {c.data} · {c.repo}
                    </span>
                    {c.msg}
                  </li>
                ))}
              </ol>
            </Janela>
          </div>

          <div className="hero-texto">
            <p className="hero-linha entra">
              <span>{HERO.quem}</span>
              <span className="pontilhado" aria-hidden="true" />
              <span>{HERO.oque}</span>
            </p>
            <h1 ref={titulo} className="hero-titulo entra">
              <span className="linha">{HERO.linhas[0]}</span>
              <span className="linha">
                {HERO.linhas[1].split(HERO.destaque)[0]}
                <em>{HERO.destaque}</em>
                {HERO.linhas[1].split(HERO.destaque)[1]}
              </span>
            </h1>
            <div className="hero-base">
              <p className="hero-sub entra">{HERO.sub}</p>
              <div ref={heroCtas} className="hero-ctas entra">
                <BotaoZap className="botao-claro" />
                <a className="botao botao-fio-claro" href="#produtos">
                  {HERO.secundario}
                  <Icone nome="arrow-down" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── recado ─────────── */}
        <section ref={recado} className="recado secao grade12" id="recado" aria-labelledby="recado-titulo">
          <div className="recado-cabeca" data-revela="">
            <h2 className="titulo-secao" id="recado-titulo">
              {RECADO.titulo}
            </h2>
            <p className="recado-texto">{RECADO.corpo}</p>
            <dl className="fatos">
              {RECADO.fatos.map((f) => (
                <div key={f.t}>
                  <dt>{f.t}</dt>
                  <dd>{f.d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Recado />
        </section>

        {/* ─────────── um dia em pontos ─────────── */}
        <section ref={secaoDia} className={cx("dia", estatico && "dia-estatico")} id="dia" aria-labelledby="dia-titulo">
          <div className="dia-palco">
            <div className="dia-texto">
              <div className="dia-cabeca">
                <p className="rotulo">{DIA.rotulo}</p>
                <div ref={passos} className="passos">
                  {DIA.passos.map((p, i) => (
                    <div key={p.titulo} className={cx("passo", i === 0 && "ativo")}>
                      <h2 id={i === 0 ? "dia-titulo" : undefined}>{p.titulo}</h2>
                      <p>{p.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="dia-pe">
                <div ref={trilho} className="trilho" aria-hidden="true">
                  <span><i /></span>
                  <span><i /></span>
                  <span><i /></span>
                  <span><i /></span>
                </div>
                <dl className="contas">
                  <div>
                    <dt>{DIA.contas.total}</dt>
                    <dd ref={cTotal}>0</dd>
                  </div>
                  <div className="conta-sem">
                    <dt>{DIA.contas.sem}</dt>
                    <dd ref={cSem}>0</dd>
                  </div>
                  <div>
                    <dt>{DIA.contas.bela}</dt>
                    <dd ref={cBela}>0</dd>
                  </div>
                  <div>
                    <dt>{DIA.contas.voce}</dt>
                    <dd ref={cVoce}>0</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="dia-mapa">
              <canvas
                ref={mapa}
                role="img"
                aria-label="Mostrador de 24 horas com as mensagens de um dia de exemplo. Muitas chegam fora do horário de atendimento; a Bela responde todas, e as que precisam de gente passam pra você com resumo."
              />
              <div className="dia-legenda" aria-hidden="true">
                <span><i className="leg-msg" />{DIA.legenda.msg}</span>
                <span><i className="leg-sem" />{DIA.legenda.sem}</span>
                <span><i className="leg-bela" />{DIA.legenda.bela}</span>
                <span><i className="leg-voce" />{DIA.legenda.voce}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── o que eu faço ─────────── */}
        <section className="produtos secao" id="produtos" aria-labelledby="produtos-titulo">
          <h2 className="titulo-secao" id="produtos-titulo" data-revela="">
            {PRODUTOS.titulo}
          </h2>
          <div className="bento">
            <article className="celula c-maarkio" data-celula="" aria-labelledby="maarkio-titulo">
              <p className="rotulo">{maarkio.rotulo}</p>
              <h3 id="maarkio-titulo">{maarkio.titulo}</h3>
              <p className="celula-texto">{maarkio.texto}</p>
              <p className="link-url" aria-label="Exemplo de link de agendamento: maarkio.com/teu-salao">
                <span className="link-dominio" aria-hidden="true">maarkio.com/</span>
                <span ref={slug} className="link-slug" aria-hidden="true">teu-salao</span>
              </p>
              <Janela titulo="maarkio.com/teu-salao" className="mini-agenda" rotulo="Exemplo da página de agendamento">
                <div className="mini-servicos">
                  {maarkio.demo.servicos.map(([s, t], i) => (
                    <span key={s} className={cx("mini-chip", i === 1 && "escolhido")}>
                      {s}
                      <small>{t}</small>
                    </span>
                  ))}
                </div>
                <div className="mini-dias">
                  {maarkio.demo.dias.map((d, i) => (
                    <span key={d} className={cx("mini-dia", i === 1 && "escolhido")}>
                      {d}
                    </span>
                  ))}
                </div>
                <div className="mini-pontos" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <i key={i} className={i === 5 ? "marcado" : [1, 2, 8].includes(i) ? "ocupado" : undefined} />
                  ))}
                </div>
              </Janela>
              <dl className="fatos-produto">
                {maarkio.fatos.map(([t, d]) => (
                  <div key={t}>
                    <dt>{t}</dt>
                    <dd>{d}</dd>
                  </div>
                ))}
              </dl>
              <Numeros numeros={MATERIAL.maarkio.numeros} depoimento={MATERIAL.maarkio.depoimento} nome="Maarkio" />
              <div className="celula-ctas">
                <BotaoZap extra={maarkio.ctaMsg}>{maarkio.cta}</BotaoZap>
                <a className="link-seta" href={LINKS.maarkio} target="_blank" rel="noopener">
                  {maarkio.site}
                  <Icone nome="arrow-up-right" />
                </a>
              </div>
              <p className="por-dentro">
                <span>por dentro</span>
                {maarkio.porDentro}
              </p>
            </article>

            <article className="celula c-bela" data-celula="" aria-labelledby="bela-titulo">
              <div ref={fundoBela} className="fundo-shader" aria-hidden="true" />
              <p className="rotulo">{bela.rotulo}</p>
              <h3 id="bela-titulo">{bela.titulo}</h3>
              <p className="celula-texto">{bela.texto}</p>
              <div className="conversa">
                <Janela titulo="WhatsApp · Carla" rotulo="Exemplo de conversa da Bela">
                  <div className="chat">
                    <p className="balao balao-cliente">
                      {bela.chat.pergunta}
                      <span className="balao-hora">{bela.chat.hora}</span>
                    </p>
                    <p className="balao balao-bela">
                      {bela.chat.resposta}
                      <span className="balao-hora">{bela.chat.horaResp}</span>
                    </p>
                  </div>
                </Janela>
                <Janela titulo={bela.painel.titulo} className="j-painel" rotulo="Exemplo do painel recebendo a conversa">
                  <p className="painel-quem">
                    <strong>{bela.painel.quem}</strong>
                    <span className="selo">resumo pronto</span>
                  </p>
                  <p className="painel-resumo">{bela.painel.resumo}</p>
                  <span className="pxbotao">
                    <Icone nome="microphone" className="ico" />
                    {bela.painel.responder}
                  </span>
                </Janela>
              </div>
              <Numeros numeros={MATERIAL.bela.numeros} depoimento={MATERIAL.bela.depoimento} nome="Bela" />
              <div className="celula-ctas">
                <BotaoZap className="botao-claro" extra={bela.ctaMsg}>
                  {bela.cta}
                </BotaoZap>
              </div>
              <p className="por-dentro">
                <span>por dentro</span>
                {bela.porDentro}
              </p>
            </article>

            <article className="celula c-landing" data-celula="" aria-labelledby="landing-titulo">
              <div className="landing-texto">
                <p className="rotulo">{landing.rotulo}</p>
                <h3 id="landing-titulo">{landing.titulo}</h3>
                <p className="celula-texto">{landing.texto}</p>
                <div className="celula-ctas">
                  <BotaoZap extra={landing.ctaMsg}>{landing.cta}</BotaoZap>
                </div>
              </div>
              <div className="navegadores" aria-hidden="true">
                <div className="navegador nav-satomiq">
                  <span className="navegador-barra">satomiq.com</span>
                  <span className="navegador-tela">
                    <b>Cê me conta.</b>
                    <b>
                      Eu <em>construo</em>.
                    </b>
                    <i className="navegador-botao" />
                  </span>
                </div>
                <a className="navegador nav-maarkio" href={LINKS.maarkio} target="_blank" rel="noopener" tabIndex={-1}>
                  <span className="navegador-barra">maarkio.com</span>
                  <span className="navegador-tela">
                    <span className="navegador-ceu" />
                    <b>Chega de</b>
                    <b>
                      <em>“tem horário?”</em>
                    </b>
                    <i className="navegador-botao" />
                  </span>
                </a>
              </div>
            </article>

            <article className="celula c-juntos" data-celula="" aria-labelledby="juntos-titulo">
              <p className="rotulo">{juntos.rotulo}</p>
              <h3 id="juntos-titulo">{juntos.titulo}</h3>
              <p className="celula-texto">{juntos.texto}</p>
              <p className="juntos-fio" aria-hidden="true">
                <span>Bela · conversa</span>
                <i />
                <span>Maarkio · agenda</span>
              </p>
              <div className="celula-ctas">
                <BotaoZap className="botao-tinta" extra={juntos.ctaMsg}>
                  {juntos.cta}
                </BotaoZap>
              </div>
            </article>
          </div>
        </section>

        {/* ─────────── diário ─────────── */}
        <section className="diario secao grade12" id="diario" aria-labelledby="diario-titulo">
          <div className="diario-cabeca" data-revela="">
            <h2 className="titulo-secao" id="diario-titulo">
              {DIARIO_TXT.titulo}
            </h2>
            <p>{DIARIO_TXT.corpo}</p>
            <dl className="diario-contas">
              {DIARIO_TXT.contas.map(([v, t]) => (
                <div key={t}>
                  <dt>{t}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="diario-corpo" data-revela="">
            <Diario />
          </div>
        </section>

        {/* ─────────── como funciona ─────────── */}
        <section className="como secao" id="como" aria-labelledby="como-titulo">
          <div className="como-cabeca grade12" data-revela="">
            <h2 className="titulo-secao" id="como-titulo">
              {COMO.titulo}
            </h2>
            <div className="como-voce">
              <p>{COMO.voce}</p>
              {MATERIAL.prazo ? (
                <p className="como-prazo">
                  {COMO.prazo} <b>{MATERIAL.prazo}</b>
                </p>
              ) : (
                <Pendente rotulo="prazo típico, do sim ao ar" />
              )}
            </div>
          </div>
          <ol className="como-passos">
            {COMO.passos.map((p, i) => (
              <li key={p.nome} data-celula="">
                <span className="como-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="como-quando">{p.quando}</span>
                <h3>{p.nome}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─────────── preço ─────────── */}
        <section className="preco secao grade12" id="preco" aria-labelledby="preco-titulo">
          <div className="preco-texto" data-revela="">
            <h2 className="titulo-secao" id="preco-titulo">
              {PRECO.titulo}
            </h2>
            <p>{PRECO.corpo}</p>
            <div ref={ctaPreco}>
              <BotaoZap extra={PRECO.ctaMsg}>{PRECO.cta}</BotaoZap>
            </div>
            {MATERIAL.garantia ? (
              <p className="garantia">
                <span>{PRECO.garantia}</span>
                {MATERIAL.garantia}
              </p>
            ) : (
              <Pendente rotulo="garantia (se você oferecer)" />
            )}
            <aside className="nao-vale">
              <h3>{PRECO.naoVale.titulo}</h3>
              <p>{PRECO.naoVale.texto}</p>
            </aside>
          </div>
          <div className="cardapio-lugar" data-revela="">
            <div className="cardapio" aria-label="Cardápio de preços">
              <div className="cardapio-cab">
                <Logo className="logo cardapio-logo" />
                <span>{PRECO.cardapio}</span>
              </div>
              <ul>
                {PRECO.itens.map((it) => {
                  const preco = it.chave ? MATERIAL.preco[it.chave] ?? it.preco : it.preco;
                  const combinar = preco === PRECO.aCombinar;
                  return (
                    <li key={it.nome}>
                      <span>{it.nome}</span>
                      <span className="lider" aria-hidden="true" />
                      <span className={cx("cardapio-preco", combinar && "a-combinar")}>{preco}</span>
                    </li>
                  );
                })}
              </ul>
              {rascunho && (!MATERIAL.preco.bela || !MATERIAL.preco.landing) && <Pendente rotulo="preço da Bela e da landing page (opcional)" />}
              <p className="cardapio-pe">{PRECO.pe}</p>
            </div>
          </div>
        </section>

        {/* ─────────── quem constrói ─────────── */}
        <section className="arthur secao grade12" id="arthur" aria-labelledby="arthur-titulo">
          <div className="arthur-texto" data-revela="">
            <h2 className="titulo-secao" id="arthur-titulo">
              {ARTHUR.titulo}
            </h2>
            {ARTHUR.corpo.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="arthur-insta">
              {ARTHUR.instagram}{" "}
              <a href={LINKS.instagram} target="_blank" rel="noopener">
                {LINKS.instagramHandle}
                <Icone nome="arrow-up-right" />
              </a>
            </p>
          </div>
          <div className="arthur-midia" data-revela="">
            {video ? (
              <Janela titulo={ARTHUR.janelaVideo} className={cx("j-video", video.proporcao === "3/4" && "em-pe")}>
                <Video src={video.src} poster={video.poster} legenda={video.legenda} />
              </Janela>
            ) : foto ? (
              <Janela titulo={ARTHUR.janelaFoto} className="j-video">
                <img src={foto} alt="Arthur Silveira" width={1440} height={1080} loading="lazy" className="arthur-foto" />
              </Janela>
            ) : (
              <>
                <Pendente rotulo="vídeo 4:3, 40 a 60s (ou um retrato 4:3)" className="pendente-video" />
                <blockquote className="arthur-citacao">
                  {ARTHUR.citacao[0]}
                  <br />
                  <em>{ARTHUR.citacao[1]}</em>
                </blockquote>
              </>
            )}
          </div>
        </section>

        {/* ─────────── dúvidas ─────────── */}
        <section className="duvidas secao grade12" id="duvidas" aria-labelledby="duvidas-titulo">
          <h2 className="titulo-secao" id="duvidas-titulo">
            {DUVIDAS.titulo}
          </h2>
          <div className="duvidas-lista" data-revela="">
            {duvidas.map((d, i) => (
              <details key={d.q} open={i === 0}>
                <summary>
                  {d.q}
                  <Icone nome="plus" />
                </summary>
                <p>{d.a}</p>
              </details>
            ))}
            {!MATERIAL.prazo && <Pendente rotulo="resposta: quanto tempo leva" />}
            {!MATERIAL.contrato && <Pendente rotulo="resposta: tem fidelidade?" />}
          </div>
        </section>

        {/* ─────────── fim ─────────── */}
        <section className="fim" aria-labelledby="fim-titulo">
          <div className={cx("metal", metalPronto && "pronto")} aria-hidden="true">
            <svg viewBox="7 7 34 34">
              <path fillRule="evenodd" d={LOSANGO} fill="var(--latao)" />
            </svg>
            <div ref={metalShader} className="metal-shader" />
          </div>
          <h2 id="fim-titulo">{FIM.titulo}</h2>
          <p>{FIM.corpo}</p>
          <div ref={ctaFim}>
            <BotaoZap />
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="rodape-linha">
          <span>© 2026 · {RODAPE.assinatura}</span>
          <nav aria-label="Rodapé">
            <a href={LINKS.instagram} target="_blank" rel="noopener">
              <Icone nome="instagram-logo" />
              {LINKS.instagramHandle}
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener">
              <Icone nome="github-logo" />
              GitHub
            </a>
            <a href={LINKS.maarkio} target="_blank" rel="noopener">
              maarkio.com
            </a>
            <a href="#topo">{RODAPE.topo}</a>
          </nav>
        </div>
        <p className="rodape-marca" aria-hidden="true">
          SAtomiq
        </p>
      </footer>

      <div className={cx("barra-cta", barraVisivel && "visivel")}>
        <BotaoZap />
      </div>
    </div>
  );
}

function Video({ src, poster, legenda }: { src: string; poster: string; legenda?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  return (
    <div className="video">
      <video ref={ref} src={tocando ? src : undefined} poster={poster} controls={tocando} playsInline preload="none" aria-label={ARTHUR.video}>
        {legenda && <track kind="captions" src={legenda} srcLang="pt-BR" label="Português" default />}
      </video>
      {!tocando && (
        <button
          type="button"
          className="video-play"
          onClick={() => {
            setTocando(true);
            requestAnimationFrame(() => ref.current?.play());
          }}
          aria-label={`Assistir: ${ARTHUR.video}`}
        >
          <span>
            <Icone nome="play" />
          </span>
        </button>
      )}
    </div>
  );
}

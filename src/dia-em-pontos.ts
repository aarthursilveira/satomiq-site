/**
 * "Cada ponto é uma mensagem": um dia de exemplo no WhatsApp de um negócio
 * de beleza, desenhado em canvas como um mostrador de 24 horas. Meia-noite
 * em cima, meio-dia embaixo; cada hora é uma fatia, e as mensagens daquela
 * hora empilham pra fora em duas colunas.
 *
 * O progresso `p` (0 a 1) vem do pino de rolagem e conta quatro passos:
 *
 *   0,00–0,20  o dia (a varredura de entrada é separada, ver `varrer`)
 *   0,20–0,45  o ponteiro dá a volta e acende de tijolo o que ficou sem resposta
 *   0,45–0,72  dá a volta de novo, e a Bela responde tudo, na ordem em que chegou
 *   0,72–1,00  o que precisa de gente ganha o anel: passou pra você, com resumo
 *
 * Os números do painel ao lado saem do MESMO estado desenhado: nada é contado
 * à parte. O dia é fictício e determinístico (semente fixa), e a seção diz
 * isso na legenda. Mesma construção da semana em pontos do maarkio.com.
 */

// Mensagens por hora, da meia-noite às 23h. Movimento de um dia comum:
// pico no fim da tarde, cauda de madrugada.
const POR_HORA = [1, 1, 0, 0, 0, 0, 1, 3, 5, 6, 7, 6, 5, 4, 5, 6, 6, 7, 8, 9, 7, 5, 3, 2];
const ABRE = 9;
const FECHA = 19;

type Msg = { h: number; min: number; k: number; sem: boolean; voce: boolean };

export type Painel = {
  passos: HTMLElement[];
  trilhos: HTMLElement[];
  total: HTMLElement;
  sem: HTMLElement;
  bela: HTMLElement;
  voce: HTMLElement;
  classeAtivo: string;
};

function mulberry32(semente: number) {
  let a = semente;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const dd = (n: number) => String(n).padStart(2, "0");

function montaDia(): Msg[] {
  const rnd = mulberry32(20261006);
  const msgs: Msg[] = [];
  POR_HORA.forEach((n, h) => {
    const mins = Array.from({ length: n }, () => Math.floor(rnd() * 60)).sort((a, b) => a - b);
    mins.forEach((min, k) => {
      const aberto = h >= ABRE && h < FECHA;
      // Fora do horário ninguém responde; dentro, a mão está no cabelo de alguém.
      const sem = !aberto || rnd() < 0.45;
      msgs.push({ h, min, k, sem, voce: rnd() < 0.1 });
    });
  });
  return msgs;
}

export function criarDia(canvas: HTMLCanvasElement, raiz: HTMLElement, painel: Painel) {
  const ctx = canvas.getContext("2d");
  const msgs = montaDia();
  const tempo = (m: Msg) => m.h + m.min / 60;
  const totalSem = msgs.filter((m) => m.sem).length;
  const totalVoce = msgs.filter((m) => m.voce).length;

  let W = 0,
    H = 0,
    ultimoP = 0,
    varredura = 0,
    passoAtual = 0;
  let cor = { claro: "#EFE6D6", latao: "#B8924A", tijolo: "#B0553C" };
  let fonte = { pixel: "monospace", mono: "monospace" };

  function lerEstilo() {
    const cs = getComputedStyle(raiz);
    const v = (n: string, d: string) => cs.getPropertyValue(n).trim() || d;
    cor = { claro: v("--claro", cor.claro), latao: v("--latao", cor.latao), tijolo: v("--tijolo", cor.tijolo) };
    fonte = { pixel: v("--f-ponto", "monospace"), mono: v("--f-mono", "monospace") };
  }

  function medir() {
    if (!ctx) return;
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width;
    H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function desenhar(p: number) {
    ultimoP = p;
    if (!ctx || !W || !H) return;
    ctx.clearRect(0, 0, W, H);
    const S = Math.min(W, H);
    const cx = W / 2,
      cy = H / 2;
    const R0 = S * 0.235;
    const passoR = S * 0.043;
    const r = Math.max(2, S * 0.0125);
    const ang = (t: number) => (t / 24) * Math.PI * 2 - Math.PI / 2;
    const fatia = (Math.PI * 2) / 24;
    const pos = (m: Msg) => {
      const lado = m.k % 2 === 0 ? -0.22 : 0.22;
      const a = ang(m.h + 0.5) + lado * fatia;
      const rr = R0 + Math.floor(m.k / 2) * passoR;
      return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const;
    };

    // ponteiros dos passos 2 e 3
    const f2 = clamp01((p - 0.2) / 0.22);
    const f3 = clamp01((p - 0.47) / 0.23);
    const f4 = clamp01((p - 0.74) / 0.2);
    const ponteiro = p < 0.2 ? -1 : p < 0.45 ? f2 * 24 : p < 0.72 ? f3 * 24 : -1;

    // 1. o mostrador: anel do horário de atendimento e as horas
    const Ra = R0 - S * 0.045;
    ctx.lineCap = "butt";
    ctx.lineWidth = Math.max(1.5, S * 0.006);
    ctx.strokeStyle = cor.claro;
    ctx.globalAlpha = 0.18 * varredura;
    ctx.setLineDash([2, 5]);
    ctx.beginPath();
    ctx.arc(cx, cy, Ra, ang(FECHA), ang(ABRE + 24));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.85 * varredura;
    ctx.strokeStyle = cor.latao;
    ctx.beginPath();
    ctx.arc(cx, cy, Ra, ang(ABRE), ang(ABRE + (FECHA - ABRE) * varredura));
    ctx.stroke();

    ctx.globalAlpha = 0.6 * varredura;
    ctx.fillStyle = cor.claro;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${S < 420 ? 10 : 11}px ${fonte.mono}`;
    const Rl = R0 + 4 * passoR + S * 0.055;
    for (let h = 0; h < 24; h += 3) {
      const a = ang(h);
      ctx.fillText(`${h}h`, cx + Math.cos(a) * Rl, cy + Math.sin(a) * Rl);
    }
    // o rótulo do anel, embaixo do miolo, dentro do arco do horário
    ctx.globalAlpha = 0.85 * varredura;
    ctx.fillStyle = cor.latao;
    ctx.fillText(`aberto ${ABRE}h às ${FECHA}h`, cx, cy + S * 0.108);
    ctx.globalAlpha = 1;

    // 2. as mensagens
    let sem = 0,
      bela = 0,
      voce = 0;
    msgs.forEach((m, i) => {
      const t = tempo(m);
      const atraso = (i / msgs.length) * 0.8;
      const a = clamp01((varredura * 1.25 - atraso) / 0.2);
      if (a <= 0) return;
      const [x, y] = pos(m);
      let preenchimento = cor.claro;
      let alfa = 0.82;
      let raio = r;
      if (p >= 0.2) {
        const respondida = p >= 0.72 || (p >= 0.45 && t <= ponteiro);
        const vista = p >= 0.45 || t <= ponteiro;
        if (respondida) {
          preenchimento = cor.latao;
          alfa = 1;
          bela++;
        } else if (m.sem && vista) {
          preenchimento = cor.tijolo;
          alfa = 1;
          raio = r * 1.12;
          sem++;
        }
      }
      ctx.beginPath();
      ctx.arc(x, y, raio * (0.4 + 0.6 * easeOut(a)), 0, Math.PI * 2);
      ctx.globalAlpha = alfa * a;
      ctx.fillStyle = preenchimento;
      ctx.fill();

      // 3. passou pra você: um anel por fora, que cresce
      if (m.voce && f4 > 0) {
        const ordem = msgs.filter((n) => n.voce).indexOf(m) / totalVoce;
        const g = clamp01((f4 - ordem * 0.7) / 0.3);
        if (g > 0) {
          voce++;
          ctx.beginPath();
          ctx.arc(x, y, r * (1.2 + 1.1 * easeOut(g)), 0, Math.PI * 2);
          ctx.globalAlpha = g;
          ctx.lineWidth = Math.max(1.4, S * 0.004);
          ctx.strokeStyle = cor.claro;
          ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;

    // 4. o ponteiro e o miolo
    if (ponteiro >= 0) {
      const a = ang(ponteiro);
      ctx.strokeStyle = p < 0.45 ? cor.tijolo : cor.latao;
      ctx.lineWidth = Math.max(1.5, S * 0.005);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * R0 * 0.62, cy + Math.sin(a) * R0 * 0.62);
      ctx.lineTo(cx + Math.cos(a) * (R0 + 5 * passoR), cy + Math.sin(a) * (R0 + 5 * passoR));
      ctx.stroke();
    }
    ctx.fillStyle = cor.claro;
    ctx.textAlign = "center";
    ctx.globalAlpha = varredura;
    const grande = `500 ${Math.round(S * 0.085)}px ${fonte.pixel}`;
    const miudo = `${S < 420 ? 10 : 12}px ${fonte.mono}`;
    let centro = "24h",
      legenda = "um dia";
    if (ponteiro >= 0) {
      const hh = Math.min(23, Math.floor(ponteiro));
      const mm = Math.min(59, Math.floor((ponteiro - hh) * 60));
      centro = `${dd(hh)}:${dd(mm)}`;
      legenda = p < 0.45 ? `${sem} sem resposta` : `${bela} respondidas`;
    } else if (p >= 0.72) {
      centro = String(voce);
      legenda = "pra você";
    }
    ctx.font = grande;
    ctx.fillText(centro, cx, cy - S * 0.012);
    ctx.font = miudo;
    ctx.globalAlpha = 0.72 * varredura;
    ctx.fillText(legenda, cx, cy + S * 0.06);
    ctx.globalAlpha = 1;

    // painel: contas e passo, do mesmo estado
    const vistas = Math.round(msgs.length * clamp01(varredura));
    painel.total.textContent = String(vistas);
    painel.sem.textContent = String(sem);
    painel.bela.textContent = String(bela);
    painel.voce.textContent = String(voce);
    painel.sem.parentElement?.toggleAttribute("data-zero", p >= 0.72 && sem === 0);
    const passo = p < 0.2 ? 0 : p < 0.45 ? 1 : p < 0.72 ? 2 : 3;
    if (passo !== passoAtual) {
      painel.passos[passoAtual]?.classList.remove(painel.classeAtivo);
      painel.passos[passo]?.classList.add(painel.classeAtivo);
      passoAtual = passo;
    }
    const faixas = [
      [0, 0.2],
      [0.2, 0.45],
      [0.45, 0.72],
      [0.72, 1],
    ];
    painel.trilhos.forEach((el, k) => {
      el.style.transform = `scaleX(${clamp01((p - faixas[k][0]) / (faixas[k][1] - faixas[k][0]))})`;
    });
  }

  lerEstilo();
  return {
    medir,
    desenhar,
    varrer: (v: number) => {
      varredura = v;
      desenhar(ultimoP);
    },
    atualizarCores: () => {
      lerEstilo();
      desenhar(ultimoP);
    },
    totais: { mensagens: msgs.length, sem: totalSem, voce: totalVoce },
  };
}

export type Dia = ReturnType<typeof criarDia>;

// ──────────────────────────────────────────────────────────────
// O roteiro da demo "Testa aqui". Não é IA: é um roteiro por intenção.
//
// A divisão de trabalho é a de verdade:
//   · a Bela CONVERSA no WhatsApp: tira dúvida, entende áudio, sabe quando
//     chamar gente, e manda o link certo na hora certa;
//   · quem marca é o cliente, no link do Maarkio (agenda); quem pede é o
//     cliente, no cardápio do Gluten (PIX e comanda).
// Na demo o link abre dentro do celular, e o painel do dono mostra cada
// coisa com o nome da peça que fez.
// ──────────────────────────────────────────────────────────────
import type { SegmentoId } from "./segmentos";

export type Item = { id: string; quando: string; texto: string; novo?: boolean; viaLink?: boolean };
export type Comanda = { numero: string; itens: [string, string][]; total: string };

export type Evento =
  | { tipo: "item"; item: Item }
  | { tipo: "move"; id: string; quando: string }
  | { tipo: "comanda"; comanda: Comanda }
  | { tipo: "precisa"; quem: string; resumo: string }
  | { tipo: "log"; texto: string };

/** O que o link já leva escolhido (a Bela entendeu na conversa). */
export type Prefill = { servico?: string; dia?: string; nome?: string; remarca?: string };

export type Cartao = { tipo: "link"; prefill?: Prefill } | { tipo: "pix"; valor: string };

export type Resposta = { bolhas: string[]; chips?: string[]; eventos?: Evento[]; cartao?: Cartao };
export type Ctx = { etapa: string };

export type AppAgenda = {
  tipo: "agenda";
  titulo: string;
  endereco: string;
  servicos: { nome: string; info: string }[];
  dias: { nome: string; horarios: [string, boolean][] }[];
};
export type AppCardapio = {
  tipo: "cardapio";
  titulo: string;
  endereco: string;
  aviso: string;
  itens: { nome: string; detalhe: string; preco: number; grupo: "pizzas" | "bebidas" }[];
  entrega: number;
};

export type Roteiro = {
  dono: string;
  ola: string;
  chips: string[];
  audio: { duracao: string; transcricao: string };
  /** O link que a Bela manda e o que ele abre. */
  link?: { titulo: string; app: AppAgenda | AppCardapio };
  painel: { titulo: string; peca: string; vazio: string; itens: Item[]; comandas?: boolean };
  responde: (texto: string, ctx: Ctx) => { r: Resposta; ctx: Ctx };
};

/** Sugestão que abre o último link que a Bela mandou. */
export const ABRIR = "abrir o link";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const LIVRE: Ctx = { etapa: "livre" };

const PASSA = (dono: string, texto: string, quem = "Cliente do site"): Resposta => ({
  bolhas: [`Essa eu deixo com ${dono}: já passei tua mensagem com o resumo, e já já te respondem por aqui.`],
  eventos: [{ tipo: "precisa", quem, resumo: texto }],
  chips: [],
});

const OBRIGADO = /(obrigad|valeu|brigad|show|perfeito|otimo)/;
const OLA = /^(oi+|ola|opa|bom dia|boa tarde|boa noite|e ?ai|eae|hey)\b/;
const HUMANO = /(falar|chamar|conversar)\s+com|atendente|humano|pessoa de verdade|dona\b|dono\b|doutora|gerente/;
const MARCAR = /(horario|marcar|agendar|agenda|vaga|encaix|amanha|sabado|hoje|semana|tem como|disponivel)/;
const REMARCAR = /(remarc|desmarc|cancel|mudar|trocar)/;
const PRECO = /(quanto|valor|preco|custa|tabela)/;

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

// ── Salão: a Bela conversa, o Maarkio agenda ──────────────────────────────
const SERVICOS: [RegExp, string, string][] = [
  [/escova/, "Escova", "R$ 60"],
  [/luz|mecha/, "Luzes", "R$ 220"],
  [/barba/, "Barba", "R$ 40"],
  [/corte|cortar|cabelo/, "Corte", "R$ 70"],
];

const salao: Roteiro = {
  dono: "a dona",
  ola: "Oi! Aqui é a Bela, do Teu Salão. Quer marcar um horário ou tirar alguma dúvida?",
  chips: ["tem horário sábado de manhã?", "quanto custa uma escova?", "preciso remarcar", "quero falar com a dona"],
  audio: { duracao: "0:09", transcricao: "oi, tem como encaixar uma escova amanhã à tarde?" },
  link: {
    titulo: "Agendar · Teu Salão",
    app: {
      tipo: "agenda",
      titulo: "Teu Salão",
      endereco: "teusalao.com.br/agenda",
      servicos: [
        { nome: "Corte", info: "45 min · R$ 70" },
        { nome: "Escova", info: "40 min · R$ 60" },
        { nome: "Barba", info: "30 min · R$ 40" },
        { nome: "Luzes", info: "2h · a partir de R$ 220" },
      ],
      dias: [
        { nome: "hoje", horarios: [["14h", false], ["15h", true], ["16h30", true], ["18h", false]] },
        { nome: "amanhã", horarios: [["9h", true], ["10h30", false], ["14h", true], ["15h", false], ["16h30", true]] },
        { nome: "sábado", horarios: [["9h", true], ["10h30", true], ["13h", false], ["15h", true]] },
      ],
    },
  },
  painel: {
    titulo: "Agenda",
    peca: "Maarkio",
    vazio: "",
    itens: [
      { id: "rafael", quando: "amanhã 10h30", texto: "Corte · Rafael" },
      { id: "julia", quando: "amanhã 15h", texto: "Escova · Júlia" },
    ],
  },
  responde(texto) {
    const t = norm(texto);
    const servico = SERVICOS.find(([re]) => re.test(t));

    if (HUMANO.test(t)) return { r: PASSA("a dona", texto), ctx: LIVRE };
    if (REMARCAR.test(t))
      return {
        r: {
          bolhas: ["Claro! Remarca pelo mesmo link: escolhe o horário novo, e o antigo libera sozinho pra outra pessoa."],
          cartao: { tipo: "link", prefill: { nome: "Júlia", remarca: "julia", servico: "Escova" } },
          chips: [ABRIR],
        },
        ctx: LIVRE,
      };
    if (PRECO.test(t)) {
      const s = servico ?? SERVICOS[0];
      return {
        r: {
          bolhas: [`${s[1]} sai a partir de ${s[2]}, depende do comprimento.`, "Se quiser, te mando o link pra marcar."],
          chips: ["quero marcar", "e as luzes?"],
        },
        ctx: LIVRE,
      };
    }
    if (MARCAR.test(t) || servico || /quero/.test(t)) {
      const dia = /sabado/.test(t) ? "sábado" : /hoje/.test(t) ? "hoje" : "amanhã";
      const quando = /tarde/.test(t) ? `${dia} à tarde` : /manha|cedo/.test(t) ? `${dia} de manhã` : dia;
      return {
        r: {
          bolhas: [`Tem sim! ${cap(quando)} ainda tem horário. É só escolher aqui, leva um minutinho:`],
          cartao: { tipo: "link", prefill: { servico: servico?.[1], dia } },
          chips: [ABRIR],
        },
        ctx: LIVRE,
      };
    }
    if (OBRIGADO.test(t)) return { r: { bolhas: ["Imagina! Qualquer coisa, é só chamar."], chips: [] }, ctx: LIVRE };
    if (OLA.test(t)) return { r: { bolhas: [salao.ola], chips: salao.chips.slice(0, 3) }, ctx: LIVRE };
    return { r: PASSA("a dona", texto), ctx: LIVRE };
  },
};

// ── Clínica: a Bela conversa (e sabe o que é da doutora), o Maarkio agenda ─
const clinica: Roteiro = {
  dono: "a doutora",
  ola: "Oi! Aqui é a Bela, da Tua Clínica. Posso te ajudar com valores, dúvidas ou marcar uma avaliação.",
  chips: ["quero marcar uma avaliação", "quanto custa a limpeza de pele?", "tá vermelho depois do procedimento, é normal?"],
  audio: { duracao: "0:14", transcricao: "oi, fiz o peeling na terça e ainda tá descascando, é normal?" },
  link: {
    titulo: "Agendar · Tua Clínica",
    app: {
      tipo: "agenda",
      titulo: "Tua Clínica",
      endereco: "tuaclinica.com.br/agenda",
      servicos: [
        { nome: "Avaliação", info: "30 min · sem custo" },
        { nome: "Limpeza de pele", info: "60 min · R$ 180" },
        { nome: "Peeling", info: "45 min · R$ 250" },
      ],
      dias: [
        { nome: "terça", horarios: [["9h", false], ["11h", true], ["14h", true], ["16h", true]] },
        { nome: "quarta", horarios: [["9h", true], ["10h", false], ["14h", true], ["17h", false]] },
        { nome: "quinta", horarios: [["9h", true], ["10h30", true], ["15h", false], ["16h30", true]] },
      ],
    },
  },
  painel: {
    titulo: "Agenda",
    peca: "Maarkio",
    vazio: "",
    itens: [{ id: "fer", quando: "quarta 10h", texto: "Avaliação · Fernanda" }],
  },
  responde(texto) {
    const t = norm(texto);
    const saude = /(doi|dor|inchad|alergi|gravida|amament|remedio|vermelh|normal|reac|descasc|coceira|ardend|ferida|mancha)/;

    if (saude.test(t))
      return {
        r: {
          bolhas: ["Entendi. Isso quem responde é a doutora, não eu: já passei pra ela o teu relato, com o resumo.", "Se piorar ou doer muito, procura atendimento, tá?"],
          eventos: [{ tipo: "precisa", quem: "Dúvida de saúde", resumo: texto }],
          chips: [],
        },
        ctx: LIVRE,
      };
    if (HUMANO.test(t)) return { r: PASSA("a doutora", texto), ctx: LIVRE };
    if (REMARCAR.test(t))
      return {
        r: { bolhas: ["Claro! É pelo mesmo link: escolhe o horário novo e o antigo libera sozinho."], cartao: { tipo: "link" }, chips: [ABRIR] },
        ctx: LIVRE,
      };
    if (PRECO.test(t))
      return {
        r: {
          bolhas: ["Limpeza de pele a partir de R$ 180, peeling a partir de R$ 250.", "A avaliação com a doutora é sem custo. Quer o link pra marcar?"],
          chips: ["quero marcar uma avaliação"],
        },
        ctx: LIVRE,
      };
    if (/(avalia|consulta)/.test(t) || MARCAR.test(t) || /quero/.test(t))
      return {
        r: {
          bolhas: ["A avaliação é com a doutora e não tem custo. Escolhe o melhor horário aqui:"],
          cartao: { tipo: "link", prefill: { servico: "Avaliação" } },
          chips: [ABRIR],
        },
        ctx: LIVRE,
      };
    if (OBRIGADO.test(t)) return { r: { bolhas: ["Imagina! Até lá."], chips: [] }, ctx: LIVRE };
    if (OLA.test(t)) return { r: { bolhas: [clinica.ola], chips: clinica.chips }, ctx: LIVRE };
    return { r: PASSA("a doutora", texto), ctx: LIVRE };
  },
};

// ── Delivery: a Bela conversa, o Gluten vende ─────────────────────────────
const delivery: Roteiro = {
  dono: "o dono",
  ola: "Oi! Aqui é a Bela, da Tua Pizzaria. Hoje abre às 18h e vai até as 23h30. Bora pedir?",
  chips: ["quero pedir uma pizza", "entrega no Cambuí?", "cadê meu pedido?"],
  audio: { duracao: "0:07", transcricao: "boa noite, vocês entregam no Cambuí? até que horas?" },
  link: {
    titulo: "Cardápio · Tua Pizzaria",
    app: {
      tipo: "cardapio",
      titulo: "Tua Pizzaria",
      endereco: "tuapizzaria.com.br",
      aviso: "aberto até 23h30 · entrega R$ 6",
      itens: [
        { nome: "Calabresa", detalhe: "grande · calabresa, cebola, azeitona", preco: 54.9, grupo: "pizzas" },
        { nome: "Margherita", detalhe: "grande · mussarela, tomate, manjericão", preco: 52.9, grupo: "pizzas" },
        { nome: "Frango com catupiry", detalhe: "grande", preco: 58.9, grupo: "pizzas" },
        { nome: "Coca-Cola 2L", detalhe: "", preco: 12, grupo: "bebidas" },
        { nome: "Guaraná 2L", detalhe: "", preco: 10, grupo: "bebidas" },
      ],
      entrega: 6,
    },
  },
  painel: { titulo: "Cozinha", peca: "Gluten", vazio: "Nenhum pedido novo ainda.", itens: [], comandas: true },
  responde(texto) {
    const t = norm(texto);
    if (HUMANO.test(t)) return { r: PASSA("o dono", texto), ctx: LIVRE };
    if (/(cade|saiu|demora|chega|status|meu pedido)/.test(t))
      return { r: { bolhas: ["Olhei aqui: teu pedido #0141 saiu às 20:21 com o motoboy. Chega em uns 15 minutos."], chips: [] }, ctx: LIVRE };
    if (/(entreg|taxa|bairro|frete|cambui|centro)/.test(t))
      return {
        r: { bolhas: ["Entrego sim! Centro e Cambuí, taxa de R$ 6. Hoje até as 23h30."], chips: ["quero pedir uma pizza"] },
        ctx: LIVRE,
      };
    if (/(abre|fecha|horario|aberto|funciona|ate que horas)/.test(t)) return { r: { bolhas: ["Hoje abre às 18h e vai até as 23h30."], chips: [] }, ctx: LIVRE };
    if (/(pix|cartao|dinheiro|pagamento|pagar)/.test(t))
      return { r: { bolhas: ["PIX direto no cardápio, na hora do pedido. Ou cartão na entrega."], chips: [] }, ctx: LIVRE };
    if (/(cardapio|pizza|pedir|quero|sabores|menu|calabresa|margue?rita|frango|coca|guarana)/.test(t))
      return {
        r: {
          bolhas: ["Bora! É rapidinho pelo cardápio: escolhe, paga no PIX e já vai direto pra cozinha."],
          cartao: { tipo: "link" },
          chips: [ABRIR],
        },
        ctx: LIVRE,
      };
    if (OBRIGADO.test(t)) return { r: { bolhas: ["Valeu! Bom apetite."], chips: [] }, ctx: LIVRE };
    if (OLA.test(t)) return { r: { bolhas: [delivery.ola], chips: delivery.chips }, ctx: LIVRE };
    return { r: PASSA("o dono", texto), ctx: LIVRE };
  },
};

// ── Outro negócio: a Bela conversa e entrega pronto pro dono ──────────────
const outro: Roteiro = {
  dono: "o dono",
  ola: "Oi! Aqui é a Bela, do Teu Negócio. Posso ver orçamento, status de pedido ou segunda via.",
  chips: ["queria um orçamento", "meu pedido já saiu?", "preciso da segunda via do boleto"],
  audio: { duracao: "0:11", transcricao: "oi, queria saber se o meu pedido já foi despachado" },
  painel: { titulo: "Pra você aprovar", peca: "Bela", vazio: "Nada esperando você ✓", itens: [] },
  responde(texto, ctx) {
    const t = norm(texto);
    if (ctx.etapa === "orcamento" && !HUMANO.test(t))
      return {
        r: {
          bolhas: ["Fechado! Juntei tudo e passei pro dono aprovar.", "Ele te manda o orçamento ainda hoje, por aqui."],
          chips: ["obrigado!"],
          eventos: [
            { tipo: "item", item: { id: `n${Date.now()}`, quando: "orçamento", texto: texto.trim(), novo: true } },
            { tipo: "log", texto: "Bela · orçamento rascunhado, esperando tua aprovação" },
          ],
        },
        ctx: LIVRE,
      };
    if (HUMANO.test(t)) return { r: PASSA("o dono", texto), ctx: LIVRE };
    if (/(orcament|cotac|proposta|quanto|preco|valor|unidades)/.test(t))
      return {
        r: { bolhas: ["Claro! Pra eu montar: é o quê, quantas unidades e pra quando?"], chips: ["40 camisetas, pra dia 20"] },
        ctx: { etapa: "orcamento" },
      };
    if (/(pedido|entreg|rastreio|despach|chegou|saiu)/.test(t))
      return { r: { bolhas: ["Olhei aqui: teu pedido #2291 saiu ontem às 15h. Previsão de entrega: quinta."], chips: [] }, ctx: LIVRE };
    if (/(boleto|segunda via|fatura|pagar|pix|cobranca)/.test(t))
      return {
        r: {
          bolhas: ["Mandei a segunda via: R$ 480, vence dia 15. Se preferir, tem PIX também."],
          cartao: { tipo: "pix", valor: "480,00" },
          chips: [],
          eventos: [{ tipo: "log", texto: "Bela · segunda via enviada, R$ 480" }],
        },
        ctx: LIVRE,
      };
    if (/(horario|abre|fecha|atendem|funciona)/.test(t))
      return { r: { bolhas: ["Segunda a sexta, das 8h às 18h. Fora disso eu respondo e passo pra equipe."], chips: [] }, ctx: LIVRE };
    if (OBRIGADO.test(t)) return { r: { bolhas: ["Imagina! Qualquer coisa, é só chamar."], chips: [] }, ctx: LIVRE };
    if (OLA.test(t)) return { r: { bolhas: [outro.ola], chips: outro.chips }, ctx: LIVRE };
    return { r: PASSA("o dono", texto), ctx: LIVRE };
  },
};

export const ROTEIROS: Record<SegmentoId, Roteiro> = { salao, clinica, delivery, outro };

export const real = (v: number) => v.toFixed(2).replace(".", ",");

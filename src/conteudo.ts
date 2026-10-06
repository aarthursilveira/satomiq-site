// ──────────────────────────────────────────────────────────────
// Todo o texto do site mora aqui. Componente não escreve copy.
//
// Voz do Arthur: "cê", "teu", "zap", frase curta. Sem travessão no texto
// que vai pro ar (é o mesmo tique que a Bela foi proibida de usar).
//
// O que cada produto faz foi conferido no código, não suposto. A versão
// anterior deste site afirmava coisas que não existem (lembrete "na véspera",
// remarcar pelo link, a Bela mandando o link do Maarkio, endereço
// teusalao.com.br/agenda). O que ainda depende do Arthur confirmar está em
// MATERIAL.md, seção "Confirma pra mim".
//
//   Maarkio · só agenda. O cliente marca pelo link (maarkio.com/<slug>);
//     confirmação na hora, com link de cancelamento; lembrete antes do
//     horário, com antecedência configurável; Google Agenda; cliente fixo;
//     relatório semanal. R$ 97/mês, preço público em maarkio.com.
//   Bela (sistema Nectarq) · só atendimento no WhatsApp. Entende áudio,
//     passa a conversa pra profissional com resumo, e a profissional
//     responde pelo painel, inclusive em áudio. Não marca horário.
//   Os dois dão pra usar juntos.
//   Landing page sob demanda.
// ──────────────────────────────────────────────────────────────
import diario from "./lib/diario.json";

export const LINKS = {
  instagram: "https://instagram.com/arthursilveira.ai",
  instagramHandle: "@arthursilveira.ai",
  github: "https://github.com/aarthursilveira",
  maarkio: "https://maarkio.com/",
};

/** Abre toda mensagem que sai daqui pro zap: o Arthur sabe de onde veio. */
export const ABERTURA = "Fala Arthur, vim pelo satomiq.com.";

export const NAV = [
  { label: "O que eu faço", href: "#produtos" },
  { label: "Como funciona", href: "#como" },
  { label: "Preço", href: "#preco" },
  { label: "Dúvidas", href: "#duvidas" },
];

export const CTA = "Chamar no WhatsApp";

// ──────────────────────────────────────────────────────────────
// Topo
// ──────────────────────────────────────────────────────────────
export const HERO = {
  quem: "Arthur Silveira",
  oque: "agenda, atendimento e landing page",
  linhas: ["Cê me conta.", "Eu construo."],
  /** A palavra em latão dentro da segunda linha. */
  destaque: "construo",
  sub: "…e deixo rodando. Agenda que o cliente marca sozinho, WhatsApp respondido na hora e página que vende pelo teu negócio. Quem constrói sou eu, e quem cuida depois também.",
  secundario: "Ver o que eu faço",
  // As janelas soltas no céu: dramatização, com nome e horário de exemplo.
  bela: {
    titulo: "Bela · WhatsApp",
    rotulo: "Exemplo de conversa da Bela no WhatsApp",
    audio: "0:14",
    horaCliente: "23:47",
    resposta: "Oi, Carla! A limpeza de pele sai R$ 180 e leva uns 60 minutos. Quer que eu passe pra Lu olhar um horário pra você?",
    horaBela: "23:47 ✓✓",
  },
  agenda: {
    titulo: "Maarkio · novo agendamento",
    rotulo: "Exemplo de notificação de agendamento do Maarkio",
    servico: "Escova",
    nota: "com Bia, marcado pelo link às 02:14",
    botao: "Ver na agenda",
  },
  log: {
    titulo: "diario.log",
    rotulo: "As últimas alterações de código, de verdade",
  },
};

// ──────────────────────────────────────────────────────────────
// Recado: o "cê me conta" de verdade. Vai pronto pro zap.
// ──────────────────────────────────────────────────────────────
export const RECADO = {
  titulo: "Me conta o problema aqui.",
  corpo: "Do jeito que cê contaria pra um amigo. A mensagem vai pronta pro meu WhatsApp, e cê revisa antes de mandar.",
  fatos: [
    { t: "Quem responde", d: "Eu, o Arthur. Não é atendente nem robô." },
    { t: "Vinte minutos", d: "Uma conversa curta e cê sai sabendo se dá, quanto custa e o que eu faria primeiro." },
    { t: "Do jeito que der", d: "Texto, áudio, print. O que for mais fácil pra você." },
  ],
  janela: "recado.txt",
  negocio: "Tenho um…",
  negocios: [
    { id: "salao", nome: "salão", frase: "Tenho um salão." },
    { id: "barbearia", nome: "barbearia", frase: "Tenho uma barbearia." },
    { id: "clinica", nome: "clínica de estética", frase: "Tenho uma clínica de estética." },
    { id: "outro", nome: "outro negócio", frase: "" },
  ],
  assunto: "O que tá pegando",
  atalhos: [
    { nome: "agenda", texto: "Minha agenda é toda no WhatsApp e vive dando furo." },
    { nome: "atendimento", texto: "Chega mensagem demais no zap e eu não dou conta de responder rápido." },
    { nome: "landing page", texto: "Queria uma página pro meu negócio, pra pôr no link da bio." },
    { nome: "ainda não sei", texto: "Ainda não sei bem o que preciso, queria conversar." },
  ],
  rotulo: "Me conta aqui",
  // Escritos com a voz de quem chega, não com a minha.
  exemplos: [
    "minha agenda vive com furo e cliente que some…",
    "respondo a mesma pergunta quarenta vezes por dia…",
    "cliente chama de madrugada e ninguém responde…",
    "queria uma página bonita pro link da bio…",
  ],
  previa: "Vai chegar assim:",
  enviar: "Mandar no WhatsApp",
  nota: "Abre o WhatsApp com a mensagem pronta. Nada sai daqui sem você tocar em enviar.",
};

// ──────────────────────────────────────────────────────────────
// Um dia em pontos (seção fixa)
// ──────────────────────────────────────────────────────────────
export const DIA = {
  rotulo: "Dia de exemplo, o WhatsApp de um negócio de beleza",
  passos: [
    {
      titulo: "Cada ponto é uma mensagem.",
      texto: "Pergunta de preço, pedido de horário, áudio, foto de referência. Chega o dia inteiro, e não só no horário de atendimento.",
    },
    {
      titulo: "Muita chega quando ninguém pode responder.",
      texto: "Com a mão no cabelo de alguém, no almoço, depois de fechar. Quem pergunta e não ouve nada vai perguntar pro concorrente.",
    },
    {
      titulo: "A Bela responde na hora, do jeito da casa.",
      texto: "Texto ou áudio, de tarde ou de madrugada. Ela responde o que você combinou que ela responde.",
    },
    {
      titulo: "O que é com você chega com resumo.",
      texto: "Quando a conversa precisa de gente, a Bela passa pra você com o resumo pronto, e você responde pelo painel, até em áudio.",
    },
  ],
  contas: { total: "Mensagens", sem: "Sem resposta", bela: "Pela Bela", voce: "Pra você" },
  legenda: { msg: "mensagem", sem: "sem resposta", bela: "respondida", voce: "pra você" },
  aberto: "aberto",
};

// ──────────────────────────────────────────────────────────────
// O que eu faço
// ──────────────────────────────────────────────────────────────
export const PRODUTOS = {
  titulo: "Duas coisas prontas, e uma página sob medida.",
  maarkio: {
    rotulo: "Agenda por link · Maarkio",
    titulo: "O cliente marca sozinho.",
    texto: "Pelo link do teu salão ou barbearia, a qualquer hora, sem baixar nada. A confirmação sai na hora no WhatsApp do teu número, com link pra cancelar, e o lembrete chega antes do horário.",
    fatos: [
      ["R$ 97/mês", "por estabelecimento, tudo dentro"],
      ["Em produção", "com cliente pagando"],
      ["Google Agenda", "cliente fixo e resumo da semana"],
    ] as [string, string][],
    porDentro: "Se o WhatsApp travar no meio do envio, a mensagem não sai duas vezes, e eu fico sabendo na hora.",
    cta: "Quero o Maarkio",
    ctaMsg: "Vi o Maarkio no teu site e quero pro meu negócio.",
    site: "Conhecer em maarkio.com",
    // A demo estática da página de agendamento.
    demo: { servicos: [["Corte", "30 min"], ["Escova", "45 min"], ["Coloração", "2 h"]] as [string, string][], dias: ["qua", "qui", "sex", "sáb"] },
  },
  bela: {
    rotulo: "Atendimento no WhatsApp · Bela",
    titulo: "Ninguém fica sem resposta.",
    texto: "A Bela conversa com teu cliente no WhatsApp, entende áudio e responde do jeito da casa. Quando é com você, ela passa a conversa com o resumo pronto, e você responde pelo painel, até em áudio.",
    // A tela de custo é do painel de admin (nectar-painel/app/admin/custo), não do
    // dono do negócio: quem vê o custo é o Arthur.
    porDentro: "Eu acompanho quanto a IA custa, conversa por conversa. O custo não foge do controle.",
    cta: "Quero uma Bela",
    ctaMsg: "Vi a Bela no teu site e quero uma pro meu negócio.",
    chat: {
      pergunta: "tem horário sábado de manhã pra clareamento?",
      hora: "07:12",
      resposta: "Oi, Carla! Sábado de manhã quem faz clareamento é a Lu. Vou passar pra ela confirmar o horário com você, tá?",
      horaResp: "07:12 ✓✓",
    },
    painel: {
      titulo: "Painel · passou pra você",
      quem: "Carla",
      resumo: "Quer clareamento no sábado de manhã. Já sabe o preço, perguntou se pode levar a filha.",
      responder: "Responder em áudio",
    },
  },
  landing: {
    rotulo: "Landing page sob demanda",
    titulo: "Uma página que vende pelo teu negócio.",
    texto: "Feita pro celular e pro link da bio, com um caminho só: o botão que leva pro teu WhatsApp. Esta página e a do maarkio.com foram feitas assim.",
    cta: "Quero uma landing page",
    ctaMsg: "Vi o teu site e quero uma landing page pro meu negócio.",
  },
  juntos: {
    rotulo: "Bela + Maarkio",
    titulo: "Ou os dois juntos.",
    texto: "A Bela cuida da conversa. O Maarkio cuida da agenda. Cada um funciona sozinho, e juntos fecham o dia.",
    cta: "Quero os dois",
    ctaMsg: "Vi o teu site e quero a Bela e o Maarkio juntos.",
  },
  numeros: "Números de quem usa",
  depoimento: "Quem usa",
};

// ──────────────────────────────────────────────────────────────
// Diário: a prova de que alguém constrói isso todo dia.
// ──────────────────────────────────────────────────────────────
const dias = Object.keys(diario.porDia).sort();
const curta = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");

export const DIARIO_TXT = {
  titulo: "Eu construo todo dia.",
  corpo: "Cada ponto é um dia de trabalho. Quanto maior, mais alteração de código foi pro ar. As mensagens são as de verdade, com nome de cliente tirado antes de publicar.",
  contas: [
    [String(diario.total), "alterações de código"],
    [String(Object.keys(diario.porRepo).length), "projetos"],
    [curta(dias[dias.length - 1] ?? diario.geradoEm), "último ajuste"],
  ] as [string, string][],
  janela: "diario.log",
  rodape: `${curta(dias[0] ?? diario.desde)} a ${curta(diario.geradoEm)}`,
};

// ──────────────────────────────────────────────────────────────
// Como funciona
// ──────────────────────────────────────────────────────────────
export const COMO = {
  titulo: "Como é trabalhar comigo.",
  voce: "Tua parte é uma conversa e umas respostas sobre como teu negócio funciona. O resto é comigo.",
  prazo: "Do sim ao ar:",
  passos: [
    {
      nome: "Conversa",
      quando: "20 minutos",
      texto: "Cê me conta o problema, no zap ou numa chamada. Eu digo o que serve: o Maarkio, a Bela, os dois, uma landing page, ou nada disso.",
    },
    {
      nome: "Ajuste",
      quando: "antes de ligar",
      texto: "Deixo com a cara da casa: serviços, horários, o jeito da Bela falar e o que ela passa pra você. Você aprova antes de ir pro ar.",
    },
    {
      nome: "No ar",
      quando: "no teu número",
      texto: "Entra no teu WhatsApp e no teu link. Você conecta o número lendo um QR Code, igual ao WhatsApp Web.",
    },
    {
      nome: "Rodando",
      quando: "todo dia",
      texto: "Eu acompanho e ajusto o que precisar. Se uma mensagem não sai, o sistema me avisa na hora.",
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Preço: um cardápio, porque o perfil é de café.
// ──────────────────────────────────────────────────────────────
export const PRECO = {
  titulo: "Quanto custa.",
  corpo: "O que tem preço fechado tá aqui. O resto sai na conversa de vinte minutos, no tamanho do teu caso.",
  cta: "Quero saber o meu",
  ctaMsg: "Quero saber quanto fica pro meu caso.",
  cardapio: "cardápio",
  aCombinar: "na conversa",
  itens: [
    { nome: "Maarkio, agenda por link", preco: "R$ 97/mês" },
    { nome: "Bela, atendimento no WhatsApp", chave: "bela" as const, preco: "na conversa" },
    { nome: "Bela + Maarkio", preco: "na conversa" },
    { nome: "Landing page", chave: "landing" as const, preco: "na conversa" },
    { nome: "A primeira conversa", preco: "cortesia" },
  ],
  pe: "o café é por conta da casa",
  naoVale: {
    titulo: "Quando não vale me contratar",
    texto: "Se teu problema é só responder pergunta frequente, a resposta automática do próprio WhatsApp Business resolve, de graça. Usa ela.",
  },
  garantia: "Garantia",
};

// ──────────────────────────────────────────────────────────────
// Quem constrói
// ──────────────────────────────────────────────────────────────
export const ARTHUR = {
  titulo: "Prazer, Arthur.",
  corpo: [
    "Eu construo sistema com IA pra negócio de verdade. Do jeito que o teu negócio funciona, e não do jeito que um software de prateleira acha que deveria.",
    "Quando você chama no WhatsApp, quem responde sou eu.",
  ],
  citacao: ["Quem constrói", "é quem cuida depois."],
  instagram: "No Instagram eu mostro como faço:",
  video: "Vídeo de apresentação do Arthur",
  janelaVideo: "apresentacao.mp4",
  janelaFoto: "arthur.jpg",
};

// ──────────────────────────────────────────────────────────────
// Dúvidas. As que dependem de material só aparecem quando ele existe.
// ──────────────────────────────────────────────────────────────
export const DUVIDAS = {
  titulo: "Dúvidas",
  fixas: [
    {
      q: "Qual a diferença entre o Maarkio e a Bela?",
      a: "O Maarkio é agenda: o cliente marca sozinho pelo link, e a confirmação e o lembrete saem no WhatsApp. A Bela é atendimento: conversa com o cliente no WhatsApp e te chama quando é com você. Dá pra usar um só ou os dois juntos.",
    },
    {
      q: "Preciso entender de tecnologia?",
      a: "Não. Você me conta como teu negócio funciona, eu deixo tudo pronto, e você usa pelo WhatsApp e por um painel simples. Travou em alguma coisa, me chama.",
    },
    {
      q: "A Bela marca horário?",
      a: "A agenda é do Maarkio. A Bela cuida da conversa: tira dúvida, entende áudio e, quando a pessoa quer marcar, passa pra você com o resumo pronto.",
    },
    {
      q: "E se o cliente quiser falar com gente?",
      a: "A Bela passa a conversa pra você ou pra tua equipe, com o resumo pronto. Vocês respondem pelo painel, até em áudio.",
    },
    {
      q: "A IA pode falar besteira pro meu cliente?",
      a: "Ela responde o que você combinou que ela responde. Reclamação, dúvida de saúde, negociação ou qualquer coisa que ela não sabe: passa pra você, em vez de inventar.",
    },
    {
      q: "O cliente precisa baixar aplicativo?",
      a: "Não. O link do Maarkio abre no navegador do celular, e a Bela conversa no WhatsApp que ele já usa.",
    },
    {
      q: "As mensagens saem do meu número?",
      a: "No Maarkio, saem do WhatsApp do teu negócio. Você conecta lendo um QR Code no painel, do mesmo jeito que conecta o WhatsApp Web.",
    },
    {
      q: "E se der problema?",
      a: "O sistema me avisa quando uma mensagem não sai, e eu acompanho de perto. Qualquer coisa estranha, me chama no zap.",
    },
  ],
  prazo: "Quanto tempo leva pra ficar pronto?",
  contrato: "Tem fidelidade?",
};

// ──────────────────────────────────────────────────────────────
// Fim
// ──────────────────────────────────────────────────────────────
export const FIM = {
  titulo: "O resto é comigo.",
  corpo: "Tua parte é uma conversa. Me conta o problema, e em vinte minutos cê sai sabendo se dá, quanto custa e o que eu faria primeiro.",
};

export const RODAPE = {
  assinatura: "SAtomiq assina. O Arthur constrói.",
  topo: "Voltar ao topo",
};

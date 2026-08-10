// ──────────────────────────────────────────────────────────────
// Todo o texto do site mora aqui. Componente não escreve copy.
// ──────────────────────────────────────────────────────────────

const ARTHUR = "5519984185278"; // WhatsApp comercial (Arthur)

const wa = (num: string, text: string) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

export const LINKS = {
  contato: wa(ARTHUR, "Oi Arthur, vim pelo site da SAtomiq."),
  nectarq: wa(ARTHUR, "Oi Arthur, quero conhecer o Nectarq."),
  maarkio: wa(ARTHUR, "Oi Arthur, quero conhecer o Maarkio."),
  instagram: "https://instagram.com/aarthursilveira",
  instagramHandle: "@aarthursilveira",
};

export const NAV = [
  { label: "O que é", href: "#o-que-e" },
  { label: "Pilares", href: "#pilares" },
  { label: "Onde está", href: "#onde" },
  { label: "Quem constrói", href: "#arthur" },
];

// ──────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: "Holding de tecnologia e operações digitais",
  linhas: ["Uma estrutura", "central para marcas", "que precisam operar."],
  sub: "A SAtomiq desenvolve as tecnologias, os sistemas e os processos que sustentam empresas em áreas diferentes. Conecta conhecimento, automação e estratégia em soluções que podem ser replicadas, aprimoradas e escaladas.",
  pilares: ["Eficiência", "Automação", "Inovação"],
};

// ──────────────────────────────────────────────────────────────
// O que a SAtomiq é — o texto de visão, do próprio Arthur
// ──────────────────────────────────────────────────────────────
export const O_QUE_E = {
  eyebrow: "O que ela é",
  titulo: "Criação, controle e expansão.",
  paragrafos: [
    "A SAtomiq é uma holding voltada à criação, controle e expansão de marcas e operações digitais. Funciona como uma estrutura central que desenvolve tecnologias, sistemas, processos e inteligência operacional para sustentar diversas empresas em diferentes áreas.",
    "Seu papel é conectar conhecimento, automação e estratégia, criando soluções que podem ser replicadas, aprimoradas e escaladas.",
  ],
  destaque:
    "A SAtomiq não depende de um espaço físico. Existe como uma rede distribuída, presente onde houver um processo, um sistema ou uma operação que possa ser otimizada.",
};

// ──────────────────────────────────────────────────────────────
// Os três pilares
// ──────────────────────────────────────────────────────────────
export type Pilar = {
  chave: "eficiencia" | "automacao" | "inovacao";
  nome: string;
  tese: string;
  corpo: string;
  legenda: string;
};

export const PILARES_INTRO = {
  eyebrow: "Os pilares",
  titulo: "Três, e nenhum é acessório.",
  corpo: "Toda decisão dentro da SAtomiq passa por estes três filtros. O que não passa não vira produto.",
};

export const PILARES: Pilar[] = [
  {
    chave: "eficiencia",
    nome: "Eficiência",
    tese: "Eliminar desperdício, otimizar processos, reduzir esforço humano.",
    corpo: "Antes de automatizar qualquer coisa, o processo é enxugado. Automatizar um fluxo ruim só faz o erro acontecer mais rápido e em maior escala.",
    legenda: "Quatro volumes viram um. O que saiu continua ali como aresta: mesmo volume, sem massa.",
  },
  {
    chave: "automacao",
    nome: "Automação",
    tese: "Transformar tarefas manuais em sistemas contínuos, inteligentes e autônomos.",
    corpo: "Não é agendar um robô e torcer. É um sistema que decide, registra o que fez, avisa quando não sabe e devolve o controle para uma pessoa no momento certo.",
    legenda: "Um circuito fechado, com as peças nos quatro cantos. A que está em serviço é a única que sai do chão.",
  },
  {
    chave: "inovacao",
    nome: "Inovação",
    tese: "Criar soluções novas, usar tecnologia de forma criativa, antecipar tendências.",
    corpo: "Tecnologia nova só entra depois de apanhar no papel. O que sobrevive ao ataque vira produto; o resto morre ali, que é onde deve morrer.",
    legenda: "A fila anda no mesmo passo e uma peça sai do chão, à frente. O tracejado é o lugar que ela deixou.",
  },
];

// ──────────────────────────────────────────────────────────────
// Onde ela já está — os produtos da casa
// ──────────────────────────────────────────────────────────────
export type Produto = {
  slug: "nectarq" | "maarkio";
  nome: string;
  categoria: string;
  tese: string;
  corpo: string;
  capacidades: string[];
  cta: { label: string; href: string };
};

export const ONDE_INTRO = {
  eyebrow: "Onde ela já está",
  titulo: "Duas marcas, o mesmo núcleo embaixo.",
  corpo: "Cada uma resolve um problema inteiro, com marca, painel e cliente próprios. Nenhuma reconstrói infraestrutura, orquestração de modelo ou monitoramento — isso vem de baixo, pronto.",
};

export const PRODUTOS: Produto[] = [
  {
    slug: "nectarq",
    nome: "Nectarq",
    categoria: "Atendimento no WhatsApp",
    tese: "Atendimento que entende como gente fala.",
    corpo: "Não é chatbot de botão. Compreende áudio, texto e imagem, responde em linguagem natural no tom da marca, qualifica pelas regras do negócio e passa o bastão para a equipe humana com o resumo pronto.",
    capacidades: [
      "Áudio, texto e imagem — em qualquer duração",
      "Persona e roteiro no tom da marca",
      "Painel com todas as conversas e controle do bot",
      "Integração com a agenda do lugar",
      "Follow-up e reativação de quem sumiu",
    ],
    cta: { label: "Falar sobre o Nectarq", href: LINKS.nectarq },
  },
  {
    slug: "maarkio",
    nome: "Maarkio",
    categoria: "Agendamento",
    tese: "Agendamento que é software, não conversa.",
    corpo: "UI no navegador, dos dois lados. O profissional ajusta horário, buffer e duração; o cliente marca sozinho, numa página que carrega a cara de quem atende. Para qualquer serviço com hora marcada.",
    capacidades: [
      "Painel do profissional: horário, buffer, duração, bloqueio",
      "Painel do cliente, personalizável por profissional",
      "Integração com o Google Agenda",
      "Lembrete automático no WhatsApp do cliente",
      "Barbearia, clínica, estúdio, consultório",
    ],
    cta: { label: "Falar sobre o Maarkio", href: LINKS.maarkio },
  },
];

// ──────────────────────────────────────────────────────────────
// Quem constrói
// ──────────────────────────────────────────────────────────────
export const ARTHUR_BIO = {
  eyebrow: "Quem constrói",
  nome: "Arthur Silveira",
  papel: "Fundador da SAtomiq",
  paragrafos: [
    "Eu construo e opero o que a SAtomiq entrega. Todo projeto começa igual: entender o processo que já existe, atacar a arquitetura no papel — onde consertar custa uma conversa, e não um cliente — e só depois escrever a primeira linha.",
    "A pergunta que abre um projeto aqui não é “como eu implemento?”. É “como isso quebra?”. O que sobrevive ao ataque vira sistema. O resto morre no papel, que é onde deve morrer.",
    "É por isso que a SAtomiq existe como holding e não como agência: o que se aprende resolvendo o problema de um vira estrutura para o próximo, em vez de sumir junto com o projeto.",
  ],
  cta: "Falar comigo",
};

// ──────────────────────────────────────────────────────────────
// Contato
// ──────────────────────────────────────────────────────────────
export const CONTATO = {
  eyebrow: "Contato",
  titulo: "Tem um processo que pode ser melhor?",
  corpo: "Começa por uma conversa de vinte minutos sobre o fluxo que já existe. Você sai dela com um plano específico — não com uma proposta genérica.",
  cta: "Falar com Arthur",
};

export const RODAPE = {
  linha: "SAtomiq — holding de tecnologia e operações digitais.",
  produtos: "Nectarq · Maarkio",
};

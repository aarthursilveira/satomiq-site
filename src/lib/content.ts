// ──────────────────────────────────────────────────────────────
// Contatos reais (preservados do site atual)
// ──────────────────────────────────────────────────────────────
const ARTHUR = "5519984185278"; // WhatsApp comercial (Arthur)
const BELA = "5519997581378"; // WhatsApp da Bela (demo ao vivo)

const wa = (num: string, text: string) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

export const LINKS = {
  diagnostico: wa(ARTHUR, "Oi Arthur, quero o diagnóstico de 20 minutos."),
  belaLive: wa(BELA, "Oi Bela, vim do site da SAtomiq."),
  planoEssencial: wa(ARTHUR, "Oi Arthur, quero o plano Essencial."),
  planoPro: wa(ARTHUR, "Oi Arthur, quero o plano Pro."),
  planoCustom: wa(ARTHUR, "Oi Arthur, preciso de algo customizado."),
  belaNumeroDisplay: "19 99758-1378",
  instagram: "https://instagram.com/aarthursilveira",
  instagramHandle: "@aarthursilveira",
};

export const NAV = [
  { label: "Método", href: "#manifesto" },
  { label: "Produto", href: "#produto" },
  { label: "Caso real", href: "#caso" },
  { label: "Investimento", href: "#investimento" },
  { label: "Dúvidas", href: "#faq" },
];

// ──────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: "Atendente Digital · WhatsApp · 24/7",
  // headline em linhas (a última recebe o acento)
  line1: "Atendimento que",
  line2: "conversa, qualifica",
  line3a: "e fecha — ",
  line3accent: "sozinho.",
  sub: "Atendente digital via WhatsApp para clínicas, serviços e operações com fluxo ativo. Desenhado com red team antes da primeira linha. Em 7 dias, rodando.",
  meta: ["Resposta < 3s", "Operação 24h · 7 dias", "Implantação em 7 dias"],
};

// ──────────────────────────────────────────────────────────────
// Manifesto — DNA da casa (3 atos, claro → escuro)
// ──────────────────────────────────────────────────────────────
export const MANIFESTO = [
  {
    eyebrow: "DNA da casa",
    title: ["A maioria usa IA", "para executar."],
    body: "Gerar texto. Responder pergunta. Fazer tarefa. É útil — e é a camada mais rasa que existe.",
  },
  {
    eyebrow: "A virada",
    title: ['A pergunta certa não', 'é "como implemento?".'],
    body: 'É "como isso quebra?". Red team antes da implementação. A arquitetura é atacada no papel antes de virar código.',
    accent: true,
  },
  {
    eyebrow: "O que entregamos",
    title: ["Sistemas que pensam", "antes de executar."],
    body: "Automação com inteligência embutida: documentação, monitoramento e handoff. Resultado que dura — não demo que impressiona.",
  },
];

// ──────────────────────────────────────────────────────────────
// Produto — promessas, fluxo, aplicações
// ──────────────────────────────────────────────────────────────
export const PROMISES = [
  {
    num: "01",
    kicker: "Sempre disponível",
    title: "Responde em 3 segundos, 24h por dia.",
    body: "Texto ou áudio, qualquer hora. Domingo 22h: lead recebido é lead respondido — não lead perdido.",
  },
  {
    num: "02",
    kicker: "Persona sua",
    title: "Fala como a sua marca fala.",
    body: "Nome, tom, vocabulário, roteiro. O cliente não sente robô — sente que foi bem atendido.",
  },
  {
    num: "03",
    kicker: "Recupera lead",
    title: "Reativa quem sumiu, sozinho.",
    body: "Em 3, 7, 15 dias, com mensagem nova e contextualizada. Aquece o que ia esfriar na gaveta.",
  },
];

export const FLOW = [
  {
    n: "Passo 01",
    title: "Recebe e entende",
    body: "Texto e áudio em menos de 3 segundos. Compreende contexto, gírias e áudios longos. Mantém memória da conversa.",
  },
  {
    n: "Passo 02",
    title: "Qualifica nas suas regras",
    body: "Lê a intenção — dúvida, suporte, interesse real. Faz as perguntas certas na ordem certa e coleta os dados.",
  },
  {
    n: "Passo 03",
    title: "Passa o bastão",
    body: "Trava o robô e avisa sua equipe com o resumo da conversa. O time entra já sabendo o que aconteceu.",
  },
];

export const APPS = [
  { num: "01", label: "Comercial", title: "Vendas e qualificação", body: "Atende, qualifica, agenda e entrega o lead já aquecido pro vendedor.", wide: true },
  { num: "02", label: "RH", title: "Triagem e pré-entrevista", body: "Aplica perguntas-chave, descarta fora de perfil, agenda os qualificados." },
  { num: "03", label: "SAC", title: "Atendimento e suporte", body: "Resolve dúvida frequente, abre chamado e escala humano nos casos certos." },
  { num: "04", label: "Pós-venda", title: "Reativação e fidelização", body: "Pesquisa de satisfação, lembrete de retorno, resgate de cliente inativo." },
  { num: "05", label: "Pré-clínico", title: "Triagem e agendamento", body: "Triagem de procedimento, agendamento e lembrete pré-consulta." },
  { num: "06", label: "Híbrido", title: "Vários fluxos, um número", body: "Vendas + RH + SAC convivem. O sistema escolhe qual roteiro seguir.", dark: true },
];

// ──────────────────────────────────────────────────────────────
// Investimento
// ──────────────────────────────────────────────────────────────
export const PRICING = [
  {
    name: "Essencial",
    price: "R$ 897",
    period: "/ mês",
    setup: "Setup R$ 1.997",
    features: ["Atendimento 24/7", "Passagem para equipe", "1 persona customizada", "Até 1.500 conversas/mês"],
    cta: "Quero esse plano",
    href: LINKS.planoEssencial,
  },
  {
    name: "Pro",
    price: "R$ 1.497",
    period: "/ mês",
    setup: "Setup R$ 2.997",
    featured: true,
    badge: "Mais escolhido",
    features: ["Tudo do Essencial", "Reativação automática", "Relatórios mensais", "Até 5.000 conversas/mês", "Suporte prioritário"],
    cta: "Quero o Pro",
    href: LINKS.planoPro,
  },
  {
    name: "Customizado",
    price: "R$ 2.497+",
    period: "/ mês",
    setup: "Setup sob consulta",
    features: ["Tudo do Pro", "Integrações (Calendar, CRM)", "Múltiplos fluxos", "Volume ilimitado"],
    cta: "Conversar com Arthur",
    href: LINKS.planoCustom,
  },
];

export const PRICING_NOTE = "Setup grátis para quem assinar em até 7 dias após a apresentação.";

// ──────────────────────────────────────────────────────────────
// Caso real — Clínica Tainá
// ──────────────────────────────────────────────────────────────
export const CASE = {
  client: "Clínica Tainá",
  segment: "Cliente · Estética facial",
  tagline: "Atendimento conduzido pela Bela.",
  meta: [
    { k: "Persona", v: '"Bela" — customizada' },
    { k: "Operação", v: "24/7 · 7 dias" },
    { k: "Resposta", v: "< 3 segundos" },
    { k: "Status", v: "Em produção" },
  ],
  capabilities: [
    "Triagem automática: procedimento × dúvida × agendamento",
    "Reativação contextualizada de leads inativos",
    "Passagem para equipe humana com resumo completo",
    "Compreensão de áudio (Whisper) em qualquer duração",
    "Backup diário automático + monitoramento contínuo",
    "Retry automático em falhas (Together AI, Groq, Evolution)",
  ],
  stack: ["n8n", "Together AI", "Groq", "Whisper", "Postgres", "Redis"],
};

// ──────────────────────────────────────────────────────────────
// Processo
// ──────────────────────────────────────────────────────────────
export const PROCESS = [
  {
    num: "01",
    title: "Diagnóstico do seu fluxo",
    body: "20 minutos de conversa. Entendemos seu volume, seu funil e onde o lead esfria. Você sai com um plano específico — não com proposta genérica.",
  },
  {
    num: "02",
    title: "Configuração da persona",
    body: "Nome, tom, vocabulário, regras. Você responde algumas perguntas; a gente monta o roteiro. Treino guiado por você, executado por nós.",
  },
  {
    num: "03",
    title: "Em 7 dias, rodando",
    body: "Entra em produção integrado ao seu WhatsApp. Backup, monitoramento e ajustes contínuos inclusos. Você usa — não monta.",
  },
];

// ──────────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: "R$ 897/mês não é caro pra mim?",
    a: "Um atendente humano com escala 24h custa R$ 8k+/mês com encargos. O sistema custa um quinto disso e responde em 3 segundos no domingo às 22h. A pergunta certa não é se é caro — é quantos leads por mês você precisa recuperar pra pagar. Em geral, um.",
  },
  {
    q: "Já tenho um chatbot. É a mesma coisa?",
    a: "Não. Chatbot de fluxo segue botões fixos. Aqui é um atendente que entende texto livre, áudio, contexto e gírias, reativa lead que sumiu com mensagem nova e aprende com o seu negócio. É outra categoria de produto.",
  },
  {
    q: "Vou perder o controle do meu atendimento?",
    a: "Pelo contrário. Você define o roteiro, as regras de quando travar e chamar humano, e o tom da marca. A qualquer momento sua equipe assume — basta responder. O sistema obedece; sua equipe decide.",
  },
  {
    q: "Funciona no meu nicho?",
    a: "Funciona em qualquer atendimento por WhatsApp com um padrão repetível. Hoje atende clínica de estética; também serve para RH (triagem), SAC, imobiliária e infoproduto. A IA é a mesma — o roteiro é seu.",
  },
  {
    q: "Quanto tempo até entrar no ar?",
    a: "7 dias após a assinatura. Você responde algumas perguntas sobre o negócio (tom, regras, fluxo); a equipe técnica monta, testa e entrega rodando. Você não toca em código, servidor ou integração.",
  },
  {
    q: "Tem fidelidade? E se eu quiser sair?",
    a: "Sem multa e sem fidelidade longa. Cancela com 30 dias de aviso. Você leva sua base e seu número. A relação é por resultado.",
  },
  {
    q: "E se a IA falar besteira?",
    a: "Três camadas de proteção: você define os limites do que ela pode responder; o anti-injection impede desvio de roteiro; e, na dúvida, ela escala para humano em vez de inventar. Pode testar agora mandando uma pergunta aleatória pra Bela.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Backup diário automático, monitoramento contínuo e dados isolados por cliente. Você é dono das conversas, da base e do número. Modelo de DPA disponível para casos que exigem LGPD formal.",
  },
];

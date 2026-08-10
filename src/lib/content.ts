// ──────────────────────────────────────────────────────────────
// Todo o texto do site mora aqui. Componente não escreve copy.
// ──────────────────────────────────────────────────────────────

const ARTHUR = "5519984185278"; // WhatsApp comercial (Arthur)
const BELA = "5519997581378"; // WhatsApp da Bela — demo ao vivo do Nectarq

const wa = (num: string, text: string) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

export const LINKS = {
  contato: wa(ARTHUR, "Oi Arthur, vim pelo site da SAtomiq."),
  sobMedida: wa(ARTHUR, "Oi Arthur, quero conversar sobre um sistema sob medida."),
  nectarq: wa(ARTHUR, "Oi Arthur, quero conhecer o Nectarq."),
  maarkio: wa(ARTHUR, "Oi Arthur, quero conhecer o Maarkio."),
  belaLive: wa(BELA, "Oi, vim do site da SAtomiq."),
  belaNumeroDisplay: "19 99758-1378",
  instagram: "https://instagram.com/aarthursilveira",
  instagramHandle: "@aarthursilveira",
};

export const NAV = [
  { label: "Elétrons", href: "#eletrons" },
  { label: "Núcleo", href: "#nucleo" },
  { label: "Método", href: "#metodo" },
  { label: "Em produção", href: "#producao" },
];

// ──────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: "Núcleo de tecnologia e IA aplicada",
  line1: "O núcleo que",
  line2: "os produtos",
  line3: "usam.",
  sub: "A SAtomiq constrói a camada de baixo: orquestração de modelos, infraestrutura, operação — e o red team que ataca a arquitetura antes dela virar código. Em cima dela rodam os produtos da casa e os sistemas sob medida.",
  meta: ["Dois produtos", "Red team antes da primeira linha", "Em produção 24/7"],
};

// ──────────────────────────────────────────────────────────────
// Os elétrons — os produtos da casa
// ──────────────────────────────────────────────────────────────
export const ELETRONS_INTRO = {
  eyebrow: "Os elétrons",
  titulo: "Dois produtos. O mesmo núcleo embaixo.",
  corpo: "Cada um resolve um problema inteiro, com marca, painel e cliente próprios. Nenhum dos dois reconstrói infraestrutura, orquestração de modelo ou monitoramento — isso vem de baixo, pronto.",
};

export type Eletron = {
  slug: "nectarq" | "maarkio";
  nome: string;
  categoria: string;
  status: string;
  emProducao: boolean;
  tese: string;
  corpo: string;
  capacidades: string[];
  nota?: string;
  cta: { label: string; href: string };
};

export const ELETRONS: Eletron[] = [
  {
    slug: "nectarq",
    nome: "Nectarq",
    categoria: "Atendimento no WhatsApp",
    status: "Em produção",
    emProducao: true,
    tese: "Atendimento que parece gente — porque entende como gente fala.",
    corpo:
      "Não é chatbot de botão. Entende áudio, texto e imagem, responde em linguagem natural no tom da marca, qualifica pelas suas regras e passa o bastão para a equipe humana com o resumo pronto.",
    capacidades: [
      "Áudio, texto e imagem — em qualquer duração",
      "Persona e roteiro no tom da marca, clínica ou empresa",
      "Painel com todas as conversas, controle do bot e envio manual",
      "Integração com a agenda do lugar",
      "Follow-up e reativação de quem sumiu",
    ],
    nota:
      "Está virando também secretário do próprio profissional: quem entra na whitelist manda “amanhã não consigo ir das 16h às 20h, cancela minha agenda” — e também registra o que gastou, o que ganhou e o que precisa lembrar.",
    cta: { label: "Falar sobre o Nectarq", href: LINKS.nectarq },
  },
  {
    slug: "maarkio",
    nome: "Maarkio",
    categoria: "Agendamento",
    status: "Em desenvolvimento",
    emProducao: false,
    tese: "Agendamento que é software, não conversa.",
    corpo:
      "UI no navegador, dos dois lados. O profissional ajusta horário, buffer e duração; o cliente marca sozinho, numa página que carrega a cara de quem atende. Para qualquer serviço com hora marcada.",
    capacidades: [
      "Painel do profissional: horário, buffer, duração, bloqueio",
      "Painel do cliente, personalizável por profissional",
      "Integração com o Google Agenda",
      "Lembrete automático no WhatsApp do cliente",
      "Barbearia, clínica, estúdio, consultório — qualquer hora marcada",
    ],
    cta: { label: "Falar sobre o Maarkio", href: LINKS.maarkio },
  },
];

// ──────────────────────────────────────────────────────────────
// O núcleo — o que os produtos herdam em vez de reconstruir
// ──────────────────────────────────────────────────────────────
export const NUCLEO_INTRO = {
  eyebrow: "O núcleo",
  titulo: "O que existe uma vez, e não duas.",
  corpo: "Produto que nasce dentro da SAtomiq já chega com estas quatro camadas resolvidas. É isso que a holding é — não uma marca guarda-chuva, um estoque de decisões já tomadas.",
};

// Sem numeração: as quatro camadas não são uma sequência, são um estoque.
// Numerar sugeriria uma ordem que não existe.
export const NUCLEO = [
  {
    n: "método",
    t: "Red team antes do código",
    b: "A arquitetura é atacada no papel: onde quebra, o que um usuário mal-intencionado faz com ela, o que acontece quando o provedor cai no domingo. O que sobrevive ao ataque vira implementação.",
  },
  {
    n: "modelos",
    t: "Orquestração de modelos",
    b: "Roteamento entre provedores, retry e fallback automáticos, modelo escolhido pelo esforço que a tarefa pede. Nenhum produto fica refém de uma API que subiu de preço ou saiu do ar.",
  },
  {
    n: "operação",
    t: "Infraestrutura e operação",
    b: "Deploy, banco, filas, backup diário e monitoramento contínuo. O produto herda isso pronto em vez de cada um montar o seu — e de cada um quebrar do seu jeito.",
  },
  {
    n: "marca",
    t: "Sistema de marca",
    b: "Paleta e símbolos validados em contraste WCAG, espaço OKLCH e simulação de daltonismo. Produto novo nasce com identidade medida, não com um tema improvisado na véspera.",
  },
];

// ──────────────────────────────────────────────────────────────
// Método — o DNA da casa, em três atos
// ──────────────────────────────────────────────────────────────
export const METODO = [
  {
    eyebrow: "O padrão",
    titulo: ["A maioria usa IA", "para executar."],
    corpo: "Gerar texto. Responder pergunta. Fazer tarefa. É útil — e é a camada mais rasa que existe. Também é a que quebra primeiro, porque ninguém perguntou como ela quebra.",
  },
  {
    eyebrow: "A virada",
    titulo: ["A pergunta certa não", "é “como implemento?”."],
    corpo: "É “como isso quebra?”. Red team antes da implementação: a arquitetura apanha no papel, onde consertar custa uma conversa em vez de um cliente.",
    acento: true,
  },
  {
    eyebrow: "O que sai",
    titulo: ["Sistemas que pensam", "antes de executar."],
    corpo: "Com documentação, monitoramento e caminho de handoff para gente de verdade. Resultado que dura — não demo que impressiona na reunião e some na segunda semana.",
  },
];

// ──────────────────────────────────────────────────────────────
// Em produção — a prova
// ──────────────────────────────────────────────────────────────
export const PRODUCAO = {
  eyebrow: "Em produção",
  titulo: "O método já está rodando na casa de alguém.",
  cliente: "Clínica Tainá",
  segmento: "Estética facial",
  produto: "Nectarq",
  tagline: "Atendimento conduzido pela persona “Bela”, 24 horas por dia.",
  meta: [
    { k: "Produto", v: "Nectarq" },
    { k: "Persona", v: "“Bela”, customizada" },
    { k: "Operação", v: "24/7" },
    { k: "Status", v: "Em produção" },
  ],
  capacidades: [
    "Triagem automática: procedimento × dúvida × agendamento",
    "Reativação contextualizada de quem parou de responder",
    "Passagem para a equipe humana com o resumo da conversa",
    "Compreensão de áudio em qualquer duração",
    "Backup diário e monitoramento contínuo",
    "Retry automático quando um provedor falha",
  ],
  stack: ["n8n", "Together AI", "Groq", "Whisper", "Postgres", "Redis"],
  demoTitulo: "Ela atende agora.",
  demoCorpo:
    "O número abaixo é o mesmo que atende os clientes da clínica. Mande um áudio, faça uma pergunta fora do roteiro, tente derrubar. É o teste mais honesto que existe: o produto responde por si.",
};

// ──────────────────────────────────────────────────────────────
// Contato — dois caminhos, nenhum preço
// ──────────────────────────────────────────────────────────────
export const CONTATO = {
  eyebrow: "Contato",
  titulo: "Dois jeitos de entrar.",
  caminhos: [
    {
      t: "Um dos produtos",
      b: "Nectarq ou Maarkio, com implantação e operação da casa. Preço e prazo saem na conversa, depois de entender seu volume — não antes.",
      cta: "Falar sobre um produto",
      href: LINKS.contato,
    },
    {
      t: "Um sistema sob medida",
      b: "Quando o problema não cabe em produto de prateleira. Começa por um diagnóstico de 20 minutos do seu fluxo, e você sai dele com um plano específico.",
      cta: "Marcar o diagnóstico",
      href: LINKS.sobMedida,
    },
  ],
};

export const RODAPE = {
  linha: "SAtomiq — núcleo de tecnologia e IA aplicada.",
  eletrons: "Nectarq · Maarkio",
};

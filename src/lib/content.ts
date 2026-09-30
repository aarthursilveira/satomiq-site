// ──────────────────────────────────────────────────────────────
// Todo o texto do site mora aqui. Componente não escreve copy.
// Voz: Documents/arthursilveira-ai/arthur-language.md
// ──────────────────────────────────────────────────────────────
import diario from "./diario.json";

const ARTHUR = "5519984185278"; // WhatsApp comercial (Arthur)

const wa = (text: string) => `https://wa.me/${ARTHUR}?text=${encodeURIComponent(text)}`;

export const LINKS = {
  whatsapp: wa("Fala Arthur, vim pelo satomiq.com"),
  maarkio: wa("Fala Arthur, vi o Maarkio no teu site"),
  nectarq: wa("Fala Arthur, vi o Nectarq no teu site"),
  instagram: "https://instagram.com/arthursilveira.ai",
  instagramHandle: "@arthursilveira.ai",
  github: "https://github.com/aarthursilveira",
};

export const NAV = [
  { label: "rodando", href: "#rodando" },
  { label: "lab", href: "#lab" },
  { label: "diário", href: "#diario" },
  { label: "processo", href: "#processo" },
];

export const DIARIO = diario;

const ultimo = diario.recentes[0];

// ──────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────
export const HERO = {
  tag: "arthur silveira · satomiq",
  antes: "cê me conta o problema…",
  eu: "eu",
  heroi: "CONSTRUO",
  depois:
    "…e deixo rodando. Sistema com IA em produção, com cliente pagando e teste reprovando o que quebra. Esse site é o portfólio: tudo daqui pra baixo funciona de verdade, pode mexer.",
  ctaPrincipal: "ver o que tá rodando",
  ctaSecundario: "chamar no zap",
  vivo: {
    commits: diario.total,
    desde: "abril",
    projetos: Object.keys(diario.porRepo).length,
    ultimo: { repo: ultimo.repo, data: ultimo.data },
  },
};

// ──────────────────────────────────────────────────────────────
// Sistemas em produção
// ──────────────────────────────────────────────────────────────
export type Sistema = {
  slug: "maarkio" | "nectarq" | "gluten" | "outreach";
  nome: string;
  categoria: string;
  status: { texto: string; tom: "oliva" | "azul" | "latao" };
  tese: string;
  decisao: { texto: string; fonte: string };
  stack: string[];
  commits: number;
  link?: { label: string; href: string };
};

export const RODANDO_INTRO = {
  eyebrow: "em produção",
  heroi: "RODANDO",
  corpo:
    "Quatro sistemas que eu construí e opero. Cada um tem painel, usuário de verdade e aquela decisão técnica que só aparece quando o negócio tá no ar.",
};

export const SISTEMAS: Sistema[] = [
  {
    slug: "maarkio",
    nome: "Maarkio",
    categoria: "agendamento",
    status: { texto: "em produção · clientes pagando", tom: "oliva" },
    tese: "O cliente marca sozinho num link com a cara do salão. O dono ajusta horário, buffer e duração, e o WhatsApp lembra todo mundo na véspera.",
    decisao: {
      texto: "teto de 15s no envio de WhatsApp e Telegram, sem cobrança em dobro",
      fonte: "fix(jobs) · 25 set",
    },
    stack: ["TypeScript", "Turbo", "Postgres + RLS", "Evolution API", "Google Agenda"],
    commits: diario.porRepo.maarkio ?? 0,
    link: { label: "quero pro meu negócio", href: wa("Fala Arthur, vi o Maarkio no teu site") },
  },
  {
    slug: "nectarq",
    nome: "Nectarq",
    categoria: "atendimento no WhatsApp",
    status: { texto: "em produção", tom: "oliva" },
    tese: "A Bela atende no WhatsApp entendendo áudio, texto e foto. Quando precisa de gente, ela passa a conversa pro painel com o resumo pronto, e a profissional responde por lá, até em áudio.",
    decisao: {
      texto: "tela de custo da camada de LLM: cada centavo de modelo aparece no painel",
      fonte: "feat(admin) · 1 ago",
    },
    stack: ["Fastify", "Prisma", "Supabase Realtime", "Next 16", "n8n"],
    commits: diario.porRepo.nectarq ?? 0,
    link: { label: "quero uma Bela", href: wa("Fala Arthur, vi o Nectarq no teu site") },
  },
  {
    slug: "gluten",
    nome: "Gluten",
    categoria: "delivery pra pizzaria",
    status: { texto: "multi-tenant · demo", tom: "latao" },
    tese: "Várias pizzarias na mesma plataforma, cada uma com domínio, cardápio e zona de entrega própria. PIX com QR, comanda térmica de 58 e 80 mm e cardápio importado por CSV.",
    decisao: {
      texto: "importador de cardápio idempotente, com dry-run ligado por padrão",
      fonte: "feat(db) · 31 ago",
    },
    stack: ["Next", "Fastify", "pnpm workspaces", "Zod", "PWA"],
    commits: diario.porRepo.gluten ?? 0,
  },
  {
    slug: "outreach",
    nome: "Outreach",
    categoria: "prospecção B2B",
    status: { texto: "uso interno", tom: "azul" },
    tese: "Dois agentes montam o dossiê de uma empresa: um investiga fato público, o outro analisa, dá nota e escreve a abordagem. O envio tem trava pra não queimar número.",
    decisao: {
      texto: "o juiz repete a chamada quando volta 200 sem JSON, antes de desistir do lead",
      fonte: "uo · 30 jul",
    },
    stack: ["Python", "FastAPI", "Postgres", "Evolution API", "Amazon SES"],
    commits: diario.porRepo.outreach ?? 0,
  },
];

export const TAMBEM = {
  titulo: "e mais umas coisas",
  itens: [
    { nome: "AI Cockpit", texto: "o terminal do PC no celular, via Tailscale, sem abrir porta nenhuma" },
    { nome: "SIH.", texto: "demo de loja de moda em Next 16, React 19 e Motion" },
    { nome: "Engine Arcana", texto: "engine de magia pra Minecraft, Java 25, onde nenhuma magia tem lógica visual própria" },
    { nome: "@arthursilveira.ai", texto: "reels feitos em código, com Remotion, sobre dev e IA" },
  ],
};

// ──────────────────────────────────────────────────────────────
// Lab
// ──────────────────────────────────────────────────────────────
export const LAB_INTRO = {
  eyebrow: "peças",
  heroi: "LAB",
  corpo:
    "Coisa pequena que eu faço pra testar ideia. Todas rodam aqui, todas têm controle, e o código tá do lado. A regra é a mesma dos meus reels: a palavra faz o que ela diz.",
};

// ──────────────────────────────────────────────────────────────
// Diário
// ──────────────────────────────────────────────────────────────
export const DIARIO_INTRO = {
  eyebrow: "diário",
  conector: `commits desde abril, em ${Object.keys(diario.porRepo).length} projetos`,
  corpo:
    "Cada quadrado é um dia. Quanto mais latão, mais commit. As mensagens aí embaixo são reais, só passam por um filtro que tira nome de cliente antes de ir pro ar.",
  rodape: `atualizado em ${diario.geradoEm}`,
};

// ──────────────────────────────────────────────────────────────
// Processo
// ──────────────────────────────────────────────────────────────
export const PROCESSO = {
  eyebrow: "processo",
  titulo: ["con", "versa"],
  corpo:
    "Eu escrevo em português de gente e o Claude Code responde em código. Vibecoding, sim, sem vergonha nenhuma. O que faz isso virar sistema é o que acontece no meio.",
  passos: [
    {
      nome: "papel",
      texto: "Antes de qualquer linha, o fluxo vai pro papel. Consertar ali custa uma conversa. Consertar em produção custa um cliente.",
    },
    {
      nome: "ataque",
      texto: "Aí eu pergunto como aquilo quebra. Red team no plano, com o agente tentando derrubar a própria ideia antes do código existir.",
    },
    {
      nome: "execução",
      texto: "O Claude Code implementa com teste junto. Se a suíte encolher ou pular teste, o gate reprova e não sobe.",
    },
    {
      nome: "registro",
      texto: "Todo fix vira doc: o que quebrou, o que mudou, quantos testes tem agora. O próximo agente lê isso antes de mexer.",
    },
  ],
  conversa: {
    legenda: "reconstituído a partir dos commits de 25/09 no Maarkio",
    arthur: "mano, se a Evolution travar no meio do envio o job fica pendurado… e se ele tentar de novo, cobra duas vezes?",
    claude:
      "cobra. o envio não tem teto de tempo.\nproposta: timeout de 15s, marcar o desfecho como incerto\ne não reenviar sozinho. alerta no Telegram pro dono.",
    commits: [
      "fix(jobs): teto de 15s no envio de WhatsApp e Telegram, sem cobrança em dobro",
      "docs(jobs): registra o teto de envio, o desfecho incerto e a contagem de testes",
      "feat(observability): alerta no Telegram quando a mensagem ao cliente não sai",
    ],
  },
};

// ──────────────────────────────────────────────────────────────
// Contato
// ──────────────────────────────────────────────────────────────
export const CONTATO = {
  heroi: "BORA?",
  corpo:
    "Tem um processo comendo teu tempo? Me chama. A gente conversa uns vinte minutos e cê sai sabendo se dá pra automatizar, quanto custa e o que eu faria primeiro.",
  cta: "chamar no WhatsApp",
};

export const RODAPE = {
  assinatura: "SAtomiq assina. O Arthur constrói.",
  feito: "Este site também é peça do portfólio: Vite, React e nenhuma biblioteca de animação.",
};

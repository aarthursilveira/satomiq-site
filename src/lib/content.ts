// ──────────────────────────────────────────────────────────────
// Todo o texto do site mora aqui. Componente não escreve copy.
// Voz: Documents/arthursilveira-ai/arthur-language.md
// ──────────────────────────────────────────────────────────────
import diario from "./diario.json";
import { wa } from "./zap";
import { ABERTURA } from "./recado";

export const LINKS = {
  whatsapp: wa(ABERTURA),
  maarkio: wa("Fala Arthur, vi o Maarkio no teu site"),
  nectarq: wa("Fala Arthur, vi o Nectarq no teu site"),
  instagram: "https://instagram.com/arthursilveira.ai",
  instagramHandle: "@arthursilveira.ai",
  github: "https://github.com/aarthursilveira",
};

// A página de quem contrata e a de quem quer ver por dentro têm barras diferentes.
export const NAV = {
  inicio: [
    { label: "o dia", href: "#dia" },
    { label: "testa", href: "#testa" },
    { label: "casos", href: "#casos" },
    { label: "preço", href: "#preco" },
    { label: "dúvidas", href: "#duvidas" },
  ],
  bastidores: [
    { label: "rodando", href: "#rodando" },
    { label: "lab", href: "#lab" },
    { label: "diário", href: "#diario" },
    { label: "processo", href: "#processo" },
  ],
  irBastidores: { label: "bastidores", href: "/bastidores/" },
  irInicio: { label: "← início", href: "/" },
};

export const DIARIO = diario;

const ultimo = diario.recentes[0];
const curta = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");

// ──────────────────────────────────────────────────────────────
// Hero (início): a promessa e a primeira pergunta.
// ──────────────────────────────────────────────────────────────
export const HERO = {
  tag: "arthur silveira · satomiq",
  antes: "cê me conta o problema…",
  eu: "eu",
  heroi: "CONSTRUO",
  depois: "…e deixo rodando.",
  sub: "Sistema sob medida pro teu negócio: agenda que se enche sozinha, WhatsApp respondido na hora, pedido e cobrança sem planilha. Eu construo, eu cuido, você usa.",
  pergunta: "qual é o teu negócio?",
  ouZap: "ou me chama direto no zap",
  vivo: `rodando agora: a Bela numa clínica de estética, o Maarkio em salões · último ajuste em ${curta(ultimo.data)}`,
};

// ──────────────────────────────────────────────────────────────
// O dia de 24h
// ──────────────────────────────────────────────────────────────
export const DIA = {
  eyebrow: "um dia qualquer",
  titulo: (s: { noTeu: string }) => `Um dia ${s.noTeu}.`,
  corpo: "Rola devagar. Em cada hora, como é hoje, e como fica com o sistema rodando.",
  hoje: "hoje",
  rodando: "rodando",
};

export const CONTA = {
  titulo: "Isso foi um dia. Faz a conta de um mês.",
  semana: "Mensagens que chegam fora do horário, por semana",
  perda: "De cada 10 sem resposta rápida, quantas viram cliente de outro",
  antesDoValor: "indo pra concorrência, por mês",
  depoisDoValor: (n: number) => `São uns ${n} clientes que chamaram você primeiro.`,
  cta: "manda a conta pro zap",
  nota: "É estimativa: mexe nos números até ficar com a cara do teu negócio. A conta vai junto na mensagem.",
  mensagem: (c: { frase: string; porSemana: number; ticket: string; valor: string }) =>
    `${c.frase ? `${c.frase} ` : ""}Fiz a conta no site: chegam umas ${c.porSemana} mensagens por semana fora do horário, e um cliente vale uns ${c.ticket}. Dá uns ${c.valor} por mês. Bora ver isso?`,
};

// ──────────────────────────────────────────────────────────────
// Testa aqui
// ──────────────────────────────────────────────────────────────
export const TESTA = {
  eyebrow: "testa aqui",
  titulo: ["Do lado de lá, teu cliente.", "Do lado de cá, você."],
  corpo: (s: { noTeu: string }) =>
    `Escreve como se fosse cliente ${s.noTeu}. A Bela conversa; quando é pra marcar ou pedir, ela manda o link, e o resto se resolve sozinho. Do lado, o painel que só você vê.`,
  aviso: "Demonstração com dados de exemplo, roteirizada: nada do que você escreve sai do teu navegador.",
  campo: "Escreve como cliente…",
  audio: "Mandar um áudio de exemplo",
  painel: "painel do dono",
  recomecar: "recomeçar",
  precisa: "precisa de você",
  precisaNota: "resumo pronto · responde pelo painel, até em áudio",
  precisaVazio: "nada esperando você ✓",
  agora: "agora",
  logVazio: "a Bela tá online, esperando cliente.",
  pecaPrecisa: "Bela",
  viaLink: "pelo link",
};

/** O que abre dentro do celular da demo quando a pessoa toca no link da Bela. */
export const APPS = {
  voltar: "WhatsApp",
  agenda: {
    chamada: "Agende seu horário",
    servico: "Serviço",
    dia: "Dia",
    horario: "Horário",
    nome: "Teu nome",
    nomeDica: "como te chamam",
    confirmar: "Confirmar",
    faltaNome: "falta teu nome ↑",
    ocupado: "ocupado",
    feito: "Agendado!",
    remarcado: "Remarcado!",
    lembrete: "Na véspera você recebe um lembrete no WhatsApp.",
    assinatura: "agenda por Maarkio",
    noChat: (o: { remarcou: boolean; dia: string; hora: string }) => `você ${o.remarcou ? "remarcou pra" : "marcou"} ${o.dia}, ${o.hora}, pelo link ✓`,
  },
  cardapio: {
    pizzas: "Pizzas",
    bebidas: "Bebidas",
    entrega: "Entrega",
    pagar: "Pagar com PIX",
    pix: "Escaneia ou copia o código",
    paguei: "já paguei",
    feito: "Pedido confirmado!",
    cozinha: "Já tá na cozinha. Previsão: uns 40 minutos.",
    assinatura: "cardápio por Gluten",
    noChat: (total: string) => `pedido #0143 pago pelo cardápio, R$ ${total} ✓`,
  },
};

// ──────────────────────────────────────────────────────────────
// Recado: o "cê me conta o problema" do hero, de verdade. O que a pessoa
// escreve vai pronto pro zap, e quanto mais ela conta, mais a palavra pesa.
// ──────────────────────────────────────────────────────────────
export const RECADO = {
  rotulo: "me conta aqui",
  // Escritos com a voz de quem chega, não com a minha.
  exemplos: [
    "minha agenda vive com furo e cliente que some…",
    "respondo a mesma pergunta quarenta vezes por dia…",
    "cliente chama de madrugada e ninguém responde…",
    "a planilha do estoque nunca bate com a prateleira…",
  ],
  atalhos: [
    { nome: "agenda", texto: "Minha agenda é toda no WhatsApp e vive dando furo." },
    { nome: "atendimento", texto: "Chega mensagem demais no zap e eu não dou conta de responder rápido." },
    { nome: "pedidos", texto: "Recebo pedido pelo WhatsApp e anoto tudo na mão." },
    { nome: "planilha", texto: "Tem uma planilha que alguém atualiza na mão todo santo dia." },
  ],
  enviar: "manda no zap",
  vazio: "chamar no zap",
  nota: "Abre o WhatsApp com a mensagem pronta. Cê revisa antes de enviar.",
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
  /** `traducao`: a mesma decisão em português de dono de negócio. */
  decisao: { texto: string; fonte: string; traducao: string };
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
      traducao: "se o WhatsApp travar no meio do envio, ninguém recebe a cobrança duas vezes, e o dono fica sabendo na hora.",
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
      traducao: "dá pra ver quanto a IA custa, conversa por conversa. Sem susto no fim do mês.",
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
      traducao: "subir o cardápio pela planilha mostra o que vai mudar antes de mudar, e subir duas vezes não duplica nada.",
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
      traducao: "quando a IA responde torto, o sistema pergunta de novo antes de jogar um contato bom fora.",
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
  arrasta: "peças · arrasta pro lado →",
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
  outros: "ou me acha no",
};

// ──────────────────────────────────────────────────────────────
// Casos (início): os sistemas contados pra quem vai usar, não pra dev.
// Número e depoimento vêm de lib/material.ts; sem eles, fica o texto.
// ──────────────────────────────────────────────────────────────
export const CASOS = {
  eyebrow: "rodando de verdade",
  titulo: "O que já tá rodando",
  corpo: "Sistemas que eu construí e continuo cuidando, com gente usando todo dia. Funcionam sozinhos ou juntos: a Bela conversa no zap e manda o link do Maarkio pra marcar, ou o do Gluten pra pedir.",
  rotulos: { problema: "o problema", fiz: "o que eu fiz", mudou: "o que mudou" },
  porDentro: "ver por dentro",
  itens: [
    {
      slug: "maarkio" as const,
      nome: "Maarkio",
      para: "agendamento pra salão e barbearia",
      status: "em produção · clientes pagando",
      problema: "Horário marcado na mão pelo WhatsApp, e cliente que esquece e falta.",
      fiz: "Um link de agendamento com a cara do salão: o cliente escolhe serviço, dia e horário sozinho, sem conversa. O dono ajusta horário, intervalo e duração de cada serviço, e o WhatsApp lembra todo mundo na véspera.",
      mudou: "O cliente marca sozinho, a qualquer hora, e chega lembrado.",
      cta: { label: "quero isso no meu negócio", href: wa("Fala Arthur, vi o Maarkio no teu site e quero pro meu negócio.") },
    },
    {
      slug: "nectarq" as const,
      nome: "Bela",
      para: "atendimento e relacionamento no WhatsApp",
      status: "em produção",
      problema: "Mensagem chegando o dia inteiro, muita em áudio, e a equipe sem tempo de responder entre um procedimento e outro.",
      fiz: "A Bela conversa no WhatsApp com o jeito da casa: entende áudio, texto e foto, tira dúvida e manda o link certo na hora certa. Quando precisa de gente, passa a conversa pro painel com o resumo pronto, e a profissional responde por lá, até em áudio.",
      mudou: "Ninguém fica sem resposta, e a equipe só entra quando precisa mesmo.",
      cta: { label: "quero uma Bela", href: wa("Fala Arthur, vi a Bela no teu site e quero uma pro meu negócio.") },
    },
    {
      slug: "gluten" as const,
      nome: "Gluten",
      para: "delivery próprio pra pizzaria",
      status: "pronto · em demonstração",
      problema: "Pedido anotado à mão pelo zap, ou aplicativo levando comissão de cada pedido.",
      fiz: "Cardápio online com domínio e marca da pizzaria, zona de entrega, PIX com QR e a comanda saindo direto na impressora da cozinha.",
      mudou: "Pronto pra rodar: várias pizzarias na mesma plataforma, cada uma com a sua cara.",
      cta: { label: "quero pra minha pizzaria", href: wa("Fala Arthur, vi o Gluten no teu site e quero pra minha pizzaria.") },
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Como é trabalhar comigo
// ──────────────────────────────────────────────────────────────
export const COMO = {
  eyebrow: "do primeiro oi ao sistema rodando",
  titulo: "Como é trabalhar comigo",
  passos: [
    {
      nome: "Conversa",
      quando: "20 minutos",
      texto: "Cê me conta o problema, no zap ou numa chamada. Eu digo se dá pra resolver, quanto custa e o que eu faria primeiro.",
    },
    {
      nome: "Desenho",
      quando: "antes do código",
      texto: "O fluxo vai pro papel: o que a Bela responde, quando passa pra você, o que aparece no painel. Você aprova antes de eu construir.",
    },
    {
      nome: "Construção",
      quando: "com teste",
      texto: "Eu construo e tento quebrar antes de você usar. Tudo com teste automático, e o plano é atacado procurando furo antes de virar código.",
    },
    {
      nome: "Rodando",
      quando: "todo dia",
      texto: "Entra no ar no teu WhatsApp. Eu acompanho, ajusto o que precisar, e o sistema avisa quando alguma coisa não sai como devia.",
    },
  ],
  voce: "Tua parte: uma conversa e umas respostas sobre como teu negócio funciona. O resto é comigo.",
  prazo: "do sim ao ar:",
};

// ──────────────────────────────────────────────────────────────
// Quanto custa (e quando não vale a pena)
// ──────────────────────────────────────────────────────────────
export const PRECO = {
  eyebrow: "sem enrolação",
  titulo: "Quanto custa",
  sub: "e quando não vale a pena me contratar",
  opcoes: [
    {
      nome: "IA do WhatsApp Business",
      preco: "R$ 0",
      serve: "Responde pergunta frequente com base no teu catálogo. Se é só disso que você precisa, usa ela. Sério.",
      nota: "lançada pela Meta no Brasil em 2026",
    },
    {
      nome: "Robô de prateleira",
      preco: "a partir de ~R$ 99/mês",
      serve: "Fluxo pronto que você mesmo configura. Bom pra começar e ver se resposta automática serve pro teu cliente.",
      nota: "várias opções no mercado",
    },
  ],
  sobMedida: {
    nome: "Sob medida, comigo",
    serve: "Quando o atendimento precisa mexer no resto do negócio: marcar na tua agenda, cobrar, lembrar, mandar pedido pra cozinha, avisar a equipe. E alguém que constrói e continua cuidando.",
    semPreco: "no tamanho do problema",
    semPrecoNota: "Na conversa de 20 minutos cê sai sabendo o preço do teu caso.",
    cta: "quero saber o meu",
  },
  garantia: "garantia",
};

// ──────────────────────────────────────────────────────────────
// Quem constrói
// ──────────────────────────────────────────────────────────────
export const ARTHUR = {
  eyebrow: "quem constrói",
  titulo: "Prazer, Arthur.",
  corpo: [
    "Eu construo sistema com IA pra negócio de verdade: salão, clínica, pizzaria. Do jeito que o teu negócio funciona, não do jeito que um software de prateleira acha que deveria.",
    "Quem constrói é quem cuida depois. Quando você chama no zap, quem responde sou eu.",
  ],
  prova: `${diario.total} alterações de código desde abril, em ${Object.keys(diario.porRepo).length} projetos.`,
  bastidores: "ver os bastidores",
  instagram: "e no Instagram eu mostro como faço",
  video: "Vídeo de apresentação do Arthur",
};

// ──────────────────────────────────────────────────────────────
// Dúvidas. As que dependem de material só aparecem quando ele existe.
// ──────────────────────────────────────────────────────────────
export const DUVIDAS = {
  eyebrow: "antes de chamar",
  titulo: "Pergunta que todo mundo faz",
  fixas: [
    {
      q: "Preciso entender de tecnologia?",
      a: "Não. Você me conta como teu negócio funciona, eu construo, e você usa pelo WhatsApp e por um painel simples. Travou em alguma coisa, me chama.",
    },
    {
      q: "A Bela marca horário?",
      a: "Quem marca é o cliente, no teu link de agendamento (o Maarkio), em um minuto e sem conversa. A Bela cuida da relação: responde dúvida, entende áudio, manda o link na hora certa e te chama quando é com você.",
    },
    {
      q: "E se o cliente quiser falar com gente?",
      a: "A Bela passa a conversa pra você ou pra tua equipe, com o resumo pronto. Vocês respondem pelo painel, até em áudio.",
    },
    {
      q: "A IA pode falar besteira pro meu cliente?",
      a: "Ela responde o que você combinou que ela responde. Dúvida de saúde, reclamação, negociação, ou qualquer coisa que ela não sabe: passa pra você, em vez de inventar.",
    },
    {
      q: "Por que não uso a IA grátis do WhatsApp?",
      a: "Pode usar: pra pergunta frequente, ela resolve. Sob medida faz sentido quando o atendimento precisa mexer no resto do negócio: tua agenda, tua cobrança, teu pedido, tua equipe.",
    },
    {
      q: "E se der problema?",
      a: "O sistema avisa quando uma mensagem não sai, e eu acompanho de perto. Qualquer coisa estranha, me chama no zap.",
    },
  ],
  prazo: "Quanto tempo leva pra ficar pronto?",
  contrato: "Tem mensalidade? Tem fidelidade?",
};

// ──────────────────────────────────────────────────────────────
// Bastidores (/bastidores): a parte de dev.
// ──────────────────────────────────────────────────────────────
export const BASTIDORES = {
  eyebrow: "bastidores",
  heroi: "POR DENTRO",
  corpo:
    "A parte de dev: os sistemas com a decisão técnica de cada um, as peças do lab e o diário de commits. Se você veio pra contratar, a conversa é na outra página.",
  voltar: "← voltar pro início",
};

export const RODAPE = {
  assinatura: "SAtomiq assina. O Arthur constrói.",
  feito: "Este site também é peça do portfólio: Vite, React e GSAP, tudo desenhado em código.",
};

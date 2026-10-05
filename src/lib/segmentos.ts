// ──────────────────────────────────────────────────────────────
// Os negócios que a página sabe contar. A pessoa escolhe um no topo e o
// site inteiro se reescreve pra ele: o dia de 24h, a demo, a conta e o
// recado que vai pro zap.
//
// Tudo aqui é dramatização com dado de exemplo (nome de cliente, horário,
// valor). O negócio do exemplo se chama "Teu Salão", "Tua Clínica"…: é o
// da pessoa que está lendo, e ninguém confunde com caso real.
// ──────────────────────────────────────────────────────────────

export type SegmentoId = "salao" | "clinica" | "delivery" | "outro";

export type Msg =
  | { de: "cliente" | "bela"; texto: string; hora: string }
  | { de: "cliente"; audio: string; hora: string; transcricao?: string }
  // A Bela não marca nem vende: manda o link do sistema que faz isso.
  | { de: "bela"; link: { titulo: string; endereco: string }; hora: string }
  | { de: "sistema"; texto: string };

export type Tela =
  | {
      tipo: "inbox";
      itens: { nome: string; previa: string; hora: string; naoLidas?: number; selo?: { texto: string; tom: Tom } }[];
    }
  | { tipo: "chat"; contato: string; msgs: Msg[]; rodape?: string }
  | {
      tipo: "agenda";
      dia: string;
      slots: { hora: string; texto: string; estado: "ocupado" | "livre" | "faltou" | "novo" }[];
      aviso?: string;
    }
  | { tipo: "bloqueio"; hora: string; data: string; notifs: { app: "zap" | "bela" | "maarkio"; titulo: string; texto: string }[] }
  | { tipo: "comanda"; numero: string; hora: string; itens: [string, string][]; obs?: string; total: string; pago: boolean }
  | { tipo: "lista"; titulo: string; itens: { texto: string; feito: boolean; nota?: string }[] };

export type Tom = "oliva" | "azul" | "latao" | "tijolo";

export type Cena = {
  hora: string;
  titulo: string;
  antes: { texto: string; tela: Tela };
  depois: { texto: string; tela: Tela };
};

export type Segmento = {
  id: SegmentoId;
  nome: string; // como aparece no seletor
  curto: string; // "salão"
  noTeu: string; // "no teu salão"
  negocio: string; // o nome do negócio de exemplo
  frase: string; // vai pro zap: "Tenho um salão."
  dia: Cena[];
  conta: { porSemana: number; ticket: number; ticketMax: number; rotuloTicket: string };
  atalhos: { nome: string; texto: string }[];
};

// ── Salão / barbearia ─────────────────────────────────────────────────────
const salao: Segmento = {
  id: "salao",
  nome: "salão ou barbearia",
  curto: "salão",
  noTeu: "no teu salão",
  negocio: "Teu Salão",
  frase: "Tenho um salão.",
  conta: { porSemana: 15, ticket: 80, ticketMax: 600, rotuloTicket: "Quanto deixa um cliente, em média" },
  atalhos: [
    { nome: "agenda", texto: "Marco tudo pelo WhatsApp e a agenda vive com furo." },
    { nome: "faltas", texto: "Cliente marca e não aparece, e eu fico com o horário parado." },
    { nome: "responder", texto: "Não dou conta de responder o zap atendendo na cadeira." },
  ],
  dia: [
    {
      hora: "07:58",
      titulo: "Antes de abrir",
      antes: {
        texto: "Você nem abriu e já tem conversa de ontem à noite esperando. Metade é gente querendo horário.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Júlia", previa: "oi! tem horário amanhã à tarde?", hora: "23:12", naoLidas: 2 },
            { nome: "Rafael", previa: "corte + barba no sábado, rola?", hora: "22:47", naoLidas: 1 },
            { nome: "Camila", previa: "quanto tá a escova?", hora: "21:30", naoLidas: 3 },
            { nome: "Bruno", previa: "consegue me encaixar hoje?", hora: "07:41", naoLidas: 1 },
            { nome: "Marta", previa: "bom dia, posso remarcar?", hora: "07:52", naoLidas: 2 },
          ],
        },
      },
      depois: {
        texto: "A Bela respondeu na hora e mandou o teu link pra quem queria horário. Três marcaram sozinhos, de madrugada.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Júlia", previa: "Bela: escolhe teu horário aqui ↗", hora: "23:12", selo: { texto: "marcou no link", tom: "oliva" } },
            { nome: "Rafael", previa: "Bela: os horários de sábado tão aqui ↗", hora: "22:47", selo: { texto: "marcou no link", tom: "oliva" } },
            { nome: "Camila", previa: "Bela: escova a partir de R$ 60…", hora: "21:30", selo: { texto: "respondido", tom: "azul" } },
            { nome: "Bruno", previa: "Bela: hoje tem 16h, marca aqui ↗", hora: "07:41", selo: { texto: "marcou no link", tom: "oliva" } },
            { nome: "Marta", previa: "Bela: remarca pelo mesmo link ↗", hora: "07:52", selo: { texto: "remarcou", tom: "latao" } },
          ],
        },
      },
    },
    {
      hora: "11:40",
      titulo: "Mão na tesoura",
      antes: {
        texto: "Cliente na cadeira, celular vibrando no balcão. Quem chama agora espera, e quem espera chama outro salão.",
        tela: {
          tipo: "chat",
          contato: "Paula",
          msgs: [
            { de: "cliente", texto: "oi", hora: "11:31" },
            { de: "cliente", texto: "tem horário hoje à tarde?", hora: "11:31" },
            { de: "cliente", texto: "??", hora: "11:38" },
          ],
          rodape: "sem resposta há 9 min",
        },
      },
      depois: {
        texto: "A Bela responde no teu tom e manda o link da agenda. A Paula escolhe o horário sozinha, e você só vê o nome aparecer.",
        tela: {
          tipo: "chat",
          contato: "Paula",
          msgs: [
            { de: "cliente", texto: "tem horário hoje à tarde?", hora: "11:31" },
            { de: "bela", texto: "Oi, Paula! Tem sim, hoje à tarde tem 15h e 16h30. É só escolher aqui:", hora: "11:31" },
            { de: "bela", link: { titulo: "Agendar · Teu Salão", endereco: "teusalao.com.br/agenda" }, hora: "11:31" },
            { de: "cliente", texto: "marquei 16h30!", hora: "11:33" },
            { de: "sistema", texto: "Paula marcou 16h30 pelo link · 11:33" },
          ],
        },
      },
    },
    {
      hora: "15:00",
      titulo: "O buraco na agenda",
      antes: {
        texto: "A cliente das 15h não veio. Não avisou. É uma hora parada e um horário que alguém queria.",
        tela: {
          tipo: "agenda",
          dia: "hoje",
          slots: [
            { hora: "14:00", texto: "Escova · Júlia", estado: "ocupado" },
            { hora: "15:00", texto: "Luzes · Bia", estado: "faltou" },
            { hora: "16:30", texto: "Corte · Paula", estado: "ocupado" },
            { hora: "17:30", texto: "livre", estado: "livre" },
          ],
        },
      },
      depois: {
        texto: "Ontem o Maarkio mandou o lembrete no zap e ela remarcou pelo link. O horário voltou pra agenda online, e alguém pegou.",
        tela: {
          tipo: "agenda",
          dia: "hoje",
          slots: [
            { hora: "14:00", texto: "Escova · Júlia", estado: "ocupado" },
            { hora: "15:00", texto: "Corte · Diego · marcou pelo link", estado: "novo" },
            { hora: "16:30", texto: "Corte · Paula", estado: "ocupado" },
            { hora: "17:30", texto: "Barba · Rafael", estado: "novo" },
          ],
          aviso: "Bia remarcou pra sábado pelo lembrete de ontem",
        },
      },
    },
    {
      hora: "20:30",
      titulo: "Jantar",
      antes: {
        texto: "Jantar com a família, e você respondendo cliente no celular. De novo.",
        tela: {
          tipo: "bloqueio",
          hora: "20:31",
          data: "sexta-feira",
          notifs: [
            { app: "zap", titulo: "Rafael", texto: "e sábado de manhã, tem?" },
            { app: "zap", titulo: "Camila", texto: "e o valor da progressiva?" },
            { app: "zap", titulo: "Paula", texto: "obrigada!! amei o corte" },
            { app: "zap", titulo: "WhatsApp", texto: "+ 6 mensagens de 4 conversas" },
          ],
        },
      },
      depois: {
        texto: "Celular no bolso. Só chega o que precisa mesmo de você, com o resumo pronto.",
        tela: {
          tipo: "bloqueio",
          hora: "20:31",
          data: "sexta-feira",
          notifs: [
            { app: "bela", titulo: "Precisa de você", texto: "Camila quer orçamento de progressiva pra cabelo longo. Mandou foto." },
            { app: "maarkio", titulo: "Amanhã", texto: "9 horários marcados, 6 pelo link. Lembretes saem às 19h." },
          ],
        },
      },
    },
    {
      hora: "23:47",
      titulo: "Madrugada",
      antes: {
        texto: "Alguém quer marcar pra amanhã cedo. Ninguém responde, e às 8h ela já marcou em outro lugar.",
        tela: {
          tipo: "chat",
          contato: "Larissa",
          msgs: [{ de: "cliente", texto: "boa noite! consegue amanhã 9h? é pra uma escova", hora: "23:47" }],
          rodape: "enviada 23:47 · sem resposta",
        },
      },
      depois: {
        texto: "A Bela respondeu às 23:47, ela marcou pelo link às 23:48. Você vê de manhã, já na agenda.",
        tela: {
          tipo: "bloqueio",
          hora: "23:49",
          data: "quinta-feira",
          notifs: [
            { app: "maarkio", titulo: "Novo agendamento", texto: "Larissa · amanhã, 9h · escova. Marcou pelo link às 23:48." },
            { app: "bela", titulo: "Respondido", texto: "Larissa perguntou de amanhã 9h. Mandei teu link." },
          ],
        },
      },
    },
  ],
};

// ── Clínica / estética ────────────────────────────────────────────────────
const clinica: Segmento = {
  id: "clinica",
  nome: "clínica ou estética",
  curto: "clínica",
  noTeu: "na tua clínica",
  negocio: "Tua Clínica",
  frase: "Tenho uma clínica.",
  conta: { porSemana: 20, ticket: 350, ticketMax: 3000, rotuloTicket: "Quanto vale uma paciente nova, em média" },
  atalhos: [
    { nome: "atendimento", texto: "Chega mensagem o dia inteiro e a gente não responde entre um procedimento e outro." },
    { nome: "faltas", texto: "Paciente marca avaliação e não aparece." },
    { nome: "áudios", texto: "Muita paciente manda áudio longo e ninguém tem tempo de ouvir." },
  ],
  dia: [
    {
      hora: "07:50",
      titulo: "Antes da primeira paciente",
      antes: {
        texto: "Conversa da noite inteira esperando: preço, foto de mancha, gente querendo avaliação. Tudo pra você ler antes das 8h.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Fernanda", previa: "quanto custa a limpeza de pele?", hora: "22:14", naoLidas: 2 },
            { nome: "Luiza", previa: "::foto", hora: "23:02", naoLidas: 1 },
            { nome: "Patrícia", previa: "queria marcar uma avaliação", hora: "21:40", naoLidas: 1 },
            { nome: "Renata", previa: "::audio 0:42", hora: "06:58", naoLidas: 1 },
            { nome: "Carla", previa: "posso levar acompanhante?", hora: "07:30", naoLidas: 1 },
          ],
        },
      },
      depois: {
        texto: "Respondidas de madrugada. Quem perguntou preço recebeu valor e o link da agenda, e marcou sozinha. A foto foi pra doutora, com resumo.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Fernanda", previa: "Bela: valores + link da avaliação ↗", hora: "22:14", selo: { texto: "marcou no link", tom: "oliva" } },
            { nome: "Luiza", previa: "Bela: passei tua foto pra doutora", hora: "23:02", selo: { texto: "pra você", tom: "tijolo" } },
            { nome: "Patrícia", previa: "Bela: escolhe teu horário aqui ↗", hora: "21:40", selo: { texto: "marcou no link", tom: "oliva" } },
            { nome: "Renata", previa: "Bela: entendi teu áudio, remarca aqui ↗", hora: "06:58", selo: { texto: "remarcou", tom: "latao" } },
            { nome: "Carla", previa: "Bela: pode sim, sem problema!", hora: "07:30", selo: { texto: "respondido", tom: "azul" } },
          ],
        },
      },
    },
    {
      hora: "10:20",
      titulo: "Paciente na maca",
      antes: {
        texto: "Você no meio de um procedimento, a recepção no telefone e o zap acumulando.",
        tela: {
          tipo: "chat",
          contato: "Bianca",
          msgs: [
            { de: "cliente", texto: "oi, vocês fazem limpeza de pele?", hora: "10:12" },
            { de: "cliente", texto: "e qual o valor?", hora: "10:13" },
            { de: "cliente", texto: "alguém?", hora: "10:19" },
          ],
          rodape: "sem resposta há 8 min",
        },
      },
      depois: {
        texto: "A Bela explica o procedimento, passa o valor da tua tabela e manda o link da agenda. Diagnóstico, nunca: isso é da doutora.",
        tela: {
          tipo: "chat",
          contato: "Bianca",
          msgs: [
            { de: "cliente", texto: "oi, vocês fazem limpeza de pele?", hora: "10:12" },
            { de: "bela", texto: "Fazemos sim! A limpeza profunda leva uns 60 minutos e sai a partir de R$ 180. Os horários da semana tão aqui:", hora: "10:12" },
            { de: "bela", link: { titulo: "Agendar · Tua Clínica", endereco: "tuaclinica.com.br/agenda" }, hora: "10:12" },
            { de: "sistema", texto: "Bianca marcou quinta 9h pelo link · 10:15" },
          ],
        },
      },
    },
    {
      hora: "14:05",
      titulo: "Áudio de dois minutos",
      antes: {
        texto: "Paciente manda áudio de dois minutos. Você só vai conseguir ouvir à noite.",
        tela: {
          tipo: "chat",
          contato: "Renata",
          msgs: [{ de: "cliente", audio: "2:04", hora: "13:58" }],
          rodape: "áudio não ouvido",
        },
      },
      depois: {
        texto: "A Bela ouve e entende. Dúvida de saúde vai pra doutora, com o resumo do áudio em texto.",
        tela: {
          tipo: "chat",
          contato: "Renata",
          msgs: [
            {
              de: "cliente",
              audio: "2:04",
              hora: "13:58",
              transcricao: "fiz o procedimento semana passada e ainda tá um pouco inchado, é normal?",
            },
            { de: "bela", texto: "Entendi, Renata. Isso quem responde é a doutora: já passei pra ela com o teu relato.", hora: "13:58" },
            { de: "sistema", texto: "passou pra doutora · resumo pronto" },
          ],
        },
      },
    },
    {
      hora: "19:40",
      titulo: "Clínica fechada",
      antes: {
        texto: "Fechou às 18h. Desde então, mensagem chegando e ninguém vendo.",
        tela: {
          tipo: "bloqueio",
          hora: "19:41",
          data: "quarta-feira",
          notifs: [
            { app: "zap", titulo: "Fernanda", texto: "ainda dá pra amanhã?" },
            { app: "zap", titulo: "Luiza", texto: "oi?" },
            { app: "zap", titulo: "WhatsApp", texto: "+ 12 mensagens de 7 conversas" },
          ],
        },
      },
      depois: {
        texto: "A doutora vê só o que é dela, com resumo. Responde do painel, até por áudio.",
        tela: {
          tipo: "bloqueio",
          hora: "19:41",
          data: "quarta-feira",
          notifs: [
            { app: "bela", titulo: "Precisa de você", texto: "2 pacientes com dúvida depois do procedimento. Resumo pronto." },
            { app: "maarkio", titulo: "Amanhã", texto: "7 avaliações marcadas, 5 pelo link. Lembretes com endereço saem às 18h." },
          ],
        },
      },
    },
    {
      hora: "23:15",
      titulo: "Ela tá decidindo",
      antes: {
        texto: "Ela viu teus posts, decidiu marcar e mandou mensagem. Silêncio. De manhã, marcou na clínica que respondeu.",
        tela: {
          tipo: "chat",
          contato: "Mariana",
          msgs: [{ de: "cliente", texto: "oi! vi o antes e depois de vocês, queria marcar uma avaliação", hora: "23:15" }],
          rodape: "enviada 23:15 · sem resposta",
        },
      },
      depois: {
        texto: "Respondida às 23:15, com o link da agenda. Ela marcou na hora, e o lembrete sai na véspera.",
        tela: {
          tipo: "chat",
          contato: "Mariana",
          msgs: [
            { de: "cliente", texto: "oi! vi o antes e depois de vocês, queria marcar uma avaliação", hora: "23:15" },
            { de: "bela", texto: "Que bom que você gostou! A avaliação é sem custo. Escolhe o melhor horário aqui:", hora: "23:15" },
            { de: "bela", link: { titulo: "Agendar avaliação · Tua Clínica", endereco: "tuaclinica.com.br/agenda" }, hora: "23:15" },
            { de: "sistema", texto: "Mariana marcou terça 14h pelo link · 23:17" },
          ],
        },
      },
    },
  ],
};

// ── Restaurante / delivery ────────────────────────────────────────────────
const delivery: Segmento = {
  id: "delivery",
  nome: "restaurante ou delivery",
  curto: "delivery",
  noTeu: "no teu delivery",
  negocio: "Tua Pizzaria",
  frase: "Tenho um restaurante/delivery.",
  conta: { porSemana: 25, ticket: 70, ticketMax: 400, rotuloTicket: "Quanto vale um pedido, em média" },
  atalhos: [
    { nome: "pedidos", texto: "Recebo pedido pelo WhatsApp e anoto tudo na mão." },
    { nome: "comissão", texto: "Quero vender sem pagar comissão de aplicativo." },
    { nome: "pico", texto: "No pico de sexta o zap não para e pedido sai errado." },
  ],
  dia: [
    {
      hora: "17:30",
      titulo: "Antes de abrir o forno",
      antes: {
        texto: "Ainda nem abriu e já tem gente perguntando cardápio, taxa de entrega e se aceita PIX.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Marcos", previa: "tem cardápio?", hora: "17:02", naoLidas: 2 },
            { nome: "Ana", previa: "entrega no Cambuí?", hora: "17:10", naoLidas: 1 },
            { nome: "Léo", previa: "aceita pix?", hora: "17:21", naoLidas: 1 },
            { nome: "Bia", previa: "que horas abre?", hora: "17:25", naoLidas: 1 },
          ],
        },
      },
      depois: {
        texto: "Cada um recebeu o link do cardápio, com a taxa do bairro dele. Ninguém digitou o cardápio de novo.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Marcos", previa: "Bela: o cardápio tá aqui ↗", hora: "17:02", selo: { texto: "respondido", tom: "azul" } },
            { nome: "Ana", previa: "Bela: Cambuí, taxa R$ 6", hora: "17:10", selo: { texto: "respondido", tom: "azul" } },
            { nome: "Léo", previa: "Bela: PIX na hora do pedido ✓", hora: "17:21", selo: { texto: "respondido", tom: "azul" } },
            { nome: "Bia", previa: "Bela: abre às 18h!", hora: "17:25", selo: { texto: "respondido", tom: "azul" } },
          ],
        },
      },
    },
    {
      hora: "19:45",
      titulo: "O pico de sexta",
      antes: {
        texto: "Trinta pedidos em uma hora pelo zap. Um \"sem cebola\" se perde no meio.",
        tela: {
          tipo: "chat",
          contato: "Ana",
          msgs: [
            { de: "cliente", texto: "1 calabresa grande, metade mussarela", hora: "19:41" },
            { de: "cliente", texto: "ah e sem cebola na metade calabresa", hora: "19:42" },
            { de: "cliente", texto: "e uma coca 2l", hora: "19:42" },
            { de: "cliente", texto: "pix ou dinheiro?", hora: "19:44" },
          ],
          rodape: "anotando no papel…",
        },
      },
      depois: {
        texto: "O pedido entra pelo cardápio, já pago no PIX, e sai na impressora da cozinha do jeito que o cliente pediu.",
        tela: {
          tipo: "comanda",
          numero: "#0142",
          hora: "19:42",
          itens: [
            ["1x Pizza G ½ calabresa ½ mussarela", "62,90"],
            ["1x Coca-Cola 2L", "12,00"],
            ["Entrega · Cambuí", "6,00"],
          ],
          obs: "sem cebola na ½ calabresa",
          total: "80,90",
          pago: true,
        },
      },
    },
    {
      hora: "20:30",
      titulo: "Cadê meu pedido?",
      antes: {
        texto: "Metade das mensagens agora é \"já saiu?\". Alguém para de montar pizza pra responder.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Ana", previa: "já saiu?", hora: "20:22", naoLidas: 3 },
            { nome: "Marcos", previa: "demora muito?", hora: "20:25", naoLidas: 2 },
            { nome: "Léo", previa: "??", hora: "20:28", naoLidas: 2 },
            { nome: "Carol", previa: "vocês tão abertos?", hora: "20:29", naoLidas: 1 },
          ],
        },
      },
      depois: {
        texto: "A Bela olha o pedido e responde: saiu às 20:21, chega em uns 15 minutos. A cozinha nem fica sabendo.",
        tela: {
          tipo: "inbox",
          itens: [
            { nome: "Ana", previa: "Bela: saiu 20:21, chega em ~15 min", hora: "20:22", selo: { texto: "respondido", tom: "azul" } },
            { nome: "Marcos", previa: "Bela: tá no forno, sai em 10 min", hora: "20:25", selo: { texto: "respondido", tom: "azul" } },
            { nome: "Léo", previa: "Bela: entregue às 20:27 ✓", hora: "20:28", selo: { texto: "respondido", tom: "azul" } },
            { nome: "Carol", previa: "Bela: abertos até 23h, cardápio ↗", hora: "20:29", selo: { texto: "pediu", tom: "oliva" } },
          ],
        },
      },
    },
    {
      hora: "23:40",
      titulo: "Cozinha fechada",
      antes: {
        texto: "Já fechou. Chega uma encomenda pra festa de sábado. Fica pra amanhã, se alguém lembrar.",
        tela: {
          tipo: "chat",
          contato: "Rodrigo",
          msgs: [
            { de: "cliente", texto: "boa noite, vocês fazem encomenda pra festa?", hora: "23:40" },
            { de: "cliente", texto: "umas 6 pizzas pra sábado 19h", hora: "23:41" },
          ],
          rodape: "enviada 23:41 · sem resposta",
        },
      },
      depois: {
        texto: "Respondido na hora. A encomenda virou resumo pra você confirmar de manhã.",
        tela: {
          tipo: "chat",
          contato: "Rodrigo",
          msgs: [
            { de: "cliente", texto: "umas 6 pizzas pra sábado 19h", hora: "23:41" },
            { de: "bela", texto: "Fazemos sim! Anotei: 6 pizzas, sábado às 19h. Amanhã cedo o dono confirma contigo os sabores.", hora: "23:41" },
            { de: "sistema", texto: "resumo pro dono · encomenda sáb 19h" },
          ],
        },
      },
    },
  ],
};

// ── Outro negócio ─────────────────────────────────────────────────────────
const outro: Segmento = {
  id: "outro",
  nome: "outro negócio",
  curto: "negócio",
  noTeu: "no teu negócio",
  negocio: "Teu Negócio",
  frase: "Tenho um negócio que roda muito pelo WhatsApp.",
  conta: { porSemana: 10, ticket: 300, ticketMax: 5000, rotuloTicket: "Quanto vale um cliente novo, em média" },
  atalhos: [
    { nome: "planilha", texto: "Tem uma planilha que alguém atualiza na mão todo santo dia." },
    { nome: "orçamento", texto: "Demoro pra mandar orçamento e perco cliente." },
    { nome: "cobrança", texto: "Cobrar cliente é manual e sempre fica pra depois." },
  ],
  dia: [
    {
      hora: "08:30",
      titulo: "Segunda de manhã",
      antes: {
        texto: "Copiar pedido do zap pra planilha, da planilha pro sistema, do sistema pro e-mail. Toda segunda.",
        tela: {
          tipo: "lista",
          titulo: "Fazer hoje",
          itens: [
            { texto: "Passar 14 pedidos do zap pra planilha", feito: false },
            { texto: "Mandar orçamento pro Marcos", feito: false },
            { texto: "Cobrar a Ana (venceu sexta)", feito: false },
            { texto: "Atualizar o estoque", feito: false },
          ],
        },
      },
      depois: {
        texto: "Isso tudo rodou sozinho de madrugada. Você abre o painel e só confere.",
        tela: {
          tipo: "lista",
          titulo: "Fazer hoje",
          itens: [
            { texto: "Passar 14 pedidos do zap pra planilha", feito: true, nota: "06:00 · sozinho" },
            { texto: "Mandar orçamento pro Marcos", feito: true, nota: "rascunho pronto" },
            { texto: "Cobrar a Ana (venceu sexta)", feito: true, nota: "lembrete enviado" },
            { texto: "Atualizar o estoque", feito: true, nota: "06:00 · sozinho" },
          ],
        },
      },
    },
    {
      hora: "11:05",
      titulo: "Pedido de orçamento",
      antes: {
        texto: "Cliente pede orçamento. Você responde três dias depois. Ele já fechou com outro.",
        tela: {
          tipo: "chat",
          contato: "Marcos",
          msgs: [{ de: "cliente", texto: "oi, queria um orçamento pra 40 unidades, entrega mês que vem", hora: "11:02" }],
          rodape: "visto · sem resposta há 3 dias",
        },
      },
      depois: {
        texto: "A Bela faz as perguntas certas, junta tudo e te entrega o orçamento pronto pra aprovar.",
        tela: {
          tipo: "chat",
          contato: "Marcos",
          msgs: [
            { de: "cliente", texto: "oi, queria um orçamento pra 40 unidades, entrega mês que vem", hora: "11:02" },
            { de: "bela", texto: "Claro, Marcos! É pra qual cidade? E tem alguma data certa?", hora: "11:02" },
            { de: "cliente", texto: "Campinas, até dia 20", hora: "11:04" },
            { de: "sistema", texto: "orçamento pronto pra você aprovar" },
          ],
        },
      },
    },
    {
      hora: "16:00",
      titulo: "Cobrança",
      antes: {
        texto: "Três pagamentos vencidos. Cobrar é chato, então fica pra depois.",
        tela: {
          tipo: "lista",
          titulo: "Vencidos",
          itens: [
            { texto: "Ana · R$ 480 · venceu há 3 dias", feito: false },
            { texto: "Pedro · R$ 1.200 · venceu ontem", feito: false },
            { texto: "Studio K · R$ 350 · vence hoje", feito: false },
          ],
        },
      },
      depois: {
        texto: "O lembrete educado sai sozinho no dia certo. Você só vê quem já pagou.",
        tela: {
          tipo: "lista",
          titulo: "Vencidos",
          itens: [
            { texto: "Ana · R$ 480", feito: true, nota: "pagou 16:12" },
            { texto: "Pedro · R$ 1.200", feito: true, nota: "lembrete enviado" },
            { texto: "Studio K · R$ 350", feito: true, nota: "pagou 09:40" },
          ],
        },
      },
    },
    {
      hora: "22:10",
      titulo: "Fora do horário",
      antes: {
        texto: "Cliente querendo saber do pedido às 22h. Amanhã você responde, e ele fica achando que sumiu.",
        tela: {
          tipo: "chat",
          contato: "Juliana",
          msgs: [{ de: "cliente", texto: "boa noite, meu pedido já foi despachado?", hora: "22:10" }],
          rodape: "enviada 22:10 · sem resposta",
        },
      },
      depois: {
        texto: "Respondido com o status de verdade, puxado do teu sistema. Na hora.",
        tela: {
          tipo: "chat",
          contato: "Juliana",
          msgs: [
            { de: "cliente", texto: "boa noite, meu pedido já foi despachado?", hora: "22:10" },
            { de: "bela", texto: "Boa noite, Juliana! Saiu hoje às 15h, chega quinta. O rastreio é este ↗", hora: "22:10" },
            { de: "cliente", texto: "ah que ótimo, obrigada!", hora: "22:11" },
          ],
        },
      },
    },
  ],
};

export const SEGMENTOS: Record<SegmentoId, Segmento> = { salao, clinica, delivery, outro };
export const ORDEM: SegmentoId[] = ["salao", "clinica", "delivery", "outro"];

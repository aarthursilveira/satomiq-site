# O que falta pro site ficar completo

Tudo aqui é o que só você tem. Enquanto um item não chega, o site no ar se
vira sem ele: a seção encolhe ou some, nunca mostra buraco nem número
inventado. Pra ver onde cada coisa vai entrar, rode `npm run dev` e abra
`http://localhost:5173/?rascunho`: cada lacuna aparece como uma caixa
tracejada. `npm run build` também lista o que está pendente.

Pode me mandar tudo solto (arquivo, print, áudio, texto no zap) que eu encaixo.
Quem quiser fazer na mão: arquivo em `public/arthur/` e o dado em
`src/lib/material.ts`.

---

## 1. Vídeo de apresentação (prioridade alta)

Vai na seção "Prazer, Arthur.", grande, ao lado do texto.

- **Formato:** 4:3 horizontal, 1440×1080 (ou 1920×1440). Se preferir 3:4 em
  pé, me avisa: muda uma linha.
- **Duração:** 40 a 60 segundos.
- **Arquivo:** MP4 (H.264), o bruto mesmo. Eu comprimo pra web e tiro a capa.
- **Luz e som:** à noite tá ótimo, desde que o rosto esteja bem iluminado. Som
  sem eco faz mais diferença que a imagem.
- **Roteiro sugerido (3 partes, com as tuas palavras):**
  1. Quem é: "Eu sou o Arthur, eu construo sistema pra negócio de verdade."
  2. Um caso: o problema que um cliente tinha e o que mudou depois (com um
     número, se tiver).
  3. O convite: "Me conta o teu problema no zap. Quem responde sou eu."
- **Legenda:** muita gente vê sem som. Se mandar o texto falado, eu ponho
  legenda no player.

## 2. Retrato

- Uma foto tua, **4:3** pra combinar com o vídeo. Vira a capa do vídeo e entra
  sozinha se o vídeo não vier.

## 3. Números reais (sem nome de cliente)

Até 3 por sistema. Se for estimativa, me diz que é estimativa.

**Maarkio (agenda por link)**
- [ ] quantos agendamentos pelo link por mês
- [ ] quantos desses foram feitos fora do horário comercial
- [ ] quanto as faltas caíram depois do lembrete na véspera
- [ ] quantos negócios usam hoje

**Bela (atendimento no WhatsApp)**
- [ ] quantas conversas por mês
- [ ] quantas chegam fora do horário
- [ ] tempo médio de resposta
- [ ] de cada 10 conversas, quantas precisam de gente

**Gluten (delivery)**
- [ ] se já tiver pizzaria rodando, pedidos por mês (hoje o site diz "em
      demonstração")

## 4. Depoimentos

Um por sistema, se der. Pode ser:
- a frase + primeiro nome + tipo de negócio (ex.: "Camila, salão em Campinas"); ou
- print de conversa, **com autorização**; ou
- vídeo curto de celular.

## 5. Oferta

- [ ] **Preço "a partir de":** por sistema (Bela, Maarkio, Gluten, sob medida)
      ou um geral. Opcional, mas ajuda muito: hoje o site diz "no tamanho do
      problema, o preço sai na conversa".
- [ ] **Como cobra:** construção + mensalidade? Só mensalidade?
- [ ] **Fidelidade:** tem? Quanto tempo de aviso pra sair?
- [ ] **Prazo típico:** do "fechado" até estar no ar.
- [ ] **Garantia:** se existir, em uma frase.

## 6. Como as peças funcionam (pra demo e o "dia de 24h" ficarem exatos)

Escrevi o site assumindo o seguinte. Corrige o que estiver errado:

- [ ] A Bela manda o link do Maarkio na conversa quando a pessoa quer marcar.
- [ ] Quem marca é o cliente, pelo link. A Bela não marca direto na agenda.
- [ ] O Maarkio manda **lembrete na véspera** pelo WhatsApp. Manda também
      confirmação na hora do agendamento?
- [ ] Dá pra **remarcar pelo link** (e o horário antigo libera sozinho)?
- [ ] Como é o endereço real do link do Maarkio? (no site usei
      `teusalao.com.br/agenda` como exemplo)
- [ ] A Bela manda o link do cardápio do Gluten e responde taxa, horário e
      "cadê meu pedido?" consultando o pedido?
- [ ] A Bela entende foto, além de áudio e texto? (o site diz que sim)
- [ ] Quando passa pra gente, a profissional responde pelo painel, inclusive
      por áudio? (o site diz que sim)

## 7. Frases que escrevi e só você pode confirmar

- [ ] "Quando você chama no zap, quem responde sou eu." (seção do Arthur)
- [ ] "rodando agora: a Bela numa clínica de estética, o Maarkio em salões" (topo)
- [ ] Problema do caso Maarkio: "Horário marcado na mão pelo WhatsApp, e
      cliente que esquece e falta."
- [ ] Problema do caso Bela: "Mensagem chegando o dia inteiro, muita em áudio,
      e a equipe sem tempo de responder entre um procedimento e outro."
- [ ] "Ela responde o que você combinou… passa pra você em vez de inventar." (dúvidas)
- [ ] "O sistema avisa quando uma mensagem não sai." (dúvidas e "como funciona")

## 8. Opcional, mas sobe o nível

- [ ] Print real dos painéis (Maarkio, Bela, Gluten) com dado de cliente
      borrado. Substitui as telas desenhadas nos casos.
- [ ] 2 ou 3 reels do @arthursilveira.ai que você quer destacar no site.
- [ ] Cidade ou região que você atende, se quiser aparecer no Google local.

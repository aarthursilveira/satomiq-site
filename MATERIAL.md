# O que falta pro site ficar completo

Tudo aqui é o que só você tem. Enquanto um item não chega, o site no ar se
vira sem ele: a parte encolhe ou some, nunca mostra buraco nem número
inventado. Pra ver onde cada coisa entra, rode `npm run dev` e abra
`http://localhost:5173/`, ou abra o site no ar com `?rascunho` no fim do
endereço: cada lacuna aparece como uma caixa tracejada. `npm run build`
também lista o que está pendente.

Pode me mandar tudo solto (arquivo, print, áudio, texto no zap) que eu encaixo.
Quem quiser fazer na mão: arquivo em `public/arthur/` e o dado em
`src/material.ts`.

---

## 1. Vídeo de apresentação (prioridade alta)

Entra na seção "Prazer, Arthur.", numa janela retrô chamada
`apresentacao.mp4`, grande, ao lado do texto. Só carrega quando a pessoa dá
play: não pesa pra quem chega pelo Instagram.

- **Formato:** 4:3 deitado, 1440×1080 (ou 1920×1440). Se preferir 3:4 em pé,
  me avisa: muda uma linha.
- **Duração:** 40 a 60 segundos.
- **Arquivo:** MP4 (H.264), o bruto mesmo. Eu comprimo pra web e tiro a capa.
- **Luz e som:** à noite tá ótimo, desde que o rosto esteja bem iluminado. Som
  sem eco faz mais diferença que a imagem.
- **Roteiro sugerido (3 partes, com as tuas palavras):**
  1. Quem é e o que faz: "Eu sou o Arthur. Eu faço o Maarkio, que é agenda
     por link, a Bela, que atende teu WhatsApp, e landing page."
  2. Um caso: o problema que um cliente tinha e o que mudou depois (com um
     número, se tiver).
  3. O convite: "Me conta o teu problema no zap. Quem responde sou eu."
- **Legenda:** muita gente vê sem som. Se mandar o texto falado, eu ponho
  legenda no player.

## 2. Retrato

Uma foto tua, **4:3**, pra combinar com o vídeo. Vira a capa do vídeo, e entra
sozinha se o vídeo não vier. Sem nenhum dos dois, o lado direito da seção é a
frase "Quem constrói é quem cuida depois." em letra grande.

## 3. Números reais (sem nome de cliente)

Até 3 por produto. Se for estimativa, me diz que é estimativa. Entram na
célula de cada produto, embaixo da descrição.

**Maarkio**
- [ ] quantos agendamentos pelo link por mês
- [ ] quantos desses foram feitos fora do horário comercial
- [ ] quanto as faltas caíram depois do lembrete
- [ ] quantos negócios usam hoje (se quiser mostrar)

Os três primeiros dá pra eu tirar do banco do Maarkio com uma consulta só de
leitura, se você autorizar.

**Bela**
- [ ] quantas conversas por mês
- [ ] quantas chegam fora do horário
- [ ] tempo médio de resposta
- [ ] de cada 10 conversas, quantas precisam de gente

A primeira cliente da Bela foi desativada em 08/08. Se for usar número dela,
é número histórico, e precisa da autorização dela.

## 4. Depoimentos

Um por produto, se der. Pode ser:
- a frase + primeiro nome + tipo de negócio (ex.: "Camila, salão em Campinas"); ou
- print de conversa, **com autorização**; ou
- vídeo curto de celular.

## 5. Oferta

O preço do Maarkio já está no site (R$ 97/mês, o mesmo do maarkio.com). O
resto aparece no cardápio como "na conversa" até você me mandar.

- [ ] **Preço da Bela:** "a partir de", ou a faixa.
- [ ] **Preço da landing page:** "a partir de", ou a faixa.
- [ ] **Bela + Maarkio juntos:** tem desconto? (opcional)
- [ ] **Como cobra:** construção + mensalidade? Só mensalidade?
- [ ] **Fidelidade:** tem? Quanto tempo de aviso pra sair?
- [ ] **Prazo típico:** do "fechado" até estar no ar.
- [ ] **Garantia:** se existir, em uma frase.

## 6. Confirma pra mim

Escrevi o site conferindo no código do Maarkio e da Bela. O que eu não
consegui confirmar ficou de fora, ou escrito do jeito mais seguro. Corrige o
que estiver errado:

- [ ] **Como a Bela e o Maarkio funcionam juntos?** Hoje o site diz só "a Bela
      cuida da conversa, o Maarkio cuida da agenda". Se a Bela manda o link do
      Maarkio quando a pessoa quer marcar, me fala, que isso vira uma demo.
- [ ] **A Bela fala pelo número do próprio negócio** (conectado por QR Code,
      igual ao Maarkio)? O site só afirma isso pro Maarkio.
- [ ] **A Bela entende foto?** O site promete áudio e texto. Foto está atrás de
      uma chave desligada no código (`BELA_VISION_NOTE_ENABLED`), então ficou fora.
- [ ] **"Quando você chama no WhatsApp, quem responde sou eu."** (seção do
      Arthur e o recado)
- [ ] **"A IA pode falar besteira?"** A resposta diz que ela responde o que você
      combinou e passa pra você o que não sabe.
- [ ] **Landing page:** faz pra qualquer tipo de negócio? Tem exemplo além do
      maarkio.com e deste site?

## 7. O que eu corrigi do site anterior

O agente anterior escreveu algumas coisas que o código não faz:

- **Lembrete "na véspera".** O Maarkio manda a confirmação na hora em que o
  cliente marca, com link de cancelamento, e o lembrete antes do horário, com
  a antecedência que o estabelecimento configurar.
- **"Dá pra remarcar pelo link".** Não dá: o link cancela, e o lembrete diz
  pra chamar no WhatsApp pra reagendar.
- **Endereço `teusalao.com.br/agenda`.** O link real é `maarkio.com/<nome>`.
- **A Bela mandando o link do Maarkio e o cardápio do Gluten.** A demo
  inteira do site anterior era montada em cima disso. Saiu: são produtos
  separados que dá pra usar juntos (item 6).
- **"Rodando agora: a Bela numa clínica de estética".** A primeira cliente da
  Bela foi desativada em 08/08, então o site não diz mais que ela está rodando
  num cliente agora.
- **A tela de custo da Bela.** Ela existe, mas é do teu painel de admin, não
  do dono do negócio. O site agora diz que quem acompanha o custo é você.
- **"A IA do WhatsApp Business, lançada pela Meta no Brasil em 2026".** Não
  consegui confirmar, então ficou só "a resposta automática do WhatsApp
  Business", que existe e é de graça.
- **Gluten (delivery de pizzaria).** Fora do site, como você pediu.
- **/bastidores** (lab, diário, processo). O diário de commits veio pra página
  principal, e o resto saiu. Quem tiver o link antigo cai no diário.

## 8. Opcional, mas sobe o nível

- [ ] Print real dos painéis (Maarkio e Bela) com dado de cliente borrado.
- [ ] 2 ou 3 reels do @arthursilveira.ai que você quer destacar no site.
- [ ] Cidade ou região que você atende, se quiser aparecer no Google local.

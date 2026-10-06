# satomiq.com — guia do repositório

O site do Arthur Silveira (SAtomiq). Destino do funil **lead → Instagram
(@arthursilveira.ai) → satomiq.com → WhatsApp**, a mesma função da landing do
maarkio.com. Quem chega está no navegador DE DENTRO do Instagram, no celular:
um caminho só (o zap), barra fixa embaixo no celular, nada pesado antes da
primeira pintura.

Vite + React 18, uma página só, pré-renderizada no build (`prerender.mjs`) e
hidratada no navegador. Servida por nginx (`Dockerfile`, `nginx.conf`).

## Comandos

```bash
npm run dev        # http://localhost:5173, já mostra as lacunas de material
npm run build      # tsc + vite + SSR + prerender; lista o material pendente
npm run preview    # serve o dist/
npm run diario     # regenera src/lib/diario.json (só na máquina do Arthur)
```

Nesta máquina o shell exporta `NODE_ENV=production`, e o npm pula as
devDependencies em silêncio: instale com
`NODE_ENV=development npm install --include=dev`.

## O que cada produto faz — conferido no código, não suposto

A versão anterior deste site prometia coisas que não existem (lembrete "na
véspera", remarcar pelo link, a Bela mandando o link do Maarkio). Antes de
escrever uma frase sobre um produto, confira na fonte:

| Produto | O que é | Fonte |
|---|---|---|
| **Maarkio** | Só agenda. O cliente marca pelo link `maarkio.com/<slug>`; confirmação na hora, com link de cancelamento; lembrete antes do horário, antecedência configurável (`reminder_before_min`); remarcar é pelo WhatsApp, não pelo link. Google Agenda, cliente fixo, relatório semanal. R$ 97/mês, público no maarkio.com. | `~/maarkio` (CLAUDE.md, `apps/api/src/services/job-queue.ts`, `notification.ts`) |
| **Bela** (sistema Nectarq; o painel se chama Nexo) | Só atendimento no WhatsApp. Entende áudio (Whisper no n8n), passa a conversa pra profissional com resumo, a profissional responde pelo painel, inclusive em áudio. **Não marca horário.** Foto está atrás de flag desligada. A tela de custo é do admin, não do cliente. A primeira cliente foi desativada em 08/08/2026. | `~/Documents/nectar-backend` (AGENTS.md), `~/Documents/nectar-painel` |
| **Bela + Maarkio** | Dá pra usar juntos. COMO eles se falam ainda não está confirmado (ver MATERIAL.md). | o Arthur |
| **Landing page** | Sob demanda. Exemplos: maarkio.com e este site. | o Arthur |

O **Gluten** (delivery de pizzaria) ficou fora do site por decisão do Arthur
em 06/10/2026. Os commits dele continuam contando no total do diário; as
mensagens não aparecem.

## Onde mora cada coisa

- `src/conteudo.ts`: **todo** o texto. Componente não escreve copy. Voz do
  Arthur: "cê", "teu", "zap", frase curta, sem travessão.
- `src/material.ts`: o que só o Arthur tem (vídeo, foto, números, preços,
  prazo). `null` = a parte some no ar e vira caixa tracejada com `?rascunho`.
  A lista explicada está em `MATERIAL.md`.
- `src/recado.ts`: o recado que a pessoa escreve. É um só pra página toda, e
  todo botão de zap leva junto.
- `src/zap.ts`: número do WhatsApp e a ponte que abre o app do WhatsApp de
  dentro do Instagram (em vez do WhatsApp Web pedindo QR). Portado da landing
  do maarkio.com.
- `src/dia-em-pontos.ts`: o mostrador de 24h (canvas) da seção fixa.
- `src/shaders.ts`: o céu do topo (shader próprio: café pontilhado, lua,
  xícara com vapor), o redemoinho da célula da Bela e o losango em latão
  líquido. Tudo decorativo; sem WebGL fica o CSS.
- `src/movimento.ts`: GSAP + Lenis, carregado por `import()` depois da
  primeira pintura.
- `src/lib/diario.json`: gerado por `scripts/diario.mjs`, commitado.

## A régua visual

A mesma da landing do maarkio.com (`~/maarkio/apps/web/src/components/landing/`):
fio de 1px, canto reto, janela retrô de barra preta, pontilhado 1-bit, Archivo
nos títulos, Geist no texto, Geist Mono nas etiquetas, Geist Pixel nas
janelas. A troca: o **café do perfil** é o campo de cor onde lá é o ultramar.
`#1A1512` e `#0B0907` são os marrons do perfil e não mudam (tinta do tema
claro, chão do escuro). Os tokens moram no `:root` de `src/estilo.css`, nos
três estados de tema (claro, escuro pelo sistema, escuro pelo botão), com a
chave `satomiq-tema`.

## Armadilhas

1. **`.from()` do GSAP lê o valor atual como destino.** O CSS esconde o topo
   (`html.js .entra`) até o movimento chegar; `movimento.ts` faz
   `gsap.set(".entra", { opacity: 1 })` ANTES de montar a timeline. Na ordem
   inversa o topo anima de 0 pra 0 e fica invisível. Se o movimento não chegar
   em 2,5s, a classe `solta` (posta no `<head>`) mostra tudo.
2. **`.botao` vem depois de `.caixa` no CSS e vence por ordem.** O botão de
   zap da navegação é as duas coisas; as regras dele levam `.nav` na frente.
3. **A Paper (shaders) quebra API dentro de 0.0.x.** Versão fixada exata no
   `package.json`, a mesma do maarkio.com. `setUniforms` renderiza na hora:
   o céu tem relógio próprio com o ShaderMount parado (ver o comentário).
4. **O HTML pré-renderizado é sempre o de produção, sem data nem tema.**
   Tudo que depende do navegador (data de "amanhã", rascunho, sessão) entra
   depois de hidratar, num `useEffect`. Senão a hidratação diverge.
5. **`scripts/diario.mjs` lê os repositórios vizinhos** e filtra nome de
   cliente das mensagens. Roda na máquina do Arthur, não no build.

## Verificar antes de subir

O build passando não diz que a página está certa. Fotografe com Playwright:
topo, cada seção e a seção fixa em 4 pontos, em 1440 e 390 px, tema claro e
escuro, e procure estouro horizontal (`scrollWidth > clientWidth`). E teste o
recado: o texto da prévia tem que ser igual ao `text=` do link do WhatsApp.

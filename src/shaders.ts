/**
 * Os três shaders do site, sobre Paper Shaders (WebGL2), na mesma construção
 * da landing do maarkio.com:
 *
 * - o céu do topo: shader PRÓPRIO. Madrugada em café pontilhado, com lua de
 *   latão, estrelas e uma xícara fumegando. É o café do perfil do Arthur, e
 *   é a hora em que as janelas do topo mostram o sistema trabalhando sozinho;
 * - o fundo da célula da Bela: o redemoinho do dithering da Paper, que em
 *   café e latão vira o creme mexendo na xícara;
 * - o losango da SAtomiq em latão líquido (liquid metal da Paper).
 *
 * Tudo é decorativo: se a importação ou o WebGL falharem, o céu fica no
 * degradê pontilhado do CSS e a marca fica no SVG. Nada aqui pode lançar.
 *
 * A Paper versiona em 0.0.x com quebra de API entre versões e recomenda fixar
 * a versão exata. Está fixada em package.json (a mesma do maarkio.com).
 */
import { LOSANGO } from "./componentes/Logo";

const CEU_GLSL = `#version 300 es
precision highp float;

uniform float u_tempo;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_cafe;
uniform vec4 u_cafeFundo;
uniform vec4 u_claro;
uniform vec4 u_escuro;
uniform vec4 u_latao;
uniform vec2 u_mouse;
uniform float u_px;
uniform float u_xicara;
uniform float u_escala;
uniform float u_rolagem;

out vec4 fragColor;

// Bayer 8x8 por recursão: limiar ordenado, o pontilhado de gráfica.
float bayer2(vec2 a) { a = floor(a); return fract(a.x * .5 + a.y * a.y * .75); }
float bayer4(vec2 a) { return bayer2(.5 * a) * .25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(.5 * a) * .25 + bayer2(a); }

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0., a = .5;
  for (int i = 0; i < 4; i++) { v += a * ruido(p); p = p * 2.02 + vec2(11.7, 5.3); a *= .5; }
  return v;
}

void main() {
  vec2 res = u_resolution;
  float asp = res.x / res.y;
  vec2 fc = gl_FragCoord.xy;
  vec2 uv0 = fc / res;

  // Lente: perto do cursor o ponto fica mais fino, como uma lupa sobre a gráfica.
  vec2 dm = (uv0 - u_mouse) * vec2(asp, 1.);
  float lente = smoothstep(.22, .0, length(dm));
  float celula = floor(max(1., u_px * u_pixelRatio * mix(1., .5, lente) * (1. + u_rolagem * 1.6)));
  vec2 c = floor(fc / celula);
  vec2 uv = (c + .5) * celula / res;
  vec2 p = vec2(uv.x * asp, uv.y);
  float lim = bayer8(c);
  float t = u_tempo;

  // céu: café fundo no alto, café embaixo. Embaixo é EXATAMENTE o café do
  // texto do topo, pra emenda não aparecer.
  float alto = smoothstep(.08, 1., uv.y);
  vec3 cor = (alto * .9 > lim) ? u_cafeFundo.rgb : u_cafe.rgb;

  // estrelas: um ponto de gráfica cada, piscando devagar
  vec2 ce = floor(c / 3.);
  float h = hash(ce);
  if (h > .985 && uv.y > .3) {
    float brilho = .5 + .5 * sin(t * (1. + h * 2.) + h * 40.);
    if (brilho * smoothstep(.3, .7, uv.y) > lim) cor = u_claro.rgb;
  }

  float e = u_escala;
  float cx = u_xicara * asp;

  // lua de latão, com crateras em café
  // No largo a lua fica à esquerda da xícara, entre as janelas; no estreito,
  // em cima dela, porque a janela da Bela ocupa a esquerda.
  vec2 lua = vec2(cx - .55 * e, .78);
  if (asp < 1.6) lua = vec2(asp - .17, .8);
  float dl = length(p - lua);
  float rl = .085 * e;
  float halo = smoothstep(rl * 2.2, rl, dl) * .32;
  if (halo > lim + .3) cor = u_latao.rgb * .5 + cor * .5;
  if (dl < rl) {
    vec2 q = (p - lua) / rl;
    float luz = .55 + .45 * dot(normalize(vec3(q, sqrt(max(0., 1. - dot(q, q))))), normalize(vec3(-.5, .5, .7)));
    float cratera = smoothstep(.62, .7, fbm(q * 2.3 + 3.));
    cor = (luz - cratera * .5 > lim) ? u_latao.rgb : u_cafeFundo.rgb;
  }

  // a xícara: pires, corpo, asa e o café na boca
  float base = .1;
  vec2 q = p - vec2(cx, 0.);
  float y0 = base + .05 * e;      // fundo do corpo
  float y1 = base + .36 * e;      // boca
  float a0 = .1 * e, a1 = .155 * e;
  vec3 L = normalize(vec3(-.6, .45, .66));

  // pires: elipse achatada, com sombra embaixo
  vec2 pq = (q - vec2(0., base + .015 * e)) / vec2(.27 * e, .045 * e);
  float pd = length(pq);
  if (pd < 1.) {
    float luzP = .35 + .65 * (1. - pq.y) * .5 + (-pq.x) * .15;
    cor = (luzP > lim) ? u_claro.rgb : u_cafeFundo.rgb;
    if (pd > .9) cor = u_escuro.rgb;
  }

  // corpo: trapézio com o fundo arredondado
  float sy = clamp((q.y - y0) / (y1 - y0), 0., 1.);
  float aY = mix(a0, a1, pow(sy, .8));
  float fundoCurvo = y0 - .035 * e * (1. - pow(clamp(q.x / a0, -1., 1.), 2.));
  bool dentro = q.y > fundoCurvo && q.y < y1 && abs(q.x) < aY;

  // asa: um anel do lado direito
  vec2 aq = q - vec2(a1 * .92, base + .21 * e);
  float ad = length(aq * vec2(1., .9));
  bool asa = ad < .085 * e && ad > .05 * e && aq.x > 0.;
  if (asa) {
    float ang = atan(aq.y, aq.x);
    float luzA = .45 + .45 * sin(ang + 1.9);
    cor = (luzA > lim) ? u_claro.rgb : u_cafeFundo.rgb;
    if (ad > .079 * e || ad < .056 * e) cor = u_escuro.rgb;
  }

  if (dentro) {
    float nx = clamp(q.x / aY, -1., 1.);
    vec3 n = normalize(vec3(nx, .1, sqrt(max(0., 1. - nx * nx))));
    float dif = max(dot(n, L), 0.);
    float esp = pow(max(dot(reflect(-L, n), vec3(0., 0., 1.)), 0.), 22.);
    cor = (dif * .9 + .08 > lim) ? u_claro.rgb : u_cafeFundo.rgb;
    // faixa de latão perto da boca
    if (q.y > y1 - .075 * e && q.y < y1 - .05 * e) cor = (dif * .8 + .25 > lim) ? u_latao.rgb : u_escuro.rgb;
    if (esp > lim + .25) cor = u_claro.rgb;
    if (abs(q.x) > aY - .006 || q.y < fundoCurvo + .006) cor = u_escuro.rgb;
  }

  // boca: elipse com o café dentro e o creme girando
  vec2 bq = (q - vec2(0., y1)) / vec2(a1, .045 * e);
  float bd = length(bq);
  if (bd < 1.) {
    cor = u_escuro.rgb;
    if (bd < .86) {
      float ang = atan(bq.y, bq.x);
      float creme = sin(ang * 2. + bd * 9. - t * .7) * .5 + .5;
      cor = (creme * (1. - bd) * 1.5 > lim + .15) ? u_latao.rgb : u_cafe.rgb;
    }
    if (bd > .93) cor = u_claro.rgb;
  }

  // vapor: três fios subindo da boca, que o cursor empurra
  vec2 m = vec2(u_mouse.x * asp, u_mouse.y);
  float vapor = 0.;
  for (float i = 0.; i < 3.; i++) {
    float hv = (p.y - y1 - .02 * e) / e;
    if (hv < 0.) continue;
    float off = (i - 1.) * .055;
    float ondula = sin(hv * 8. - t * 1.25 + i * 2.1) * .035 * (.25 + hv) + (fbm(vec2(hv * 2.6 - t * .35, i * 7.1)) - .5) * .16 * hv;
    float px = cx + (off + ondula) * e;
    px += sign(px - m.x) * exp(-dot(vec2(px - m.x, p.y - m.y), vec2(px - m.x, p.y - m.y)) * 40.) * .06;
    float larg = (.012 + hv * .04) * e;
    float d = (p.x - px) / larg;
    float fio = exp(-d * d) * smoothstep(0., .05, hv) * (1. - smoothstep(.16, .44 + u_rolagem * .3, hv));
    fio *= smoothstep(.32, .78, fbm(vec2(p.x * 9., hv * 5. - t * .9 + i * 3.)));
    vapor = max(vapor, fio);
  }
  // o +.06 corta o vapor ralo: no limiar de Bayer ele virava uma grade regular de pontos
  if (vapor * .95 > lim + .06) cor = u_claro.rgb;

  fragColor = vec4(cor, 1.);
}
`;

const LOSANGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="7 7 34 34" width="1020" height="1020">' +
  `<path fill-rule="evenodd" d="${LOSANGO}" fill="#000"/></svg>`;

type Alvos = {
  raiz: HTMLElement;
  ceu: HTMLElement;
  caixaCeu: HTMLElement;
  fundoBela: HTMLElement;
  metal: HTMLElement;
  reduz: boolean;
  aoCeuPronto: () => void;
  aoMetalPronto: () => void;
};

export type Shaders = {
  atualizarCores: () => void;
  definirRolagem: (v: number) => void;
  destruir: () => void;
};

export async function montarShaders(a: Alvos): Promise<Shaders> {
  const limpezas: Array<() => void> = [];
  let rolagem = 0;
  const vazio: Shaders = { atualizarCores() {}, definirRolagem() {}, destruir() {} };

  let lib: typeof import("@paper-design/shaders");
  try {
    lib = await import("@paper-design/shaders");
  } catch (e) {
    console.warn("[site] Paper Shaders não carregou", e);
    return vazio;
  }
  const { ShaderMount, getShaderColorFromString, liquidMetalFragmentShader, toProcessedLiquidMetal, ditheringFragmentShader } = lib;
  const cor = (nome: string) => getShaderColorFromString(getComputedStyle(a.raiz).getPropertyValue(nome).trim());
  const tamanho = (fit: number, escala = 1) => ({
    u_fit: fit,
    u_scale: escala,
    u_rotation: 0,
    u_offsetX: 0,
    u_offsetY: 0,
    u_originX: 0.5,
    u_originY: 0.5,
    u_worldWidth: 0,
    u_worldHeight: 0,
  });

  // ----- céu -----
  let ceu: InstanceType<typeof ShaderMount> | null = null;
  try {
    const estreito = innerWidth < 760;
    const pxCss = estreito ? 2 : 2.5;
    ceu = new ShaderMount(
      a.ceu,
      CEU_GLSL,
      {
        ...tamanho(0),
        u_cafe: cor("--cafe"),
        u_cafeFundo: cor("--cafe-fundo"),
        u_claro: cor("--claro"),
        u_escuro: cor("--escuro"),
        u_latao: cor("--latao"),
        u_mouse: [-2, -2],
        u_px: pxCss,
        u_xicara: 0.78,
        u_escala: estreito ? 0.82 : 1,
        u_rolagem: 0,
        u_tempo: 9,
      },
      undefined,
      0,
      0,
      1,
      400000,
    );
    const montado = ceu;
    // ~2 pixels de render por célula do pontilhado, ampliado sem suavizar no
    // CSS. Tudo no céu é quantizado por célula, então fica idêntico na tela e
    // a GPU faz uma fração do trabalho: num celular 3x, mais de dez vezes menos.
    const ajustar = () => {
      const r = a.ceu.getBoundingClientRect();
      montado.setMaxPixelCount(Math.max(20000, Math.round(r.width * r.height * Math.pow(2 / pxCss, 2))));
    };
    ajustar();
    const ro = new ResizeObserver(ajustar);
    ro.observe(a.ceu);
    limpezas.push(() => ro.disconnect());
    a.aoCeuPronto();

    // O relógio do céu é nosso (u_tempo), e o ShaderMount fica com velocidade
    // zero: setUniforms RENDERIZA na hora, e com o loop interno ligado cada
    // atualização de cursor desenhava o céu duas vezes no mesmo quadro
    // (medido no maarkio.com: travava o Chromium headless). Assim é um render
    // por quadro, e nenhum com o céu fora da tela.
    const alvo = { x: -2, y: -2 };
    const atual = { x: -2, y: -2 };
    let visivel = true;
    const mover = (e: PointerEvent) => {
      const r = a.caixaCeu.getBoundingClientRect();
      alvo.x = (e.clientX - r.left) / r.width;
      alvo.y = 1 - (e.clientY - r.top) / r.height;
      if (atual.x < -1) {
        atual.x = alvo.x;
        atual.y = alvo.y;
      }
    };
    const sair = () => {
      alvo.x = -2;
      alvo.y = -2;
    };
    a.caixaCeu.addEventListener("pointermove", mover);
    a.caixaCeu.addEventListener("pointerleave", sair);
    limpezas.push(() => {
      a.caixaCeu.removeEventListener("pointermove", mover);
      a.caixaCeu.removeEventListener("pointerleave", sair);
    });
    if (!a.reduz) {
      let raf = 0;
      let tempo = 9;
      let antes = performance.now();
      const loop = (agora: number) => {
        const dt = Math.min(0.1, (agora - antes) / 1000);
        antes = agora;
        if (visivel) {
          tempo += dt;
          atual.x += (alvo.x - atual.x) * 0.09;
          atual.y += (alvo.y - atual.y) * 0.09;
          montado.setUniforms({ u_tempo: tempo, u_mouse: [atual.x, atual.y], u_rolagem: rolagem });
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      limpezas.push(() => cancelAnimationFrame(raf));
    }
    const io = new IntersectionObserver(([en]) => {
      visivel = en.isIntersecting;
    });
    io.observe(a.caixaCeu);
    limpezas.push(() => io.disconnect());
  } catch (e) {
    console.warn("[site] céu sem WebGL", e);
  }

  // ----- o creme mexendo, no fundo da célula da Bela -----
  let creme: InstanceType<typeof ShaderMount> | null = null;
  try {
    creme = new ShaderMount(
      a.fundoBela,
      ditheringFragmentShader,
      { ...tamanho(0, 0.8), u_colorBack: cor("--cafe"), u_colorFront: cor("--cafe-claro"), u_shape: 6, u_type: 4, u_pxSize: 3 },
      undefined,
      a.reduz ? 0 : 0.3,
      4000,
      1,
      450000,
    );
    const montado = creme;
    const io = new IntersectionObserver(([en]) => montado.setSpeed(en.isIntersecting && !a.reduz ? 0.3 : 0));
    io.observe(a.fundoBela);
    limpezas.push(() => io.disconnect());
  } catch (e) {
    console.warn("[site] creme sem WebGL", e);
  }

  // ----- o losango em latão líquido -----
  // Só monta quando o fim da página chega perto: o pré-processamento do SVG
  // (toProcessedLiquidMetal) é o trabalho de CPU mais pesado da página, e
  // quem vem do Instagram muitas vezes nem rola até o fim.
  let metal: InstanceType<typeof ShaderMount> | null = null;
  let destruido = false;
  const montarMetal = async () => {
    try {
      const { pngBlob } = await toProcessedLiquidMetal(new File([LOSANGO_SVG], "satomiq.svg", { type: "image/svg+xml" }));
      if (destruido) return;
      const img = new Image();
      const url = URL.createObjectURL(pngBlob);
      limpezas.push(() => URL.revokeObjectURL(url));
      img.src = url;
      await img.decode();
      if (destruido) return;
      metal = new ShaderMount(
        a.metal,
        liquidMetalFragmentShader,
        {
          ...tamanho(1, 0.74),
          u_imageAspectRatio: img.naturalWidth / img.naturalHeight,
          u_image: img,
          u_isImage: true,
          u_shape: 0,
          u_colorBack: [0, 0, 0, 0],
          u_colorTint: cor("--latao-luz"),
          u_repetition: 1.25,
          u_softness: 0.62,
          u_shiftRed: 0.03,
          u_shiftBlue: 0.03,
          u_distortion: 0.07,
          u_contour: 0.32,
          u_angle: 64,
        },
        undefined,
        a.reduz ? 0 : 0.8,
        2000,
        1,
        700000,
      );
      const montado = metal;
      a.aoMetalPronto();
      const io = new IntersectionObserver(([en]) => montado.setSpeed(en.isIntersecting && !a.reduz ? 0.8 : 0));
      io.observe(a.metal);
      limpezas.push(() => io.disconnect());
    } catch (e) {
      console.warn("[site] latão líquido indisponível", e);
    }
  };
  const perto = new IntersectionObserver(
    ([en]) => {
      if (!en.isIntersecting) return;
      perto.disconnect();
      void montarMetal();
    },
    { rootMargin: "900px 0px" },
  );
  perto.observe(a.metal);
  limpezas.push(() => perto.disconnect());

  return {
    atualizarCores() {
      ceu?.setUniforms({ u_cafe: cor("--cafe"), u_cafeFundo: cor("--cafe-fundo"), u_latao: cor("--latao"), u_claro: cor("--claro"), u_escuro: cor("--escuro") });
      creme?.setUniforms({ u_colorBack: cor("--cafe"), u_colorFront: cor("--cafe-claro") });
      metal?.setUniforms({ u_colorTint: cor("--latao-luz") });
    },
    definirRolagem(v: number) {
      rolagem = v;
    },
    destruir() {
      destruido = true;
      limpezas.forEach((f) => f());
      ceu?.dispose();
      creme?.dispose();
      metal?.dispose();
    },
  };
}

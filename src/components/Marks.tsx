/**
 * Símbolos da família, com a geometria idêntica aos SVGs de
 * Documents/satomiq-brand/. Não redesenhar aqui — se mudar lá, copiar o `d`.
 *
 * O corpo herda a cor do contexto (currentColor); o acento é fixo por marca,
 * porque é ele que identifica o produto.
 */

type Props = {
  className?: string;
  /** Compensação óptica para uso lado a lado. Ver COMENTÁRIO abaixo. */
  familia?: boolean;
  /** Sem cor de acento — para carimbo, rodapé e fundo colorido. */
  mono?: boolean;
};

/**
 * Peso óptico medido dentro da mesma caixa de 48×48:
 *   Nectarq 257 px²  ·  SAtomiq 434 px²  ·  Maarkio 707 px²
 * Caixa igual não faz duas marcas parecerem do mesmo tamanho — massa faz. Lado
 * a lado, o bloco do Maarkio domina o anel do Nectarq em 2,74×. Estas escalas
 * são a compensação óptica; os arquivos de marca continuam intactos.
 */
const FAMILIA = { satomiq: 1, nectarq: 1.12, maarkio: 0.96 };
const escala = (k: number) =>
  k === 1 ? undefined : `translate(24 24) scale(${k}) translate(-24 -24)`;

function Svg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

/** Losango vazado. Corpo girado 45°, vazio alinhado ao eixo, no centro exato. */
export function MarcaSAtomiq({ className, familia }: Props) {
  return (
    <Svg className={className}>
      <g transform={familia ? escala(FAMILIA.satomiq) : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.768 8.768L39.232 22.232A2.5 2.5 0 0 1 39.232 25.768L25.768 39.232A2.5 2.5 0 0 1 22.232 39.232L8.768 25.768A2.5 2.5 0 0 1 8.768 22.232L22.232 8.768A2.5 2.5 0 0 1 25.768 8.768ZM18 19.5L18 28.5A1.5 1.5 0 0 0 19.5 30L28.5 30A1.5 1.5 0 0 0 30 28.5L30 19.5A1.5 1.5 0 0 0 28.5 18L19.5 18A1.5 1.5 0 0 0 18 19.5Z"
          fill="currentColor"
        />
      </g>
    </Svg>
  );
}

/** Versão abaixo de 24px: o vazio encolhe, senão a moldura fecha. */
export function MarcaSAtomiqPequena({ className }: Props) {
  return (
    <Svg className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.768 8.768L39.232 22.232A2.5 2.5 0 0 1 39.232 25.768L25.768 39.232A2.5 2.5 0 0 1 22.232 39.232L8.768 25.768A2.5 2.5 0 0 1 8.768 22.232L22.232 8.768A2.5 2.5 0 0 1 25.768 8.768ZM19.5 21L19.5 27A1.5 1.5 0 0 0 21 28.5L27 28.5A1.5 1.5 0 0 0 28.5 27L28.5 21A1.5 1.5 0 0 0 27 19.5L21 19.5A1.5 1.5 0 0 0 19.5 21Z"
        fill="currentColor"
      />
    </Svg>
  );
}

/** Anel aberto em 56,3°; o ponto fora do centro é "algo que acabou de entrar". */
export function MarcaNectarq({ className, familia, mono }: Props) {
  return (
    <Svg className={className}>
      <g transform={familia ? escala(FAMILIA.nectarq) : undefined}>
        <path
          d="M36.95 16.43 A15 15 0 1 1 26.01 9.14"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="28.44" cy="17.34" r="3.8" fill={mono ? "currentColor" : "#5E8ECC"} />
      </g>
    </Svg>
  );
}

/** Bloco deitado com corte em 33,7°; a peça destacada é o horário que virou seu. */
export function MarcaMaarkio({ className, familia, mono }: Props) {
  return (
    <Svg className={className}>
      <g transform={familia ? escala(FAMILIA.maarkio) : undefined}>
        <path
          d="M8 17 H29 L41 25 V34 A3 3 0 0 1 38 37 H8 A3 3 0 0 1 5 34 V20 A3 3 0 0 1 8 17 Z"
          fill="currentColor"
        />
        <path d="M32 8 L44 16 L44 8 Z" fill={mono ? "currentColor" : "#D9A43D"} />
      </g>
    </Svg>
  );
}

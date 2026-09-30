/**
 * ESTOURA: "DEMAIS" alarga até não caber. O palco corta de propósito:
 * a palavra que não cabe é o argumento.
 */
export function Estoura({ texto = "DEMAIS", largura = 151 }: { texto?: string; largura?: number }) {
  return (
    <span
      className="heroi block whitespace-nowrap text-[clamp(4.4rem,11vw,6.4rem)]"
      style={{ fontWeight: 900, fontStretch: `${largura}%`, transition: "font-stretch .6s var(--ease)" }}
    >
      {texto}
    </span>
  );
}

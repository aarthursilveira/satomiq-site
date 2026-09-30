import { useEffect, useRef } from "react";

/**
 * MAGNÉTICO: o botão vem buscar o cursor. O texto anda um pouco mais que a
 * pílula, e essa diferença é o que dá a sensação de peso.
 */
export function Magnetico({ forca = 0.35, raio = 150, texto = "me puxa" }: { forca?: number; raio?: number; texto?: string }) {
  const btn = useRef<HTMLButtonElement>(null);
  const dentro = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const b = btn.current;
    const palco = b?.parentElement;
    if (!b || !palco || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const solta = () => {
      b.style.transform = "";
      if (dentro.current) dentro.current.style.transform = "";
    };
    const move = (e: PointerEvent) => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) > raio) return solta();
      b.style.transform = `translate(${dx * forca}px, ${dy * forca}px)`;
      if (dentro.current) dentro.current.style.transform = `translate(${dx * forca * 0.4}px, ${dy * forca * 0.4}px)`;
    };
    palco.addEventListener("pointermove", move);
    palco.addEventListener("pointerleave", solta);
    return () => {
      palco.removeEventListener("pointermove", move);
      palco.removeEventListener("pointerleave", solta);
    };
  }, [forca, raio]);

  return (
    <button
      ref={btn}
      type="button"
      className="rounded-full bg-latao px-8 py-5 font-mono text-rotulo uppercase tracking-eyebrow text-bg"
      style={{ transition: "transform .4s var(--mola)" }}
    >
      <span ref={dentro} className="inline-block" style={{ transition: "transform .4s var(--mola)" }}>
        {texto}
      </span>
    </button>
  );
}

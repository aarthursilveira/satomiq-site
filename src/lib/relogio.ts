import { useEffect, useState } from "react";

export const hhmm = (d = new Date()) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

/** A hora de quem está vendo. Vazia no HTML do servidor, que não sabe que horas são aí. */
export function useAgora() {
  const [h, setH] = useState("");
  useEffect(() => {
    const f = () => setH(hhmm());
    f();
    const t = window.setInterval(f, 15_000);
    return () => window.clearInterval(t);
  }, []);
  return h;
}

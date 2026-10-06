import { useEffect, useState } from "react";

/**
 * Em desenvolvimento (ou com ?rascunho na URL) mostra o que falta. No site no
 * ar, nada. Só aparece depois de hidratar: o HTML pré-renderizado é sempre o
 * de produção.
 */
export function useRascunho() {
  const [sim, setSim] = useState(false);
  useEffect(() => {
    setSim(import.meta.env.DEV || new URLSearchParams(location.search).has("rascunho"));
  }, []);
  return sim;
}

export function Pendente({ rotulo, className = "" }: { rotulo: string; className?: string }) {
  const rascunho = useRascunho();
  if (!rascunho) return null;
  return (
    <div className={`pendente ${className}`}>
      <span className="pendente-rotulo">falta material</span>
      {rotulo}
    </div>
  );
}

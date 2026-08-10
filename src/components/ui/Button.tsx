import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDown, WhatsappLogo } from "@phosphor-icons/react";

type Variant = "primary" | "cobre" | "ghost";

const styles: Record<Variant, string> = {
  // paper sobre ink: 13,78:1. O botão institucional é o mais contido.
  primary: "bg-paper text-ink hover:bg-mist",
  // ink sobre cobre: 4,97:1 — passa AA. Único lugar onde o cobre é fundo.
  cobre: "bg-cobre text-ink hover:brightness-[1.08]",
  ghost: "bg-transparent text-paper ring-1 ring-line hover:bg-raised hover:ring-sea",
};

export function Button({
  children,
  href,
  variant = "primary",
  icon = "arrow",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  icon?: "arrow" | "whatsapp" | "none";
  className?: string;
}) {
  const external = !href.startsWith("#");
  // A seta ↗ é uma promessa: "isto sai da página". Numa âncora interna ela
  // mente. O ícone segue o destino, não o gosto de quem chamou o componente —
  // assim o erro não volta na próxima vez que alguém puser icon="arrow".
  const Seta = external ? ArrowUpRight : ArrowDown;
  const gesto = external
    ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    : "group-hover:translate-y-0.5";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-3 px-6 py-3.5 font-mono text-botao font-medium uppercase tracking-botao transition-all duration-500 ease-spring active:translate-y-px ${styles[variant]} ${className}`}
    >
      {icon === "whatsapp" && <WhatsappLogo weight="fill" className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
      {icon === "arrow" && (
        <Seta
          weight="bold"
          className={`h-4 w-4 shrink-0 transition-transform duration-500 ease-spring ${gesto}`}
        />
      )}
    </a>
  );
}

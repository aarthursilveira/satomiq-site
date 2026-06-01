import type { ReactNode } from "react";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";

type Variant = "primary" | "ghost" | "paper" | "accent";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-soft",
  ghost: "bg-transparent text-ink ring-1 ring-ink/25 hover:ring-ink/50 hover:bg-ink/[0.03]",
  paper: "bg-paper text-ink hover:bg-paper-2",
  accent: "bg-accent text-paper hover:bg-accent-soft",
};

/**
 * CTA editorial. Ícone à direita (seta ou WhatsApp) com leve física no hover.
 * Cantos retos (Swiss), feedback tátil no :active.
 */
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
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-3 px-6 py-3.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-500 ease-spring active:translate-y-px ${styles[variant]} ${className}`}
    >
      {icon === "whatsapp" && (
        <WhatsappLogo weight="fill" className="h-4 w-4 shrink-0" />
      )}
      <span>{children}</span>
      {icon === "arrow" && (
        <ArrowUpRight
          weight="bold"
          className="h-4 w-4 shrink-0 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </a>
  );
}

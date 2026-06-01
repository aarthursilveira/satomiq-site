import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LINKS, NAV } from "../lib/content";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";

const SPRING = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: SPRING, delay: 0.1 }}
        className={`mt-4 flex w-full max-w-[1400px] items-center justify-between px-5 py-3 transition-all duration-500 ease-spring ${
          scrolled ? "bg-paper/80 ring-1 ring-ink/5 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a href="#top" aria-label="SAtomiq">
          <Logo />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-500 ease-spring group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={LINKS.diagnostico} variant="primary" icon="arrow">
            Falar com Arthur
          </Button>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-[1.5px] w-6 bg-ink transition-all duration-500 ease-spring ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-[1.5px] w-6 bg-ink transition-all duration-500 ease-spring ${
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: SPRING }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-paper/95 backdrop-blur-xl md:hidden"
          >
            {NAV.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: SPRING }}
                className="font-display text-3xl text-ink"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + NAV.length * 0.06, duration: 0.6, ease: SPRING }}
              className="mt-4"
            >
              <Button href={LINKS.diagnostico} variant="primary">
                Falar com Arthur
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

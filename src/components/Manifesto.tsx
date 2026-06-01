import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MANIFESTO } from "../lib/content";

const SPRING = [0.16, 1, 0.3, 1] as const;

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = p >= 0.66 ? 2 : p >= 0.33 ? 1 : 0;
    if (idx !== active) setActive(idx);
  });

  const dark = active > 0;

  return (
    <section id="manifesto" ref={ref} className="relative" style={{ height: "300vh" }}>
      <div
        className={`sticky top-0 flex min-h-[100dvh] items-center overflow-hidden transition-colors duration-700 ease-spring ${
          dark ? "bg-ink text-paper" : "bg-paper text-ink"
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
          <div className="relative max-w-3xl">
            {MANIFESTO.map((frame, i) => (
              <motion.div
                key={i}
                aria-hidden={active !== i}
                className={i === 0 ? "" : "absolute inset-0"}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : 18,
                  filter: active === i ? "blur(0px)" : "blur(6px)",
                }}
                transition={{ duration: 0.6, ease: SPRING }}
              >
                <span className={`flex items-center gap-2.5 ${dark ? "text-paper/55" : "text-ink/55"}`}>
                  <span className={`diamond ${frame.accent ? "!bg-accent" : ""}`} />
                  <span className="font-mono text-[11px] uppercase tracking-eyebrow">{frame.eyebrow}</span>
                </span>
                <h2 className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                  {frame.title.map((t, j) => (
                    <span key={j} className={`block ${frame.accent && j === 1 ? "italic" : ""}`}>
                      {t}
                    </span>
                  ))}
                </h2>
                <p
                  className={`mt-7 max-w-xl text-lg leading-relaxed ${
                    dark ? "text-paper/80" : "text-ink-soft"
                  }`}
                >
                  {frame.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* progress dots */}
        <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-3 sm:right-10">
          {MANIFESTO.map((_, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-500 ease-spring ${
                active === i ? "h-6 opacity-100" : "h-1 opacity-30"
              } ${dark ? "bg-paper" : "bg-ink"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

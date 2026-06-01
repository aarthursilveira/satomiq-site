import { memo, useEffect, useRef, useState } from "react";

/**
 * "DNA visual" da SAtomiq: uma arquitetura sendo atacada por red team.
 * Isolada, anima via requestAnimationFrame manipulando refs (sem re-render),
 * com cleanup estrito. Respeita prefers-reduced-motion (render estático).
 */

const INK = "#141414";
const ACCENT = "#C8462F";

// arquitetura: nós fixos (coordenadas no viewBox 0..520)
const NODES = [
  { id: 0, x: 260, y: 250, r: 7 }, // core
  { id: 1, x: 130, y: 140, r: 5 },
  { id: 2, x: 400, y: 130, r: 5 },
  { id: 3, x: 90, y: 320, r: 5 },
  { id: 4, x: 420, y: 330, r: 5 },
  { id: 5, x: 250, y: 410, r: 5 },
  { id: 6, x: 200, y: 110, r: 4 },
  { id: 7, x: 350, y: 400, r: 4 },
];
const LINKS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [2, 6], [3, 5], [4, 7], [5, 7], [1, 3], [2, 4],
];

const PHASES = ["[ NOMINAL ]", "[ SCANNING ]", "[ BREACH @ NODE 04 ]", "[ PATCHED ]"];

function VizImpl() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const radarRef = useRef<SVGGElement>(null);
  const scanRef = useRef<SVGLineElement>(null);
  const statusRef = useRef<SVGTextElement>(null);
  const pktRef = useRef<SVGTextElement>(null);
  const tsRef = useRef<SVGTextElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [, force] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) / 1000;

      // radar sweep rotation
      if (radarRef.current) {
        radarRef.current.setAttribute("transform", `translate(260 250) rotate(${(t * 70) % 360})`);
      }
      // scan line
      if (scanRef.current) {
        const y = 60 + ((Math.sin(t * 0.9) * 0.5 + 0.5) * 400);
        scanRef.current.setAttribute("y1", String(y));
        scanRef.current.setAttribute("y2", String(y));
      }
      // 8s phase cycle
      const phase = Math.floor((t / 2) % 4);
      if (statusRef.current) {
        statusRef.current.textContent = PHASES[phase];
        statusRef.current.setAttribute("fill", phase === 2 ? ACCENT : INK);
        statusRef.current.setAttribute("opacity", phase === 2 ? "0.95" : "0.6");
      }
      // breach node flashes during phase 2
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const breached = phase === 2 && i === 4;
        el.setAttribute("fill", breached ? ACCENT : INK);
        const pulse = breached ? 1 + Math.sin(t * 12) * 0.25 : 1;
        el.setAttribute("transform", `scale(${pulse})`);
        el.style.transformOrigin = `${NODES[i].x}px ${NODES[i].y}px`;
      });
      // counters
      if (pktRef.current) pktRef.current.textContent = String(Math.floor(t * 137)).padStart(5, "0");
      if (tsRef.current) {
        const ms = Math.floor((t * 1000) % 1000);
        tsRef.current.textContent = `T+${String(Math.floor(t)).padStart(3, "0")}.${String(ms).padStart(3, "0")}s`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <svg viewBox="0 0 520 520" className="h-full w-full" role="img" aria-label="Arquitetura sob red team contínuo">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill={INK} opacity="0.1" />
        </pattern>
        <radialGradient id="coreglow">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="520" height="520" fill="url(#dots)" />

      {/* corner brackets */}
      <g stroke={INK} strokeWidth="1.5" fill="none" opacity="0.45">
        <path d="M24 24 L24 56 M24 24 L56 24" />
        <path d="M496 24 L496 56 M496 24 L464 24" />
        <path d="M24 496 L24 464 M24 496 L56 496" />
        <path d="M496 496 L496 464 M496 496 L464 496" />
      </g>

      {/* HUD */}
      <text x="24" y="18" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill={INK} opacity="0.55">
        $ red_team --target=architecture --mode=continuous
      </text>
      <text ref={statusRef} x="496" y="18" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill={INK} opacity="0.6">
        {PHASES[0]}
      </text>
      <line x1="24" y1="30" x2="496" y2="30" stroke={INK} strokeWidth="0.5" opacity="0.2" />

      {/* scan line */}
      <line ref={scanRef} x1="24" y1="260" x2="496" y2="260" stroke={ACCENT} strokeWidth="1" opacity="0.25" />

      {/* radar */}
      <g ref={radarRef} transform="translate(260 250)" opacity="0.5">
        <path d="M0 0 L150 0 A150 150 0 0 1 129.9 75 Z" fill={ACCENT} opacity="0.12" />
      </g>
      <circle cx="260" cy="250" r="150" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.12" />
      <circle cx="260" cy="250" r="95" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.12" />

      {/* links */}
      <g stroke={INK} strokeWidth="1" opacity="0.22">
        {LINKS.map(([a, b], i) => (
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
        ))}
      </g>

      {/* core glow */}
      <circle cx="260" cy="250" r="90" fill="url(#coreglow)" />

      {/* nodes */}
      {NODES.map((n, i) => (
        <circle
          key={n.id}
          ref={(el) => (nodeRefs.current[i] = el)}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={INK}
        />
      ))}

      {/* telemetry footer */}
      <text ref={tsRef} x="24" y="508" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={INK} opacity="0.45">
        T+000.000s
      </text>
      <text x="496" y="508" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={INK} opacity="0.45">
        PKT <tspan ref={pktRef} fontWeight="700">00000</tspan>
      </text>
    </svg>
  );
}

export const RedTeamViz = memo(VizImpl);

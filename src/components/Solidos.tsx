/**
 * Sólidos isométricos dos pilares. GERADO por scratchpad/fonts/iso.mjs —
 * não editar à mão: a geometria vem da projeção, não do olho.
 *
 * A ideia: o símbolo da SAtomiq é um quadrado girado 45°, que em isometria é
 * exatamente a face de cima de um cubo. Os sólidos são a marca em volume.
 *
 * O id do filtro é único por figura: dois <filter id="borrao"> na mesma página
 * fazem o segundo perder para o primeiro.
 */

export function Eficiencia({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-43.02 -156.4 86.04 203.6" className={className} role="img" aria-label="Um bloco sólido e três peças que saíram dele">
      <defs><filter id="borrao-eficiencia" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="7"/>
  </filter></defs>
  <path d="M0 2.6L22.52 15.6L0 28.6L-22.52 15.6Z" fill="#000" opacity="0.55" filter="url(#borrao-eficiencia)"/>
  <g>
      <path d="M-27.02 -15.6L-27.02 15.6L0 31.2L0 0Z" fill="#8A4F26"/>
      <path d="M27.02 -15.6L27.02 15.6L0 31.2L0 0Z" fill="#BC784B"/>
      <path d="M0 -31.2L27.02 -15.6L0 0L-27.02 -15.6Z" fill="#D9A06F"/>
    </g>
  <g className="flutua flutua-a"><g opacity="0.78" fill="none" stroke="#7FA0A2" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M0 -76.7L27.02 -61.1L27.02 -29.9L0 -14.3L-27.02 -29.9L-27.02 -61.1Z"/>
      <path d="M0 -45.5L27.02 -61.1M0 -45.5L-27.02 -61.1M0 -45.5L0 -14.3"/>
    </g></g>
  <g className="flutua flutua-b"><g opacity="0.48" fill="none" stroke="#7FA0A2" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M0 -110.5L27.02 -94.9L27.02 -63.7L0 -48.1L-27.02 -63.7L-27.02 -94.9Z"/>
      <path d="M0 -79.3L27.02 -94.9M0 -79.3L-27.02 -94.9M0 -79.3L0 -48.1"/>
    </g></g>
  <g className="flutua flutua-c"><g opacity="0.24" fill="none" stroke="#7FA0A2" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M0 -140.4L27.02 -124.8L27.02 -93.6L0 -78L-27.02 -93.6L-27.02 -124.8Z"/>
      <path d="M0 -109.2L27.02 -124.8M0 -109.2L-27.02 -124.8M0 -109.2L0 -78"/>
    </g></g>
    </svg>
  );
}

export function Automacao({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-117.32 -51.1 234.64 172.4" className={className} role="img" aria-label="Peças correndo sozinhas num circuito fechado">
      <defs><filter id="borrao-automacao" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="7"/>
  </filter></defs>
  <path d="M0 9.1L72.05 50.7L0 92.3L-72.05 50.7Z" fill="#000" opacity="0.4" filter="url(#borrao-automacao)"/>
  <path d="M0 0L81.06 46.8L0 93.6L-81.06 46.8Z" fill="none" stroke="#4A797C" strokeWidth="1.6" strokeLinejoin="round"/>
  <g>
      <path d="M-20.26 -23.4L-20.26 0L0 11.7L0 -11.7Z" fill="#3F5F61"/>
      <path d="M20.26 -23.4L20.26 0L0 11.7L0 -11.7Z" fill="#7FA0A2"/>
      <path d="M0 -35.1L20.26 -23.4L0 -11.7L-20.26 -23.4Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M60.79 23.4L60.79 46.8L81.06 58.5L81.06 35.1Z" fill="#3F5F61"/>
      <path d="M101.32 23.4L101.32 46.8L81.06 58.5L81.06 35.1Z" fill="#7FA0A2"/>
      <path d="M81.06 11.7L101.32 23.4L81.06 35.1L60.79 23.4Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M-20.26 70.2L-20.26 93.6L0 105.3L0 81.9Z" fill="#3F5F61"/>
      <path d="M20.26 70.2L20.26 93.6L0 105.3L0 81.9Z" fill="#7FA0A2"/>
      <path d="M0 58.5L20.26 70.2L0 81.9L-20.26 70.2Z" fill="#C7D3D5"/>
    </g>
  <g className="flutua flutua-a"><g>
      <path d="M-101.32 1.3L-101.32 24.7L-81.06 36.4L-81.06 13Z" fill="#8A4F26"/>
      <path d="M-60.79 1.3L-60.79 24.7L-81.06 36.4L-81.06 13Z" fill="#BC784B"/>
      <path d="M-81.06 -10.4L-60.79 1.3L-81.06 13L-101.32 1.3Z" fill="#D9A06F"/>
    </g></g>
    </svg>
  );
}

export function Inovacao({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-43.02 -101.8 295.44 149" className={className} role="img" aria-label="Uma fila de blocos e um que saiu na frente, no ar">
      <defs><filter id="borrao-inovacao" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="7"/>
  </filter></defs>
  <path d="M0 2.6L22.52 15.6L0 28.6L-22.52 15.6Z" fill="#000" opacity="0.42" filter="url(#borrao-inovacao)"/>
  <path d="M69.8 2.6L92.32 15.6L69.8 28.6L47.28 15.6Z" fill="#000" opacity="0.42" filter="url(#borrao-inovacao)"/>
  <path d="M139.6 2.6L162.12 15.6L139.6 28.6L117.09 15.6Z" fill="#000" opacity="0.42" filter="url(#borrao-inovacao)"/>
  <g>
      <path d="M-27.02 -15.6L-27.02 15.6L0 31.2L0 0Z" fill="#3F5F61"/>
      <path d="M27.02 -15.6L27.02 15.6L0 31.2L0 0Z" fill="#7FA0A2"/>
      <path d="M0 -31.2L27.02 -15.6L0 0L-27.02 -15.6Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M42.78 -15.6L42.78 15.6L69.8 31.2L69.8 0Z" fill="#3F5F61"/>
      <path d="M96.82 -15.6L96.82 15.6L69.8 31.2L69.8 0Z" fill="#7FA0A2"/>
      <path d="M69.8 -31.2L96.82 -15.6L69.8 0L42.78 -15.6Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M112.58 -15.6L112.58 15.6L139.6 31.2L139.6 0Z" fill="#3F5F61"/>
      <path d="M166.62 -15.6L166.62 15.6L139.6 31.2L139.6 0Z" fill="#7FA0A2"/>
      <path d="M139.6 -31.2L166.62 -15.6L139.6 0L112.58 -15.6Z" fill="#C7D3D5"/>
    </g>
  <path d="M209.4 0L236.42 15.6L209.4 31.2L182.38 15.6Z" fill="none" stroke="#4A797C" strokeWidth="1.2" strokeDasharray="4 4" opacity=".75"/>
  <g className="flutua flutua-a"><g>
      <path d="M182.38 -70.2L182.38 -39L209.4 -23.4L209.4 -54.6Z" fill="#8A4F26"/>
      <path d="M236.42 -70.2L236.42 -39L209.4 -23.4L209.4 -54.6Z" fill="#BC784B"/>
      <path d="M209.4 -85.8L236.42 -70.2L209.4 -54.6L182.38 -70.2Z" fill="#D9A06F"/>
    </g></g>
    </svg>
  );
}

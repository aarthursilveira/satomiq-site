/**
 * Sólidos isométricos dos pilares. GERADO por scratchpad/fonts/iso2.mjs —
 * não editar à mão: a geometria vem da projeção, não do olho.
 *
 * A ideia: o símbolo da SAtomiq é um quadrado girado 45°, que em isometria é
 * exatamente a face de cima de um cubo. Os sólidos são a marca em volume.
 *
 * As três dividem o MESMO viewBox, ancorado embaixo. É o que garante a mesma
 * escala de cubo e o mesmo chão nas três colunas — com viewBox justo por figura,
 * o navegador encaixava cada uma na sua própria escala.
 *
 * O id do filtro é único por figura: dois <filter id="borrao"> na mesma página
 * fazem o segundo perder para o primeiro.
 */

export function Eficiencia({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-271.69 -186.48 313.71 235.28" className={className} role="img" aria-label="Três volumes vazios descendo para um único bloco sólido">
      <defs><filter id="borrao-eficiencia" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="7"/>
  </filter></defs>
  <path d="M0 2.6L27.02 18.2L0 33.8L-27.02 18.2Z" fill="#000" opacity="0.55" filter="url(#borrao-eficiencia)"/>
  <g className="flutua flutua-c"><g opacity="0.3" fill="none" stroke="#7FA0A2" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M-229.67 -140.4L-202.65 -124.8L-202.65 -93.6L-229.67 -78L-256.69 -93.6L-256.69 -124.8Z"/>
      <path d="M-229.67 -109.2L-202.65 -124.8M-229.67 -109.2L-256.69 -124.8M-229.67 -109.2L-229.67 -78"/>
    </g></g>
  <g className="flutua flutua-b"><g opacity="0.52" fill="none" stroke="#7FA0A2" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M-153.11 -104L-126.09 -88.4L-126.09 -57.2L-153.11 -41.6L-180.13 -57.2L-180.13 -88.4Z"/>
      <path d="M-153.11 -72.8L-126.09 -88.4M-153.11 -72.8L-180.13 -88.4M-153.11 -72.8L-153.11 -41.6"/>
    </g></g>
  <g className="flutua flutua-a"><g opacity="0.78" fill="none" stroke="#7FA0A2" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M-76.56 -70.2L-49.54 -54.6L-49.54 -23.4L-76.56 -7.8L-103.58 -23.4L-103.58 -54.6Z"/>
      <path d="M-76.56 -39L-49.54 -54.6M-76.56 -39L-103.58 -54.6M-76.56 -39L-76.56 -7.8"/>
    </g></g>
  <g>
      <path d="M-27.02 -15.6L-27.02 15.6L0 31.2L0 0Z" fill="#8A4F26"/>
      <path d="M27.02 -15.6L27.02 15.6L0 31.2L0 0Z" fill="#BC784B"/>
      <path d="M0 -31.2L27.02 -15.6L0 0L-27.02 -15.6Z" fill="#D9A06F"/>
    </g>
    </svg>
  );
}

export function Automacao({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-156.85 -79.88 313.71 235.28" className={className} role="img" aria-label="Quatro peças num circuito fechado, uma delas no ar">
      <defs><filter id="borrao-automacao" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="7"/>
  </filter></defs>
  <path d="M0 0L108.08 62.4L0 124.8L-108.08 62.4Z" fill="none" stroke="#4A797C" strokeWidth="1.6" strokeLinejoin="round"/>
  <path d="M0 -15.6L27.02 0L0 15.6L-27.02 0Z" fill="#000" opacity="0.45" filter="url(#borrao-automacao)"/>
  <path d="M108.08 46.8L135.1 62.4L108.08 78L81.06 62.4Z" fill="#000" opacity="0.45" filter="url(#borrao-automacao)"/>
  <path d="M0 109.2L27.02 124.8L0 140.4L-27.02 124.8Z" fill="#000" opacity="0.45" filter="url(#borrao-automacao)"/>
  <path d="M-108.08 46.8L-81.06 62.4L-108.08 78L-135.1 62.4Z" fill="#000" opacity="0.3" filter="url(#borrao-automacao)"/>
  <g>
      <path d="M-27.02 -31.2L-27.02 0L0 15.6L0 -15.6Z" fill="#3F5F61"/>
      <path d="M27.02 -31.2L27.02 0L0 15.6L0 -15.6Z" fill="#7FA0A2"/>
      <path d="M0 -46.8L27.02 -31.2L0 -15.6L-27.02 -31.2Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M81.06 31.2L81.06 62.4L108.08 78L108.08 46.8Z" fill="#3F5F61"/>
      <path d="M135.1 31.2L135.1 62.4L108.08 78L108.08 46.8Z" fill="#7FA0A2"/>
      <path d="M108.08 15.6L135.1 31.2L108.08 46.8L81.06 31.2Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M-27.02 93.6L-27.02 124.8L0 140.4L0 109.2Z" fill="#3F5F61"/>
      <path d="M27.02 93.6L27.02 124.8L0 140.4L0 109.2Z" fill="#7FA0A2"/>
      <path d="M0 78L27.02 93.6L0 109.2L-27.02 93.6Z" fill="#C7D3D5"/>
    </g>
  <g className="flutua flutua-b"><g>
      <path d="M-135.1 9.1L-135.1 40.3L-108.08 55.9L-108.08 24.7Z" fill="#8A4F26"/>
      <path d="M-81.06 9.1L-81.06 40.3L-108.08 55.9L-108.08 24.7Z" fill="#BC784B"/>
      <path d="M-108.08 -6.5L-81.06 9.1L-108.08 24.7L-135.1 9.1Z" fill="#D9A06F"/>
    </g></g>
    </svg>
  );
}

export function Inovacao({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-42.02 -186.48 313.71 235.28" className={className} role="img" aria-label="Uma fila de blocos e um que saiu na frente, no ar">
      <defs><filter id="borrao-inovacao" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="7"/>
  </filter></defs>
  <path d="M0 2.6L27.02 18.2L0 33.8L-27.02 18.2Z" fill="#000" opacity="0.42" filter="url(#borrao-inovacao)"/>
  <path d="M76.56 2.6L103.58 18.2L76.56 33.8L49.54 18.2Z" fill="#000" opacity="0.42" filter="url(#borrao-inovacao)"/>
  <path d="M153.11 2.6L180.13 18.2L153.11 33.8L126.09 18.2Z" fill="#000" opacity="0.42" filter="url(#borrao-inovacao)"/>
  <g>
      <path d="M-27.02 -15.6L-27.02 15.6L0 31.2L0 0Z" fill="#3F5F61"/>
      <path d="M27.02 -15.6L27.02 15.6L0 31.2L0 0Z" fill="#7FA0A2"/>
      <path d="M0 -31.2L27.02 -15.6L0 0L-27.02 -15.6Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M49.54 -15.6L49.54 15.6L76.56 31.2L76.56 0Z" fill="#3F5F61"/>
      <path d="M103.58 -15.6L103.58 15.6L76.56 31.2L76.56 0Z" fill="#7FA0A2"/>
      <path d="M76.56 -31.2L103.58 -15.6L76.56 0L49.54 -15.6Z" fill="#C7D3D5"/>
    </g>
  <g>
      <path d="M126.09 -15.6L126.09 15.6L153.11 31.2L153.11 0Z" fill="#3F5F61"/>
      <path d="M180.13 -15.6L180.13 15.6L153.11 31.2L153.11 0Z" fill="#7FA0A2"/>
      <path d="M153.11 -31.2L180.13 -15.6L153.11 0L126.09 -15.6Z" fill="#C7D3D5"/>
    </g>
  <path d="M229.67 0L256.69 15.6L229.67 31.2L202.65 15.6Z" fill="none" stroke="#4A797C" strokeWidth="1.2" strokeDasharray="4 4" opacity=".75"/>
  <g className="flutua flutua-a"><g>
      <path d="M202.65 -70.2L202.65 -39L229.67 -23.4L229.67 -54.6Z" fill="#8A4F26"/>
      <path d="M256.69 -70.2L256.69 -39L229.67 -23.4L229.67 -54.6Z" fill="#BC784B"/>
      <path d="M229.67 -85.8L256.69 -70.2L229.67 -54.6L202.65 -70.2Z" fill="#D9A06F"/>
    </g></g>
    </svg>
  );
}

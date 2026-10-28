import { SceneFrame } from '../SceneFrame';
import { Hills, Pines, Celestial, Clouds, CastShadow, shade, VB_W } from '../primitives';

function ThaliaPine({ x, y, h }: { x: number; y: number; h: number }) {
  const green = '#1f4a2a';
  const light = shade(green, 0.3);
  return (
    <g>
      <CastShadow x={x} y={y + 1} rx={h * 0.32} ry={2.4} opacity={0.3} />
      <rect x={x - h * 0.04} y={y - h * 0.12} width={h * 0.08} height={h * 0.14} fill="#3a2a1a" />
      {[1, 0.74, 0.5, 0.3].map((f, i) => (
        <polygon key={i}
          points={`${x},${y - h * f - h * 0.1} ${x - h * (0.3 - i * 0.015)},${y - h * f + h * 0.14} ${x + h * (0.3 - i * 0.015)},${y - h * f + h * 0.14}`}
          fill={i % 2 === 0 ? green : light} />
      ))}
      {/* golden fleece glint */}
      <circle cx={x + h * 0.14} cy={y - h * 0.55} r={h * 0.035} fill="#ffe27a" className="scene-flicker" style={{ animationDuration: '2.4s' }} />
      <circle cx={x + h * 0.14} cy={y - h * 0.55} r={h * 0.08} fill="#ffe27a" opacity={0.25} />
    </g>
  );
}

export function PJPineTreeHill() {
  return (
    <SceneFrame skyId="pj-pinehill-sky" sky={{ top: '#5aa7c9', mid: '#e3c98a', bottom: '#f6e2b8' }}>
      <Celestial x={128} y={18} r={7} color="#fff3c4" glow="#ffe9a8" />
      <Clouds seed={61} opacity={0.5} />
      <Hills baseY={58} amplitude={14} color="#6a9a5a" />
      <Hills baseY={70} amplitude={10} color="#4f7a40" />
      <Pines xStart={0} xEnd={60} baseY={78} count={6} height={8} color="#355c3a" seed={63} />
      <Pines xStart={110} xEnd={VB_W} baseY={78} count={6} height={8} color="#355c3a" seed={64} />
      {/* distant camp glimpsed in the valley */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={70 + i * 9} y={72} width={6} height={5} fill="#8a5a2b" opacity={0.7} />
      ))}
      <ThaliaPine x={VB_W / 2} y={82} h={46} />
    </SceneFrame>
  );
}

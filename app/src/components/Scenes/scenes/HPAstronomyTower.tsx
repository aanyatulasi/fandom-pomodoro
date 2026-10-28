import { SceneFrame } from '../SceneFrame';
import { Stars, Celestial, Hills, shade, VB_W } from '../primitives';

export function HPAstronomyTower() {
  return (
    <SceneFrame skyId="hp-tower-sky" sky={{ top: '#060915', mid: '#121a3a', bottom: '#2b2250' }}>
      <Stars count={90} seed={13} yMax={70} />
      <Celestial x={40} y={18} r={6} color="#eef0ff" glow="#aeb8ff" />
      {/* castle grounds far below */}
      <Hills baseY={78} amplitude={6} color="#1a1f3a" opacity={0.85} rim={false} />
      <g fill="#0e1024" opacity={0.9}>
        <rect x={2} y={70} width={8} height={10} />
        <polygon points="2,70 6,64 10,70" />
        <rect x={110} y={72} width={10} height={8} />
        <polygon points="110,72 115,66 120,72" />
      </g>
      <g fill="#120f1c">
        <rect x={0} y={68} width={VB_W} height={22} />
        <rect x={0} y={68} width={VB_W} height={1.4} fill={shade('#120f1c', 0.15)} opacity={0.5} />
        <rect x={0} y={60} width={14} height={30} />
        <rect x={VB_W - 14} y={60} width={14} height={30} />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={16 + i * 14} y={64} width={8} height={6} fill="#1a1530" />
        ))}
      </g>
      {/* crenellations */}
      <g fill="#0a0818">
        {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={13 + i * 14} y={58} width={4} height={3} />)}
      </g>
      <g stroke="#3a3458" strokeWidth={0.8} fill="none">
        <line x1={50} y1={60} x2={50} y2={40} />
        <circle cx={50} cy={38} r={2} fill="#3a3458" />
      </g>
      <g fill="#a8b8ff" opacity={0.5}>
        <circle cx={78} cy={30} r={0.5} className="scene-twinkle" style={{ animationDuration: '3s' }} />
        <circle cx={95} cy={22} r={0.6} className="scene-twinkle" style={{ animationDuration: '2.3s' }} />
      </g>
    </SceneFrame>
  );
}

import { SceneFrame } from '../SceneFrame';
import { Stars, Celestial, VB_W } from '../primitives';

export function HPAstronomyTower() {
  return (
    <SceneFrame skyId="hp-tower-sky" sky={{ top: '#060915', mid: '#121a3a', bottom: '#2b2250' }}>
      <Stars count={90} seed={13} yMax={70} />
      <Celestial x={40} y={18} r={6} color="#eef0ff" glow="#aeb8ff" />
      <g fill="#120f1c">
        <rect x={0} y={68} width={VB_W} height={22} />
        <rect x={0} y={60} width={14} height={30} />
        <rect x={VB_W - 14} y={60} width={14} height={30} />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={16 + i * 14} y={64} width={8} height={6} fill="#1a1530" />
        ))}
      </g>
      <g stroke="#3a3458" strokeWidth={0.8} fill="none">
        <line x1={50} y1={60} x2={50} y2={40} />
        <circle cx={50} cy={38} r={2} fill="#3a3458" />
      </g>
    </SceneFrame>
  );
}

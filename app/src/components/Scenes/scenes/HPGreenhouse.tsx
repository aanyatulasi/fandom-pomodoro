import { SceneFrame } from '../SceneFrame';
import { GreenhousePanes, Celestial, VB_W } from '../primitives';

export function HPGreenhouse() {
  return (
    <SceneFrame skyId="hp-greenhouse-sky" sky={{ top: '#bfe3c9', mid: '#9fd1ad', bottom: '#3c5c3a' }}>
      <Celestial x={120} y={14} r={6} color="#fff8d8" glow="#ffe9a8" />
      <GreenhousePanes y={0} height={50} color="#ffffff" />
      <g opacity={0.9}>
        {[10, 35, 60, 85, 110, 135].map((x, i) => (
          <g key={x}>
            <path d={`M ${x} 90 Q ${x + 5} ${70 - (i % 3) * 8} ${x - 2} ${50 - (i % 2) * 10}`} stroke="#2f5233" strokeWidth={1.4} fill="none" />
            <circle cx={x - 2} cy={50 - (i % 2) * 10} r={3} fill="#6e9c3e" />
          </g>
        ))}
      </g>
      <rect x={0} y={78} width={VB_W} height={12} fill="#2f4a2a" />
      {[20, 45, 70, 95, 120, 145].map((x) => (
        <rect key={x} x={x} y={72} width={10} height={8} rx={1} fill="#8a5a2b" />
      ))}
    </SceneFrame>
  );
}

import { SceneFrame } from '../SceneFrame';
import { GreenhousePanes, Celestial, Clouds, CastShadow, shade, VB_W } from '../primitives';

export function HPGreenhouse() {
  return (
    <SceneFrame skyId="hp-greenhouse-sky" sky={{ top: '#bfe3c9', mid: '#9fd1ad', bottom: '#3c5c3a' }}>
      <Celestial x={120} y={14} r={6} color="#fff8d8" glow="#ffe9a8" />
      <Clouds seed={37} count={3} yMax={18} opacity={0.4} />
      <GreenhousePanes y={0} height={50} color="#ffffff" />
      <g opacity={0.25}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={0} y={i * 17} width={VB_W} height={0.6} fill="#ffffff" />
        ))}
      </g>
      <g opacity={0.9}>
        {[10, 35, 60, 85, 110, 135].map((x, i) => (
          <g key={x}>
            <CastShadow x={x - 2} y={50 - (i % 2) * 10 + 2.6} rx={3.2} ry={0.9} opacity={0.2} />
            <path d={`M ${x} 90 Q ${x + 5} ${70 - (i % 3) * 8} ${x - 2} ${50 - (i % 2) * 10}`} stroke="#2f5233" strokeWidth={1.4} fill="none" />
            <circle cx={x - 2} cy={50 - (i % 2) * 10} r={3} fill={shade('#6e9c3e', (i % 2) * 0.15)} />
            <circle cx={x - 3} cy={49 - (i % 2) * 10} r={1.1} fill={shade('#6e9c3e', 0.3)} opacity={0.7} />
          </g>
        ))}
      </g>
      <rect x={0} y={78} width={VB_W} height={12} fill="#2f4a2a" />
      <rect x={0} y={78} width={VB_W} height={1.4} fill={shade('#2f4a2a', 0.2)} opacity={0.5} />
      {[20, 45, 70, 95, 120, 145].map((x) => (
        <g key={x}>
          <CastShadow x={x + 5} y={81.5} rx={6} ry={1} opacity={0.2} />
          <rect x={x} y={72} width={10} height={8} rx={1} fill="#8a5a2b" />
          <rect x={x} y={72} width={10} height={1.6} fill={shade('#8a5a2b', 0.2)} opacity={0.6} />
        </g>
      ))}
    </SceneFrame>
  );
}

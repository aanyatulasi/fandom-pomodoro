import { SceneFrame } from '../SceneFrame';
import { Bookshelves, Candles, CastShadow, shade, VB_W } from '../primitives';

export function HPLibrary() {
  return (
    <SceneFrame skyId="hp-library-sky" sky={{ top: '#2e2414', mid: '#4a3a22', bottom: '#1a1410' }}>
      <Bookshelves xStart={0} xEnd={VB_W} y={12} height={48} color="#3a2a1a" />
      <g opacity={0.5}>
        {[20, 70, 120].map((x) => <rect key={x} x={x} y={13} width={20} height={6} fill="#ffdd7a" opacity={0.08} />)}
      </g>
      <Candles count={6} yRange={[58, 62]} seed={31} />
      <g fill={shade('#2a1d12', -0.1)}>
        <rect x={0} y={64} width={VB_W} height={26} />
        <rect x={0} y={64} width={VB_W} height={2} fill={shade('#2a1d12', 0.15)} opacity={0.6} />
      </g>
      <CastShadow x={80} y={66.4} rx={42} ry={2} opacity={0.3} />
      <rect x={40} y={58} width={80} height={8} fill="#4a3620" />
      <rect x={40} y={58} width={80} height={1.4} fill={shade('#4a3620', 0.18)} opacity={0.6} />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={48 + i * 18} y={54} width={6} height={4} fill="#d8c79a" opacity={0.7} />
      ))}
      {[18, 55, 100, 135].map((x, i) => (
        <g key={x}>
          <rect x={x} y={59} width={4} height={6} fill="#5a4530" />
          <rect x={x + 5} y={60} width={3.4} height={5} fill="#4a3620" />
          {i % 2 === 0 && <rect x={x - 6} y={59.5} width={5} height={5.5} fill="#6b5436" />}
        </g>
      ))}
    </SceneFrame>
  );
}

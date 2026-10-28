import { SceneFrame } from '../SceneFrame';
import { Bookshelves, Candles, VB_W } from '../primitives';

export function HPLibrary() {
  return (
    <SceneFrame skyId="hp-library-sky" sky={{ top: '#2e2414', mid: '#4a3a22', bottom: '#1a1410' }}>
      <Bookshelves xStart={0} xEnd={VB_W} y={12} height={48} color="#3a2a1a" />
      <Candles count={6} yRange={[58, 62]} seed={31} />
      <g fill="#2a1d12">
        <rect x={0} y={64} width={VB_W} height={26} />
        <rect x={40} y={58} width={80} height={8} fill="#4a3620" />
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={i} x={48 + i * 18} y={54} width={6} height={4} fill="#d8c79a" opacity={0.7} />
        ))}
      </g>
    </SceneFrame>
  );
}

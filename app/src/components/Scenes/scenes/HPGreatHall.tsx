import { SceneFrame } from '../SceneFrame';
import { Arches, Candles, Stars, VB_W } from '../primitives';

export function HPGreatHall() {
  return (
    <SceneFrame skyId="hp-hall-sky" sky={{ top: '#1b2140', mid: '#2c2a4a', bottom: '#120f10' }}>
      <Stars count={30} seed={9} yMax={20} opacity={0.6} />
      <Arches count={4} y={10} height={30} color="#5a4a2e" />
      <Candles count={16} yRange={[14, 34]} seed={21} />
      <g fill="#3a2a1a">
        <rect x={0} y={60} width={VB_W} height={30} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={10 + i * 48} y={56} width={36} height={6} fill="#4a3a24" />
        ))}
      </g>
      <g fill="#6b5a3a" opacity={0.7}>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={6 + i * 15} y={66} width={5} height={14} />
        ))}
      </g>
    </SceneFrame>
  );
}

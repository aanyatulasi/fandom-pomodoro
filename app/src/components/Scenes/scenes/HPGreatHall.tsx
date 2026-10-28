import { SceneFrame } from '../SceneFrame';
import { Arches, Candles, Stars, CastShadow, shade, VB_W } from '../primitives';

export function HPGreatHall() {
  return (
    <SceneFrame skyId="hp-hall-sky" sky={{ top: '#1b2140', mid: '#2c2a4a', bottom: '#120f10' }}>
      <Stars count={30} seed={9} yMax={20} opacity={0.6} />
      <Arches count={4} y={10} height={30} color="#5a4a2e" />
      <Candles count={16} yRange={[14, 34]} seed={21} />
      <g>
        <rect x={0} y={60} width={VB_W} height={30} fill={shade('#3a2a1a', -0.08)} />
        <rect x={0} y={60} width={VB_W} height={3} fill={shade('#3a2a1a', 0.1)} opacity={0.5} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <CastShadow x={28 + i * 48} y={63.5} rx={19} ry={1.6} opacity={0.3} />
            <rect x={10 + i * 48} y={56} width={36} height={6} fill="#4a3a24" />
            <rect x={10 + i * 48} y={56} width={36} height={1.4} fill={shade('#4a3a24', 0.2)} opacity={0.6} />
          </g>
        ))}
      </g>
      <g fill="#6b5a3a" opacity={0.7}>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={6 + i * 15} y={66} width={5} height={14} />
        ))}
      </g>
      <g opacity={0.5}>
        {[0, 1, 2].map((i) => <ellipse key={i} cx={28 + i * 48} cy={58} rx={16} ry={1.4} fill="#ffdd7a" opacity={0.12} />)}
      </g>
    </SceneFrame>
  );
}

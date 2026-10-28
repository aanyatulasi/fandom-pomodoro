import { useMemo } from 'react';
import { SceneFrame } from '../SceneFrame';
import { Candles, VB_W } from '../primitives';

function BookStacks() {
  const stacks = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    x: 8 + i * 15, h: 10 + ((i * 7) % 16), key: i,
  })), []);
  return (
    <g>
      {stacks.map((s) => (
        <g key={s.key}>
          {Array.from({ length: Math.ceil(s.h / 3) }).map((_, r) => (
            <rect key={r} x={s.x} y={78 - r * 3.2} width={11} height={2.8}
              fill={`hsl(${(s.key * 40 + r * 25) % 360}, 32%, ${28 + (r % 3) * 6}%)`} />
          ))}
        </g>
      ))}
    </g>
  );
}

export function HPRoomOfRequirement() {
  return (
    <SceneFrame skyId="hp-ror-sky" sky={{ top: '#241a2e', mid: '#3a2a3c', bottom: '#1a1420' }}>
      <Candles count={10} yRange={[24, 50]} seed={41} />
      <rect x={0} y={76} width={VB_W} height={14} fill="#1c1420" />
      <BookStacks />
      <g fill="#4a3a52" opacity={0.8}>
        <rect x={110} y={56} width={36} height={6} />
        <rect x={114} y={62} width={4} height={14} />
        <rect x={138} y={62} width={4} height={14} />
      </g>
      <circle cx={128} cy={46} r={4} fill="#ffdd7a" opacity={0.35} />
    </SceneFrame>
  );
}

import { useMemo } from 'react';
import { SceneFrame } from '../SceneFrame';
import { Candles, CastShadow, shade, VB_W } from '../primitives';

function BookStacks() {
  const stacks = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    x: 8 + i * 15, h: 10 + ((i * 7) % 16), key: i,
  })), []);
  return (
    <g>
      {stacks.map((s) => (
        <g key={s.key}>
          <CastShadow x={s.x + 5.5} y={79} rx={6.5} ry={1} opacity={0.25} />
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
      {/* towering stacked shelves receding into the dark, à la the film's room */}
      <g opacity={0.5}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={0} y={4 + i * 2} width={VB_W} height={10 - i * 2} fill={shade('#2a1f34', i * -0.08)} />
        ))}
      </g>
      <Candles count={10} yRange={[24, 50]} seed={41} />
      <rect x={0} y={76} width={VB_W} height={14} fill="#1c1420" />
      <rect x={0} y={76} width={VB_W} height={1.4} fill={shade('#1c1420', 0.2)} opacity={0.5} />
      <BookStacks />
      <g fill="#4a3a52" opacity={0.8}>
        <CastShadow x={128} y={77} rx={20} ry={1.6} opacity={0.3} />
        <rect x={110} y={56} width={36} height={6} />
        <rect x={110} y={56} width={36} height={1.2} fill={shade('#4a3a52', 0.2)} opacity={0.6} />
        <rect x={114} y={62} width={4} height={14} />
        <rect x={138} y={62} width={4} height={14} />
      </g>
      <circle cx={128} cy={46} r={4} fill="#ffdd7a" opacity={0.35} />
      <rect x={122} y={44} width={12} height={2} fill="#2a1f34" opacity={0.6} />
    </SceneFrame>
  );
}

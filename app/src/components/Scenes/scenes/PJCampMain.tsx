import { useMemo } from 'react';
import { SceneFrame } from '../SceneFrame';
import { Pines, Hills, Water, Celestial, Clouds, CastShadow, shade, VB_W } from '../primitives';

function CabinRow() {
  const cabins = useMemo(() => {
    const colors = ['#8b5a2b', '#a9632c', '#6f4a23', '#9c5b2e', '#7a4e26', '#8a5a2b'];
    const roofs = ['#1f4d6b', '#c1512b', '#1f4d6b', '#c1512b', '#1f4d6b', '#c1512b'];
    return Array.from({ length: 6 }, (_, i) => ({
      x: 14 + i * 24, w: 14 + (i % 2) * 3, h: 9 + (i % 3), wall: colors[i], roof: roofs[i], key: i,
    }));
  }, []);
  return (
    <g>
      {cabins.map((c) => (
        <g key={c.key}>
          <CastShadow x={c.x + c.w / 2} y={66.6} rx={c.w * 0.7} ry={1.4} opacity={0.22} />
          <rect x={c.x} y={66 - c.h} width={c.w} height={c.h} fill={c.wall} />
          <rect x={c.x} y={66 - c.h} width={c.w} height={1.6} fill={shade(c.wall, 0.15)} opacity={0.5} />
          <polygon points={`${c.x - 1.5},${66 - c.h} ${c.x + c.w / 2},${66 - c.h - 6} ${c.x + c.w + 1.5},${66 - c.h}`} fill={c.roof} />
          <polygon points={`${c.x + c.w / 2},${66 - c.h - 6} ${c.x + c.w + 1.5},${66 - c.h} ${c.x + c.w - 1},${66 - c.h}`} fill={shade(c.roof, -0.15)} opacity={0.6} />
          <rect x={c.x + c.w / 2 - 1.3} y={66 - 4.5} width={2.6} height={4.5} fill="#2a1a10" />
          <rect x={c.x + 1.5} y={66 - c.h + 1.5} width={2.2} height={2.2} fill="#ffe3a0" opacity={0.85} />
        </g>
      ))}
    </g>
  );
}

function StrawberryField() {
  const berries = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    x: (i * 37) % VB_W, y: 74 + ((i * 53) % 14), key: i,
  })), []);
  return (
    <g>
      <rect x={0} y={72} width={VB_W} height={18} fill="#4f7a2e" />
      {[0, 1, 2, 3, 4].map((row) => (
        <rect key={row} x={0} y={73 + row * 3.4} width={VB_W} height={0.6} fill="#3d6322" opacity={0.6} />
      ))}
      {berries.map((b) => <circle key={b.key} cx={b.x} cy={b.y} r={0.55} fill="#c62828" />)}
    </g>
  );
}

export function PJCampMain() {
  return (
    <SceneFrame skyId="pj-camp-sky" sky={{ top: '#5aa7c9', mid: '#a8d4b0', bottom: '#e9c98a' }}>
      <Celestial x={128} y={16} r={6} color="#fff3c4" glow="#ffe9a8" />
      <Clouds seed={5} opacity={0.5} />
      <Water y={30} colorTop="#aee4f2" colorBottom="#6fb8cf" id="pj-camp-sound" />
      <Hills baseY={46} amplitude={10} color="#355c3a" />
      <Pines xStart={0} xEnd={VB_W} baseY={46} count={16} height={13} color="#2c4a30" seed={7} />
      <Hills baseY={58} amplitude={6} color="#4f7a40" />
      <CabinRow />
      <StrawberryField />
    </SceneFrame>
  );
}

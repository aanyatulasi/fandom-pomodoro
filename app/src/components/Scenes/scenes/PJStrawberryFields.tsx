import { useMemo } from 'react';
import { SceneFrame } from '../SceneFrame';
import { Pines, Hills, Celestial, Clouds, VB_W, VB_H, shade } from '../primitives';

function FurrowedField() {
  const rows = 7;
  const berries = useMemo(() => Array.from({ length: 140 }, (_, i) => ({
    x: (i * 23) % VB_W, row: Math.floor(((i * 23) % VB_W) / 1) % rows, key: i,
  })), []);
  return (
    <g>
      <rect x={0} y={46} width={VB_W} height={VB_H - 46} fill="#5c7a2e" />
      {Array.from({ length: rows }).map((_, r) => {
        const y = 48 + r * ((VB_H - 48) / rows);
        const h = (VB_H - 48) / rows;
        return <rect key={r} x={0} y={y} width={VB_W} height={h - 1.1} fill={r % 2 === 0 ? '#547023' : '#618030'} />;
      })}
      {berries.map((b) => {
        const r = Math.floor((b.x / VB_W) * rows) % rows;
        const y = 48 + r * ((VB_H - 48) / rows) + ((VB_H - 48) / rows) * 0.5;
        return <circle key={b.key} cx={b.x} cy={y} r={0.65} fill="#c62828" />;
      })}
      {berries.slice(0, 60).map((b) => {
        const r = Math.floor((b.x / VB_W) * rows) % rows;
        const y = 48 + r * ((VB_H - 48) / rows) + ((VB_H - 48) / rows) * 0.3;
        return <circle key={`l${b.key}`} cx={b.x + 1.2} cy={y} r={0.5} fill="#4f7a40" />;
      })}
    </g>
  );
}

function Fence() {
  return (
    <g stroke="#8a6a44" strokeWidth={1}>
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1={6 + i * 17} y1={40} x2={6 + i * 17} y2={47} />
      ))}
      <line x1={0} y1={42.5} x2={VB_W} y2={42.5} />
    </g>
  );
}

export function PJStrawberryFields() {
  return (
    <SceneFrame skyId="pj-berry-sky" sky={{ top: '#6fb0d6', mid: '#aed4a8', bottom: shade('#e9c98a', 0.1) }}>
      <Celestial x={130} y={16} r={6} color="#fff3c4" glow="#ffe9a8" />
      <Clouds seed={21} opacity={0.5} />
      <Hills baseY={34} amplitude={8} color="#4a7a4a" />
      <Pines xStart={0} xEnd={VB_W} baseY={34} count={12} height={9} color="#2c4a30" seed={23} />
      <Fence />
      <FurrowedField />
    </SceneFrame>
  );
}

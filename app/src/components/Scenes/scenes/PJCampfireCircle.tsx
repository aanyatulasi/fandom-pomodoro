import { useMemo } from 'react';
import { SceneFrame } from '../SceneFrame';
import { Pines, Hills, Stars, Campfire, CastShadow, VB_W, VB_H } from '../primitives';

function LogSeats() {
  const cx = VB_W / 2;
  const logs = useMemo(() => [
    { x: cx - 24, y: 68, rot: -8 }, { x: cx + 24, y: 68, rot: 8 },
    { x: cx, y: 76, rot: 0 }, { x: cx - 10, y: 58, rot: -3 }, { x: cx + 10, y: 58, rot: 3 },
  ], [cx]);
  return (
    <g>
      {logs.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <CastShadow x={0} y={2} rx={9} ry={1.6} opacity={0.25} />
          <rect x={-9} y={-1.6} width={18} height={3.2} rx={1.6} fill="#5a3d24" />
          <ellipse cx={-8.2} cy={0} rx={1.6} ry={1.6} fill="#8a6038" />
        </g>
      ))}
    </g>
  );
}

export function PJCampfireCircle() {
  return (
    <SceneFrame skyId="pj-campfire-sky" sky={{ top: '#1c2740', mid: '#3a3250', bottom: '#5a3a2a' }}>
      <Stars count={35} seed={14} yMax={35} opacity={0.7} />
      <Hills baseY={46} amplitude={9} color="#1f2e1f" />
      <Pines xStart={0} xEnd={VB_W} baseY={46} count={14} height={12} color="#182818" seed={15} />
      {[26, 46, 100, 122].map((x, i) => (
        <rect key={x} x={x} y={38 - (i % 2)} width={6} height={5} fill="#3a2e22" opacity={0.7} />
      ))}
      {[29, 49, 103, 125].map((x) => <rect key={x} x={x} y={39} width={2} height={1.6} fill="#ffcf8a" opacity={0.6} />)}
      <LogSeats />
      <Campfire x={VB_W / 2} y={70} scale={1.6} />
      <rect x={0} y={VB_H - 6} width={VB_W} height={6} fill="#120f14" opacity={0.6} />
    </SceneFrame>
  );
}

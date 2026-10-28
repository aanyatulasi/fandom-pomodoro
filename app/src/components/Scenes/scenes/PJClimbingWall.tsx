import { SceneFrame } from '../SceneFrame';
import { Hills, Pines, LavaWall, CastShadow, VB_W } from '../primitives';

export function PJClimbingWall() {
  return (
    <SceneFrame skyId="pj-wall-sky" sky={{ top: '#3a2a2a', mid: '#6b4030', bottom: '#d9742f' }}>
      <Hills baseY={36} amplitude={7} color="#3a2e24" />
      <Pines xStart={0} xEnd={46} baseY={44} count={5} height={10} color="#241a14" seed={41} />
      <Pines xStart={118} xEnd={VB_W} baseY={44} count={5} height={10} color="#241a14" seed={42} />
      <LavaWall x={38} y={14} width={84} height={62} />
      <CastShadow x={80} y={90} rx={60} ry={4} opacity={0.3} />
      <rect x={0} y={82} width={VB_W} height={8} fill="#2a2420" />
      {[20, 45, 70, 95, 120, 140].map((x, i) => (
        <circle key={x} cx={x} cy={85 + (i % 2)} r={1.4} fill="#3a322c" />
      ))}
    </SceneFrame>
  );
}

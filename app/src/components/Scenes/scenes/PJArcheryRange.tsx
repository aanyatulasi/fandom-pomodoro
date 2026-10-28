import { SceneFrame } from '../SceneFrame';
import { Hills, Pines, Celestial, Clouds, ArcheryTarget, CastShadow, VB_W } from '../primitives';

export function PJArcheryRange() {
  return (
    <SceneFrame skyId="pj-archery-sky" sky={{ top: '#6fb0d6', mid: '#bfe0b0', bottom: '#dcefc0' }}>
      <Celestial x={40} y={14} r={6} color="#fff3c4" glow="#ffe9a8" />
      <Clouds seed={33} count={3} opacity={0.5} />
      <Hills baseY={30} amplitude={6} color="#4f7a40" />
      <Pines xStart={0} xEnd={VB_W} baseY={38} count={10} height={9} color="#355c3a" seed={35} />
      <rect x={0} y={46} width={VB_W} height={44} fill="#7fae52" />
      <rect x={0} y={46} width={VB_W} height={6} fill="#8fc062" opacity={0.6} />
      <ArcheryTarget x={40} y={56} scale={0.6} />
      <ArcheryTarget x={84} y={62} scale={0.8} />
      <ArcheryTarget x={128} y={70} scale={1.05} />
      <CastShadow x={128} y={80} rx={5} ry={1} opacity={0.2} />
      {[20, 60, 100, 140].map((x) => <rect key={x} x={x} y={84} width={1} height={6} fill="#6b8a40" />)}
    </SceneFrame>
  );
}

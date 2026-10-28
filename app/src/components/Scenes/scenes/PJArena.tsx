import { SceneFrame } from '../SceneFrame';
import { Hills, Pines, Celestial, SandGround, WeaponRack, Columns, VB_W } from '../primitives';

export function PJArena() {
  return (
    <SceneFrame skyId="pj-arena-sky" sky={{ top: '#d9a44a', mid: '#e9c173', bottom: '#f2dca0' }}>
      <Celestial x={120} y={16} r={7} color="#fff6d8" glow="#ffe39a" />
      <Hills baseY={28} amplitude={5} color="#9c7a3a" opacity={0.6} />
      <Pines xStart={0} xEnd={40} baseY={34} count={4} height={8} color="#5c6a2e" seed={44} />
      <Columns xStart={4} xEnd={38} y={30} height={14} count={3} color="#e8dcc0" />
      <Columns xStart={118} xEnd={VB_W - 4} y={30} height={14} count={3} color="#e8dcc0" />
      <SandGround y={44} color="#d9b67a" />
      <WeaponRack x={30} y={72} scale={1.1} />
      <WeaponRack x={130} y={72} scale={1.1} />
      <rect x={60} y={60} width={40} height={2} fill="#a5703a" opacity={0.5} />
    </SceneFrame>
  );
}

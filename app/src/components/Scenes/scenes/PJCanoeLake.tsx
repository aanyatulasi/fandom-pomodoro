import { SceneFrame } from '../SceneFrame';
import { Pines, Hills, Water, Dock, Canoe, Celestial, Clouds, VB_W } from '../primitives';

export function PJCanoeLake() {
  return (
    <SceneFrame skyId="pj-lake-sky" sky={{ top: '#6fb0d6', mid: '#a8d4b0', bottom: '#cfe8c6' }}>
      <Celestial x={120} y={14} r={6} color="#fff3c4" glow="#ffe9a8" />
      <Clouds seed={27} opacity={0.5} />
      <Hills baseY={34} amplitude={6} color="#4f7a40" />
      <Pines xStart={0} xEnd={46} baseY={46} count={6} height={13} color="#2c4a30" seed={31} />
      <Pines xStart={118} xEnd={VB_W} baseY={46} count={6} height={13} color="#2c4a30" seed={32} />
      <Water y={48} colorTop="#8fd0d8" colorBottom="#1f6b85" id="pj-canoe-water" />
      <Dock x={34} y={50} length={22} />
      <Canoe x={60} y={64} scale={1.3} color="#a05a2c" />
      <Canoe x={92} y={72} scale={1.1} color="#8a4a22" />
      <Canoe x={120} y={58} scale={0.9} color="#b06a34" />
    </SceneFrame>
  );
}

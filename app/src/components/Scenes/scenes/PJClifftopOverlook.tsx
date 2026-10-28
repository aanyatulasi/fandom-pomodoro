import { SceneFrame } from '../SceneFrame';
import { Celestial, Clouds, CliffEdge, Water } from '../primitives';

export function PJClifftopOverlook() {
  return (
    <SceneFrame skyId="pj-cliff-sky" sky={{ top: '#5a9fc4', mid: '#8fc2d6', bottom: '#dff0e0' }}>
      <Celestial x={40} y={16} r={7} color="#fff6d8" glow="#ffe9a8" />
      <Clouds seed={91} count={5} yMax={24} opacity={0.55} />
      <Water y={44} colorTop="#6fb8cf" colorBottom="#14506b" id="pj-cliff-water" />
      <CliffEdge baseY={58} color="#8a7a5c" />
      <CliffEdge baseY={62} color="#6a5c42" />
      {[30, 50, 70].map((x, i) => (
        <circle key={x} cx={x} cy={12 + i * 2} r={0.5} fill="#fff" opacity={0.7} />
      ))}
    </SceneFrame>
  );
}

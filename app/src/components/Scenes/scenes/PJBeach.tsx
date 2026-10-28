import { SceneFrame } from '../SceneFrame';
import { Celestial, Clouds, BeachShore } from '../primitives';

export function PJBeach() {
  return (
    <SceneFrame skyId="pj-beach-sky" sky={{ top: '#7fc2e0', mid: '#bfe6dc', bottom: '#f2e6c0' }}>
      <Celestial x={120} y={16} r={7} color="#fff6d8" glow="#ffe9a8" />
      <Clouds seed={81} count={5} opacity={0.5} />
      <BeachShore waterY={40} sandY={66} />
      {[20, 50, 90, 130].map((x, i) => (
        <circle key={x} cx={x} cy={70 + (i % 2) * 4} r={1.6 + (i % 3)} fill="#c9b78a" opacity={0.6} />
      ))}
      <path d="M 0 66 Q 40 63 80 66 T 160 66" stroke="#fff" strokeOpacity={0.6} strokeWidth={1} fill="none" />
    </SceneFrame>
  );
}

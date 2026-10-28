import { SceneFrame } from '../SceneFrame';
import { Stars, Celestial, Mist, VB_W } from '../primitives';

export function HPCastleExterior() {
  return (
    <SceneFrame skyId="hp-landing-sky" sky={{ top: '#0d1230', mid: '#28214a', bottom: '#4a3a5c' }}>
      <Stars count={70} seed={3} yMax={45} />
      <Celestial x={120} y={16} r={7} color="#eef0ff" glow="#aeb8ff" />
      <g fill="#120f1e">
        <rect x={30} y={30} width={16} height={46} />
        <polygon points="30,30 38,16 46,30" />
        <rect x={54} y={40} width={22} height={36} />
        <rect x={82} y={24} width={14} height={52} />
        <polygon points="82,24 89,10 96,24" />
        <rect x={100} y={42} width={30} height={34} />
        <rect x={134} y={34} width={16} height={42} />
        <polygon points="134,34 142,20 150,34" />
      </g>
      <g fill="#ffdd7a" opacity={0.75}>
        {[36, 60, 68, 88, 108, 118, 140].map((x, i) => (
          <rect key={x} x={x} y={46 + (i % 3) * 8} width={3} height={3} className="scene-flicker" style={{ animationDuration: `${1.5 + (i % 3)}s` }} />
        ))}
      </g>
      <Mist y={72} color="#8a93aa" opacity={0.3} />
      <rect x={0} y={78} width={VB_W} height={12} fill="#0a0812" />
    </SceneFrame>
  );
}

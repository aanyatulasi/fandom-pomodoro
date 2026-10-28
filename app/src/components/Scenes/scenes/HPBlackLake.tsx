import { SceneFrame } from '../SceneFrame';
import { Water, Mist, Stars, Celestial, VB_W } from '../primitives';

export function HPBlackLake() {
  return (
    <SceneFrame skyId="hp-lake-sky" sky={{ top: '#1a2238', mid: '#2e3a52', bottom: '#4a4a5c' }}>
      <Stars count={40} seed={17} yMax={30} opacity={0.6} />
      <Celestial x={120} y={14} r={5} color="#eef0ff" glow="#aeb8ff" />
      <g fill="#0f1420" opacity={0.9}>
        <rect x={50} y={28} width={10} height={24} />
        <polygon points="50,28 55,18 60,28" />
        <rect x={64} y={32} width={14} height={20} />
        <polygon points="64,32 71,20 78,32" />
        <rect x={82} y={30} width={8} height={22} />
        <polygon points="82,30 86,20 90,30" />
      </g>
      <Water y={50} colorTop="#232c42" colorBottom="#0f1420" id="hp-lake-water" />
      <Mist y={48} color="#8a93aa" opacity={0.3} />
      <rect x={0} y={80} width={VB_W} height={10} fill="#1a1a22" />
    </SceneFrame>
  );
}

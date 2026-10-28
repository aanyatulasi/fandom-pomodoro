import { SceneFrame } from '../SceneFrame';
import { Water, Mist, Stars, Celestial, shade, VB_W } from '../primitives';

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
        {[53, 68, 85].map((x) => <rect key={x} x={x} y={38} width={1.4} height={2} fill="#ffdd7a" opacity={0.6} />)}
      </g>
      <Water y={50} colorTop="#232c42" colorBottom="#0f1420" id="hp-lake-water" />
      {/* faint mirrored castle reflection in the water */}
      <g fill="#0f1420" opacity={0.35} transform="translate(0 100) scale(1 -1)">
        <rect x={50} y={28} width={10} height={16} />
        <rect x={64} y={32} width={14} height={12} />
        <rect x={82} y={30} width={8} height={14} />
      </g>
      <Mist y={48} color="#8a93aa" opacity={0.3} />
      <rect x={0} y={80} width={VB_W} height={10} fill="#1a1a22" />
      <rect x={0} y={80} width={VB_W} height={1.4} fill={shade('#1a1a22', 0.2)} opacity={0.5} />
      {[12, 30, 100, 130, 148].map((x, i) => <circle key={x} cx={x} cy={84 + (i % 2)} r={1} fill="#242430" />)}
    </SceneFrame>
  );
}

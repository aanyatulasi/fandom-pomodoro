import { SceneFrame } from '../SceneFrame';
import { Hills, Pines, Celestial, Clouds, Columns, CastShadow, VB_W } from '../primitives';

export function PJBigHouse() {
  const cx = VB_W / 2;
  return (
    <SceneFrame skyId="pj-bighouse-sky" sky={{ top: '#6fb0d6', mid: '#aed4a8', bottom: '#e9c98a' }}>
      <Celestial x={130} y={14} r={6} color="#fff3c4" glow="#ffe9a8" />
      <Clouds seed={51} opacity={0.5} />
      <Hills baseY={34} amplitude={7} color="#4f7a40" />
      <Pines xStart={0} xEnd={36} baseY={44} count={4} height={10} color="#2c4a30" seed={52} />
      <Pines xStart={124} xEnd={VB_W} baseY={44} count={4} height={10} color="#2c4a30" seed={53} />
      <CastShadow x={cx} y={82} rx={42} ry={4} opacity={0.25} />
      {/* main body */}
      <rect x={cx - 34} y={34} width={68} height={40} fill="#3a6ea5" />
      <rect x={cx - 34} y={34} width={68} height={8} fill="#4a7eb5" opacity={0.6} />
      <polygon points={`${cx - 38},34 ${cx},18 ${cx + 38},34`} fill="#2a3a4a" />
      {/* third-storey tower */}
      <rect x={cx - 8} y={14} width={16} height={22} fill="#3a6ea5" />
      <polygon points={`${cx - 10},14 ${cx},6 ${cx + 10},14`} fill="#2a3a4a" />
      {/* wraparound porch */}
      <rect x={cx - 38} y={66} width={76} height={8} fill="#e8e0cf" />
      <Columns xStart={cx - 36} xEnd={cx + 36} y={60} height={14} count={7} color="#f2ece0" capColor="#2a3a4a" />
      {/* windows */}
      {[-24, -8, 8, 24].map((dx) => (
        <rect key={dx} x={cx + dx - 3} y={42} width={6} height={8} fill="#ffe3a0" opacity={0.85} />
      ))}
      <rect x={cx - 4} y={20} width={8} height={8} fill="#ffe3a0" opacity={0.85} />
      <rect x={cx - 6} y={66} width={12} height={16} fill="#2a1a10" />
    </SceneFrame>
  );
}

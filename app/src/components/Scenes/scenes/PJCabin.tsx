import type { GodId } from '../../../types';
import { GODS } from '../../../data/gods';
import { SceneFrame } from '../SceneFrame';
import { Pines, Hills, Water, Mist, Celestial, Stars, VB_W } from '../primitives';
import { Glyph } from '../Glyph';
import { GOD_GLYPH } from '../../../data/glyphs';

function CabinBody({ roof, wall, door, glow }: { roof: string; wall: string; door: string; glow: string }) {
  const cx = VB_W / 2;
  return (
    <g>
      <rect x={cx - 30} y={42} width={60} height={26} fill={wall} />
      <polygon points={`${cx - 34},42 ${cx},22 ${cx + 34},42`} fill={roof} />
      <rect x={cx - 22} y={48} width={9} height={9} fill={glow} opacity={0.75} />
      <rect x={cx + 13} y={48} width={9} height={9} fill={glow} opacity={0.75} />
      <rect x={cx - 5} y={54} width={10} height={14} fill={door} />
      <rect x={cx - 32} y={66} width={64} height={3} fill={door} opacity={0.6} />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={cx - 30 + i * 9} y={66} width={1.4} height={10} fill={door} opacity={0.5} />
      ))}
    </g>
  );
}

function Extras({ god, accent }: { god: GodId; accent: string }) {
  const cx = VB_W / 2;
  switch (god) {
    case 'poseidon':
      return (
        <g>
          <Water y={74} colorTop="#2f8fa3" colorBottom="#0d4f6b" id="pj-cabin-water" />
          {[20, 40, 60, 80, 100, 120, 140].map((x) => <circle key={x} cx={x} cy={80 + (x % 7)} r={0.8} fill="#e8f7fa" opacity={0.6} />)}
        </g>
      );
    case 'athena':
      return (
        <g fill="#e9ddb3">
          {[cx - 44, cx - 38, cx + 38, cx + 44].map((x) => <rect key={x} x={x} y={44} width={3} height={24} />)}
          <path d={`M ${cx - 46} 68 Q ${cx} 72 ${cx + 46} 68`} stroke="#e9ddb3" strokeWidth={0.6} fill="none" />
        </g>
      );
    case 'apollo':
      return (
        <g stroke={accent} strokeWidth={0.6} opacity={0.55}>
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={128} y1={14} x2={128 + Math.cos(a) * 14} y2={14 + Math.sin(a) * 14} />;
          })}
        </g>
      );
    case 'ares':
      return (
        <g>
          <polygon points={`${cx - 20},22 ${cx - 20},34 ${cx - 12},28`} fill="#a52424" />
          <polygon points={`${cx + 20},22 ${cx + 20},34 ${cx + 12},28`} fill="#a52424" />
          <Glyph name="spear" x={cx - 16} y={78} size={9} color="#e05b5b" />
          <Glyph name="spear" x={cx + 16} y={78} size={9} color="#e05b5b" />
        </g>
      );
    case 'aphrodite':
      return (
        <g fill="#f6b8cf" opacity={0.5}>
          <ellipse cx={30} cy={16} rx={16} ry={4} />
          <ellipse cx={120} cy={10} rx={20} ry={5} />
          {[30, 60, 90, 120, 140].map((x) => <circle key={x} cx={x} cy={80} r={1.2} fill="#f6b8cf" opacity={0.8} />)}
        </g>
      );
    case 'hermes':
      return (
        <g>
          <line x1={cx - 50} y1={70} x2={cx - 50} y2={50} stroke="#8a5a2b" strokeWidth={1.4} />
          <polygon points={`${cx - 50},50 ${cx - 40},53 ${cx - 50},56`} fill={accent} />
          <polygon points={`${cx - 50},57 ${cx - 62},60 ${cx - 50},63`} fill={accent} opacity={0.8} />
        </g>
      );
    case 'hephaestus':
      return (
        <g>
          <rect x={cx + 24} y={28} width={5} height={16} fill="#5a3a24" />
          {[0, 1, 2].map((i) => <ellipse key={i} cx={cx + 26 + i} cy={24 - i * 4} rx={3 + i} ry={2} fill="#cbb8a3" opacity={0.5 - i * 0.12} />)}
          {[10, 30, 50].map((x) => <circle key={x} cx={cx - 10 + x / 3} cy={70} r={0.6} fill="#ff8c3d" className="scene-flicker" style={{ animationDuration: '1.4s' }} />)}
        </g>
      );
    case 'demeter':
      return (
        <g>
          <rect x={0} y={76} width={VB_W} height={14} fill="#5c7a2e" />
          {Array.from({ length: 24 }).map((_, i) => (
            <Glyph key={i} name="wheat" x={(i * VB_W) / 24 + 3} y={84} size={7} color="#c9d96b" />
          ))}
        </g>
      );
    case 'zeus':
      return (
        <g>
          <ellipse cx={40} cy={14} rx={18} ry={5} fill="#2a2e55" opacity={0.6} />
          <ellipse cx={110} cy={10} rx={22} ry={6} fill="#2a2e55" opacity={0.6} />
          <Glyph name="bolt" x={100} y={24} size={14} color="#8ec9ff" />
          {[cx - 34, cx + 34].map((x) => <rect key={x} x={x - 2} y={44} width={4} height={24} fill="#dfe8ff" />)}
        </g>
      );
    case 'hades':
      return (
        <g>
          <rect x={0} y={70} width={VB_W} height={20} fill="#15141c" />
          <Mist y={72} color="#5e3b8c" opacity={0.45} />
        </g>
      );
    case 'hecate':
      return (
        <g>
          <Glyph name="torches" x={cx - 36} y={74} size={14} color="#b98ee8" />
          <Glyph name="torches" x={cx + 36} y={74} size={14} color="#b98ee8" />
          <circle cx={132} cy={14} r={5} fill="#ead9ff" opacity={0.85} />
          <circle cx={135} cy={12} r={5} fill="#2a1b3d" />
        </g>
      );
    default:
      return null;
  }
}

export function PJCabin({ god }: { god: GodId }) {
  const info = GODS[god];
  const night = god === 'hades' || god === 'hecate' || god === 'zeus';
  return (
    <SceneFrame skyId={`pj-cabin-sky-${god}`} sky={{ top: info.palette.primary, mid: info.palette.secondary, bottom: info.palette.glow }}>
      {night && <Stars count={40} seed={god.length} />}
      <Celestial x={128} y={16} r={night ? 4 : 6} color={night ? '#e9e9ff' : '#fff3c4'} glow={info.palette.glow} />
      <Hills baseY={48} amplitude={8} color={info.palette.secondary} opacity={0.6} />
      <Pines xStart={0} xEnd={VB_W} baseY={48} count={10} height={10} color={info.palette.primary} seed={11} />
      <CabinBody roof={info.palette.secondary} wall={info.palette.primary} door="#2a1a10" glow={info.palette.accent} />
      <Glyph name={GOD_GLYPH[god]} x={VB_W / 2} y={18} size={11} color={info.palette.accent} />
      <Extras god={god} accent={info.palette.accent} />
    </SceneFrame>
  );
}

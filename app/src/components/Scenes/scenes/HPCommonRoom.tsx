import type { HouseId } from '../../../types';
import { HOUSES } from '../../../data/houses';
import { SceneFrame } from '../SceneFrame';
import { StoneWall, Arches, Stars, Mist, VB_W } from '../primitives';
import { Glyph } from '../Glyph';
import { HOUSE_GLYPH } from '../../../data/glyphs';

function Armchairs({ color }: { color: string }) {
  return (
    <g fill={color} opacity={0.85}>
      <rect x={28} y={66} width={16} height={12} rx={2} />
      <rect x={VB_W - 44} y={66} width={16} height={12} rx={2} />
    </g>
  );
}

function Interior({ house, accent }: { house: HouseId; accent: string }) {
  const cx = VB_W / 2;
  switch (house) {
    case 'gryffindor':
      return (
        <g>
          <rect x={cx - 14} y={48} width={28} height={28} fill="#2a1410" />
          <rect x={cx - 11} y={51} width={22} height={22} fill="#1a0d0a" />
          <ellipse cx={cx} cy={70} rx={9} ry={6} fill="#ff8a3d" className="scene-flicker" style={{ animationDuration: '1.1s' }} />
          <ellipse cx={cx} cy={68} rx={5} ry={8} fill={accent} opacity={0.85} />
          <Armchairs color="#9c1f1f" />
        </g>
      );
    case 'slytherin':
      return (
        <g>
          {[36, cx, VB_W - 36].map((x) => (
            <g key={x}>
              <circle cx={x} cy={38} r={10} fill="#0e2e22" stroke="#2a623d" strokeWidth={1} />
              <circle cx={x} cy={38} r={7} fill="#1a4d38" opacity={0.8} />
            </g>
          ))}
          <Mist y={60} color="#2a623d" opacity={0.35} />
          <Armchairs color="#1a472a" />
        </g>
      );
    case 'ravenclaw':
      return (
        <g>
          <Arches count={3} y={18} height={34} color={accent} />
          <Stars count={25} seed={4} yMax={30} />
          <Armchairs color="#222f5b" />
        </g>
      );
    case 'hufflepuff':
      return (
        <g>
          <path d={`M ${cx - 10} 70 Q ${cx - 10} 54 ${cx} 54 Q ${cx + 10} 54 ${cx + 10} 70 Z`} fill="#4a2f16" />
          <circle cx={cx - 20} cy={56} r={1.6} fill="#e3a93b" />
          <circle cx={cx + 20} cy={56} r={1.6} fill="#e3a93b" />
          {[20, 50, 110, 140].map((x) => <ellipse key={x} cx={x} cy={64} rx={3} ry={6} fill="#4f7a40" />)}
          <Armchairs color="#b8860b" />
        </g>
      );
    default:
      return null;
  }
}

export function HPCommonRoom({ house }: { house: HouseId }) {
  const info = HOUSES[house];
  return (
    <SceneFrame skyId={`hp-common-sky-${house}`} sky={{ top: info.palette.primary, mid: info.palette.secondary, bottom: '#1a1410' }}>
      <StoneWall y={10} height={70} color={info.palette.secondary} mortar={info.palette.primary} />
      <Interior house={house} accent={info.palette.accent} />
      <Glyph name={HOUSE_GLYPH[house]} x={VB_W / 2} y={16} size={10} color={info.palette.accent} />
      <rect x={0} y={78} width={VB_W} height={12} fill="#120f0c" opacity={0.6} />
    </SceneFrame>
  );
}

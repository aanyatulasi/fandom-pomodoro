import type { HouseId } from '../../../types';
import { HOUSES } from '../../../data/houses';
import { SceneFrame } from '../SceneFrame';
import { StoneWall, Arches, Stars, Mist, CastShadow, shade, VB_W } from '../primitives';
import { Glyph } from '../Glyph';
import { HOUSE_GLYPH } from '../../../data/glyphs';

function Armchairs({ color }: { color: string }) {
  return (
    <g>
      <CastShadow x={36} y={79.5} rx={11} ry={1.6} opacity={0.3} />
      <CastShadow x={VB_W - 36} y={79.5} rx={11} ry={1.6} opacity={0.3} />
      <g fill={color} opacity={0.9}>
        <rect x={28} y={66} width={16} height={12} rx={2} />
        <rect x={28} y={66} width={16} height={2.2} rx={1.1} fill={shade(color, 0.2)} opacity={0.6} />
        <rect x={VB_W - 44} y={66} width={16} height={12} rx={2} />
        <rect x={VB_W - 44} y={66} width={16} height={2.2} rx={1.1} fill={shade(color, 0.2)} opacity={0.6} />
      </g>
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
          <ellipse cx={cx} cy={74} rx={16} ry={3} fill="#ff8a3d" opacity={0.12} />
          {/* mantel */}
          <rect x={cx - 17} y={46} width={34} height={2.4} fill="#4a2a18" />
          <ellipse cx={cx} cy={80} rx={28} ry={5} fill="#740001" opacity={0.3} />
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
              <circle cx={x - 2} cy={35} r={2} fill="#2a8060" opacity={0.4} />
            </g>
          ))}
          <Mist y={60} color="#2a623d" opacity={0.35} />
          <ellipse cx={cx} cy={80} rx={28} ry={5} fill="#0e2e22" opacity={0.4} />
          <Armchairs color="#1a472a" />
        </g>
      );
    case 'ravenclaw':
      return (
        <g>
          <Arches count={3} y={18} height={34} color={accent} />
          <Stars count={25} seed={4} yMax={30} />
          <ellipse cx={cx} cy={80} rx={28} ry={5} fill="#0e1a40" opacity={0.3} />
          <Armchairs color="#222f5b" />
        </g>
      );
    case 'hufflepuff':
      return (
        <g>
          <path d={`M ${cx - 10} 70 Q ${cx - 10} 54 ${cx} 54 Q ${cx + 10} 54 ${cx + 10} 70 Z`} fill="#4a2f16" />
          <path d={`M ${cx - 10} 70 Q ${cx - 10} 54 ${cx} 54`} stroke={shade('#4a2f16', 0.2)} strokeWidth={0.6} fill="none" opacity={0.6} />
          <circle cx={cx - 20} cy={56} r={1.6} fill="#e3a93b" />
          <circle cx={cx + 20} cy={56} r={1.6} fill="#e3a93b" />
          <circle cx={cx - 20} cy={56} r={3.2} fill="#e3a93b" opacity={0.2} />
          <circle cx={cx + 20} cy={56} r={3.2} fill="#e3a93b" opacity={0.2} />
          {[20, 50, 110, 140].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={64} rx={3} ry={6} fill="#4f7a40" />
              <ellipse cx={x - 0.8} cy={62} rx={1.2} ry={2.4} fill={shade('#4f7a40', 0.2)} opacity={0.6} />
            </g>
          ))}
          <ellipse cx={cx} cy={80} rx={28} ry={5} fill="#ecb939" opacity={0.2} />
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
      <rect x={0} y={78} width={VB_W} height={1.4} fill={shade('#120f0c', 0.3)} opacity={0.4} />
    </SceneFrame>
  );
}

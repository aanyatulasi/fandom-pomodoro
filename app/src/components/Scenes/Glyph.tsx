
export type GlyphName =
  | 'trident' | 'owl' | 'lyre' | 'spear' | 'dove' | 'caduceus' | 'hammer'
  | 'wheat' | 'bolt' | 'helm' | 'torches' | 'lion' | 'serpent' | 'eagle' | 'badger';

interface GlyphProps {
  name: GlyphName;
  x: number;
  y: number;
  size?: number;
  color: string;
  opacity?: number;
  className?: string;
}

/** Small abstract line-art glyphs (not detailed illustrations) used as symbol
 * accents on cabins/common-rooms — original geometric shapes, not copied art. */
export function Glyph({ name, x, y, size = 10, color, opacity = 0.9, className }: GlyphProps) {
  const s = size / 10;
  const t = (px: number, py: number) => `${x + px * s} ${y + py * s}`;
  const common = { fill: 'none', stroke: color, strokeWidth: 0.6 * s, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, opacity };

  switch (name) {
    case 'trident':
      return (
        <g className={className}>
          <path d={`M ${t(0, -6)} L ${t(0, 5)}`} {...common} />
          <path d={`M ${t(-3, -6)} L ${t(-3, -2)} L ${t(0,-4.5)} L ${t(3,-2)} L ${t(3,-6)}`} {...common} />
        </g>
      );
    case 'owl':
      return (
        <g className={className}>
          <circle cx={x} cy={y} r={4 * s} {...common} />
          <circle cx={x - 1.6 * s} cy={y - 0.5 * s} r={1 * s} fill={color} opacity={opacity} />
          <circle cx={x + 1.6 * s} cy={y - 0.5 * s} r={1 * s} fill={color} opacity={opacity} />
          <path d={`M ${t(-4, -3)} L ${t(-2, -5)} M ${t(4, -3)} L ${t(2, -5)}`} {...common} />
        </g>
      );
    case 'lyre':
      return (
        <g className={className}>
          <path d={`M ${t(-3, 5)} Q ${t(-6, -3)} ${t(-2, -6)}`} {...common} />
          <path d={`M ${t(3, 5)} Q ${t(6, -3)} ${t(2, -6)}`} {...common} />
          <path d={`M ${t(-3, 5)} L ${t(3, 5)}`} {...common} />
          <path d={`M ${t(-2, 3)} L ${t(-2, -3)} M ${t(0, 4)} L ${t(0, -4.5)} M ${t(2, 3)} L ${t(2, -3)}`} {...common} strokeWidth={0.3 * s} />
        </g>
      );
    case 'spear':
      return (
        <g className={className}>
          <path d={`M ${t(0, -6)} L ${t(0, 6)}`} {...common} />
          <path d={`M ${t(-2, -3)} L ${t(0, -6)} L ${t(2, -3)} Z`} fill={color} opacity={opacity} />
        </g>
      );
    case 'dove':
      return (
        <g className={className}>
          <path d={`M ${t(-4, 1)} Q ${t(0, -5)} ${t(4, 1)} Q ${t(1, 1)} ${t(0, 4)} Q ${t(-1, 1)} ${t(-4, 1)} Z`} fill={color} opacity={opacity} />
        </g>
      );
    case 'caduceus':
      return (
        <g className={className}>
          <path d={`M ${t(0, -6)} L ${t(0, 6)}`} {...common} />
          <path d={`M ${t(0, -2)} Q ${t(3, -3)} ${t(0, -4)} Q ${t(-3, -5)} ${t(0, -6)}`} {...common} strokeWidth={0.4 * s} />
          <path d={`M ${t(-4, -5)} Q ${t(-2, -7)} ${t(0, -5.5)} M ${t(4, -5)} Q ${t(2, -7)} ${t(0, -5.5)}`} {...common} />
        </g>
      );
    case 'hammer':
      return (
        <g className={className}>
          <path d={`M ${t(0, -2)} L ${t(0, 6)}`} {...common} />
          <rect x={x - 4 * s} y={y - 6 * s} width={8 * s} height={4 * s} fill={color} opacity={opacity} rx={0.6 * s} />
        </g>
      );
    case 'wheat':
      return (
        <g className={className}>
          {[-3, 0, 3].map((dx) => (
            <path key={dx} d={`M ${t(dx, 6)} Q ${t(dx + 1, -1)} ${t(dx, -6)}`} {...common} strokeWidth={0.4 * s} />
          ))}
        </g>
      );
    case 'bolt':
      return <path d={`M ${t(1, -6)} L ${t(-2, 0)} L ${t(1, 0)} L ${t(-1, 6)} L ${t(3, -1)} L ${t(0, -1)} Z`} fill={color} opacity={opacity} className={className} />;
    case 'helm':
      return (
        <g className={className}>
          <path d={`M ${t(-4, 3)} Q ${t(-4, -5)} ${t(0, -5)} Q ${t(4, -5)} ${t(4, 3)} Z`} {...common} />
          <path d={`M ${t(-2, 1)} L ${t(-2, 3)} M ${t(2, 1)} L ${t(2, 3)}`} {...common} />
        </g>
      );
    case 'torches':
      return (
        <g className={className}>
          {[-2.5, 2.5].map((dx) => (
            <g key={dx}>
              <path d={`M ${t(dx, 6)} L ${t(dx, -1)}`} {...common} strokeWidth={0.35 * s} />
              <path d={`M ${t(dx, -1)} Q ${t(dx - 1.5, -3)} ${t(dx, -6)} Q ${t(dx + 1.5, -3)} ${t(dx, -1)}`} fill={color} opacity={opacity} />
            </g>
          ))}
        </g>
      );
    case 'lion':
      return (
        <g className={className}>
          <circle cx={x} cy={y} r={3 * s} fill={color} opacity={opacity} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path key={deg} d={`M ${t(0, 0)} L ${t(Math.cos((deg * Math.PI) / 180) * 5.5, Math.sin((deg * Math.PI) / 180) * 5.5)}`} {...common} strokeWidth={0.5 * s} />
          ))}
        </g>
      );
    case 'serpent':
      return <path d={`M ${t(-5, 4)} Q ${t(-2, -4)} ${t(1, 0)} Q ${t(4, 4)} ${t(5, -4)}`} {...common} strokeWidth={0.7 * s} className={className} />;
    case 'eagle':
      return (
        <g className={className}>
          <path d={`M ${t(0, 2)} L ${t(-6, -3)} L ${t(-1, 0)} Z`} fill={color} opacity={opacity} />
          <path d={`M ${t(0, 2)} L ${t(6, -3)} L ${t(1, 0)} Z`} fill={color} opacity={opacity} />
        </g>
      );
    case 'badger':
      return (
        <g className={className}>
          <ellipse cx={x} cy={y} rx={5 * s} ry={3.2 * s} fill={color} opacity={opacity} />
          <path d={`M ${t(-1, -3)} L ${t(-1, 3)}`} stroke="var(--scene-sky-bottom, #000)" strokeWidth={1 * s} opacity={0.5} />
        </g>
      );
    default:
      return null;
  }
}

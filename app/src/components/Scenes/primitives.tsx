import { useMemo } from 'react';

export const VB_W = 160;
export const VB_H = 90;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Stars({ count, seed = 1, yMax = 50, opacity = 0.9 }: { count: number; seed?: number; yMax?: number; opacity?: number }) {
  const stars = useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      x: rnd() * VB_W, y: rnd() * yMax, r: 0.25 + rnd() * 0.55, d: 2 + rnd() * 3, delay: rnd() * 4, key: i,
    }));
  }, [count, seed, yMax]);
  return (
    <g>
      {stars.map((s) => (
        <circle key={s.key} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={opacity}
          className="scene-twinkle" style={{ animationDuration: `${s.d}s`, animationDelay: `${s.delay}s` }} />
      ))}
    </g>
  );
}

export function Pines({ xStart, xEnd, baseY, count, height, color, seed = 2 }: {
  xStart: number; xEnd: number; baseY: number; count: number; height: number; color: string; seed?: number;
}) {
  const trees = useMemo(() => {
    const rnd = mulberry32(seed);
    const w = xEnd - xStart;
    return Array.from({ length: count }, (_, i) => {
      const x = xStart + (w * (i + 0.5)) / count + (rnd() - 0.5) * (w / count) * 0.6;
      const h = height * (0.75 + rnd() * 0.5);
      return { x, h, key: i };
    });
  }, [xStart, xEnd, count, height, seed]);
  return (
    <g fill={color}>
      {trees.map((tr) => (
        <g key={tr.key}>
          <polygon points={`${tr.x},${baseY - tr.h} ${tr.x - tr.h * 0.3},${baseY} ${tr.x + tr.h * 0.3},${baseY}`} />
          <polygon points={`${tr.x},${baseY - tr.h * 0.65} ${tr.x - tr.h * 0.22},${baseY - tr.h * 0.18} ${tr.x + tr.h * 0.22},${baseY - tr.h * 0.18}`} opacity={0.0} />
        </g>
      ))}
    </g>
  );
}

export function Hills({ baseY, amplitude, color, opacity = 1 }: { baseY: number; amplitude: number; color: string; opacity?: number }) {
  const d = `M 0 ${baseY} Q ${VB_W * 0.25} ${baseY - amplitude} ${VB_W * 0.5} ${baseY} T ${VB_W} ${baseY} V ${VB_H} H 0 Z`;
  return <path d={d} fill={color} opacity={opacity} />;
}

export function Water({ y, colorTop, colorBottom, id }: { y: number; colorTop: string; colorBottom: string; id: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorTop} />
          <stop offset="100%" stopColor={colorBottom} />
        </linearGradient>
      </defs>
      <rect x={0} y={y} width={VB_W} height={VB_H - y} fill={`url(#${id})`} />
      <g stroke={colorTop} strokeOpacity={0.4} fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M 0 ${y + 4 + i * 6} Q ${VB_W * 0.25} ${y + 1 + i * 6} ${VB_W * 0.5} ${y + 4 + i * 6} T ${VB_W} ${y + 4 + i * 6}`} />
        ))}
      </g>
    </g>
  );
}

export function StoneWall({ y, height, color, mortar }: { y: number; height: number; color: string; mortar: string }) {
  const rows = Math.max(2, Math.round(height / 6));
  const cols = 14;
  const blocks = [];
  for (let r = 0; r < rows; r += 1) {
    const offset = r % 2 === 0 ? 0 : (VB_W / cols) / 2;
    for (let c = -1; c < cols; c += 1) {
      blocks.push(
        <rect key={`${r}-${c}`} x={c * (VB_W / cols) + offset} y={y + r * (height / rows)}
          width={VB_W / cols - 0.8} height={height / rows - 0.8} fill={color} stroke={mortar} strokeWidth={0.3} />,
      );
    }
  }
  return <g>{blocks}</g>;
}

export function Candles({ count, yRange, seed = 5 }: { count: number; yRange: [number, number]; seed?: number }) {
  const candles = useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      x: 6 + rnd() * (VB_W - 12), y: yRange[0] + rnd() * (yRange[1] - yRange[0]), d: 2 + rnd() * 2.5, delay: rnd() * 3, key: i,
    }));
  }, [count, yRange, seed]);
  return (
    <g>
      {candles.map((c) => (
        <g key={c.key}>
          <rect x={c.x - 0.5} y={c.y} width={1} height={3} fill="#f3e3b8" opacity={0.9} />
          <circle cx={c.x} cy={c.y - 0.6} r={0.9} fill="#ffdd7a" className="scene-flicker"
            style={{ animationDuration: `${c.d}s`, animationDelay: `${c.delay}s` }} />
          <circle cx={c.x} cy={c.y - 0.6} r={2.4} fill="#ffdd7a" opacity={0.18} />
        </g>
      ))}
    </g>
  );
}

export function Bookshelves({ xStart, xEnd, y, height, color }: { xStart: number; xEnd: number; y: number; height: number; color: string }) {
  const count = 7;
  const w = (xEnd - xStart) / count;
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const x = xStart + i * w;
        const rnd = mulberry32(i + 10);
        const rows = 4;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w - 1} height={height} fill={color} opacity={0.9} />
            {Array.from({ length: rows }).map((__, r) => (
              <g key={r}>
                {Array.from({ length: 6 }).map((___, b) => (
                  <rect key={b} x={x + 0.8 + b * ((w - 2.6) / 6)} y={y + 1 + r * (height / rows)}
                    width={(w - 2.6) / 6 - 0.3} height={height / rows - 1.4}
                    fill={`hsl(${Math.floor(rnd() * 360)}, 35%, ${30 + rnd() * 20}%)`} />
                ))}
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
}

export function Arches({ count, y, height, color }: { count: number; y: number; height: number; color: string }) {
  const w = VB_W / count;
  return (
    <g fill="none" stroke={color} strokeWidth={0.8}>
      {Array.from({ length: count }).map((_, i) => {
        const x = i * w + w / 2;
        return <path key={i} d={`M ${x - w * 0.32} ${y + height} L ${x - w * 0.32} ${y + height * 0.4} Q ${x} ${y} ${x + w * 0.32} ${y + height * 0.4} L ${x + w * 0.32} ${y + height}`} />;
      })}
    </g>
  );
}

export function GreenhousePanes({ y, height, color }: { y: number; height: number; color: string }) {
  const cols = 10;
  return (
    <g fill="none" stroke={color} strokeWidth={0.4} opacity={0.6}>
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line key={`v${i}`} x1={(i * VB_W) / cols} y1={y} x2={(i * VB_W) / cols} y2={y + height} />
      ))}
      <line x1={0} y1={y + height / 2} x2={VB_W} y2={y + height / 2} />
    </g>
  );
}

export function Mist({ y, color, opacity = 0.5 }: { y: number; color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx={VB_W * (0.2 + i * 0.3)} cy={y + i * 1.5} rx={VB_W * 0.35} ry={3} fill={color} className="scene-drift" style={{ animationDelay: `${i * 2}s` }} />
      ))}
    </g>
  );
}

export function SkyDefs({ id, top, mid, bottom }: { id: string; top: string; mid: string; bottom: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={top} />
      <stop offset="55%" stopColor={mid} />
      <stop offset="100%" stopColor={bottom} />
    </linearGradient>
  );
}

export function Celestial({ x, y, r, color, glow }: { x: number; y: number; r: number; color: string; glow: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.4} fill={glow} opacity={0.25} />
      <circle cx={x} cy={y} r={r} fill={color} />
    </g>
  );
}

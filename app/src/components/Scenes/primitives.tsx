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

function hashId(...parts: (string | number)[]): string {
  const s = parts.join('|');
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return `g${(h >>> 0).toString(36)}`;
}

function clamp255(n: number) { return Math.max(0, Math.min(255, n)); }

/** Lighten/darken a #rrggbb color. `amt` in [-1, 1]; positive lightens. */
export function shade(hex: string, amt: number): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const [r, g, b] = [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
  const mix = (c: number) => clamp255(Math.round(amt >= 0 ? c + (255 - c) * amt : c + c * amt));
  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
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

export function Pines({ xStart, xEnd, baseY, count, height, color, seed = 2, shadow = true }: {
  xStart: number; xEnd: number; baseY: number; count: number; height: number; color: string; seed?: number; shadow?: boolean;
}) {
  const gradId = useMemo(() => hashId('pine', color, seed), [color, seed]);
  const trunkColor = useMemo(() => shade('#3a2a1a', 0), []);
  const dark = useMemo(() => shade(color, -0.25), [color]);
  const light = useMemo(() => shade(color, 0.22), [color]);
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
    <g>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={dark} />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor={light} />
        </linearGradient>
      </defs>
      {trees.map((tr) => (
        <g key={tr.key}>
          {shadow && <ellipse cx={tr.x} cy={baseY + 0.6} rx={tr.h * 0.3} ry={1.1} fill="#000" opacity={0.18} />}
          <rect x={tr.x - tr.h * 0.035} y={baseY - tr.h * 0.1} width={tr.h * 0.07} height={tr.h * 0.12} fill={trunkColor} />
          <polygon points={`${tr.x},${baseY - tr.h} ${tr.x - tr.h * 0.32},${baseY - tr.h * 0.05} ${tr.x + tr.h * 0.32},${baseY - tr.h * 0.05}`} fill={`url(#${gradId})`} />
          <polygon points={`${tr.x},${baseY - tr.h * 0.72} ${tr.x - tr.h * 0.24},${baseY + tr.h * 0.02} ${tr.x + tr.h * 0.24},${baseY + tr.h * 0.02}`} fill={`url(#${gradId})`} opacity={0.96} />
          <polygon points={`${tr.x},${baseY - tr.h * 0.44} ${tr.x - tr.h * 0.16},${baseY + tr.h * 0.06} ${tr.x + tr.h * 0.16},${baseY + tr.h * 0.06}`} fill={`url(#${gradId})`} />
        </g>
      ))}
    </g>
  );
}

export function Hills({ baseY, amplitude, color, opacity = 1, rim = true }: { baseY: number; amplitude: number; color: string; opacity?: number; rim?: boolean }) {
  const gradId = useMemo(() => hashId('hill', color, baseY, amplitude), [color, baseY, amplitude]);
  const light = useMemo(() => shade(color, 0.2), [color]);
  const d = `M 0 ${baseY} Q ${VB_W * 0.25} ${baseY - amplitude} ${VB_W * 0.5} ${baseY} T ${VB_W} ${baseY} V ${VB_H} H 0 Z`;
  return (
    <g>
      {rim && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={light} />
            <stop offset="28%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
      )}
      <path d={d} fill={rim ? `url(#${gradId})` : color} opacity={opacity} />
    </g>
  );
}

/** Soft rounded clouds drifting slowly — used on daytime skies. */
export function Clouds({ count = 4, yMax = 28, seed = 6, color = '#ffffff', opacity = 0.55 }: {
  count?: number; yMax?: number; seed?: number; color?: string; opacity?: number;
}) {
  const clouds = useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      x: rnd() * VB_W, y: 4 + rnd() * yMax, s: 6 + rnd() * 8, d: 40 + rnd() * 30, key: i,
    }));
  }, [count, yMax, seed]);
  return (
    <g fill={color} opacity={opacity}>
      {clouds.map((c) => (
        <g key={c.key} className="scene-drift" style={{ animationDuration: `${c.d}s` }}>
          <ellipse cx={c.x} cy={c.y} rx={c.s} ry={c.s * 0.38} />
          <ellipse cx={c.x - c.s * 0.5} cy={c.y + c.s * 0.1} rx={c.s * 0.6} ry={c.s * 0.3} />
          <ellipse cx={c.x + c.s * 0.55} cy={c.y + c.s * 0.08} rx={c.s * 0.65} ry={c.s * 0.32} />
        </g>
      ))}
    </g>
  );
}

/** A soft contact-shadow ellipse to ground an object in its scene. */
export function CastShadow({ x, y, rx, ry = rx * 0.3, opacity = 0.22 }: { x: number; y: number; rx: number; ry?: number; opacity?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#000" opacity={opacity} />;
}

/** Soft diagonal light shafts — used for forest / dappled-light scenes. */
export function SunRays({ x, y, count = 5, length = 60, spread = 26, color = '#ffe9a8', opacity = 0.14 }: {
  x: number; y: number; count?: number; length?: number; spread?: number; color?: string; opacity?: number;
}) {
  return (
    <g fill={color} opacity={opacity}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / (count - 1) - 0.5) * spread;
        const rad = (a * Math.PI) / 180;
        const dx = Math.sin(rad) * length;
        const dy = Math.cos(rad) * length;
        const w = 2.2;
        return (
          <polygon key={i}
            points={`${x - w},${y} ${x + w},${y} ${x + dx + w * 2.4},${y + dy} ${x + dx - w * 2.4},${y + dy}`}
          />
        );
      })}
    </g>
  );
}

/** Classical columns — Greek-camp architecture (Dining Pavilion, Big House porch, Athena cabin). */
export function Columns({ xStart, xEnd, y, height, count, color, capColor }: {
  xStart: number; xEnd: number; y: number; height: number; count: number; color: string; capColor?: string;
}) {
  const w = (xEnd - xStart) / count;
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const cx = xStart + i * w + w / 2;
        return (
          <g key={i}>
            <rect x={cx - 1.6} y={y} width={3.2} height={height} fill={color} />
            <rect x={cx - 2.2} y={y} width={4.4} height={1.4} fill={capColor ?? shade(color, 0.25)} />
            <rect x={cx - 2.2} y={y + height - 1.4} width={4.4} height={1.4} fill={capColor ?? shade(color, 0.25)} />
          </g>
        );
      })}
    </g>
  );
}

/** A low campfire with a warm glow and drifting embers. */
export function Campfire({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const embers = useMemo(() => {
    const rnd = mulberry32(Math.round(x * 13));
    return Array.from({ length: 10 }, (_, i) => ({
      dx: (rnd() - 0.5) * 10 * scale, delay: rnd() * 3, dur: 2.5 + rnd() * 2, key: i,
    }));
  }, [x, scale]);
  return (
    <g>
      <ellipse cx={x} cy={y + 1} rx={14 * scale} ry={6 * scale} fill="#ff8a3d" opacity={0.16} />
      <ellipse cx={x} cy={y + 1} rx={7 * scale} ry={3 * scale} fill="#ffb15e" opacity={0.28} />
      {[-4, -1.3, 1.3, 4].map((dx, i) => (
        <rect key={i} x={x + dx * scale - 3 * scale} y={y - 0.6 * scale} width={6 * scale} height={1.2 * scale}
          fill="#4a2f1a" transform={`rotate(${dx * 8} ${x + dx * scale} ${y})`} />
      ))}
      <path d={`M ${x} ${y} Q ${x - 2 * scale} ${y - 5 * scale} ${x} ${y - 9 * scale} Q ${x + 2.4 * scale} ${y - 5 * scale} ${x} ${y}`}
        fill="#ff8a3d" className="scene-flicker" style={{ animationDuration: '0.9s' }} />
      <path d={`M ${x} ${y - 1} Q ${x - 1 * scale} ${y - 4 * scale} ${x} ${y - 6.5 * scale} Q ${x + 1.4 * scale} ${y - 4 * scale} ${x} ${y - 1}`}
        fill="#ffe07a" className="scene-flicker" style={{ animationDuration: '1.3s', animationDelay: '0.2s' }} />
      {embers.map((e) => (
        <circle key={e.key} cx={x + e.dx} cy={y - 2} r={0.35 * scale} fill="#ffcf8a"
          className="scene-twinkle" style={{ animationDuration: `${e.dur}s`, animationDelay: `${e.delay}s` }} />
      ))}
    </g>
  );
}

/** A wooden dock running out over water. */
export function Dock({ x, y, length, color = '#6b4a2b' }: { x: number; y: number; length: number; color?: string }) {
  return (
    <g>
      <rect x={x - 2.2} y={y} width={4.4} height={length} fill={color} />
      {Array.from({ length: Math.ceil(length / 5) }).map((_, i) => (
        <g key={i}>
          <rect x={x - 2.4} y={y + i * 5} width={1} height={5} fill={shade(color, -0.3)} opacity={0.5} />
          <rect x={x - 3.2} y={y + i * 5 + 4.4} width={6.4} height={1.1} fill={shade(color, -0.15)} />
        </g>
      ))}
    </g>
  );
}

/** A small wooden canoe, optionally with a paddle. */
export function Canoe({ x, y, scale = 1, color = '#a05a2c' }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <CastShadow x={0} y={2.2} rx={8} ry={1.6} opacity={0.2} />
      <path d="M -8 0 Q 0 -2.6 8 0 Q 0 1.6 -8 0 Z" fill={color} />
      <path d="M -6.4 0 Q 0 -1.2 6.4 0" stroke={shade(color, -0.3)} strokeWidth={0.4} fill="none" />
    </g>
  );
}

/** A rocky climbing wall with slow lava flows (Camp Half-Blood's lava wall). */
export function LavaWall({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  const chunks = useMemo(() => {
    const rnd = mulberry32(99);
    return Array.from({ length: 24 }, (_, i) => ({
      cx: x + rnd() * width, cy: y + rnd() * height, r: 1 + rnd() * 2, key: i,
    }));
  }, [x, y, width, height]);
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#3a2f2a" />
      <rect x={x} y={y} width={width} height={height} fill="#4a3d35" opacity={0.5} />
      {chunks.map((c) => <circle key={c.key} cx={c.cx} cy={c.cy} r={c.r} fill="#2a2420" opacity={0.5} />)}
      {[0.18, 0.5, 0.78].map((f, i) => (
        <path key={i}
          d={`M ${x + width * f} ${y} Q ${x + width * f + 4} ${y + height * 0.4} ${x + width * f - 2} ${y + height * 0.7} T ${x + width * f} ${y + height}`}
          stroke="#ff6a2d" strokeWidth={1.6} fill="none" opacity={0.85} className="scene-flicker" style={{ animationDuration: `${2 + i}s` }} />
      ))}
      <rect x={x} y={y + height} width={width} height={2} fill="#ff6a2d" opacity={0.5} />
    </g>
  );
}

/** A practice target with concentric rings on a post. */
export function ArcheryTarget({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g>
      <rect x={x - 0.6} y={y} width={1.2} height={10 * scale} fill="#6b4a2b" />
      <circle cx={x} cy={y} r={6 * scale} fill="#e8e0cf" />
      <circle cx={x} cy={y} r={4.6 * scale} fill="#4a6fa5" />
      <circle cx={x} cy={y} r={3.1 * scale} fill="#c62828" />
      <circle cx={x} cy={y} r={1.6 * scale} fill="#f2c14e" />
    </g>
  );
}

/** A weapon rack — crossed spears/swords on a wooden frame. */
export function WeaponRack({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-6} y={0} width={12} height={1.4} fill="#4a3220" />
      <rect x={-5} y={-8} width={1.2} height={8} fill="#4a3220" />
      <rect x={4} y={-8} width={1.2} height={8} fill="#4a3220" />
      {[-3, -1, 1, 3].map((dx, i) => (
        <line key={i} x1={dx} y1={-0.5} x2={dx + (i % 2 === 0 ? 2.4 : -2.4)} y2={-9} stroke="#b7becb" strokeWidth={0.5} />
      ))}
    </g>
  );
}

/** Sandy practice-arena ground with a packed-earth texture. */
export function SandGround({ y, color = '#d9b67a' }: { y: number; color?: string }) {
  const marks = useMemo(() => {
    const rnd = mulberry32(55);
    return Array.from({ length: 14 }, (_, i) => ({ x: rnd() * VB_W, y: y + rnd() * (VB_H - y), w: 3 + rnd() * 6, key: i }));
  }, [y]);
  return (
    <g>
      <rect x={0} y={y} width={VB_W} height={VB_H - y} fill={color} />
      {marks.map((m) => <ellipse key={m.key} cx={m.x} cy={m.y} rx={m.w} ry={0.8} fill={shade(color, -0.15)} opacity={0.4} />)}
    </g>
  );
}

/** A generic gable-roofed building shell — porch posts, windows, door. */
export function GableBuilding({ x, y, width, height, roofColor, wallColor, storiesY = [] }: {
  x: number; y: number; width: number; height: number; roofColor: string; wallColor: string; storiesY?: number[];
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={wallColor} />
      <polygon points={`${x - 3},${y} ${x + width / 2},${y - height * 0.32} ${x + width + 3},${y}`} fill={roofColor} />
      {storiesY.map((sy, i) => (
        <rect key={i} x={x} y={y + sy} width={width} height={0.6} fill={shade(wallColor, -0.25)} opacity={0.5} />
      ))}
      <rect x={x + width * 0.08} y={y + height * 0.18} width={width * 0.18} height={height * 0.18} fill="#ffe3a0" opacity={0.85} />
      <rect x={x + width * 0.74} y={y + height * 0.18} width={width * 0.18} height={height * 0.18} fill="#ffe3a0" opacity={0.85} />
      <rect x={x + width * 0.4} y={y + height * 0.55} width={width * 0.2} height={height * 0.45} fill={shade(wallColor, -0.35)} />
    </g>
  );
}

/** A dramatic cliff edge dropping to the right. */
export function CliffEdge({ baseY, color }: { baseY: number; color: string }) {
  const d = `M 0 ${baseY - 6} L ${VB_W * 0.42} ${baseY - 4} L ${VB_W * 0.5} ${baseY + 4} L ${VB_W * 0.56} ${baseY + 2} ` +
    `L ${VB_W * 0.62} ${baseY + 10} L ${VB_W * 0.7} ${baseY + 6} L ${VB_W} ${baseY + 16} V ${VB_H} H 0 Z`;
  return <path d={d} fill={color} />;
}

/** A sandy shoreline with gentle rolling wave bands. */
export function BeachShore({ waterY, sandY, sandColor = '#e8d6a0', waterTop = '#6fb8cf', waterBottom = '#1f6b85' }: {
  waterY: number; sandY: number; sandColor?: string; waterTop?: string; waterBottom?: string;
}) {
  return (
    <g>
      <Water y={waterY} colorTop={waterTop} colorBottom={waterBottom} id={hashId('beach-water', waterY)} />
      <path d={`M 0 ${sandY} Q ${VB_W * 0.5} ${sandY - 5} ${VB_W} ${sandY} V ${VB_H} H 0 Z`} fill={sandColor} />
      <path d={`M 0 ${sandY} Q ${VB_W * 0.5} ${sandY - 5} ${VB_W} ${sandY}`} stroke="#fff" strokeOpacity={0.5} strokeWidth={0.8} fill="none" />
    </g>
  );
}

/** Layered rounded canopy blobs — a dense forest mass rather than individual pines. */
export function DenseCanopy({ baseY, height, color, seed = 8 }: { baseY: number; height: number; color: string; seed?: number }) {
  const blobs = useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: 16 }, (_, i) => ({
      x: (VB_W * (i + 0.5)) / 16 + (rnd() - 0.5) * 8, r: height * (0.35 + rnd() * 0.3), key: i,
    }));
  }, [height, seed]);
  const dark = shade(color, -0.2);
  const light = shade(color, 0.15);
  return (
    <g>
      {blobs.map((b, i) => (
        <circle key={b.key} cx={b.x} cy={baseY - height * 0.4} r={b.r} fill={i % 3 === 0 ? light : i % 3 === 1 ? color : dark} />
      ))}
      <rect x={0} y={baseY} width={VB_W} height={VB_H - baseY} fill={dark} />
    </g>
  );
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

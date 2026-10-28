import { useMemo } from 'react';
import { SceneFrame } from '../SceneFrame';
import { DenseCanopy, SunRays, Pines, VB_W } from '../primitives';

function Fireflies() {
  const flies = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    x: 10 + ((i * 37) % (VB_W - 20)), y: 50 + ((i * 23) % 30), d: 2 + (i % 3), delay: (i % 5) * 0.6, key: i,
  })), []);
  return (
    <g>
      {flies.map((f) => (
        <circle key={f.key} cx={f.x} cy={f.y} r={0.4} fill="#d9ff8a"
          className="scene-twinkle" style={{ animationDuration: `${f.d}s`, animationDelay: `${f.delay}s` }} />
      ))}
    </g>
  );
}

export function PJForest() {
  return (
    <SceneFrame skyId="pj-forest-sky" sky={{ top: '#1f3a28', mid: '#2e5c38', bottom: '#4a7a42' }}>
      <DenseCanopy baseY={40} height={30} color="#2c4a2e" seed={71} />
      <SunRays x={60} y={6} count={5} length={70} spread={30} opacity={0.16} />
      <SunRays x={120} y={2} count={4} length={60} spread={24} opacity={0.12} />
      <Pines xStart={0} xEnd={VB_W} baseY={60} count={9} height={16} color="#1f3a24" seed={73} />
      <Pines xStart={-10} xEnd={VB_W + 10} baseY={78} count={7} height={20} color="#14261a" seed={74} />
      <Fireflies />
      <rect x={0} y={84} width={VB_W} height={6} fill="#0f1c10" />
    </SceneFrame>
  );
}

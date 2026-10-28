import { SceneFrame } from '../SceneFrame';
import { Hills, Pines, Celestial, Clouds, Columns, VB_W } from '../primitives';

function Tables() {
  return (
    <g>
      {[30, 70, 110].map((x) => (
        <g key={x}>
          <rect x={x} y={64} width={20} height={3} fill="#8a5a2b" />
          <rect x={x + 1} y={67} width={1.4} height={8} fill="#5a3a1a" />
          <rect x={x + 17} y={67} width={1.4} height={8} fill="#5a3a1a" />
        </g>
      ))}
    </g>
  );
}

export function PJDiningPavilion() {
  return (
    <SceneFrame skyId="pj-pavilion-sky" sky={{ top: '#6fb0d6', mid: '#aed4a8', bottom: '#e9c98a' }}>
      <Celestial x={128} y={16} r={6} color="#fff3c4" glow="#ffe9a8" />
      <Clouds seed={47} opacity={0.5} />
      <Hills baseY={38} amplitude={8} color="#4f7a40" />
      <Pines xStart={0} xEnd={VB_W} baseY={40} count={10} height={9} color="#2c4a30" seed={48} />
      <Columns xStart={10} xEnd={VB_W - 10} y={34} height={30} count={8} color="#e8dcc0" />
      <polygon points={`6,34 ${VB_W / 2},18 ${VB_W - 6},34`} fill="#1f4d6b" />
      <polygon points={`6,34 ${VB_W / 2},18 ${VB_W / 2},21 9,36`} fill="#2d6587" opacity={0.6} />
      <rect x={10} y={64} width={VB_W - 20} height={3} fill="#c9bb9a" opacity={0.6} />
      <Tables />
    </SceneFrame>
  );
}

import type { ReactNode } from 'react';
import { VB_W, VB_H, SkyDefs } from './primitives';

interface SceneFrameProps {
  skyId: string;
  sky: { top: string; mid: string; bottom: string };
  children: ReactNode;
}

export function SceneFrame({ skyId, sky, children }: SceneFrameProps) {
  return (
    <svg className="scene-svg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <SkyDefs id={skyId} {...sky} />
      </defs>
      <rect x={0} y={0} width={VB_W} height={VB_H} fill={`url(#${skyId})`} />
      {children}
    </svg>
  );
}

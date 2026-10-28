import type { ReactNode } from 'react';
import { VB_W, VB_H } from './primitives';

export interface PhotoSceneSpec {
  /** Path under /public, e.g. "/images/pj/forest.jpg" */
  src: string;
  /** CSS object-position, e.g. "50% 35%" — lets us frame the photo without cropping the subject. */
  objectPosition?: string;
  credit?: { photographer: string; url: string };
}

/**
 * A real photograph as the scene background, with an optional thin layer of the
 * existing decorative SVG primitives (stars, candles, a god's glyph, embers…) on
 * top for the magical touches a plain photo can't give. The overlay uses the same
 * 160x90 viewBox as the illustrated scenes, so existing primitives drop in as-is.
 */
export function PhotoScene({ src, objectPosition = '50% 50%', overlay }: {
  src: string; objectPosition?: string; overlay?: ReactNode;
}) {
  return (
    <div className="photo-scene">
      <img
        className="photo-scene-img"
        src={src}
        alt=""
        loading="lazy"
        style={{ objectPosition }}
      />
      {overlay && (
        <svg className="photo-scene-overlay-svg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          {overlay}
        </svg>
      )}
    </div>
  );
}

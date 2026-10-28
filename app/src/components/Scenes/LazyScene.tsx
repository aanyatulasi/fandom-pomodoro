import { useEffect, useRef, useState } from 'react';
import { SceneForId } from './SceneRegistry';

/**
 * Mounts a scene's SVG only once it's near the viewport, so a long grid of
 * location cards doesn't render every detailed background simultaneously.
 * Until then it shows a flat placeholder wash in the location's own palette.
 */
export function LazyScene({ sceneId, placeholderColor }: { sceneId: string; placeholderColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || !ref.current) return undefined;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true);
      },
      { rootMargin: '250px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', background: placeholderColor ?? '#14141c' }}>
      {visible && <SceneForId sceneId={sceneId} />}
    </div>
  );
}

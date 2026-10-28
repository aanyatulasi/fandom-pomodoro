import { useEffect, useRef } from 'react';
import type { AmbientId } from '../types';
import { AmbientEngine } from '../utils/ambientEngine';

/** Procedurally generated ambience — no audio files, nothing to fetch or license.
 * Never autoplays: it only starts once `enabled` is true (always off by default,
 * and audio APIs require a user gesture anyway). */
export function useAmbientSound(ambientId: AmbientId | null, enabled: boolean, volume: number) {
  const engineRef = useRef<AmbientEngine | null>(null);

  useEffect(() => {
    if (!engineRef.current) engineRef.current = new AmbientEngine();
    const engine = engineRef.current;
    if (enabled && ambientId) {
      if (engine.playingId !== ambientId) engine.start(ambientId, volume);
    } else {
      engine.stop();
    }
    return undefined;
  }, [ambientId, enabled, volume]);

  useEffect(() => {
    engineRef.current?.setVolume(volume);
  }, [volume]);

  useEffect(() => () => engineRef.current?.stop(), []);
}

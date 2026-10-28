import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppState } from '../state/AppStateContext';
import { remainingMs } from '../state/timerLogic';

export interface TimerEngine {
  remaining: number;
  progress: number; // 0..1, fraction of the phase elapsed
  isRunning: boolean;
}

/**
 * Drives the countdown display and detects phase completion. Remaining time is
 * always derived from `phaseEndAt` vs. the current clock (never a decremented
 * counter), so it self-corrects after the tab was backgrounded or throttled.
 */
export function useTimerEngine(onPhaseComplete: () => void): TimerEngine {
  const { state } = useAppState();
  const { timer } = state;
  const [, forceTick] = useState(0);
  const completingRef = useRef(false);

  const check = useCallback(() => {
    forceTick((n) => n + 1);
    if (timer.isRunning && remainingMs(timer) <= 0 && !completingRef.current) {
      completingRef.current = true;
      onPhaseComplete();
      // Reset guard shortly after; the reducer will have produced a fresh phase by then.
      setTimeout(() => { completingRef.current = false; }, 50);
    }
  }, [timer, onPhaseComplete]);

  useEffect(() => {
    if (!timer.isRunning) return undefined;
    const id = window.setInterval(check, 250);
    return () => window.clearInterval(id);
  }, [timer.isRunning, check]);

  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') check(); };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, [check]);

  const remaining = remainingMs(timer);
  const elapsed = timer.phaseDurationMs - remaining;
  const progress = timer.phaseDurationMs > 0 ? Math.min(1, Math.max(0, elapsed / timer.phaseDurationMs)) : 0;

  return { remaining, progress, isRunning: timer.isRunning };
}

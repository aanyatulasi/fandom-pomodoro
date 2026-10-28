import { useEffect, useRef } from 'react';
import type { TimerPhase } from '../types';
import { formatClock } from '../utils/time';

const PHASE_LABEL: Record<TimerPhase, string> = {
  idle: 'Ready', focus: 'Focus', short_break: 'Short Break', long_break: 'Long Break',
};

export function useTabTitle(phase: TimerPhase, remaining: number, isRunning: boolean) {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    if (!isRunning) {
      document.title = originalTitle.current;
      return;
    }
    document.title = `${formatClock(remaining)} · ${PHASE_LABEL[phase]}`;
  }, [phase, remaining, isRunning]);

  useEffect(() => () => { document.title = originalTitle.current; }, []);
}

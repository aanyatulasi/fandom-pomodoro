import type { SettingsState, TimerPhase, TimerState } from '../types';

export function phaseDuration(phase: TimerPhase, settings: SettingsState): number {
  switch (phase) {
    case 'focus': return settings.focusMinutes * 60_000;
    case 'short_break': return settings.shortBreakMinutes * 60_000;
    case 'long_break': return settings.longBreakMinutes * 60_000;
    default: return settings.focusMinutes * 60_000;
  }
}

export function initialTimerState(settings: SettingsState): TimerState {
  return {
    phase: 'idle',
    isRunning: false,
    phaseEndAt: null,
    remainingMsAtPause: phaseDuration('focus', settings),
    phaseDurationMs: phaseDuration('focus', settings),
    completedFocusSessions: 0,
    cyclePosition: 0,
    activeTaskId: null,
    lastCompletedPhase: null,
    lastTickAt: Date.now(),
    completionEventId: 0,
  };
}

export function remainingMs(state: TimerState, now: number = Date.now()): number {
  if (state.isRunning && state.phaseEndAt != null) {
    return Math.max(0, state.phaseEndAt - now);
  }
  return state.remainingMsAtPause ?? state.phaseDurationMs;
}

/** Begin the very first focus phase, or resume a paused phase. */
export function startOrResume(state: TimerState, settings: SettingsState, now: number = Date.now()): TimerState {
  if (state.phase === 'idle') {
    const duration = phaseDuration('focus', settings);
    return {
      ...state,
      phase: 'focus',
      isRunning: true,
      phaseDurationMs: duration,
      phaseEndAt: now + duration,
      remainingMsAtPause: null,
    };
  }
  if (state.isRunning) return state;
  const remaining = state.remainingMsAtPause ?? state.phaseDurationMs;
  return { ...state, isRunning: true, phaseEndAt: now + remaining, remainingMsAtPause: null };
}

export function pause(state: TimerState, now: number = Date.now()): TimerState {
  if (!state.isRunning) return state;
  return {
    ...state,
    isRunning: false,
    remainingMsAtPause: remainingMs(state, now),
    phaseEndAt: null,
  };
}

/** Reset the current phase back to its full duration, stopped. */
export function resetCurrentPhase(state: TimerState, settings: SettingsState): TimerState {
  const phase = state.phase === 'idle' ? 'focus' : state.phase;
  const duration = phaseDuration(phase, settings);
  return {
    ...state,
    phase,
    isRunning: false,
    phaseEndAt: null,
    remainingMsAtPause: duration,
    phaseDurationMs: duration,
  };
}

interface AdvanceResult {
  next: TimerState;
  completedPhase: TimerPhase;
  creditedFocusSession: boolean;
}

/**
 * Shared transition used by both natural completion and "skip". `creditFocus`
 * is false for a skip, so a skipped focus phase advances the schedule (so the
 * long-break cadence stays correct) without being counted as a finished
 * Pomodoro in stats — only a phase that actually ran out counts.
 */
export function advancePhase(state: TimerState, settings: SettingsState, creditFocus: boolean, now: number = Date.now()): AdvanceResult {
  const completedPhase = state.phase === 'idle' ? 'focus' : state.phase;
  let nextPhase: TimerPhase;
  let cyclePosition = state.cyclePosition;
  let completedFocusSessions = state.completedFocusSessions;

  if (completedPhase === 'focus') {
    cyclePosition = (state.cyclePosition + 1) % Math.max(1, settings.sessionsBeforeLongBreak);
    nextPhase = cyclePosition === 0 ? 'long_break' : 'short_break';
    if (creditFocus) completedFocusSessions += 1;
  } else {
    nextPhase = 'focus';
  }

  const duration = phaseDuration(nextPhase, settings);
  const autoStart = nextPhase === 'focus' ? settings.autoStartNextFocus : settings.autoStartBreaks;

  const next: TimerState = {
    ...state,
    phase: nextPhase,
    cyclePosition,
    completedFocusSessions,
    phaseDurationMs: duration,
    isRunning: autoStart,
    phaseEndAt: autoStart ? now + duration : null,
    remainingMsAtPause: autoStart ? null : duration,
    lastCompletedPhase: completedPhase,
    lastTickAt: now,
  };

  return { next, completedPhase, creditedFocusSession: completedPhase === 'focus' && creditFocus };
}

import type { StatsState } from '../types';
import { dateKey, daysBetween } from './date';

export function emptyStats(): StatsState {
  return { daily: {}, currentStreak: 0, longestStreak: 0, lastActiveDate: null };
}

export function recordFocusSession(stats: StatsState, minutes: number, now: Date = new Date()): StatsState {
  const today = dateKey(now);
  const prev = stats.daily[today] ?? { date: today, focusSessions: 0, focusMinutes: 0 };
  const daily = {
    ...stats.daily,
    [today]: { ...prev, focusSessions: prev.focusSessions + 1, focusMinutes: prev.focusMinutes + minutes },
  };

  let currentStreak = stats.currentStreak;
  if (stats.lastActiveDate === today) {
    // already counted today
  } else if (stats.lastActiveDate && daysBetween(stats.lastActiveDate, today) === 1) {
    currentStreak += 1;
  } else {
    currentStreak = 1;
  }

  return {
    daily,
    currentStreak,
    longestStreak: Math.max(stats.longestStreak, currentStreak),
    lastActiveDate: today,
  };
}

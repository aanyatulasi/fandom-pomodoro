import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import type {
  AmbientState, AppState, GodId, HouseId, HPLocationId, PJLocationId, SettingsState, Task, Universe,
} from '../types';
import { loadState, saveState } from './storage';
import { advancePhase, initialTimerState, pause, resetCurrentPhase, startOrResume } from './timerLogic';
import { emptyStats, recordFocusSession } from '../utils/stats';

export const DEFAULT_SETTINGS: SettingsState = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: true,
  autoStartNextFocus: false,
  soundEnabled: true,
  desktopNotificationsEnabled: false,
  dailyGoalSessions: 8,
  reducedMotionOverride: null,
};

const DEFAULT_AMBIENT: AmbientState = { enabled: false, volume: 0.4 };

function defaultState(): AppState {
  return {
    universe: null,
    godResult: null,
    houseResult: null,
    pjLocationId: null,
    hpLocationId: null,
    distractionFree: false,
    timer: initialTimerState(DEFAULT_SETTINGS),
    tasks: [],
    stats: emptyStats(),
    settings: DEFAULT_SETTINGS,
    ambient: DEFAULT_AMBIENT,
  };
}

export type Notice = { kind: 'focus_complete' | 'break_complete'; at: number };

type Action =
  | { type: 'SET_UNIVERSE'; universe: Universe }
  | { type: 'SET_GOD_RESULT'; god: GodId }
  | { type: 'SET_HOUSE_RESULT'; house: HouseId }
  | { type: 'SET_PJ_LOCATION'; locationId: PJLocationId }
  | { type: 'SET_HP_LOCATION'; locationId: HPLocationId }
  | { type: 'TOGGLE_DISTRACTION_FREE' }
  | { type: 'TIMER_TOGGLE_RUN' }
  | { type: 'TIMER_RESET' }
  | { type: 'TIMER_SKIP' }
  | { type: 'TIMER_PHASE_COMPLETE' }
  | { type: 'TIMER_SET_ACTIVE_TASK'; taskId: string | null }
  | { type: 'TASK_ADD'; title: string }
  | { type: 'TASK_EDIT'; id: string; title: string }
  | { type: 'TASK_TOGGLE'; id: string }
  | { type: 'TASK_DELETE'; id: string }
  | { type: 'STATS_RESET' }
  | { type: 'SETTINGS_UPDATE'; patch: Partial<SettingsState> }
  | { type: 'AMBIENT_UPDATE'; patch: Partial<AmbientState> };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_UNIVERSE': {
      const patch: Partial<AppState> = { universe: action.universe };
      if (action.universe === 'percy-jackson' && !state.pjLocationId) patch.pjLocationId = 'camp-main';
      if (action.universe === 'harry-potter' && !state.hpLocationId) patch.hpLocationId = 'great-hall';
      return { ...state, ...patch };
    }
    case 'SET_GOD_RESULT':
      return { ...state, godResult: action.god };
    case 'SET_HOUSE_RESULT':
      return { ...state, houseResult: action.house };
    case 'SET_PJ_LOCATION':
      return { ...state, pjLocationId: action.locationId };
    case 'SET_HP_LOCATION':
      return { ...state, hpLocationId: action.locationId };
    case 'TOGGLE_DISTRACTION_FREE':
      return { ...state, distractionFree: !state.distractionFree };

    case 'TIMER_TOGGLE_RUN': {
      const timer = state.timer.isRunning ? pause(state.timer) : startOrResume(state.timer, state.settings);
      return { ...state, timer };
    }
    case 'TIMER_RESET':
      return { ...state, timer: resetCurrentPhase(state.timer, state.settings) };
    case 'TIMER_SKIP': {
      const { next } = advancePhase(state.timer, state.settings, false);
      return { ...state, timer: next };
    }
    case 'TIMER_PHASE_COMPLETE': {
      const { next, completedPhase, creditedFocusSession } = advancePhase(state.timer, state.settings, true);
      let stats = state.stats;
      let tasks = state.tasks;
      if (creditedFocusSession) {
        stats = recordFocusSession(state.stats, state.settings.focusMinutes);
        if (state.timer.activeTaskId) {
          tasks = state.tasks.map((t) => (t.id === state.timer.activeTaskId
            ? { ...t, focusSessionsSpent: t.focusSessionsSpent + 1 }
            : t));
        }
      }
      void completedPhase;
      return {
        ...state,
        timer: { ...next, completionEventId: state.timer.completionEventId + 1 },
        stats,
        tasks,
      };
    }
    case 'TIMER_SET_ACTIVE_TASK':
      return { ...state, timer: { ...state.timer, activeTaskId: action.taskId } };

    case 'TASK_ADD': {
      const task: Task = {
        id: crypto.randomUUID(), title: action.title.trim(), completed: false,
        createdAt: Date.now(), focusSessionsSpent: 0,
      };
      if (!task.title) return state;
      return { ...state, tasks: [...state.tasks, task] };
    }
    case 'TASK_EDIT':
      return { ...state, tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, title: action.title } : t)) };
    case 'TASK_TOGGLE':
      return { ...state, tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, completed: !t.completed } : t)) };
    case 'TASK_DELETE': {
      const activeTaskId = state.timer.activeTaskId === action.id ? null : state.timer.activeTaskId;
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id), timer: { ...state.timer, activeTaskId } };
    }

    case 'STATS_RESET':
      return { ...state, stats: emptyStats() };

    case 'SETTINGS_UPDATE': {
      const settings = { ...state.settings, ...action.patch };
      // Durations only affect the *current* phase live if it hasn't started running yet,
      // so an edit never yanks time out from under an active session.
      let timer = state.timer;
      if (!timer.isRunning && (timer.phase === 'idle')) {
        timer = resetCurrentPhase(timer, settings);
      }
      return { ...state, settings, timer };
    }
    case 'AMBIENT_UPDATE':
      return { ...state, ambient: { ...state.ambient, ...action.patch } };
    default:
      return state;
  }
}

interface AppStateContextValue {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadState(defaultState()));

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}

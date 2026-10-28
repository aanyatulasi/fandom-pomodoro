export type Universe = 'percy-jackson' | 'harry-potter';

export type GodId =
  | 'poseidon' | 'athena' | 'apollo' | 'ares' | 'aphrodite' | 'hermes'
  | 'hephaestus' | 'demeter' | 'zeus' | 'hades' | 'hecate';

export type HouseId = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface GodInfo {
  id: GodId;
  name: string;
  title: string;
  cabin: number;
  domain: string;
  symbol: string; // emoji-free glyph/short label used by SVG icon
  description: string;
  traits: string[];
  palette: { primary: string; secondary: string; accent: string; glow: string };
}

export interface HouseInfo {
  id: HouseId;
  name: string;
  founder: string;
  animal: string;
  element: string;
  description: string;
  traits: string[];
  palette: { primary: string; secondary: string; accent: string; glow: string };
}

export type PJLocationId =
  | 'camp-main'
  | `cabin-${GodId}`;

export type HPLocationId =
  | `common-${HouseId}`
  | 'library' | 'great-hall' | 'astronomy-tower' | 'room-of-requirement'
  | 'greenhouse' | 'black-lake';

export type LocationId = PJLocationId | HPLocationId;

export interface LocationInfo {
  id: LocationId;
  universe: Universe;
  name: string;
  tagline: string;
  description: string;
  sceneId: string;
  ambientId: AmbientId | null;
  requires?: { god?: GodId } | { house?: HouseId };
  group: 'home' | 'personal' | 'explore';
}

export type AmbientId =
  | 'ocean' | 'wind' | 'fireplace' | 'library-hush' | 'rain' | 'magic-shimmer'
  | 'forge' | 'birdsong' | 'underwater' | 'greenhouse-drip' | 'great-hall-murmur'
  | 'night-crickets';

export type QuizAnswerWeights<T extends string> = Partial<Record<T, number>>;

export interface QuizOption<T extends string> {
  text: string;
  weights: QuizAnswerWeights<T>;
}

export interface QuizQuestion<T extends string> {
  id: string;
  prompt: string;
  options: QuizOption<T>[];
}

export type TimerPhase = 'idle' | 'focus' | 'short_break' | 'long_break';

export interface TimerState {
  phase: TimerPhase;
  isRunning: boolean;
  phaseEndAt: number | null; // epoch ms, set while running
  remainingMsAtPause: number | null; // set while paused/idle
  phaseDurationMs: number; // full duration of current phase, for the progress ring
  completedFocusSessions: number; // lifetime-ish counter used for long-break cadence
  cyclePosition: number; // 0..sessionsBeforeLongBreak-1, focus sessions completed in current cycle
  activeTaskId: string | null;
  lastCompletedPhase: TimerPhase | null;
  lastTickAt: number;
  completionEventId: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  focusSessionsSpent: number;
}

export interface DailyStatEntry {
  date: string; // YYYY-MM-DD
  focusSessions: number;
  focusMinutes: number;
}

export interface StatsState {
  daily: Record<string, DailyStatEntry>;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}

export interface SettingsState {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartNextFocus: boolean;
  soundEnabled: boolean;
  desktopNotificationsEnabled: boolean;
  dailyGoalSessions: number;
  reducedMotionOverride: boolean | null; // null = follow system
}

export interface AmbientState {
  enabled: boolean;
  volume: number; // 0..1
}

export interface AppState {
  universe: Universe | null;
  godResult: GodId | null;
  houseResult: HouseId | null;
  pjLocationId: PJLocationId | null;
  hpLocationId: HPLocationId | null;
  distractionFree: boolean;
  timer: TimerState;
  tasks: Task[];
  stats: StatsState;
  settings: SettingsState;
  ambient: AmbientState;
}

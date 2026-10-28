export type Universe = 'percy-jackson' | 'harry-potter';

export type GodId =
  | 'poseidon' | 'athena' | 'apollo' | 'ares' | 'aphrodite' | 'hermes'
  | 'hephaestus' | 'demeter' | 'zeus' | 'hades' | 'hecate';

/** Every deity with a cabin at camp, including ones the quiz can never
 * assign (Hera and Artemis have no demigod children; Dionysus is camp
 * director — Pollux is his one camper). Cabins are open to explore
 * regardless of the user's own quiz result. */
export type CabinOccupantId = GodId | 'hera' | 'artemis' | 'dionysus';

export type HouseId = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface GodInfo {
  id: CabinOccupantId;
  name: string;
  title: string;
  cabin: number;
  domain: string;
  symbol: string; // emoji-free glyph/short label used by SVG icon
  description: string;
  traits: string[];
  palette: { primary: string; secondary: string; accent: string; glow: string };
  /** true for cabins the quiz can never assign as "your godly parent" (Hera, Artemis). */
  unclaimable?: boolean;
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

export type PJGroundsLocationId =
  | 'camp-main' | 'strawberry-fields' | 'campfire-circle' | 'canoe-lake'
  | 'climbing-wall' | 'archery-range' | 'arena' | 'dining-pavilion';

export type PJSpecialLocationId =
  | 'big-house' | 'pine-tree-hill' | 'forest' | 'beach' | 'clifftop-overlook';

export type PJLocationId =
  | PJGroundsLocationId
  | `cabin-${CabinOccupantId}`
  | PJSpecialLocationId;

export type HPLocationId =
  | `common-${HouseId}`
  | 'library' | 'great-hall' | 'astronomy-tower' | 'room-of-requirement'
  | 'greenhouse' | 'black-lake';

export type LocationId = PJLocationId | HPLocationId;

export type LocationCategory = 'grounds' | 'cabins' | 'special' | 'personal' | 'explore';

export interface LocationInfo {
  id: LocationId;
  universe: Universe;
  name: string;
  tagline: string;
  description: string;
  sceneId: string;
  ambientId: AmbientId | null;
  /** Only used by Hogwarts common rooms, which stay locked until sorted.
   * Camp Half-Blood cabins are never gated — the quiz personalises, it
   * doesn't restrict. */
  requires?: { house?: HouseId };
  group: LocationCategory;
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

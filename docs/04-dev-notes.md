# Dev notes — Fandom Pomodoro Sanctuary

## Stack
Vite + React 19 + TypeScript, zero backend, zero UI framework dependency (hand-written
CSS with custom properties for theming). All state is client-side, persisted to
`localStorage` under key `fandom-pomodoro:state:v1`.

## How to run
```bash
cd app
npm install
npm run dev      # http://localhost:5173 (or next free port)
npm run build    # tsc -b && vite build -> dist/
```

## Architecture
```
app/src/
  types.ts                 single source of truth for all state/data shapes
  data/                     gods.ts, houses.ts, locations.ts, glyphs.ts,
                             godlyParentQuiz.ts, sortingQuiz.ts (quiz banks + scorers)
  state/
    AppStateContext.tsx     one reducer + Context for the entire app
    timerLogic.ts           pure, unit-testable timer phase-transition functions
    storage.ts               localStorage read/write
  hooks/                    useTimerEngine, useTabTitle, useKeyboardShortcuts,
                             useAmbientSound, useNotifications, useMediaQuery
  components/
    Scenes/                 SVG "scene kit" primitives + one composer per
                             location family (PJCabin, HPCommonRoom, etc.)
    Landing/, Shell/, Quiz/, Locations/, Timer/, Tasks/, Stats/, Settings/, common/
  App.tsx                   owns the always-mounted timer runtime (engine, tab
                             title, keyboard shortcuts, ambience, notifications)
                             and the view router (plain useState, no react-router
                             needed for 7 screens)
```

## Why the timer runtime lives in `App.tsx`, not `TimerScreen.tsx`
Early in the build the timer engine, keyboard shortcuts, and tab-title hooks
lived inside `TimerScreen`. That broke the explicit requirement that the timer
stay accurate across navigation: as soon as the user opened Settings or Stats,
`TimerScreen` unmounted, taking the `setInterval` tick and the tab-title effect
with it. It was caught during manual verification (tab title stopped updating
on Settings) and fixed by lifting `useTimerEngine` + `useTabTitle` +
`useKeyboardShortcuts` + `useAmbientSound` up to the always-mounted app shell;
`TimerScreen` now just receives the computed `engine` as a prop.

## Timer accuracy
`TimerState` stores `phaseEndAt` (absolute epoch ms) while running, and
`remainingMsAtPause` while paused/idle — never a counter that gets decremented
tick by tick. `remainingMs()` always derives from `phaseEndAt - Date.now()`.
A `setInterval(250ms)` plus `visibilitychange`/`focus` listeners re-check on
every tick and immediately on tab refocus, so a backgrounded or throttled tab
self-corrects instantly rather than drifting. This was verified by letting a
1-minute test session run across a dev-server restart/page reload: on reload
the stale `phaseEndAt` was already in the past, the engine detected it on the
very first tick, and the phase completed, credited stats, and auto-advanced
correctly — exactly the "accurate even if the tab was inactive" behavior the
spec calls for.

## Quiz scoring
Pure integer-weighted tally, no randomness: `data/godlyParentQuiz.ts` and
`data/sortingQuiz.ts` each export a question bank (option → `{ outcome: weight }`)
and a `score*Quiz(answers: number[])` function. Verified manually end-to-end
twice (Poseidon and Slytherin) by answering toward a known outcome and
confirming the reveal matched.

## Scene system (no licensed art, no broken image links)
Every background is an inline SVG built from a shared primitive kit
(`components/Scenes/primitives.tsx`: sky gradients, star fields, pine rows,
hill silhouettes, water, stone walls, candle fields, bookshelves, arches,
greenhouse panes, mist) composed per location in `components/Scenes/scenes/`.
`PJCabin` and `HPCommonRoom` are single parametrized components that branch
structurally (not just by color) per god/house — e.g. the Poseidon cabin adds
a water strip and dock, the Hades cabin goes dark stone with purple mist, the
Ravenclaw common room gets tall arches and a star field, Hufflepuff gets a
round door and copper lamps. This was a deliberate choice over fetching
real PJO/HP artwork, which would be a copyright problem; it also means there
are zero network-dependent image assets to break.

## Known simplifications
- "Skip" advances the schedule (so long-break cadence stays correct) but does
  **not** credit the stats/daily-goal counters, since the session wasn't
  actually completed — only a phase that ran out for real counts as finished.
- Ambient sound is procedurally generated via Web Audio (filtered noise +
  slow LFO swell, optional periodic "blips") rather than audio files — off by
  default, independent volume slider, explicit mute via the toggle.
- No automated test suite; verification was a manual pass through the live
  app (see docs/02-intent-sow.md's acceptance list), run in the browser with
  console-error checks at each step.

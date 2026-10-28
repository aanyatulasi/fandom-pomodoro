# PRD — Fandom Pomodoro Sanctuary

## 1. Experience map
```
Landing (universe picker)
 ├─ Percy Jackson → Camp intro → [Take Quiz] or [Skip to locations]
 │     Quiz (11 Q) → Claiming reveal (god) → Location picker (Camp Main | <God> Cabin)
 │     → Timer screen (sidebar: Home, Quiz, Location, Tasks, Stats, Settings, Switch Universe)
 └─ Harry Potter → Hogwarts intro → [Take Sorting Quiz] or [Skip to locations]
       Quiz (11 Q) → Sorting reveal (house) → Location picker (Common Room | Explore Hogwarts → 6 cards)
       → Timer screen (same sidebar, HP-flavored)
```
Universe, quiz result, and location are independent pieces of persisted state —
visiting the quiz or location picker again from the sidebar never resets the
running timer, tasks, or stats. Skipping the quiz is allowed; the location
picker then offers only the "general" locations until a result exists.

## 2. Quiz design (deterministic, not random)
Each quiz is 11 multiple-choice questions (4 options each). Every option carries
a small integer weight toward 1–3 possible outcomes (e.g. a "I'd rather fix the
plan than argue about it" answer weights Athena +2, Hephaestus +1). After all
answers, outcome scores are tallied; the highest score wins. Ties resolve by a
fixed canonical priority order so the result is still 100% determined by the
answers, never by `Math.random`. The full weighted answer bank lives in
`app/src/data/godlyParentQuiz.ts` and `app/src/data/sortingQuiz.ts` — that file
*is* the scoring spec; this PRD does not duplicate it to avoid drift.

### Godly Parent outcomes (11), with canonical cabin numbers
Poseidon (3), Athena (6), Apollo (7), Ares (5), Aphrodite (10), Hermes (11),
Hephaestus (9), Demeter (4), Zeus (1), Hades (13), Hecate (15).

### Hogwarts outcomes (4)
Gryffindor (scarlet/gold), Slytherin (green/silver), Ravenclaw (blue/bronze),
Hufflepuff (yellow/black).

## 3. Locations (each a distinct illustrated SVG/CSS scene — see §5)
**Percy Jackson:** Camp Half-Blood (Main Camp), then one cabin per god result:
Poseidon, Athena, Apollo, Ares, Aphrodite, Hermes, Hephaestus, Demeter, Zeus,
Hades, Hecate cabins — 11 scenes total.
**Harry Potter:** Gryffindor / Slytherin / Ravenclaw / Hufflepuff common rooms,
plus Library, Great Hall, Astronomy Tower, Room of Requirement, Greenhouse,
Black Lake Shore — 10 scenes total.
A location is available once its prerequisite (quiz result, for the
personal-cabin/common-room option) is met; everything else is open immediately.

## 4. Timer engine (core feature — see dev notes for implementation)
State shape: `{ phase: 'focus'|'short_break'|'long_break'|'idle', phaseEndAt: number|null,
remainingMsAtPause: number|null, isRunning: boolean, completedFocusSessions: number,
cycleFocusCount: number }`. Remaining time is always `phaseEndAt - Date.now()` while
running; pausing stores remaining ms and clears `phaseEndAt`. This is immune to
tab throttling because resuming recomputes `phaseEndAt = Date.now() + remainingMsAtPause`.
A completed *focus* phase increments `completedFocusSessions`; a completed break
never does. Every 4th completed focus session routes the next break to "long".

## 5. Visual system
A shared "scene kit" of parametrized SVG/CSS layers (sky gradient, sun/moon,
tree line, water, stone wall, tower silhouette, candle field, star field,
foliage, furniture silhouettes) is composed differently per location — distinct
shapes and palettes per place, not a single background recolored. This keeps
visual quality consistent across 21 locations without hand-authoring 21 unrelated
illustrations, and sidesteps using any copyrighted PJO/HP artwork.

## 6. Non-functional
Responsive (mobile drawer nav), keyboard accessible, `prefers-reduced-motion`
honored, no network calls required at runtime (all data/assets are local/code),
graceful no-ops when Notification API or AudioContext are unavailable.

## 7. Explicitly not built
Accounts, sync, licensed media, offline-installable PWA (not requested), unit
test suite (manual verification pass instead, documented in dev notes).

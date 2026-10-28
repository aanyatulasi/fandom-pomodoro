# Fandom Pomodoro Sanctuary

A fully functional Pomodoro study timer wrapped in two switchable fandom
worlds — **Percy Jackson / Camp Half-Blood** and **Harry Potter / Hogwarts** —
built as a single client-side web app (no backend, no accounts, no network
dependency beyond loading fonts).

- Deterministic personality quizzes (Godly Parent / Hogwarts Sorting) that
  genuinely drive which backgrounds, accents, and symbols you see.
- 22 structurally distinct illustrated locations (11 Camp Half-Blood cabins +
  main camp, 4 Hogwarts common rooms + 6 other castle locations), all
  original SVG scene compositions — no licensed art, nothing that can 404.
- A real Pomodoro engine: timestamp-based countdown (accurate even if the tab
  is backgrounded), focus/short/long-break cycling, auto-advance settings,
  keyboard shortcuts, tab-title countdown, desktop + sound notifications.
- Tasks, daily study stats with a 7-day history and streak, a full settings
  panel, optional procedurally-generated ambient sound per location, and a
  distraction-free mode.

## Quick start
```bash
cd app
npm install
npm run dev
```
Then open the printed `http://localhost:…` URL.

## Project layout
```
docs/     the full design/build document set (braindoc, SOW, PRD, dev notes, ops runbook)
app/      the Vite + React + TypeScript application (see app/README for the dev-server default)
```

See [`docs/04-dev-notes.md`](docs/04-dev-notes.md) for the architecture and
[`docs/09-ops-runbook.md`](docs/09-ops-runbook.md) for building/hosting.

## Tech
Vite, React 19, TypeScript. No UI framework, no state-management library, no
backend — a single `useReducer` store persisted to `localStorage` is enough
for this app's scope.

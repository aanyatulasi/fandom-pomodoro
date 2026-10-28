# Braindoc — Fandom Pomodoro Sanctuary

## Problem
Generic Pomodoro apps work but create no desire to return. A study tool that makes
someone *want* to open it — because it feels like visiting Camp Half-Blood or
Hogwarts rather than clocking into a productivity dashboard — has a real retention
edge for the audience it targets (students who are also PJO/HP fans).

## Users
- Students and self-learners who already use Pomodoro-style study techniques.
- Fans of Percy Jackson and/or Harry Potter who want their study tool to feel like
  their favorite universe rather than a skinned to-do app.
- Primarily desktop/laptop study sessions, with mobile as a secondary "quick glance
  at timer" use case.

## Scope (this build)
In scope:
- Universe picker (Percy Jackson / Harry Potter), switchable anytime, non-destructive.
- Deterministic personality quizzes (Godly Parent, Hogwarts Sorting) with a real
  scoring model, reveal screens, and UI personalization driven by the result.
- Location picker per universe (Camp main + 10 cabins; 4 common rooms + 6 other
  Hogwarts locations), each with a distinct illustrated background, switchable
  without resetting the timer.
- A real Pomodoro engine: timestamp-based countdown, focus/short/long break cycle,
  auto-advance rules, session counting, keyboard shortcuts, tab-title updates,
  browser + sound notifications, full localStorage persistence.
- Tasks, daily stats/streak, settings panel, optional per-location ambient sound
  (off by default), distraction-free mode, responsive layout incl. mobile drawer.

Out of scope (by necessity, not negligence):
- Licensed PJO/HP artwork or audio (copyright) — backgrounds and ambience are
  original illustrated/CSS-generated interpretations, consistent in style, not
  stock photos or scraped fan art.
- Any backend/server/account system — this is 100% a client-side app; "sessions"
  means Pomodoro sessions, not server auth sessions.
- Multi-user / sync across devices.

## Risks & how the build addresses them
- **"Looks like a skinned productivity app"** → backgrounds are the dominant visual
  element on the timer screen, not a sidebar accent; every location has a
  structurally distinct scene (different shapes/architecture, not just a recolor).
- **Fake-feeling quiz** → scoring is a deterministic weighted tally over real
  answer vectors, unit-testable, never `Math.random()`.
- **Timer drifts/breaks when tab is backgrounded** → engine computes remaining
  time from an absolute end-timestamp on every tick/visibility change, not by
  decrementing a counter.
- **State loss on navigation** → a single persisted app-state store (localStorage)
  holds universe, quiz result, location, timer state, tasks, stats, settings;
  screens read/write it, they don't own independent copies.
- **Copyright exposure** → no scraped images/audio; all visuals are original
  SVG/CSS scene compositions; ambience is procedurally generated or omitted
  rather than using copyrighted recordings.

## Stack decision
The auto-classifier suggested FastAPI+HTMX (its default when a brief is read as
backend-leaning). That's the wrong tool here: there is no server-side data,
nothing to persist outside the user's own browser, and the spec explicitly calls
for timestamp-accurate timers, deterministic client quiz logic, and rich animated
state transitions — all client concerns. The build overrides the default and uses
**Vite + React + TypeScript**, 100% client-side, static-hostable, matching the
explicit instruction in the request ("use a modern frontend stack such as React
with TypeScript").

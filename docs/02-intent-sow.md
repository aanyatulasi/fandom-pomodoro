# Statement of Work — Fandom Pomodoro Sanctuary

## Objective
Deliver a single-page, client-only web app ("app/") implementing a Pomodoro timer
wrapped in two switchable, deeply themed fandom experiences (Percy Jackson / Camp
Half-Blood and Harry Potter / Hogwarts), per the detailed spec supplied by the
client. Priority order, explicit from the client brief:
1. A genuinely functional Pomodoro timer.
2. Beautiful, immersive, location-specific backgrounds that change with choices.
3. An interactive fandom quiz experience that meaningfully personalizes the app.

## Deliverables
| # | Deliverable | Acceptance |
|---|---|---|
| D1 | Vite+React+TS app, `app/` | builds and runs with `npm install && npm run dev` |
| D2 | Universe landing screen | two distinct themed entry cards, each navigable |
| D3 | Godly Parent quiz (11 Qs) + claiming reveal | deterministic scoring, 11 possible gods, reveal shows symbol/palette/description |
| D4 | Hogwarts Sorting quiz (11 Qs) + sorting reveal | deterministic scoring, 4 houses, reveal shows crest/colors/description |
| D5 | 11 PJ locations (camp + 10 cabins), 10 HP locations (4 common rooms + 6 others) | each a structurally distinct illustrated SVG/CSS scene, selectable, persists |
| D6 | Pomodoro engine | timestamp-based, focus/short/long break cycle w/ long break every 4th, start/pause/resume/reset/skip, auto-advance settings, session counter |
| D7 | Notifications | in-app toast always; desktop notification + sound gated on permission/setting |
| D8 | Tab title ticker, keyboard shortcuts (Space/R, input-safe) | verified manually |
| D9 | Tasks panel | add/edit/complete/delete, link active task to running session, persists |
| D10 | Stats panel | sessions today/total, focus minutes, daily goal progress, 7-day history, streak, reset w/ confirm |
| D11 | Settings panel | all durations, cycle length, auto-start toggles, notification/sound toggles, daily goal |
| D12 | Ambient sound per location | procedurally generated (Web Audio), off by default, volume + mute |
| D13 | Responsive sidebar nav | desktop rail, mobile drawer; adapts labels/colors to universe |
| D14 | Distraction-free mode | toggle hides chrome, keeps timer/task/background |
| D15 | Full localStorage persistence | refresh preserves universe, quiz result, location, timer, tasks, stats, settings |

## Out of scope
Server/backend, accounts, cross-device sync, licensed media assets, native apps.

## Acceptance test pass (performed before hand-off)
Start/pause/resume/reset/skip; full 4-focus→long-break cycle; quiz scoring for
multiple answer vectors; every location renders a distinct scene with no broken
assets; universe switch mid-session does not reset the timer; refresh preserves
state; responsive check at mobile width; console free of errors.

## Timeline
Single build session, synchronous — spec was already fully detailed by the
client, so intake Q&A is skipped and the build proceeds straight to
implementation, verified before packaging.

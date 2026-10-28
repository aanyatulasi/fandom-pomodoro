# Ops runbook — Fandom Pomodoro Sanctuary

## What this is
A static, client-only single-page app. There is no backend, no database, no
API keys, and no server-side data — "ops" here is "how do I build and host a
static bundle," not incident response for a service.

## Build & deploy
```bash
cd app
npm install
npm run build      # outputs app/dist — pure static files
```
`dist/` can be hosted on any static host (Vercel, Netlify, GitHub Pages, S3 +
CloudFront, etc.) with no server-side configuration. There are no environment
variables to set and no secrets involved.

## Local development
```bash
npm run dev         # Vite dev server with HMR
```

## Monitoring / health
Nothing to monitor server-side. The only "failure mode" worth watching for in
production is a JS error that breaks the whole app (since it's a single
bundle) — keep an eye on the browser console after any deploy, and spot-check:
universe picker loads, a quiz completes, the timer starts/ticks, and
localStorage read/write isn't throwing (private browsing / storage-disabled
browsers degrade gracefully — the app still works, it just won't persist).

## Data & privacy
All user data (universe choice, quiz result, tasks, stats, settings) lives
only in the end user's own browser `localStorage`, under the key
`fandom-pomodoro:state:v1`. Nothing is sent to a server. Clearing site data /
browser storage resets the app to a first-time state.

## Rollback
Since this is a static bundle with no migrations or persistent server state,
rollback is just redeploying the previous build artifact — there is no data
migration to reverse.

## Common issues
- **White/blank screen after a browser extension or ad-blocker is active**:
  check the console first; this app makes no third-party network calls at
  runtime (fonts are loaded from Google Fonts via `<link>` in `index.html`,
  everything else is bundled), so a blank screen points at a JS error, not a
  blocked request.
- **Notifications never fire**: desktop notifications require the browser
  permission to be granted (Settings → Desktop notifications) *and* the
  setting toggle on; the in-app toast always fires regardless as a fallback.
- **Ambient sound silent**: Web Audio requires a user gesture before it can
  start in most browsers — toggling the setting on counts as that gesture, but
  if the user toggled it on before ever interacting with the page, they may
  need to interact once (e.g. click Start) for audio to begin.

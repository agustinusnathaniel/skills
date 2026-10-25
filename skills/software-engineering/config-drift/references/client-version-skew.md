# Client version skew

Old clients keep running after a deploy: open tabs, installed workers, cached
config. Decide how each one notices the new version, what breaks while it
doesn't, and how it moves over.

## Detect and refresh stale clients

- List the clients that can go stale and what each caches: page code, lazy
  chunks, workers, configuration.
- Detect skew explicitly: compare the client's build version with the
  server's current one (a version endpoint or response header), or treat a
  failed chunk load as the signal.
- Prefer telling the user an update is available on screens with unsaved
  input; reload automatically only where nothing is lost.
- Reload at most once per time window, tracked in persisted storage, so a
  missing asset cannot cause a reload loop.
- Exercise an update with a client already open before calling it done.

## Lazy chunks after a deploy

A tab on the old version requests chunk files that the new deploy no longer
serves. Hosts with SPA fallback may answer with `index.html`, which fails as a
script. Handle it in one place:

- Match the error loosely; browsers word it differently ("Failed to fetch
  dynamically imported module", "error loading dynamically imported module",
  "Importing a module script failed"). In Vite, `vite:preloadError` also
  fires.
- Keep these errors out of error reporting, or they bury real failures.

## One stack: service workers with vite-plugin-pwa and Workbox

- `registerType: 'autoUpdate'` with the default injected registration only
  registers the worker. It forces `skipWaiting` and `clientsClaim`, so the new
  worker takes over open tabs, but nothing reloads them: each tab keeps running
  the old page. Automatic reload happens only when the app registers through
  `virtual:pwa-register` (`registerSW`, or the framework hook).
- An automatic reload can discard form input. Form-heavy apps should use
  `registerType: 'prompt'` and let the user reload.
- `updateServiceWorker(true)` only asks the waiting worker to activate:
  current versions ignore its reload argument, and it resolves before the new
  worker controls the page. The plugin's register code reloads on
  workbox-window's `controlling` (prompt mode) or `activated` (auto mode)
  event, or calls `onNeedReload` when given. Reload there, not on the
  promise, or the old worker serves the reload.
- Precached workers and WebAssembly files with unhashed filenames are
  versioned assets a deploy cannot bust. Prefer network-first for them, or
  exclude them from the precache.
- Confirm the deployed `sw.js` exists and changed. When the build writes
  none, generating it in a post-build script is a working fallback.

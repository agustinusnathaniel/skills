# Client version skew

Old clients keep running after a deploy. Each mechanism below decides whether
they notice the new version, and what breaks while they don't.

## Service workers (vite-plugin-pwa and Workbox)

- `registerType: 'autoUpdate'` with the default injected registration only
  registers the worker. It forces `skipWaiting` and `clientsClaim`, so the new
  worker takes over open tabs, but nothing reloads them: each tab keeps running
  the old page. Automatic reload happens only when the app registers through
  `virtual:pwa-register` (`registerSW`, or the framework hook).
- An automatic reload can discard form input. Form-heavy apps should use
  `registerType: 'prompt'` and let the user reload.
- `updateServiceWorker(true)` resolves before the new worker controls the page.
  Reload on the worker's `controlling` / `controllerchange` event, not on that
  promise, or the old worker serves the reload.
- `navigateFallback` to a URL outside the precache fails. Exclude server routes
  (`/api/`, server-function paths) with a denylist.
- Precached workers and WebAssembly files are versioned assets. Prefer
  network-first for them, or exclude them from the precache.
- Some framework build pipelines skip the plugin's bundle-close step, so no
  worker is written at all. Confirm the deployed `sw.js` exists and changed;
  generating it in a post-build script is a working fallback.

## Lazy chunks after a deploy

A tab on the old version requests chunk files that the new deploy no longer
serves. Hosts with SPA fallback may answer with `index.html`, which fails as a
script. Handle it in one place:

- Match the error loosely; browsers word it differently ("Failed to fetch
  dynamically imported module", "error loading dynamically imported module",
  "Importing a module script failed"). Vite also emits `vite:preloadError`.
- Reload at most once per time window, tracked in persisted storage, so a
  missing chunk cannot cause a reload loop.
- Keep these errors out of error reporting, or they bury real failures.
- Prefer telling the user an update is available over reloading silently on
  screens with unsaved input.

## Mobile over-the-air updates

- An update reaches only builds with a matching runtime version. Bump the
  runtime version whenever native code or native config changes.
- Build-time and update-time configuration come from different places unless
  pinned together. With EAS, point the build profile's `environment` and the
  update's `--environment` at the same EAS environment.
- A minimum-supported-version check, served from remote config, is the escape
  hatch for clients that can no longer be updated over the air.

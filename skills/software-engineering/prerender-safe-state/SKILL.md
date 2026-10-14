---
name: prerender-safe-state
description: >
  Use browser-only state in apps whose HTML is prerendered or server-rendered.
  Use when persisting state to localStorage or cookies, adding a theme toggle,
  restoring an auth session from storage, showing viewer-local time or locale,
  or debugging hydration mismatches, a flash of the wrong theme, or a page that
  differs between navigation and reload.
---

# Prerender-Safe State

Prerendered HTML is built once, without a viewer: no storage, no session, no
viewer clock, timezone, or locale, no viewport. The first client render must
reproduce that HTML exactly; the viewer's state arrives in a second phase.
Dev servers usually skip prerendering, so these bugs show up only in a build.

## Render in two phases

1. **First render:** emit the same deterministic defaults the build used.
   Never read storage, `window`, `Date.now()`, or the viewer's locale in a
   state initializer or during render.
2. **Restore after mount:** read and apply the stored state in an effect, or
   through `useSyncExternalStore` whose `getServerSnapshot` returns the build
   default as a stable reference.
3. **Write only after restore:** gate persistence on a "restored" flag. A
   persist effect that runs before the restore overwrites saved state with
   defaults on every boot.

Keep the second-phase boundary on the smallest leaf that differs. A mount gate
around a whole section leaves it stuck on placeholders when the gate never
opens. Reserve `suppressHydrationWarning` for attributes set before hydration
on purpose, such as a theme class; it applies one element deep and does not
repair mismatched children.

## Set pre-paint state outside React

State that changes how the first frame looks, such as the theme or color
scheme, is applied by a small blocking inline script in `<head>` that sets a
class or attribute before paint. React state then reads it. A context provider
that reads storage at the root causes a flash of the wrong theme and can break
prerendering. A strict CSP must allow that script by hash or nonce.

## Treat stored state as untrusted input

Parse stored values with a schema, version the shape, and discard what fails
instead of throwing. Cap stored collections and catch quota errors. Corrupt or
outdated storage otherwise crashes the app for returning visitors only.

## Bound session restore

For auth stored in the browser, prerendered pages are always the signed-out
shell, and guards decide after restore:

- Restore once before routing, behind one cached promise, with a timeout.
- Fail closed: an invalid, legacy, or timed-out session becomes signed out.
- Ignore a restore that resolves after the app has settled, so a late read
  cannot sign a user in or out mid-session.
- Keep the persistence layer defined during prerender, as a no-op storage, so
  restore settles instead of throwing.

## Keep build-time code inert

- Module-level code runs in the prerender process. Check `typeof window`
  inside storage factories and callbacks, not only at import.
- Timers and subscriptions started while prerendering can hang the build;
  for example, use an infinite cache GC time on the server and a finite one in
  the browser.
- Values frozen at build time stay frozen: the current year, relative dates,
  counts. Compute them on the client when they must stay current.
- With client-side navigation that swaps pages (View Transitions), inline
  scripts may run again or not at all. Make them idempotent and re-run them
  on the router's swap event.

## Verify on the built output

Build, serve the output with a static server, and load each changed page
three ways: with empty storage, with stored state from a returning visitor,
and with a corrupt stored value. Reload as well as navigate. Done when the
console shows no hydration errors and each load reaches its intended state.
In tests, Node 25 and later define a global `localStorage` that can shadow the
DOM environment's; install the test environment's storage explicitly.

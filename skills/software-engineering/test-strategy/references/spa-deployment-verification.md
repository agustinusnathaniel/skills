# SPA Deployment Verification

Read this when client-side routes, asset loading, or overlapping deployments
can change what a browser receives or renders.

## Exercise the production path

Run the built output through the deployed host or a host configuration that
matches its routing, public base path, headers, and cache behavior. A development
server does not establish how the production host handles rewrites or missing
files. Discover the shell path from the build or deployment contract; do not
assume it is named `index.html`.

Probe only the paths affected by the change. A useful representative set is a
known client route opened directly and refreshed, an existing asset, a missing
asset, an API success and failure, and an unknown client route. For each, check
the requested path, status, content type, and rendered or returned result
against that path's contract. Keep client-route fallback behavior scoped to
client routes: missing assets and API responses must retain their own failure
semantics and must not become the application shell as `text/html`.

When Content Security Policy or caching changes, inspect the effective
production response headers and exercise the app under them. Verify the shell,
fingerprinted assets, and API responses follow their intended cache roles, and
inspect the browser, CDN, or service-worker cache layers that participate in
the deployment. Confirm the shell does not keep clients pointed at unavailable
assets after a new build. Confirm the app works with the intended script
policy; do not weaken it with `unsafe-inline` just to make a check pass.

## Check version overlap when supported

If an open tab can outlive a deployment, keep one client on the earlier build,
deploy the new build, and trigger an affected route or deferred asset load.
Verify the documented outcome and any bounded recovery, including preservation
of unsaved state when supported. Recovery should respond to an observed stale
client condition rather than run as a blanket reload policy. If the app uses a
service worker, include its update path only when the change affects that path.
Do not expand to a full version matrix unless the rollout contract permits
those combinations.

Record the build version, request paths, statuses, content types, relevant CSP
or cache headers, and the rendered or returned outcome. Use synthetic content
and redact credentials and user data.

Further reading: [Vite load error handling](https://vite.dev/guide/build#load-error-handling),
[TanStack Start SPA mode](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode),
[MDN Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control),
and [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

# HTTP client migrations

Read this when replacing one HTTP client with another, for example `axios`
with `ky` or plain `fetch`. Each item compiled after the switch and changed
behavior at runtime. Versions noted are where the behavior was checked.

## Defaults that change

- **Retries.** `ky` (1.x) retries GET, PUT, HEAD, DELETE, OPTIONS, and TRACE
  twice on 408, 413, 429, 500, 502, 503, and 504; `axios` and `fetch` do not
  retry. Decide whether a retried PUT or DELETE is safe for each endpoint.
- **Timeouts.** `ky` aborts after 10 seconds by default; `axios` has no
  timeout. Long exports and uploads need an explicit value.
- **Errors.** Both `axios` and `ky` throw on non-2xx; `fetch` does not. The
  error shape differs: `axios` exposes parsed `error.response.data`, while
  `ky`'s `HTTPError` holds a `Response` whose body must be read
  asynchronously.

## Request shape

- **Body.** `axios` takes `data`; `ky` takes `json` for JSON or `body` for raw
  content. Call sites that pass the old key send an empty body.
- **Query strings.** `axios` serializes arrays as `a[]=1&a[]=2` and accepts a
  custom serializer; `ky` passes an object to `URLSearchParams`, which turns
  `[1, 2]` into `a=1%2C2`. Port any custom serializer the backend relies on.
- **URL joining.** `ky` 1.x `prefixUrl` throws on inputs that start with `/`;
  a standard `baseUrl` resolves `/users` against the origin and drops the
  base path.
- **Uploads.** Let the client set `Content-Type` for `FormData`; a manual
  header drops the multipart boundary.

## Interceptors and binary responses

- Map each interceptor to the new client's hooks (`ky`: `beforeRequest`,
  `afterResponse`, `beforeError`) and keep the order. Auth, logout on 401,
  error toasts, and reporting each need a test after the move.
- Binary downloads that relied on `responseType: 'blob'` now call
  `.blob()`. Error bodies of blob requests still need reading as text before
  parsing JSON.

## Verify

Exercise one call of each shape through the new client against the real
backend: a list with array filters, a JSON write, an upload, a file download,
a 401, a 4xx with an error body, and a slow endpoint.

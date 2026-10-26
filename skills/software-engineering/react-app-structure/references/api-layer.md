# API layer

Read this when a React app calls a REST backend and the repository has no
pattern for requests yet. When it has one, follow it.

## Layout

One HTTP client module, then one folder per endpoint, grouped by domain and
named by verb:

```text
src/lib/services/api/
  client.ts                the single HTTP client
  <domain>/
    get-list/
      index.ts             request function and its data hook
      types.ts             request params and response types
    get-detail/
    upsert/
```

- Requests go through `client.ts`, so auth and error handling apply to all
  of them.
- Each endpoint folder owns its types, so a response change touches one
  folder.
- Page hooks import the endpoint's hook or request function, and components
  get data from the page hook.

## The client

Configure once: base URL, auth header from the session, and hooks that run
on every response.

- On 401, refresh once when the app uses refresh tokens; when there is no
  refresh or it fails, clear the session and every cached response.
- On other errors, show the error to the user from the client, once.
- Request functions return typed data and let errors flow to the caller.

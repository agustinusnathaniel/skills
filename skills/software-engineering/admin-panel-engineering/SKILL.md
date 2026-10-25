---
name: admin-panel-engineering
description: >
  Build or change admin panels, backoffice apps, and internal tools. Use when
  adding a page, sidebar or menu entry, route, or action that only some
  permissions or roles may see; touching login, logout, session expiry, or
  role edits; scoping data to a tenant, partner, or organization; building
  filtered list pages, exports, audit trails, destructive confirmations,
  operator status messages, or approval flows.
---

# Admin Panel Engineering

Admin apps fail at the seams between a client that hides things and a
server that decides things. Read the server's contract before shaping the UI,
and keep each client-side fact in one place.

## Read the authorization contract from the server

Find what the backend actually returns, not what HTTP conventions suggest:

- Which status means "session over" and which means "not allowed". Some
  backends answer every denial with 401, so a client "403 → show error" branch
  is unreachable and a denial logs the user out. When the statuses are
  overloaded, fetch the permission tree first and gate the UI on it.
- How permissions are matched. Match permission identifiers (route
  templates, permission keys, or policy names) exactly; a prefix or substring
  match lets `/orders` grant `/orders/:id/refund`.
- Where tenant identity comes from. Read the tenant, partner, or owner id from
  the authenticated context on the server; ignore ids the client sends.
- How permission changes propagate: cache keys, TTL units, and which key a role
  edit invalidates. A mismatch defers every edit to the next login.

Done when the denial status, matching rule, tenant source, and propagation path
are written down with file references.

## Derive every client gate from one permission map

Transform the permission tree once into a key → allowed map, and let the menu,
the route table, and per-action gates all read that map. A feature with no key
is unreachable by construction. Hiding a menu entry does not block its route;
gate both. Give new features their own key instead of copying a neighbour's.

Render a loading state while the permission map is unresolved; treating
"not loaded yet" as denied sends deep links to a 404.

## Treat identity as one lifecycle

- Route the logout button and the session-expired path through one logout
  function. It clears every identity store (token, user profile, permission
  map, data cache), then navigates. Await the clearing instead of delaying
  navigation with a timer.
- After login, honor a saved `redirectTo` only when it belongs to the same user
  or role.
- When a user edits their own role, refetch their permission map.
- Constrain role grants on the server: a user grants only permissions they
  hold themselves, or whatever grant rule the app defines, without assuming
  roles form a single ladder.

## Keep list contracts honest

- Type filter keys against the API contract; a misspelled key sends no filter
  and still returns rows. Rename contract keys only in lockstep with the
  backend.
- An Apply button must apply. If filters already apply on change, make the
  button say so or remove it.
- Label export scope: visible page, full filtered result, or entity-only. A
  client export of the loaded rows is not the filtered dataset; use a server
  export for that.
- When a download is requested with a blob response type, its errors arrive as
  `Blob` bodies too. Parse the error body as text before reading JSON, and
  read the filename from `Content-Disposition` with and without quotes.

For filters and pagination in the URL, use the `url-state` skill. For
upload-validate-execute flows, use `bulk-import-engineering`.

## Fix every instance

When the code has other instances (forks, copied sibling apps, vendored
duplicates), list them and diff the shared files before fixing. Apply the fix
to each, or extract the shared module, and say which instances were checked.

## References

- Audit trails, destructive actions and confirmations, approvals, operator
  status copy, and role design: [admin domain](references/admin-domain.md).
- Client data caches with SWR or similar (keys, gating, logout, revalidation):
  [SWR](references/swr.md).
- React with Ant Design forms and tables: [antd](references/antd.md).
- Laravel with Filament panels and multi-tenancy:
  [Filament tenancy](references/filament-tenancy.md).

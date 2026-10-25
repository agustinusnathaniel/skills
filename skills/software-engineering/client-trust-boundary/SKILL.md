---
name: client-trust-boundary
description: >
  Decide what a web or mobile client may hold and what the server must
  enforce. Use when adding client-exposed environment variables or API keys,
  calling a backend-as-a-service (Firebase, Supabase, Convex) directly from
  the client, gating features by role in the UI, storing sessions or roles in
  browser or device storage, or reviewing a frontend for exposed secrets.
---

# Client Trust Boundary

Everything that reaches a client is readable and editable by its user: the
bundle, the app binary, environment variables compiled into them, storage,
URLs, and every request the client can make. Treat the client as a
presentation of permissions the server enforces.

## Inventory what ships

List the values compiled into the client (variables with a public prefix such
as `VITE_`, `NEXT_PUBLIC_`, `EXPO_PUBLIC_`, platform config objects) and
search the built output for them. Each one is an identifier, not a secret,
whatever its name. A webhook URL, a "static API key" for an internal
endpoint, or a third-party secret in the client gives every user that access.
Move such calls behind a server endpoint that authenticates the user; a proxy
that accepts a key shipped in the client hides the URL but not the access.

## Authorize every call on the server

- Hidden menus and disabled buttons are presentation. Each non-public
  endpoint or backend function checks the caller's identity, permission, and
  tenant (where multi-tenant) on every call.
- With a backend-as-a-service, find out what is public by default. Some
  expose every client-callable function to anyone holding the deployment URL;
  put an auth check in each public function and keep server-only logic in
  functions the client cannot call.
- Platform gates such as API key referrer restrictions, app attestation, and
  bot challenges cut low-effort abuse. They are signals, not authorization.
  Add per-user and per-function rate limits where abuse is cheap.

## Treat client state as user input

Stored sessions, roles, feature flags, and cached profiles can be edited.
Validate stored session data for shape, version, and origin, fail closed on
anything unexpected, and take privileges from the server's response. Tokens
in URLs leak through logs, history, and referrers; prefer headers or
short-lived, single-use tokens.

## Keep credentials out of telemetry

Error reports, analytics events, and logs leave the trust boundary too. Strip
tokens, decoded claims, and personal data before sending them.

## Verify from outside the app

Done when each changed endpoint or function was called directly, with a
script rather than the UI: without a token, with another user's token, and
with a token from another tenant (where multi-tenant), each denied with no
data returned; when a search of the built output finds no secrets; and when
an edited stored session fails to raise privileges.

---
name: url-state-contract
description: >
  Put view state in the URL or read it back. Use when adding search params,
  filters, pagination, or sort to a URL; building shareable, bookmarkable, or
  deep links into lists; syncing a search box with the address bar; or when a
  shared link crashes, opens the wrong view, or leaks the sender's state.
---

# URL State Contract

A URL is a public contract: other people open it later, on other devices, in
older or newer versions of the app. Decide what it carries, serialize it
deliberately, and prove the round trip.

## Decide what belongs in the URL

Carry shareable intent: filters, query, sort, page and page size, and the
selected item. Keep viewer-local state out, such as saved items, personal
preferences, and the sender's local filters, and keep transient UI out. Done
when every parameter is listed with its owner and default.

## Serialize as strings on purpose

- URL values are strings. Some routers JSON-parse search params, turning
  `?q=123` into a number and `?q=true` into a boolean, which then fails string
  validation. Configure string-preserving serialization, and coerce explicitly
  where a number or boolean is meant.
- Accept legacy encodings that old links still use, such as `true`/`false`
  alongside `1`/`0`, and normalize whitespace and empty values.
- `URLSearchParams` is not a plain object: `Object.entries(params)` is always
  empty. Iterate with `params.entries()` or `forEach`, and encode each value
  once.

## Write predictably

Reset to the first page when filters change. Debounce typed input with an
instance that outlives renders, since a debounce created during render orphans
its timers. Choose push or replace per change so Back behaves, and restore state
on `popstate`.

## Read defensively

Validate parameters and fall back to defaults instead of throwing into the
error boundary. Derive data-fetching and prefetch cache keys from the same
parsed parameters, so a warmed cache matches the page. For deep links into
filtered or paginated lists, keep the target as a pending intent until the item
is loaded and visible, and account for sticky headers when scrolling to it.

## Prove the round trip

Run serialize → URL → parse for the cases that matter: numeric strings, leading
zeros, empty and whitespace values, `+` and encoded characters, non-ASCII text,
arrays, invalid values, and links in the previous format. Done when each case
reproduces the same view, or shows a defined fallback.

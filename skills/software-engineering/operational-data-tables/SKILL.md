---
name: operational-data-tables
description: >
  Implement or audit server-backed table state, pagination, or export scope.
  Use for interactive data tables rather than static display tables.
---

# Operational Data Tables

Keep the URL, server request, cache, visible rows, and exported data in agreement.

## Trace the existing contract

Before changing the table, follow its route and query parsing, request and response shape, cache identity and invalidation, selection model, and export path. Reuse the supported behavior you find; do not infer server capabilities from the current UI.

## Keep state round-trippable

Use the URL as the source of truth for filters, sort order, page or cursor, and search that should survive refresh, sharing, or browser navigation. Keep unfinished input and transient control state local. Preserve the difference between an absent value and a valid `false` or `0`; validate and normalize URL input, then serialize it without losing meaning or unrelated query parameters. Choose history updates according to whether a change should create a navigable checkpoint.

When a filter, sort order, or page size changes, reset the page or cursor when carrying it forward could produce inconsistent results. Debounce live input with proper cleanup and prevent older requests from replacing newer results. Cache identity must include the resource scope, relevant session or tenant context, and every input that can change the returned rows or page.

Follow the existing mutation policy so edits and deletes update or invalidate affected lists and aggregates without leaving stale rows or discarding valid table state.

## Make export scope explicit

Establish whether export means the current page, all rows matching the filters, or selected rows. Make that scope clear at the action boundary, and ensure the export uses the same filters and selection the user sees. Do not silently broaden a page export into a full result set.

For URL or data-flow changes, check parse/serialize round trips, absent versus `false` or `0`, page reset and history behavior, stale-request handling, and export scope after filter, page, selection, or mutation changes. Keep verification focused on the behavior touched.

For implementation, verify the affected transitions against the stated contract.
For an audit, pair each material gap with the smallest setup, action, and expected
result that would expose it. Distinguish checks performed from checks still needed;
source inspection alone does not prove navigation or export behavior at runtime.

---
name: react-app-structure
description: >
  Decide where code goes in a React web app (Vite with TanStack Router, or
  Next.js), following the repository's existing layout first. Use when adding
  a page, route, feature, API call, or shared component, or when moving logic
  out of a component.
---

# React App Structure

Placement follows the same order of authority as the
`typescript-code-conventions` skill: framework contract, the repository's
own rules, the siblings, then this skill.

Before adding a file, find where this repository keeps its equivalent: an
existing page, route, service, or shared component. Put the new file beside
it, shaped like it. The principles below hold in any layout and are
expressed in the repository's own folders. The default layout is for the
cases its reference names.

## Principles

**Thin routes.** A route file declares the route (path, params, loader,
metadata) and renders a page component imported from where pages live. The
page's state, markup, and logic stay out of the route file, so routing and
page code change independently.

**One view-model hook per page.** A page with state, queries, or handlers
keeps them in one hook, `use<Page>Page()`, returning a flat object. The page
component calls it, destructures, and renders. A page with none of these
needs no hook.

**Pure logic outside components.** Business rules, calculations, and
mappers live in modules with no React imports, under the repository's
equivalent of `services/` or `adapters/`. They run and test without
rendering.

**Generated files stay generated.** Route trees (`routeTree.gen.ts`) and UI
primitives installed by a component CLI (`components/ui/**`) change only
through their generator. The installed primitives are an inventory: unused
ones stay.

**One HTTP client.** A single client instance owns the base URL, auth
header, session expiry, and error notification. On 401 it refreshes once
when the app uses refresh tokens; when there is no refresh or it fails, it
clears the session and cached data. Request functions call it and let
errors flow; a call site catches only to recover locally.

## Layout and API references

- A new app, a repository already on this layout, or a gap the repository
  has no pattern for: [default layout](references/default-layout.md).
- An app calling a REST backend that has no request pattern yet:
  [API layer](references/api-layer.md).

## Done

Done when each new file sits beside its equivalent and matches it, every
route file you added only declares and renders, new page logic lives in the
page's hook or a pure module, and every generated file changed only through
its generator.

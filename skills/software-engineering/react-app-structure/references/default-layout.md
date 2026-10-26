# Default layout

Read this when starting a React web app, working in a repository already on
this layout, or adding something the repository has no pattern for. In any
other repository, its existing layout wins.

```text
src/
  routes/                  route files (TanStack Router); app/ on Next.js
  lib/
    pages/
      <page>/
        index.tsx          the page component
        components/        components only this page uses
        hooks.ts           the page's use<Page>Page() hook
    components/
      ui/                  primitives installed by a component CLI
      <shared>.tsx         components shared across pages
    services/              request functions and business logic
```

## Routes and pages

- A route file imports the page from `@/lib/pages/<page>` and renders it.
  On Next.js, `app/<segment>/page.tsx` re-exports the page as its default:
  `export { Home as default } from '@/lib/pages/home';`.
- The page's `index.tsx` exports the page component; a default export is
  allowed there for route imports and lazy loading. Every other file in the
  folder uses named exports.

## Naming

Folders and files are kebab-case (`user-profile/`, `profile-card.tsx`).
Route folders keep the router's naming.

---
name: framework-migration
description: >
  Replace one library, framework, tool, or host with another, or upgrade
  across a major version, for example axios to ky or fetch, ESLint and
  Prettier to Biome, Jest to Vitest, CRA to Vite, Redux to Zustand, or Vercel
  to Cloudflare. Use for any "replace X with Y", "migrate to", "switch to", or
  major upgrade, and when adopting or removing an abstraction layer such as an
  effect system.
---

# Framework Migration

A migration succeeds when the app does what it did before, on the new
foundation, with nothing of the old one left behind. Deciding whether to
switch belongs to `tool-evaluation-and-adoption`; this skill covers doing it.

## Bound the migration

- Migrate one thing at a time. Separate a framework move from a UI library
  upgrade, and upgrade one major version at a time; bundled migrations make
  every regression ambiguous.
- Write down the reason and the measurable win (build time, bundle size,
  lines removed, a capability gained). It is the yardstick at the end and the
  record the next migration consults.
- Fix known defects in the code being migrated first, or note them, so a
  pre-existing bug is not mistaken for a migration regression.
- For a new abstraction layer, choose the boundary where it pays: a runtime
  that is wrapped and unwrapped at the same call boundary costs code without
  delivering cancellation, typed errors, or resource safety.

Done when the scope, reason, success measure, and known defects are stated.

## Inventory the old surface

List every consumer of the old API and every behavior it supplied implicitly:
defaults (timeouts, retries, URL joining, serialization), error shapes,
interceptors and hooks, binary and streaming responses, and environment
access. Defaults differ between libraries, so a drop-in replacement changes
behavior silently.

Read the reference for the kind of move:

- HTTP clients: [HTTP client](references/http-client.md).
- Linters and formatters: [lint and format](references/lint-and-format.md).
- Hosts, deploy adapters, rendering modes, and site frameworks:
  [hosting move](references/hosting-move.md).
- Framework and SDK major versions: follow the project's official upgrade
  guide, codemods, and any upgrade skill it ships, one major at a time.

## Migrate in verified steps

Keep checks green before and after each step. For large apps, run old and
new side by side and cut over route by route or module by module. Check every
configuration option and API against the installed version's types and
docs; options from older guides are often silently ignored.

## Remove the old foundation

Search for the old package, config files, scripts, editor and lint-staged
settings, CI steps, and docs that still reference it, and remove them in the
migration. An interim compatibility package gets a removal condition when it
is added.

## Pin and verify

- Pin exact versions after a major migration until the new version proves
  stable; a floating minor can regress the area just migrated.
- Compare before and after on the built and deployed output: routes, redirects
  for moved URLs, generated files such as sitemaps and service workers,
  headers, bundle size, and the user flows the migration touched.
- Measure the win stated at the start. Done when it is reported, along with
  any behavior that changed on purpose.

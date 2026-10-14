# Lint and format migrations

Read this when replacing ESLint, Prettier, or both with another tool such as
Biome, or consolidating several configs into one.

## Port rules, then reformat

1. Translate existing configuration with the tool's migration command where
   one exists (Biome: `biome migrate eslint --write` and
   `biome migrate prettier --write`), then review rules it could not map.
2. Check each autofix's direction against the new defaults before running
   it; for example, Biome's `useConsistentArrayType` rewrites `Array<T>` to
   `T[]` unless configured otherwise.
3. Land the mechanical reformat as its own commit with no other changes, and
   add that commit to `.git-blame-ignore-revs`.

## Remove every trace of the old tools

Search for the old tool names and remove or update them in the same change:

- `package.json` scripts (a `format` script still calling `prettier` is a
  common leftover) and dependencies.
- Pre-commit hooks and `lint-staged` commands.
- CI steps and caches.
- Editor settings such as `.vscode/settings.json` default formatter and
  recommended extensions.
- Inline suppressions (`eslint-disable`) that now need the new tool's syntax.
- Contributor docs and agent instruction files that name the old commands.

## Verify

Run the new check on a clean checkout and in CI, run the pre-commit hook on a
staged file, and confirm an editor formats on save with the new tool.

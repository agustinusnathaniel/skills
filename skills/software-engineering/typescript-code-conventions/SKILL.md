---
name: typescript-code-conventions
description: >
  Write TypeScript that fits the repository first and these conventions
  second, with or without a linter. Use when writing or changing TypeScript
  or TSX in any app, service, library, or CLI: function signatures, control
  flow, errors and async code, types, imports and exports, file names, and
  React components; or when a lint rule on any of these fails.
---

# TypeScript Code Conventions

These are defaults; the repository decides first. Code written to them
passes the linters that enforce them and reads like its neighbours.

## Order of authority

1. **Framework contract.** A signature, file name, export, or class shape the
   framework or a library dictates (below).
2. **The repository's own rules.** Its agent instructions (`AGENTS.md`,
   `CLAUDE.md`, `CONTRIBUTING.md`), and its lint, format, and `tsconfig`
   settings.
3. **The siblings.** Existing files of the same kind next to the change.
4. **These conventions**, for whatever the first three leave open.

Before writing, read the repository's agent instructions and lint config.
For each file you touch, read three or more siblings and match the majority
shape, as the `challenge-every-guard` skill's "Copy the sibling first"
describes. Where the repository differs from a convention here, follow the
repository and name the difference once in your summary. Existing code keeps
its current shape unless the user asks for it to change.

## Framework contracts

The convention applies to your code around a contract, never to the contract
itself:

- **Callbacks with a positional contract** keep it: `reduce`, `sort`,
  middleware `(req, res, next)`, and hooks or transactions a library calls
  positionally.
- **Express error handlers** keep all four parameters
  `(err, req, res, next)`, even when `next` is unused. Express recognises an
  error handler by `fn.length === 4`; with fewer parameters it runs as plain
  middleware and errors skip it.
- **NestJS** classes keep constructor injection (one parameter per injected
  provider), parameter properties, enums, static-only classes, and empty
  constructors the framework needs.
- **Framework-loaded files** default-export: Next.js `page`, `layout`,
  `template`, `loading`, `error`, and `not-found` files, Expo Router screens,
  and tool config files such as `vite.config.ts`. Next.js `route.ts`
  handlers stay named (`GET`, `POST`).
- **Route folders** keep the router's file names: `$id.tsx`, `[id].tsx`,
  `(group)`, `_layout.tsx`, `+not-found.tsx`.

## Conventions

Each reference holds the reasons, the fixes, and the lint rule names.

- **Functions and control flow**: at most two positional parameters, past
  that a single options object; functions up to 60 lines and files up to
  500, tests included; braces on every block; early returns over `else`; no
  nested ternaries; `for...of` over `.forEach`. See
  [functions and control flow](references/functions-and-control-flow.md).
- **Errors and async**: throw `Error` objects with a message, passing
  `cause` when rethrowing; every `async` function awaits; `console.error`
  and `console.info` only. See
  [errors and async](references/errors-and-async.md).
- **Types and modules**: `unknown` and narrowing over `any`, `!`, and
  `@ts-ignore`; `Array<T>`; `import type`; named exports; no barrel files;
  `@/` alias imports across folders; kebab-case file names. See
  [types and modules](references/types-and-modules.md).
- **React and Expo components**: components defined at module level, hooks
  at the top with complete dependencies, stable keys, semantic elements. See
  [React](references/react.md).

## When a linter flags one of these rules

Change the code to meet the rule. Raising a limit or adding a suppression is
for a framework contract only, and the suppression comment names the
contract, for example `biome-ignore lint/complexity/useMaxParams: the
transaction API is positional`. Each reference lists the usual fix per rule.

## Self-check

Done when every item holds for every file in the diff, except where the
repository's own rules or siblings decided otherwise. Each item reads: look
for this; fix it this way.

- A new file that differs from its siblings in name, location, exports, or
  imports: reshape it to the majority sibling.
- A function with three or more positional parameters: move them all into
  one options object.
- A function over 60 lines or a file over 500, tests included: split into
  named helpers or sibling files.
- A block without braces, an `else` after `return`, or a nested ternary:
  add braces, return early, or extract a helper.
- A `switch` without `default`, or `.forEach`: add the `default`, use
  `for...of`.
- A thrown non-`Error`, an `Error` without a message, or a rethrow without
  `cause`: throw `new Error(message, { cause })`.
- An `async` function with no `await`: drop `async`.
- `any`, `!`, `@ts-ignore`, or `console.log`: narrow from `unknown`, check
  and throw, fix the type, or log with `console.error` or `console.info`.
- A type-only import without `import type`, a built-in without `node:`, or
  a `../` import across folders: fix the import.
- A default export outside a framework-loaded file, a barrel file, or a
  file name not in kebab-case: export by name, import from the defining
  module, rename the file.
- In React: a component defined inside another, a hook in a condition, an
  incomplete dependency list, or an index key: apply
  [React](references/react.md).
- A suppression you added that names no framework contract: remove it and
  fix the code.

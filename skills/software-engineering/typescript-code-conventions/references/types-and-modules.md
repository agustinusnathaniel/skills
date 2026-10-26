# Types and modules

Read this when declaring types, adding imports or exports, creating a file,
or when one of the rules below fails. Rule names are Biome first, then the
ESLint-family equivalent where one exists.

## Types

- Values of unknown shape are `unknown`, narrowed with a type guard or a
  schema before use. `any`, the non-null assertion `!`, and `@ts-ignore`
  each hide a real question: answer it with narrowing, an explicit check
  that throws, or a corrected type.
- Arrays are written `Array<T>` and `ReadonlyArray<T>`.
- Unions of string literals or `as const` objects replace `enum` (NestJS
  keeps its enums; see "Framework contracts" in the skill); ES modules
  replace `namespace`.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| No `any` | `suspicious/noExplicitAny` | `@typescript-eslint/no-explicit-any` |
| No `!` | `style/noNonNullAssertion` | `@typescript-eslint/no-non-null-assertion` |
| No `@ts-ignore` | `suspicious/noTsIgnore` | `@typescript-eslint/ban-ts-comment` |
| `Array<T>` | `style/useConsistentArrayType` (`syntax: generic`) | `@typescript-eslint/array-type` (`default: generic`) |
| No `enum`, `namespace` | `style/noEnum`, `style/noNamespace` | `no-restricted-syntax` (`TSEnumDeclaration`), `@typescript-eslint/no-namespace` |

## Compiler settings

Code compiles under `strict` with `noUnusedLocals`, `noUnusedParameters`,
and `noFallthroughCasesInSwitch`. A parameter kept for a positional contract
but unused takes a leading underscore: `(_req, res)`. Under
`verbatimModuleSyntax`, type-only imports must say so.

## Imports

- Type-only imports and exports use `import type` and `export type`.
- Node built-ins use the `node:` protocol:
  `import { readFile } from 'node:fs/promises'`.
- Import the names you use; `import * as` stays for libraries documented
  that way.
- Imports across folders use the project alias (`@/lib/...`); `./` stays for
  files in the same folder.
- Groups, separated by a blank line: URLs, Node built-ins, and packages;
  then alias imports; then relative imports.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| `import type` | `style/useImportType`, `style/useExportType` | `@typescript-eslint/consistent-type-imports`, `@typescript-eslint/consistent-type-exports` |
| `node:` protocol | `style/useNodejsImportProtocol` | `unicorn/prefer-node-protocol` |
| Named imports | `performance/noNamespaceImport` | `import/no-namespace` |
| Alias over `../` | none | `no-restricted-imports` with a `../*` pattern |
| Import groups | `assist/source/organizeImports` groups | `import/order` |

## Exports

- Every export is named, so a rename shows up at every import site. A file
  the framework loads by default export is the exception (see the skill).
- Each module exports its own code and imports what it needs from the
  module that defines it. Files that only re-export others (barrel
  `index.ts` files) and re-exported imports stay out.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| Named exports | `style/noDefaultExport` | `import/no-default-export` |
| No barrel files | `performance/noBarrelFile` | `barrel-files/avoid-barrel-files` |
| No re-exported imports | `style/noExportedImports` | none |

## Files and formatting

- File names are kebab-case: `user-profile.tsx`, `use-auth.ts`. Route
  folders keep the router's names.
- Without a formatter: single quotes and two-space indentation.

Rule: `style/useFilenamingConvention` (`filenameCases: ["kebab-case"]`);
`unicorn/filename-case` (`case: kebabCase`).

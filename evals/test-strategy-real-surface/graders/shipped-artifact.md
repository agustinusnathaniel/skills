---
type: llm
---

Pass only if the plan verifies the fix through what users actually run: the built
`dist/` output or a packed/installed copy of the `mycli` package (for example
`pnpm pack` installed into a temporary project), rather than accepting the
source-level `node ./src/cli.ts` run as sufficient. It must also state the observable
result that would show the bug is fixed.

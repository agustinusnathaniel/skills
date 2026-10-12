---
type: llm
---

Pass only if the reduced file (1) still requires a changeset for changes under
`packages/` and keeps the exception for `packages/internal-*`, (2) still forbids
force-pushing to `main` with mandatory strength, not a softened suggestion, (3) states
the run-tests-before-commit rule once rather than twice, and (4) still says to use pnpm.

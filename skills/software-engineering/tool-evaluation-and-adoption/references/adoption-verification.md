# Adoption Verification: Measure, Don't Assume

Post-decision workflow: once adoption is approved, the deliverable is measured evidence — not a re-litigation of the verdict.

## Principle: Explicit Approval Overrides Prior Rejection

When the user explicitly says "adopt X" after a prior no-go, implement the adoption and let the resulting code, UX, bundle numbers, and tests speak. Do not conclude "should not be adopted" again from reasoning the user already overruled. The evaluation lesson that survives: verify edge-case behavior during integration, not as a rejection gate.

## Measure Impact Before/After Against a Clean Control

1. Build the branch and record the affected output sizes (raw + compressed — report both).
2. Build a control from the clean base branch in a separate worktree (`git worktree add /tmp/<repo>-control <base>`), install, and build there. A stash is not a control — build artifacts and dependency state leak across it. The control build doubles as proof that any failing step is pre-existing, not a regression.
3. Report the delta table with code-splitting context: a lazily-loaded route chunk is paid only by that route — a large lazy chunk can be acceptable where the same size in the global bundle is not.

Done when: before/after numbers exist for the affected surfaces, measured against a clean-tree control build.

## Verify Dependency Semantics During Integration

Library metadata fields routinely surprise: count fields that include context, parsers that treat trailing newlines as changes, barrel imports that defeat tree-shaking unless the package declares side-effect-free modules. Check the package's `sideEffects` field, import only the symbols needed (especially from background-worker entry points), and verify the built output — never the source layout — for framework leakage.

Done when: the built output is inspected for unexpected weight and every surprising semantic is covered by a test.

## Clean Up

Remove the control worktree when finished (`git worktree remove --force`, or `git worktree prune` if removal is blocked in the current environment). Control worktrees live outside the repo and are harmless if left behind — never use destructive commands to remove them without authorization.

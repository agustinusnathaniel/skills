---
name: test-strategy
description: >
  Use when deciding what to test or verify for a change and at which boundary
  (unit, integration, E2E), planning failure-first coverage, requiring
  artifact-producing E2E for complex features, or judging whether existing tests
  earn their keep.
---

# Test Strategy

Choose the smallest test boundary that proves the observable behavior at risk.
For complex features, prefer repeatable end-to-end coverage where practical,
especially when a failure crosses system boundaries or only the assembled
product can expose it. A smaller boundary is cheaper and clearer for a local,
stable failure mode; account for end-to-end runtime and flakiness costs.

## Establish the failure contract

Before choosing checks or changing behavior, state the externally observable
result and invariant at risk. Identify plausible failure modes, then select
only the cases that expose a real gap at the chosen boundary.

## Check, implement, verify

When practical, express the most important gap as the smallest meaningful
check and run it before the fix to confirm it can expose the failure. Then
implement the change and rerun that check plus relevant existing verification.
This is a useful red-before-green tactic, not a requirement to use test-driven
development on every change. If a check cannot run or fail before new behavior
exists, keep the failure contract explicit and verify the observable result
after implementation.

Verify where the user observes the result: the built or published artifact, the
real host or service, the rendered UI. A local wrapper or internal helper passing
shows only that the wrapper works. Before reporting a path as unverifiable,
attempt its cheapest real run, such as an isolated temporary project or a local
or sandbox host, and report the gap with that attempt's failure.

Substitute only what crosses the process boundary. Run storage for real, in
memory or in a container (for example `fake-indexeddb`), since mocks miss
key-path, constraint, and partial-update semantics. Stub the network at the
request layer and fail on unhandled requests. Take expected values from the
real consumer, such as the host's live command or tool registry, not from the
constant the code under test also reads; a self-consistent test cannot see
drift. A test that needs a build fails with a build instruction when the
artifact is missing, rather than skipping.

When a change turns an existing test red, fix the code, or change the test with
a stated reason its contract no longer holds. Loosening assertions, lowering
thresholds, or deleting the test to get green hides the regression it caught.

Each test, fixture, or script earns its place by protecting an in-scope
behavior or failure mode. Tests that restate the implementation, snapshots
without a defensible behavior contract, and regression tests without a genuine
gap fail that bar. Remove an existing test only when a named check at another
boundary catches the same failure or its contract is obsolete; use the
`prune-codebase` test audit when available.

For complex behavior where end-to-end coverage is the chosen boundary, make
the run repeatable and record its setup, action, expected observable result,
and artifact location. Keep artifacts limited to relevant, redacted evidence.
For retried external effects, durable workflows, or compatibility risks, use
[workflow failure guidance](references/workflow-failures.md). For UI state
changes involving navigation, async state, permissions, sessions or accounts,
or keyboard and focus, use [UI state guidance](references/ui-state-verification.md).

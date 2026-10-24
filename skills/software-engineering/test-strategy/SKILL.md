---
name: test-strategy
description: >
  Use when deciding what to test or verify for a change and at which boundary
  (unit, integration, E2E), reproducing a bug before patching it, planning
  failure-first coverage, requiring artifact-producing E2E for complex
  features, judging whether existing tests earn their keep, or planning an
  eval before changing prompts or model settings.
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

## Reproduce before patching a bug

Before patching a bug, reproduce it with the cheapest failing check at the
smallest boundary that shows it, run at the current head. When it does not
reproduce, leave the code unpatched and report the evidence you gathered.

Keep that reproduction as a regression test only when it guards a real
production failure that existing behavior tests do not cover. Otherwise it has
done its job once the fix turns it green.

## Check, implement, verify

For new behavior, when practical, express the most important gap as the
smallest meaningful check and run it before the change to confirm it can
expose the failure. Then implement the change and rerun that check plus
relevant existing verification. This is a useful red-before-green tactic, not
a requirement to use test-driven development on every change. If a check
cannot run or fail before new behavior exists, keep the failure contract
explicit and verify the observable result after implementation.

When a runtime error got past type checks, tests, and the build, ask why, and
add integration or end-to-end coverage for that class of failure. A
concurrency fix needs real concurrency in its test; a change to a remote call
needs one real end-to-end call. Confirm in CI at the current head that new
tests actually ran.

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
artifact is missing, rather than skipping. Assert at the boundary that
survives serialization (the response body, the serialized message payload,
the arguments reaching a client), not the object one layer above it; a value
that cannot cross that boundary has no behavior to test.

Before adding a test, find what already covers the behavior at every boundary
and extend that test with an assertion or case. "Fails without the fix" can be
shown with an existing or extended test. Test every claim the change makes: a
guard described as the real protection gets a case for each bad shape it
rejects, and a new blocking condition is tested in both directions (blocked,
then a retry that succeeds). When a coverage gate flags a branch for a state
production cannot reach, simplify the guard rather than adding a test. Fix a
flaky timing assertion by anchoring it to the values the code actually used,
not by widening the tolerance.

Before replacing an implementation with simpler code or a different library,
pin today's output with a characterization test across its edge cases that
passes before and after the swap.

Before changing model-driven behavior or its latency settings (prompt or
schema sections, step caps, effort or model choice), run an eval before
opening the PR: named arms (the current setting and each candidate), realistic inputs
from fixtures or staging only, and repeated runs per arm alongside a fresh
control. Decide the stop rule first: if a candidate is clearly worse, stop and
report instead of shipping it.

When a change turns an existing test red, fix the code, or change the test with
a stated reason its contract no longer holds. Loosening assertions, lowering
thresholds, or deleting the test to get green hides the regression it caught.

Each test, fixture, or script earns its place by protecting an in-scope
behavior or failure mode. Every kept test names the production failure it
catches and uses only inputs production can produce; say so in the PR
description. Delete tests that are tautological (asserting a mock's output, a
fake's behavior, or a logger's call shape), that cover states production cannot
reach (remove the unreachable branch too), or that duplicate another test.
Snapshots without a defensible behavior contract and regression tests without a
genuine gap fail the same bar. Keep a test that guards data loss, account
takeover, rollback, a run that cannot finish, or a fixed production bug
whenever no other test catches that failure. Remove any other existing test
only when a named check at another boundary catches the same failure or its
contract is obsolete; use the `prune-codebase` test audit when available.

Fakes behave like the dependency they replace, with its semantics, error
codes, and API shapes. A guard's test fails when the guard is deleted. Assert
only what the design requires, and scope any test-only switch to the narrowest
test that needs it, never the whole suite.

For complex behavior where end-to-end coverage is the chosen boundary, make
the run repeatable and record its setup, action, expected observable result,
and artifact location. Keep artifacts limited to relevant, redacted evidence.
For retried external effects, durable workflows, or compatibility risks, use
[workflow failure guidance](references/workflow-failures.md). For UI state
changes involving navigation, async state, permissions, sessions or accounts,
or keyboard and focus, use [UI state guidance](references/ui-state-verification.md).

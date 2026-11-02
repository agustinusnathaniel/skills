---
name: test-strategy
description: >
  Choose what to test or verify for a change, and at which boundary. Use when
  reproducing a bug before fixing it, choosing unit, integration, or
  end-to-end coverage, judging whether existing tests earn their keep, or
  changing prompts or model settings.
---

# Test Strategy

Choose the smallest test boundary that proves the observable behavior at risk.
When a failure crosses system boundaries or only the assembled product can
expose it, prefer repeatable end-to-end coverage that ends in a reproducible
artifact over many unit tests, weighing its runtime and flakiness.

## Establish the failure contract

Before choosing checks or changing behavior, state the externally observable
result and invariant at risk. Identify plausible failure modes, then select
only the cases that expose a real gap at the chosen boundary.

## Fail first

Before patching a bug, reproduce it with the cheapest failing check at the
smallest boundary that shows it, run at the current head. When it does not
reproduce, report the evidence you gathered rather than patching on a guess;
if the user still wants a defensive fix, make it and label it unverified.
Keep the reproduction as a regression test unless an existing test already
pins the behavior.

For new behavior, when practical, run the smallest meaningful check before
the change to confirm it can expose the failure, then implement and rerun it
with the relevant existing verification. If a check cannot fail before the
behavior exists, verify the observable result afterwards.

## Prove behavior at the real boundary

Verify where the user observes the result: the built or published artifact,
the real host or service, the rendered UI. A wrapper, helper, or mocked next
hop passing proves only that piece. Prove each behavior the change relies on
where it happens:

- A parameter reaches the server; a client library can drop it.
- A wrapper throws; some return a failure result instead.
- A library applies new config to existing resources, not only new ones.
- An event or broadcast fix reaches the client through every gate on the send
  path (flags, membership, expiry, counters) and survives every job that
  clears that state.
- Error copy keyed by an error code is true at every place the server throws
  that code.

A concurrency fix needs real concurrency in its test, and a remote-call change
one real or sandbox call where one exists. When a runtime error got past type
checks, tests, and the build, add coverage for that class of failure at the
boundary that would have caught it. Before calling a path unverifiable,
attempt its cheapest real run (an isolated temporary project, a local or
sandbox host) and report that attempt's failure.

Substitute only what crosses the process boundary. Run storage for real, in
memory or in a container, since mocks miss key-path, constraint, and
partial-update semantics; a faithful in-memory implementation (in JavaScript,
`fake-indexeddb`) is the next best when the real store cannot run. Stub the
network at the request layer and fail on unhandled requests. Fakes behave like
the dependency they replace, with its semantics, error codes, and API shapes.
Take expected values from the real consumer (the config or routing table the
system actually reads), not from the constant the code under test also reads;
a self-consistent test cannot see drift. A test that needs a build fails with
a build instruction when the artifact is missing, rather than silently
skipping. Assert at the boundary that survives serialization (the response
body, the serialized message payload, the arguments reaching a client), not
the object one layer above it.

## Write and change tests

Before adding a test, find what already covers the behavior at every boundary
and extend that test with an assertion or case. Test every claim the change
makes: a guard described as the real protection gets a case for each bad
shape it rejects, and a new blocking condition is tested in both directions
(blocked, then a retry that succeeds).

Assert only what the design requires, and assert it exactly: exact call
arguments over partial matchers. A guard's test fails when the guard is
deleted. Fix a flaky timing assertion by anchoring it to the values the code
actually used, not by widening the tolerance. Scope a test-only switch to the
narrowest test that needs it.

Change an existing test only when the behavior it encodes changed on purpose,
and state why. When a change turns a test red, fix the code; loosening
assertions, lowering thresholds, or deleting the test hides the regression it
caught.

Before replacing an implementation, a library, a build tool, or a test runner,
pin today's output with a characterization test that passes before and after
the swap; for the checks the old tool ran implicitly, see "Swaps and
optimizations lose no signal" in `challenge-every-guard`.

Model-driven behavior (prompts, schemas, model or effort settings) is judged
by an eval rather than unit tests: compare the current setting with each
candidate on realistic, non-production inputs, repeated per arm, and decide
in advance what result would stop the change.

## Keep only tests that earn their place

Every test you add names the production failure it catches and uses only
inputs production can produce; say so in the PR description. Delete tests
that are tautological (asserting a mock's output, a fake's behavior, or a
logger's call shape), that cover states production cannot reach (remove the
branch too, including when a coverage gate flags it), or that duplicate
another test. Snapshots and change detectors without a defensible behavior
contract fail the same bar. Keep a test that guards data
loss, account takeover, rollback, a stuck job, or a fixed production bug
whenever no other test catches that failure. Remove any other existing test
only when a named check at another boundary catches the same failure or its
contract is obsolete; use the `prune-codebase` test audit when available.

For complex behavior where end-to-end coverage is the chosen boundary, make
the run repeatable and record its setup, action, expected observable result,
and artifact location. For retried external effects, durable workflows, or
compatibility risks, use
[workflow failure guidance](references/workflow-failures.md). For UI state
changes involving navigation, multi-step flows, async state, permissions,
sessions or accounts, or keyboard and focus, use
[UI state guidance](references/ui-state-verification.md).

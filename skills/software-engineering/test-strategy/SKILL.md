---
name: test-strategy
description: >
  Use when choosing unit vs E2E vs isolated testing, planning failure-first
  coverage, or requiring artifact-producing E2E for complex features.
---

# Test Strategy

Choose the smallest test boundary that pins a genuine behavior gap, with a
preference for E2E coverage on complex features where feasible.

## Avoid low-value tests

Retire or avoid tautological tests that restate the implementation, so a
rewrite that preserves behavior does not break the suite. Retire or avoid
change-detector tests that snapshot output without a behavior contract the
reader can defend. Avoid adding a regression test for a bug fix unless it
names the genuine behavior gap it would have caught.

## Work failure-modes-first

Avoid writing isolated unit tests after the code as routine practice. Instead:

1. List how the system could fail (wrong input, missing dependency, ordering,
   concurrency, partial failure).
2. Write the smallest code that handles those modes.
3. Pin the modes that matter with tests at the chosen boundary.

When isolated testing is needed, enumerate failure modes first, then test the
modes with a real behavior gap.

## Prefer artifact-producing E2E where feasible

For complex features, prefer E2E as the primary mechanism where feasible:
exercise the built entry point in an isolated environment and produce a
verifiable repeatable artifact (script output, report, state diff, recording,
or log excerpt).

Each E2E states its setup, action, expected observable result, and where the
artifact lives.

## Tradeoffs

E2E coverage costs more to run and can be flaky; when the failure mode is
local and stable, a smaller boundary is cheaper and clearer. Choose the
boundary that catches the risk with the least ownership cost.

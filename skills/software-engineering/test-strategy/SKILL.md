---
name: test-strategy
description: >
  Use when choosing unit vs E2E vs isolated testing, planning failure-first
  coverage, or requiring artifact-producing E2E for complex features.
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

Avoid tautological tests that restate implementation, snapshots without a
defensible behavior contract, and regression tests that do not protect a
genuine gap. Do not create tests, fixtures, or scripts solely to satisfy a
sequence; each should protect an in-scope behavior or failure mode.

For complex behavior where end-to-end coverage is the chosen boundary, make
the run repeatable and record its setup, action, expected observable result,
and artifact location. Keep artifacts limited to relevant, redacted evidence.
For retried external effects, durable workflows, or compatibility risks, use
[workflow failure guidance](references/workflow-failures.md). For UI state
changes involving navigation, async state, permissions, sessions or accounts,
or keyboard and focus, use [UI state guidance](references/ui-state-verification.md).

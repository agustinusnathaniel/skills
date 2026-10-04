# Workflow Failure Checks

Read this reference when a change involves retries, external side effects,
durable checkpoints or resumption, or compatibility with previously accepted
payloads or state. Apply only the checks that match the failure contract.

## Choose observable transitions

State which effects may repeat, which state must survive interruption, and
what callers observe for retryable and terminal failures. Test transitions
that could violate those promises:

- **Concurrent duplicates:** overlap deliveries for one logical operation and
  check the documented duplicate-handling guarantee, such as one effect or
  safe repeated effects.
- **Interruption around an effect or checkpoint:** fail immediately before
  and after the boundary when either point can leave ambiguous progress; then
  inspect durable state and external-effect evidence.
- **Replay or resume:** retry or resume the same work and verify that required
  effects are neither lost nor repeated beyond the documented guarantee, and
  that completion is reported only when its invariant holds.
- **Error semantics:** check that retryable and terminal failures remain
  distinguishable to the caller and that persisted status matches the
  observed outcome.
- **Compatibility:** feed representative earlier payloads or saved state
  through the supported upgrade path and check either preserved meaning or a
  deliberate, stable rejection.

Use deterministic fault injection or a controlled external-effect seam to
place failures at the relevant boundaries. Do not assume exactly-once effects
unless the contract promises them; verify the actual guarantee. Combine cases
when one repeatable run exposes the same invariant, and skip transitions the
change cannot affect.

## Bound the evidence

For an artifact-producing check, retain only enough evidence to reproduce and
judge the contract: the transition sequence, observed state, effect count or
record, and returned outcome or error. Use synthetic inputs. Redact secrets
and user data, and keep traces or logs to relevant excerpts rather than full
runtime dumps. An artifact supports review; it does not replace checking the
asserted state and effect directly.

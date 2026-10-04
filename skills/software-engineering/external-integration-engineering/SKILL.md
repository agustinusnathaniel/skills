---
name: external-integration-engineering
description: >
  Plan, build, or audit webhook and external API workflows with retried
  mutations, duplicate events, uncertain outcomes, or local publication gaps.
  Excludes read-only API calls and provider setup.
---

# External integration engineering

Preserve the business intent across every boundary between the application and an external provider. Start by identifying the side effect, the state that is authoritative, what counts as a duplicate, and what the caller must be able to know after a failure.

For planning, building, or auditing, inspect the current implementation and the provider's official documentation for the exact API and SDK in use. Verify the guarantee's scope and retention, payload constraints, supported lookups, authentication protocol, delivery behavior, and SDK retry policy. State observed behavior separately from proposed contracts. Label a contract as proposed until repository evidence shows it already exists.

Model a stable business intent separately from each network attempt and each callback delivery. Reuse the same provider key only for an unchanged intent while the provider documents that the guarantee remains valid. After that window, use a supported lookup; when no authoritative lookup or guarantee applies, preserve an unknown outcome for reconciliation instead of blindly repeating a potentially completed mutation.

Authenticate callbacks with the provider's documented protocol or SDK, using the original request bytes when required. If processing is asynchronous, acknowledge only after verified work is durably accepted. Deduplicate repeated deliveries separately from business effects, preserving distinct legitimate transitions of the same operation, and atomically coordinate local deduplication with the corresponding local state transition when they share a transaction boundary. Choose event snapshots and event time or a current provider read according to the meaning the application must preserve. Do not refetch every event by default.

When local commit and publication can diverge, establish a durable handoff, such as a transactional outbox, change-data capture, or an existing equivalent that closes that gap. Neither makes a remote provider mutation atomic with the local database; model that workflow as a recoverable sequence with explicit pending, completed, failed, or unknown outcomes.

Read [recovery decisions](references/recovery-decisions.md) when retries cross a guarantee window, callbacks can be duplicated or delayed, publication can fail, or an operator needs to repair or reconcile state. Use the project's existing testing guidance when available; otherwise prove the selected contract with a small set of behavior checks. Do not require a particular test tool or add a testing dependency just for this workflow.

## Acceptance evidence

Show evidence for the boundaries the selected integration actually uses; do not introduce callbacks or publication infrastructure merely to satisfy this list:

- Where the provider supports idempotency, an unchanged intent cannot create a second effect while the documented guarantee is valid; expired or ambiguous attempts go through supported lookup or remain explicitly unknown.
- A callback is authenticated and durably accepted before an asynchronous acknowledgment, and repeated delivery does not repeat the business effect.
- Event-time facts retain their required meaning, while current-state reads are used only when current provider state is the required meaning.
- A committed local change can be published after a process failure, and repair has a bounded, inspectable path for provider lag, missed callbacks, and unknown outcomes.

# Recovery decisions

Load this reference when an outcome is ambiguous, callback delivery or local publication can fail, or the design needs an operator repair path. Confirm every provider-specific behavior against its current official documentation and the exact SDK version in use.

## Mutation retries and unknown outcomes

Before relying on an idempotency key or automatic SDK retry, establish the provider's actual scope, retention window, parameter or payload binding, behavior for concurrent requests, and responses for failed attempts. Check the SDK's configured retry count, timeout behavior, and which errors it retries. An SDK retry is useful only when all retry layers preserve the same business intent and the provider's documented semantics make that replay safe.

Use the provider's same key for an unchanged semantic request only while the documented guarantee is valid. A changed intent or changed operation parameters need a distinct operation. A timeout or connection loss can leave the provider's result unknown if the request may have arrived; a client error is not proof that no side effect occurred unless the provider documents that conclusion.

After the key's guarantee expires, query the provider through a documented lookup or reconciliation interface when available. Compare the authoritative result with the intended operation before updating local state. If lookup is unsupported, inconclusive, or still within a documented consistency delay, keep the outcome unknown and retry reconciliation within an explicit time and attempt budget. Escalate unresolved cases for an operator decision; do not infer failure from silence or create another mutation blindly.

Keep business intent, individual attempts, and provider outcomes distinct in local reasoning and evidence. An attempt records one effort to carry out an intent. Retrying that attempt must not silently become a new intent, and a new intent must not inherit an old key merely because it resembles an earlier request.

## Callback acceptance and effects

Follow the provider's signature or authentication protocol and verification SDK. Preserve the request's original bytes for verification when the protocol requires them. Check documented timestamp or replay protections and secret rotation procedures rather than inventing a universal signature rule.

When a callback is handled asynchronously, persist the verified receipt or enqueue it durably before acknowledging it. If durable acceptance fails, return the response that the provider's documented redelivery behavior expects. Once accepted, acknowledge duplicate deliveries using a stable provider delivery identity where one is documented. If none exists, use only provider-documented distinguishing data for a fallback and state its collision limits.

Delivery deduplication prevents processing the same notification repeatedly. Business-effect deduplication prevents two distinct notifications or worker retries from applying the same local transition twice. Define that effect identity at the intended action, transition, or revision. An operation or resource ID alone may be too broad: it must not suppress later legitimate changes to the same operation. Coordinate the effect marker and local state transition atomically when they share a database transaction. If the effect crosses another boundary, give that boundary its own durable idempotency and recovery behavior.

Choose which event representation to apply based on the domain meaning. Use a verified event snapshot and its event time when the required fact is what happened at that time. Fetch current provider state when the required fact is the provider's latest state. A fetch can hide an intermediate event; a snapshot can be stale. Where events can arrive out of order, use documented provider sequence or version information when available, or make local transitions reject stale regressions. Do not assume event identifiers imply ordering.

## Local publication and remote mutations

When local state and a local message must commit together, use an outbox written in the same database transaction or change-data capture that observes the commit. Ensure publishers can retry and consumers can handle duplicate publication. Verify that the selected outbox or CDC mechanism actually closes the local commit-to-publication gap in this system.

An outbox can durably schedule a remote provider call, but it cannot atomically commit that call and a local database change. Model the remote call as a separate workflow step. Persist enough state to resume after a crash, use provider idempotency only within its actual scope and lifetime, and reconcile ambiguous results before deciding whether another call is safe.

## Repair and retained evidence

Define when automatic retries stop, how provider lag affects the repair clock, which supported lookup or report can reconcile state, and who resolves an unknown result that cannot be established automatically. Detect aged pending work, repeated failures, mismatches, and missing expected callbacks. Use bounded backoff and a clear terminal or operator-review state so an item cannot retry forever or disappear silently.

Retain the minimum redacted evidence needed to correlate an intent, attempts, provider result, and callback processing. Useful evidence may include provider references, relevant event and receipt times, verification outcome, a payload fingerprint or selected normalized facts, and the local transition or repair decision. Bound retention and access. Keep raw payloads only when a concrete recovery or audit requirement justifies them, with appropriate protection and a defined retention period.

For a focused behavior proof, exercise the failure branches that the design claims to handle: replay of the same unchanged intent within the provider guarantee, a timeout with an uncertain result, duplicate and delayed callbacks, a failure after durable acceptance but before processing, and a crash after local commit but before publication. Also verify the documented path for recovery after the provider's idempotency window. Use repository testing guidance if present; keep checks tied to observable outcomes and the chosen implementation.

## Public primary references

These are examples of provider-specific contracts, not universal guarantees. Check the current documentation for the provider and SDK used by the integration.

- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)
- [Stripe webhooks](https://docs.stripe.com/webhooks)
- [AWS transactional outbox pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html)
- [GitHub handling failed webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries)

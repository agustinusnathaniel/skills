---
name: webhook-integration
description: >
  Build or fix server-side integrations with external providers. Use when
  handling payment or other webhook callbacks, settling, refunding, or
  reconciling payments with a gateway, calling partner or government APIs with
  rate limits or ordering rules, retrying queue messages for external calls,
  caching service-to-service tokens, or writing scheduled sync jobs.
---

# Webhook Integration

External systems retry, reorder, time out, and change shape on their own
schedule. Design each integration so any message can arrive twice, late, out
of order, or partially, and every outcome is recoverable without guessing.

## Start from the provider's real contract

Get the provider's sandbox payloads, signature scheme, status lifecycle, and
retry policy before writing the handler. Read success from the field the
provider defines, not from the HTTP status. Respond in the provider's expected
shape and status code, outside your own API envelope. Verify the signature or
shared secret before any side effect.

## Decide what is authoritative

Only a verified server-to-server event, or the provider's status API queried
from the server, changes payment state. The browser's return redirect and
anything the client sends are display hints. Compare the amount and currency
in the event with what your system recorded for that order, and reject or
hold mismatches.

## Record, then apply once

1. Store the raw event under a unique constraint on the provider and its
   event identifier, before acting on it. A duplicate returns the stored
   result.
2. Check the provider's success field and the event's place in the status
   lifecycle; ignore transitions out of a terminal state.
3. Apply the effect in one transaction, locking the rows it changes.

Keep event deduplication separate from operation identity. The same
operation can arrive as several distinct events (a notification and a later
status query), and one order can legitimately carry several operations (two
partial refunds). Key the business effect on the operation. Status filters
alone ("only unpaid items") let a partial-payment replay apply twice.

## Reconcile and correct

- Give a pull path, querying the provider's status API, the same apply step
  as the webhook, so a missed event is recovered rather than re-implemented.
- Record refunds, chargebacks, and reversals as new adjustment events against
  the original payment, never by editing it.
- Route events that cannot be matched to an order or operation to a review
  queue that changes no balances, and make sure something reads that queue.

## Call partners within their limits

- Match concurrency to the partner: rate-limited or ordering-sensitive APIs
  get one worker and a delay, not the default fan-out.
- Retry a bounded number of times with backoff, then park the message in a
  durable store with its error, and republish from there. Acknowledge each
  message exactly once and clear its retry state when it settles.
- A cached service token that embeds identity claims goes stale when those
  identities change. Refresh it after the steps that create or change them,
  and clear it on logout.

## Make scheduled jobs re-runnable

A missed or failed run is routine. Make each job idempotent for its period,
for example rebuilding a snapshot for one date inside a transaction, expose an
authenticated manual trigger, and alert on completion and failure.

## Verify the unhappy paths

Done when each changed path has a check for: the same event twice, an invalid
signature, an amount mismatch, a partial amount, events out of order, a
redirect without a webhook, a webhook without a redirect, a provider timeout
followed by its retry, a failure after the first side effect, two partial
refunds on one payment, and a job re-run for a period it already processed.

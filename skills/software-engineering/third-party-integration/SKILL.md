---
name: third-party-integration
description: >
  Build or fix server-side integrations with external providers. Use when
  handling payment or webhook callbacks, calling partner or government APIs
  with rate limits or ordering rules, consuming or retrying queue messages
  for external calls, caching service-to-service tokens, or writing scheduled
  jobs that sync or reconcile with a provider.
---

# Third-Party Integration

External systems retry, reorder, time out, and change shape on their own
schedule. Design each integration so any message can arrive twice, late, or
partially, and every outcome is recoverable without guessing.

## Start from the provider's real contract

Get the provider's sandbox payloads, signature scheme, and documented
responses before writing the handler. Read success from the field the provider
defines, not from the HTTP status. Respond in the provider's expected shape
and status code, outside your own API envelope. Verify the signature or shared
secret before any side effect.

## Record, then apply once

1. Store the raw callback with the provider's reference under a unique
   constraint before acting on it.
2. Check the provider's success field.
3. Apply side effects in one transaction, locking the rows they change.
4. Return the stored result when the same reference arrives again. Status
   filters alone ("only unpaid items") let a partial-payment replay apply
   twice.

Take amounts from the callback and compare them with what was expected.
Record mismatches in a state that a reconciliation job or an operator queue
actually reads; a marker nothing consumes is lost.

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

Done when each changed path has a check for: the same callback twice, a
partial amount, callbacks out of order, a provider timeout followed by its
retry, a failure after the first side effect, and a job re-run for a period
it already processed.

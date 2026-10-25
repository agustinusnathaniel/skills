# Backend Change Checklist

Failure classes that recur when a backend change touches shared records,
background work, events, queries, or deploys. Each item is a candidate, not a
mandate: for every section the diff touches, tier each item by evidence like
any other guard, then record where the change handles a **real** one or why
an item does not apply.

Related skills own neighbouring checks: `client-trust-boundary` for
caller-supplied ids and authorization, and `config-drift` for whether a deploy
or config change took effect.

## Writes to shared records

- Re-read the record from its source of truth before acting on it; a copy held
  elsewhere may be stale.
- Put each checked precondition in the write's own condition, such as a
  conditional update or a `WHERE` clause. A separate read, then write, lets
  the state change between the two.
- Write only the fields that changed, or fence the write with a version.
  Writing back a whole record read earlier overwrites concurrent edits.
- Change one element of an array field with a single-document atomic
  conditional per-element update matched on the old value, where the store
  supports it (With MongoDB: a positional update or `arrayFilters`), not a
  read, compare, and write-back of the whole array. A replay or a concurrent
  change then matches nothing.
- Before matching records across systems, confirm which identifier each one
  stores; two systems can key the same entity differently.
- Make a new API's inputs required at the boundary unless a default is
  deliberate and documented. It has no legacy callers, and optional inputs
  grow defaults nobody chose.

## Calls to other systems

- Give every outbound call made from a job or consumer a timeout, so a hung
  dependency cannot stall the worker.
- A preflight check uses the same lookup and key as the operation it predicts;
  otherwise it approves cases the real path rejects.
- When another system sends a wrong value, fix it at its source before
  building on it. A local workaround drifts from the authority.

## Events and messages

- Make the state change and its event atomic, for example with an outbox
  table written in the same transaction. Publishing separately can lose the
  event, or report failure after the change has committed.
- Give each event type one owner and one typed payload definition, so
  producers cannot drift apart.
- Make consumers idempotent; deliveries repeat and arrive out of order.
- Acknowledge only final outcomes; make transient, lock, and stale-read
  failures retryable, since an ack drops the message.
- Before relying on redelivery, read the subscription's retry and dead-letter
  policy and the consumer library's error handling.
- Bound the work per delivery to what one lease or ack deadline covers.
- Before emitting an existing event in bulk or with a new meaning, check
  every subscriber, since each one reacts.

## Data and queries

- Ship each new query shape with the index it needs, and check its plan
  against production-sized data. A missing index passes tests and fails under
  load.
- Normalize values at write time with a one-time backfill, rather than in
  every query; query-time normalization usually defeats the index.
- Data scripts dry-run by default and write only with an explicit flag, so a
  mistaken run changes nothing.
- Size per-record work against the largest real records, not fixtures.

## Long-running work

- Save progress in the same write as the work it records, so a restart
  resumes instead of repeating or skipping.
- Bound concurrency and request rate to what the called dependencies allow.
- Log and retry a failure in derived or secondary data rather than failing
  the whole run.

## Audit and alerts

- Every path that changes data, including replays and repair scripts, writes
  the same audit entry; a path that skips it leaves changes nobody can trace.
- Name who acts on an alert before adding it. Alerts nobody owns teach people
  to ignore alerts.
- Give every state real users or data can get stuck in a way to detect it
  and a documented way out.
- Keep personal data, user content, and secrets out of logs.
- Fail closed when a safety input is missing, failed, or empty, rather than
  defaulting it to safe.
- Give every deliberately silent path (swallowed error, skip, give-up) a log
  line and a durable counter that a status or alert reads.

## Rollback

Rollback restores exactly what the forward change replaced, and states what
happens to records created after it ran. A rollback that restores too much
loses newer data.

## Deploy order and flags

- When services depend on each other, write the deploy order: consumers that
  accept a new shape deploy before producers that send it.
- A change to an existing shared path is live as soon as it deploys, so it
  must be safe with any new flag off.
- Keep a flag off until everything it depends on is live.

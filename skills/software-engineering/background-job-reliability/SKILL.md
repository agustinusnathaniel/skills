---
name: background-job-reliability
description: >
  Build or review work that runs with no user waiting: message and event
  consumers, queue workers, scheduled jobs, backfills, and batch or data-fix
  scripts. Use when deciding what a handler acks or retries, sizing work per
  delivery, writing counters or audit events from a job, adding a safety check
  or feature flag to a job's hot path, paging through a large collection, or
  running an irreversible backfill.
---

# Background Job Reliability

Background work fails where nobody is looking. The usual failure is silent: an
acked event that did nothing, a skip nobody counted, a dry run that reports 0
left because it never reached the rows. Make every outcome retried, counted,
or visible.

Skip this skill for request handlers with a user waiting. For callbacks and
calls to external providers, use `webhook-integration`; for import jobs a user
starts and watches, `bulk-import-engineering`. Whether a guard is warranted at
all is `challenge-every-guard`'s call, and its backend checklist already
covers outboxes, idempotent consumers, call timeouts, and saving progress in
the same write. This skill adds the failure modes that checklist does not.

## Ack only finished or permanent outcomes

- Returning success acks the message and drops it. Ack only finished work and
  permanent outcomes, such as a record that no longer exists. Transient
  failures, lock or lease contention, and reads that disagree with the event
  (a stale replica, an owner service that has not caught up) return a
  retryable error.
- Before relying on redelivery, read the subscription's retry and
  dead-letter policy (maximum deliveries, backoff, what happens after the
  last one) and the consumer framework's error handling. Some framework
  wrappers ack a thrown error themselves after a few attempts, and without a
  backoff policy a nacked message comes back immediately. When the event can be lost, fall back to the
  event's own payload, or trace a real recovery path (a command an operator
  can run, plus an alert) before naming one in the PR.
- A nack because something else holds the resource first releases any lease
  the handler took, then delays redelivery where the broker supports it
  (backoff policy, visibility timeout, delayed republish).
- Bound the work per delivery to what one lease covers: the ack deadline or
  visibility timeout, including any extension the client applies, which stops
  at a maximum. Past it the broker redelivers while the first run continues.
  Size the work from measured per-item latency and the largest real batch,
  and checkpoint per item or publish one message per item, so an expired
  lease costs a duplicate item rather than a second full walk.

## Write the delta through one path

- Membership-style events (join, leave, return) write only the affected
  entity's delta: reuse stored ids, skip entries already written, and filter
  in the query before taking per-item locks. A redelivery after one failed
  item then costs reads, not a full walk.
- Writes made under a lease or fence (item inserts, counter increments) carry
  the same fence condition as the progress write, inside the caller's
  transaction. Map each known outcome to a named counter field rather than
  building field names from strings, so a search finds every writer and an
  unknown outcome cannot write an empty key.
- A new operation plans its delta and commits through the existing writer, not
  a second pipeline. A storage helper shared by forward, retry, and rollback
  paths returns its raw result (moved, already there, absent, conflict), and
  each caller applies its own policy.
- Write a new audit event after the existing follow-ups (log line,
  notification), so a failed audit write loses only that event.

## Make failure loud

- A safety input that is missing, failed, oddly shaped, or an empty page is
  unknown, and unknown fails closed with a retryable error. Defaulting it to
  `false`, `0`, or `[]` turns an outage into "safe". A safety check never
  depends on which service deploys first.
- Every deliberately silent path (a swallowed error, a skip, a conflict, a
  give-up) logs the check name and status code, without personal data, and
  increments a durable counter on the run that a status field or alert reads.
  Simplification passes keep these counters.
- A deadline cancels the call itself, through the client's per-call deadline or
  cancellation. Racing the call against a timer leaves it and its connection
  open. A time budget covers the whole operation, hung I/O included.
- With a feature flag off, the hot path does no extra work: read the flag
  before any I/O or log line, and treat an unset, invalid, or failing flag as
  off. Test that the off path behaves exactly as before.
- A new lookup inside a pipeline that has already deleted or replaced data
  falls back to the previous result and logs on failure. A catch that returns
  null without logging hides the error.
- In a flow that owes a user a reply, a duplicate write or a visible conflict
  beats a silent success with no answer.

## Access data at the job's scale

- Create indexes for new query shapes at service start, whether or not the
  feature flag is on, so turning it on never runs unindexed.
- Per-row helpers reuse one shared connection or client and give each query a
  server-side time limit.
- Resolve many ids through one batch call, extending it when it lacks a needed
  match, rather than one call per item. Test that only unmatched items fall
  through to the slower path.
- A range cursor can match only its own type. MongoDB range operators
  type-bracket, so paging with `_id: {$gt: lastId}` and a string `lastId`
  matches only string ids and never visits documents whose `_id` is an
  ObjectId, while the run still ends with 0 to change. Count documents by id
  type before trusting a dry run on a mixed collection, and page each type
  with its own cursor.

## Prove backfills and guards on real cases

- An irreversible backfill runs for real on staging first: apply, sample the
  changed records, then dry-run again and see 0 left. Then dry-run in
  production; the production apply gets its own approval.
- When a guard keys on a failure count, check the never-attempted case beside
  it (the action skipped because a precondition was absent). Treat it the same
  or document the end state it leaves.
- Size scale tests, batch limits, and asks to other teams from the largest real
  past runs, not from a spec number.

## Report

Done when, for each handler or job the change touches, the report lists every
ack and retry outcome with why dropping or retrying it is safe, cites the
client's redelivery limit, names the log line and counter behind each silent
path, and, for any backfill, links the staging apply, the sample, and the
zero-left dry run.

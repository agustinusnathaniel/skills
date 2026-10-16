# Backend Change Checklist

Failure classes that recur in review of backend changes. Walk every section the
diff touches and record, per item, where the change handles it or why it does
not apply. For webhooks, payment providers, and partner APIs, also use the
`webhook-integration` skill.

## Owner records

- Re-read the owning service's record by id before acting on it. A copy held
  elsewhere is a cache.
- Put each checked precondition inside the write's filter, so the check and
  the write cannot drift apart.
- Write only the fields that changed, or fence the write by version. Writing
  back a whole record read earlier overwrites concurrent changes.
- Before matching records across services, check which id each service stores.
- A new API has no legacy callers: make its inputs required at the boundary.
- Never trust a caller-supplied id without an authorization check.

## Outbound calls

- Every outbound call in a job or consumer has a deadline.
- A preflight uses the same lookup and key as the path it predicts.
- When a signal from another system is wrong, fix it in the owning repository
  and land that fix before relying on it. An upstream authority wins over a
  local workaround.

## Events

- One owner, one constant, one typed payload, and a fixed source set by the
  server.
- Publish before returning, and fail the operation when the publish fails.
- Consumers are idempotent and re-read the owner rather than trusting the
  payload.
- Services holding copies update them from events, not from per-service sync
  calls.
- Before bulk-emitting an existing event, check every subscriber.

## Data and queries

- Every new query shape ships with its index built and its query plan on the
  PR before the flag turns on.
- Normalize at write time with a one-time backfill instead of querying
  case-insensitively.
- Scripts dry-run by default and write only with an explicit apply flag.
- One entity plus its progress record per transaction.
- Measure per-document work against the largest real documents, not fixtures.

## Background and scheduled work

- Long work runs on the owning service, saves progress in the same write as
  the work, and uses a shared rate limiter and a per-instance concurrency cap.
- A failure in derived data does not fail the run.
- Scheduled jobs take a lease or lock and are idempotent for their period.

## Audit, alerts, and logs

- Every data-changing path, including replay and repair, writes the same audit
  entry and log line.
- Before adding an alert, name who acts on it. When the caller already alerts,
  log context instead.
- Logs never contain personal data, user content, or secrets.

## Rollback

Rollback restores exactly what the forward run replaced and states what
happens to records created after the forward run.

## Deploy and flags

- Write the deploy order: consumers before producers.
- Flags stay off until every dependency is live.
- A change to an existing shared path is live on deploy, so it must be safe
  with the flag off.
- An irreversible capability gets its own flag.
- Every state a record can get stuck in has an alert and a documented way out.
- Bump published package versions past the base branch's latest.
- A trivially revertible model or config swap ships as a direct change; flags
  are for real kill switches such as a new data flow or new live behaviour.
- A green deploy action does not mean healthy instances; check the
  orchestrator. A CDN can take a while to reflect a deploy.
- Changing a metric's threshold, denominator, or eligibility needs a human
  decision.

## LLM calls

- Log the resolved model and the call duration.
- Use low reasoning effort for short, latency-sensitive calls.
- Keep system prompts byte-stable so prompt caching holds.
- When prompts live in a database behind flags, editing the constant in code
  may change nothing; find where the running prompt is read.

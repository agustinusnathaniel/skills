---
name: challenge-every-guard
description: >
  Size defensive code to evidence and fit a change to the codebase it lands in.
  Use when a change adds guards, retries, locks, fallbacks, validation, or new
  abstractions; when review rounds keep adding mechanism or a PR outgrows its
  feature; or when reviewing a backend change to services, jobs, events, or
  queries.
---

# Challenge Every Guard

Every guard is a claim that a failure happens. Keep the guards evidence
supports, place them where the sibling code places them, and delete the rest.

## Copy the sibling first

For every file the change touches, read three or more existing files of the
same kind and match the majority shape: naming and placement, imports, test
setup, fakes and fixtures, assertions, errors and logging, wiring, helpers.
When files disagree, follow the majority and name the minority drift instead
of copying it.

Before calling something "the convention", map the whole mechanism: every
importer and layer, middleware and environment toggles, how similar features
landed in git history, and the repository's contributor or agent instructions
and PR template. Compare side by side with two or three sibling features and
cite the line.

Prefer the platform's native option or a library the repository already uses
over hand-rolled code. A service gets the security mechanisms its siblings
have; adding or removing one is the owner's decision, not a side effect of
the change. Justify anything new in the PR body: a dependency, a second
configuration mechanism beside an existing one, an abstraction, an interface
with one implementation, test infrastructure, a new service. When it cannot
be justified, leave it out. Add no configuration, flag, or placeholder for a
feature that does not exist yet, and extend the original code rather than
copying it elsewhere.

## Triage each guarded case

Name the state each guard defends against, then place it in one tier with
evidence: production data, logs, the owner's invariants, or the code path
that reaches it.

| Tier | Evidence | Code |
| --- | --- | --- |
| **impossible** | No production path produces the state | None. Remove the branch and its test |
| **rare** | Reachable but seldom, with a human able to respond | One early guard at the entry point with a named error, or a step in the written procedure, or an alert. Keep it off the main path |
| **real** | Observed, or certain under normal load | Main path, in the sibling's shape |
| **unknown** | Not yet established | Say so and ask. Build nothing until it is settled |

Security and trust-boundary checks stay whatever their tier. Remove a branch
as **impossible** only when neither untrusted input nor a future caller can
reach it; input any authorized publisher or caller can send counts as
production input, even when only a forged or malformed message produces it.

A case that needs an unlikely chain of events in normal use (a service far
slower than usual at the exact moment two runs overlap, an admin undoing their
own setup mid-run) is handled like an **impossible** one: no code. If a
reviewer raised it, add at most one known-limits line. This applies only
when the outcome is tolerable: a case that would leave real users with wrong
data, locked out, or visibly broken is **real** and gates launch, however
rare.

Before claiming a guard or fix covers a flow, list every caller performing the
same side effect (open PRs included), every reader and writer of a changed key
across services, sibling endpoints that need the same check, and every variant
of the data it touches: kinds of the same record, aliases and primaries, mixed
case, empty values. Say how existing and new records end up right, and name in
the PR the paths it does not cover.

Risks a person decides (confirmation, routing, timing, undo) belong in the
written steps someone follows to run the operation (docs, a checklist, or the
PR's merge steps), not in code. Code keeps guards for failures with no human
in the loop: unreachable dependencies, concurrency, data loss. Whether
rollback is coded or a written procedure is the owner's decision.

## Shape what survives

- **Check the plain write first.** When every writer derives the value from
  the current source of truth, an idempotent write converges under
  last-write-wins; it needs no lock and no "already done" check.
- **One computation, one write.** Decide in memory with pure functions, then
  write once or in idempotent batches, replacing loops of awaited writes with
  re-check passes.
- **Guard at the boundary, trust inside.** Validate where data enters, in a dry
  run or the UI where one exists; inner functions take it as given.
- **Owner invariants are given.** When another team or service owns the
  system, a data bug in it is theirs to fix at the source, never yours to work
  around. Let that service reject invalid input and treat its rejection as
  that item failing, rather than copying its validator; a validator you must
  port needs proof it behaves like the original. Drop a guard the owner asked
  for in review only with their agreement.
- **Reshape when a review round adds mechanism.** Two fixes failing on the
  same assumption mean the assumption is wrong; find it before adding a third.
- **Swaps and optimizations lose no signal.** In a speed or cost change, or
  when replacing a tool, library, or build step, every dropped check is shown
  redundant or replaced, including what the old one did implicitly (type
  checking during a build, environment validation, retries, timeouts,
  serialization defaults). Name side costs up front.

Preserve prior behaviour when refactoring. Before removing a guard or test,
find why it was added (the commit and the regression it guards), which
boundary or equivalent protection still enforces its invariant (check it
against the relevant invalid inputs), and whether removing it starts a retry
or redelivery loop. List destructive deletions for approval first.

Use the `test-strategy` skill for which tests to keep.

## Clean before review

Remove hunks the PR's purpose does not need, comments that restate the code,
try/catch around code that cannot throw or whose error the caller already
handles, casts that silence the type checker, nesting deeper than the
sibling's, exports and options no caller uses, and single-use helpers that
add only indirection. Cite the caller count or sibling for each.

## Backend changes

When the change touches services, background jobs, events, queries, or
scripts, apply the [backend change checklist](references/backend-change-checklist.md):
failure classes that recur in backend review, each tiered by evidence like
any other guard.

## Report

Done when every guard in the diff, kept or removed, appears in the report
with its tier and the evidence for it. List **unknown** cases as open
questions for the owner, and name any convention drift you followed or
declined to copy.

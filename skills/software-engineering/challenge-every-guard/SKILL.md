---
name: challenge-every-guard
description: >
  Size defensive code to evidence and fit a change to the codebase it lands in.
  Use when writing or reviewing a change that adds guards, retries, locks,
  fallbacks, "already done" checks, validation, or new abstractions; when a
  review round keeps adding mechanism; when a PR has grown far past its
  feature; or when reviewing a backend change to services, jobs, events,
  queries, or deploys.
---

# Challenge Every Guard

Every guard is a claim that a failure happens. Keep the guards evidence
supports, place them where the sibling code places them, and delete the rest.
A change shaped this way is smaller, matches its neighbours, and reviews in
one sitting.

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
be justified, leave it out.

## Triage each guarded case

Name the state each guard defends against, then place it in one tier with
evidence: production data, logs, the owner's invariants, or the code path
that reaches it.

| Tier | Evidence | Code |
| --- | --- | --- |
| **impossible** | No production path produces the state | None. Remove the branch and its test |
| **rare** | Reachable but seldom, with a human able to respond | One early guard at the entry point with a named error, or a runbook entry or alert. Keep it off the main path |
| **real** | Observed, or certain under normal load | Main path, in the sibling's shape |
| **unknown** | Not yet established | Say so and ask. Build nothing until it is settled |

Risks a person decides (confirmation, routing, timing, undo) belong in the
runbook. Code keeps guards for failures with no human in the loop:
unreachable dependencies, concurrency, data loss. Whether rollback is a coded
path or a runbook procedure is the owner's decision.

Validate early, in a dry run or the UI, so invalid data never reaches
execution; that removes the need to handle it downstream.

## Shape what survives

- **Check the plain write first.** When every writer derives the value from
  the current source of truth, an idempotent write converges under
  last-write-wins; it needs no lock and no "already done" check.
- **One computation, one write.** Decide in memory with pure functions, then
  write once. A loop of awaited writes with re-check passes is the shape to
  replace.
- **Guard at the boundary, trust inside.** Validate where data enters; inner
  functions take it as given.
- **Owner invariants are given.** Record a data bug in a system another
  team owns as theirs. An owner's review ask is a decision to revisit with them, never a
  silent removal.
- **Reshape when a review round adds mechanism.** Two fixes failing on the
  same assumption mean the assumption is wrong; find it before adding a third.

Preserve prior behaviour when refactoring. When something looks unused, say
why before removing it, and list destructive deletions for approval first.

Tests follow the same tiers: a test for an impossible state goes with the
branch it covered. Use the `test-strategy` skill for which tests to keep.

## Clean before review

Remove comments that restate the code, try/catch around code that cannot
throw or whose error the caller already handles, casts that silence the type
checker, nesting deeper than the sibling's, and exports with no caller.

## Backend changes

When the change touches services, background jobs, events, queries, scripts,
or deploy order, apply the
[backend change checklist](references/backend-change-checklist.md). It lists
failure classes that recur in backend review; tier each one by evidence like
any other guard.

## Report

Done when every guard in the diff, kept or removed, appears in the report
with its tier and the evidence for it. List **unknown** cases as open
questions for the owner, and name any convention drift you followed or
declined to copy.

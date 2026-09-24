# Iteration Patterns

Recurring situations inside iterate mode, and the handling for each.

## Gate carried work before committing

A cycle can start with uncommitted work left by an interrupted prior run: coherent edits, sometimes with a leftover task file, that were never verified. Treat it as a candidate, not a deliverable — run typecheck first (it catches API misuse fastest), then the remaining gates. Commit only when gates pass; fix mechanical failures (import order, formatting) with the project's formatter in write mode and re-run.

Done when: the carried work either passes all gates and is committed, or its failures are fixed and re-verified — never committed unverified.

## Check the working tree before discarding a stale branch

Branch metadata only sees committed diff. Before writing off a branch as merged or empty, run `git status --short`: an interrupted cycle can leave a complete feature uncommitted on a branch that reports zero commits ahead. Back up the tree first, gate it as carried work above, and commit onto a fresh branch from `origin/main` when it passes.

Done when: `git status --short` is clean by commit or deliberate discard — never by assumption.

## Confirm whether work already landed

A branch can look actionable while its changes have already landed. Fetch the
delivery's actual base branch and check the forge's PR state. An ancestor check
can establish that the head is merged:

```bash
git merge-base --is-ancestor "$branch" "$base_ref"
```

Exit 0 proves ancestry; exit 1 is inconclusive after squash or rebase merges;
other exits indicate a failed check. For a non-ancestor, use the PR's merged state
and inspect any work added after its recorded head before treating it as new.
Without forge evidence, compare patches and resulting code against the base;
`git cherry` can help with equivalent commits but does not prove squash equivalence.
Branches backing the same open delivery are one unit of work.

Done when: landed work is skipped, remaining work has an identified diff, or an
unresolved classification is recorded for follow-up.

## Refresh a branch behind main with merge, not rewrite

When the PR diff shows files nobody touched, the branch predates `main`. Bring it current by merging `origin/main` into the branch and pushing a fast-forward — this preserves the PR number, review thread, and label. Reserve history rewrites for branches that exist only locally.

Done when: `git diff origin/main HEAD --stat` shows only intended files and the push is a fast-forward.

## Hold the scope on every commit

Before each commit compare the working-tree diff and the PR-vs-main diff. Restore files touched by accident (changelogs, generated docs, unrelated edits) from `origin/main` before committing, and keep each PR to one concept.

Done when: both diffs contain only intended changes.

## Keep the PR body truthful

After each iteration, update the body to match the landed diff: added work gets a bullet, removed work loses its bullet, verification numbers reflect the latest run. When the body asserts an interaction property ("one-tap", "no extra step"), trace the actual path in the diff before trusting it — a false claim outranks polish as the next iteration.

Done when: every file in the diff maps to a body bullet, every body claim traces to the diff, and numbers are current.

## PR body template

```markdown
## Summary

<what changed and why>

### Changes

- one bullet per file or concept

### Verification

- Type check passes
- Tests pass (N tests / N files)
- Lint passes
```

## Respect the delivery boundary

Draft delivery is complete when the verified PR is available for review. Mark it
ready or merge only when the current instruction or recorded standing authority
covers that action, after the [completion checklist](loop-cycle.md) passes.
Use the repository's merge policy when merging is authorized.

Done when: state records the authorized delivery status and any pending owner action.

# Iteration Patterns

Recurring situations inside iterate mode, and the handling for each.

## Gate carried work before committing

A cycle can start with uncommitted work left by an interrupted prior run: coherent edits, sometimes with a leftover task file, that were never verified. Treat it as a candidate, not a deliverable — run typecheck first (it catches API misuse fastest), then the remaining gates. Commit only when gates pass; fix mechanical failures (import order, formatting) with the project's formatter in write mode and re-run.

Done when: the carried work either passes all gates and is committed, or its failures are fixed and re-verified — never committed unverified.

## Check the working tree before discarding a stale branch

Branch metadata only sees committed diff. Before writing off a branch as merged or empty, run `git status --short`: an interrupted cycle can leave a complete feature uncommitted on a branch that reports zero commits ahead. Back up the tree first, gate it as carried work above, and commit onto a fresh branch from `origin/main` when it passes.

Done when: `git status --short` is clean by commit or deliberate discard — never by assumption.

## Merge-base is the arbiter for "already merged"

A branch can look actionable (diff output vs `main`) while being fully merged: on an ancestor branch the two-dot diff shows the reverse diff, not unmerged work. Before investing effort, run:

```bash
git merge-base --is-ancestor "$branch" origin/main && echo "MERGED — skip" || echo "unique work — candidate"
```

Merged means skip; unique work means proceed. Cross-check branches that are the head of the open loop PR — they share its diff and are not separate work.

Done when: every candidate branch is classified merged or unique by merge-base, and merged ones are skipped.

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

## Un-draft and merge deliberately

Draft PRs cannot merge until marked ready: `gh pr ready <number>`, then merge (squash by default). Un-draft only a PR that passes the PR-complete checklist in [loop-cycle.md](loop-cycle.md) — readiness is a verified state, not a timer.

Done when: the PR is merged and its state entry records the merge, or it remains draft with the reason recorded.

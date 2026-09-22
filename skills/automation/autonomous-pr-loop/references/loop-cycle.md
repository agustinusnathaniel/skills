# Loop Cycle: Select, Iterate, Create

The per-cycle procedure behind steps 1–4 of the parent skill.

## Repo selection

Two modes, checked in order each cycle:

1. **Sticky mode (priority).** If any repo has an open loop PR, select that repo. Existing PRs earn attention (CI fixes, feedback, polish) before new work starts elsewhere.
2. **Round-robin mode (fallback).** When no open loop PRs exist, advance a cursor through the repo list and select the next repo.

Done when: one repo is selected and the mode that selected it is recorded in state.

## Identifying loop PRs

A loop PR is identified by the combination of branch prefix and label — never by author, since the PR author is whoever owns the token used to create it:

- Branch prefix: `autopr/improve/` (e.g. `autopr/improve/dedupe-worker-handlers`)
- Label: a dedicated loop label (e.g. `autopr`), applied in a separate API call after PR creation — the PR-creation endpoint silently drops labels

List candidates with `gh pr list --state open`, then filter by branch prefix; confirm the label on matches.

Done when: every open PR on the repo is classified as loop or non-loop, using prefix plus label.

## Iterate mode (open loop PR exists)

1. Check out the PR branch from the remote tip.
2. Read the PR diff and the changed files.
3. Establish a test baseline: run the project's gate suite (typecheck, tests, lint) before changing anything, so pre-existing reds are not mistaken for regressions. On large suites, target the affected packages.
4. Assess: CI failures → fix from the logs; unaddressed review comments → address; obvious gaps or unfinished work → complete; otherwise run the PR-complete checklist below.
5. Implement the iteration, keeping the diff scoped to the PR's topic.
6. Reconcile the PR body with the actual diff: every changed file is mentioned, removed work is unmentioned, verification numbers are current.
7. Commit, push, verify the remote ref moved.

### PR-complete checklist

Declare "no iteration needed" only when all of these hold:

1. The body's claims re-run clean locally (test counts, audit results as stated).
2. The full gate suite exits 0.
3. CI check-runs on the head SHA all conclude success.
4. Both comment threads are read: review comments and issue comments (bot and human feedback live in different threads).
5. The branch is not behind `main` (`git rev-list --count HEAD..origin/main` is 0).
6. Any bot warnings (changesets, coverage) are checked against merged-PR precedent before acting — warnings on no-behavior-change PRs are informational.

Done when: all six checks pass (record "skipped — complete"), or the found work is implemented, gated green, pushed, and the body reconciled.

## Create mode (no open loop PR)

1. Fetch `origin/main` and create the branch from it — never from a local `main`, which drifts stale and pollutes the diff with unrelated files. New branch: `autopr/improve/<short-description>`.
2. Scan the repo: README, manifest, directory structure, purpose and stack.
3. Identify exactly one improvement, in this priority order: architecture, product, simplification, bug fix, performance, security, test coverage, readability refactor. For data-driven repos, cross-reference data-model fields against UI usage — a modeled-but-unrendered field is a high-yield finding.
4. Implement with a coding-agent CLI (Claude Code, Codex, or equivalent) for multi-file changes.
5. Check diff size before opening the PR: more than ~5 files or ~200 lines for a single-concept change signals a stale base or scope creep — rebase or trim first.
6. Open a draft PR via `gh pr create --draft` with a conventional-commit title (`type: description`, no loop prefix in the title), then apply the loop label separately.

Done when: the draft PR exists, carries the loop label, branches from current `origin/main`, and its diff contains only the intended change.

## State schema

Track per-repo state across cycles in a small JSON file kept on persistent storage:

```json
{
  "repos": {
    "my-repo": {
      "visited": "2026-09-22T00:00:00+00:00",
      "pr": 42,
      "pr_url": "https://github.com/<owner>/my-repo/pull/42",
      "last_action": "iterated: fixed CI lint failure"
    }
  },
  "cursor": 0,
  "cycle": 1
}
```

`cursor` is the round-robin index; `cycle` counts completed runs. Keep the schema compact — verbose logs do not belong in state.

Done when: the selected repo's entry reflects this cycle's outcome and the cursor advanced if round-robin mode ran.

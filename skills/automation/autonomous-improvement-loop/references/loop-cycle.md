# Loop Cycle: Select, Iterate, Create (via Draft PRs)

The per-cycle procedure for the default delivery vehicle (draft PRs). Other vehicles — issues, direct commits, reports — follow the same observe → decide → act shape with lighter mechanics.

## In-flight discipline

**One open unit of loop work per target; iterate it, never duplicate it.** When a cycle finds in-flight loop work on the selected target, all effort goes into it (fix verification, address feedback, polish). A second unit on the same target is never opened while the first is open.

## Target selection (portfolio scope)

Single-target scopes skip selection. For portfolios, two modes checked in order each cycle:

1. **Sticky mode (priority).** If any target has in-flight loop work, select that target. Existing work earns attention (verification fixes, feedback, polish) before new work starts elsewhere.
2. **Round-robin mode (fallback).** When no in-flight work exists, advance a cursor through the target list and select the next target.

Done when: one target is selected and the mode that selected it is recorded in state.

## Identifying loop output

Recognize loop output by the identity convention fixed at setup — e.g. branch prefix plus label — never by author, since the author is whoever owns the token used to create it. Example convention:

- Branch prefix: `autopr/improve/` (e.g. `autopr/improve/dedupe-worker-handlers`)
- Label: a dedicated loop label (e.g. `autopr`), applied separately after creation — some creation endpoints silently drop labels

List candidates with `gh pr list --state open`, then filter by the convention.

Done when: every open PR on the target is classified as loop or non-loop using the convention.

## Iterate mode (in-flight work exists)

1. Check out the delivery branch from the remote tip.
2. Read the diff and the changed files.
3. Establish a verification baseline: run the project's gate suite (typecheck, tests, lint) before changing anything, so pre-existing reds are not mistaken for regressions. On large suites, target the affected packages.
4. Assess: verification failures → fix from the logs; unaddressed review comments → address; obvious gaps or unfinished work → complete; otherwise run the completion checklist below.
5. Implement the iteration, keeping the diff scoped to the unit's topic.
6. Reconcile the delivery description with the actual diff: every changed file is mentioned, removed work is unmentioned, verification numbers are current.
7. Commit, push, verify the remote ref moved.

### Completion checklist

Declare "no iteration needed" only when all of these hold:

1. The description's claims re-run clean locally (test counts, audit results as stated).
2. The full gate suite exits 0.
3. CI check-runs on the head SHA all conclude success.
4. Both comment threads are read: review comments and issue comments (bot and human feedback live in different threads).
5. The branch is not behind the base (`git rev-list --count HEAD..<base-ref>` is 0; the base ref is usually `origin/main`, resolved per [iteration-patterns.md](iteration-patterns.md)).
6. Repo-required checks (changelog entries, coverage gates, bot checks) are evaluated against merged-PR precedent before acting — warnings on no-behavior-change work are informational.

Done when: all six checks pass (record "skipped — complete"), or the found work is implemented, gated green, pushed, and the description reconciled.

## Create mode (no in-flight work)

1. Fetch the base and create the branch from it — never from a local base, which drifts stale and pollutes the diff with unrelated files.
2. Scan the target: README, manifest, directory structure, purpose and stack.
3. Identify exactly one improvement. Fix an improvement policy once and reuse it; an example order: architecture, simplification, bug fix, performance, security, test coverage, readability. For data-driven targets, cross-referencing modeled-but-unused fields against actual usage is a high-yield technique.
4. Implement with a coding-agent CLI (Claude Code, Codex, or equivalent) for multi-file changes.
5. Check diff size before delivering: more than a handful of files or a couple hundred lines for a single-concept change signals a stale base or scope creep — rebase or trim first.
6. Open a draft PR with a conventional-commit title, then apply the loop identity (label) separately.

Done when: the draft exists, carries the loop identity, branches from the current base, and its diff contains only the intended change.

## State schema

Track per-target state across cycles in a small JSON file kept on persistent storage:

```json
{
  "repos": {
    "my-repo": {
      "visited": "2026-09-22T00:00:00+00:00",
      "pr": 42,
      "pr_url": "https://github.com/<owner>/my-repo/pull/42",
      "last_action": "iterated: fixed CI lint failure",
      "delivery_status": "draft: awaiting owner review",
      "authority": "none (record scope and source here when standing delivery authority is granted)"
    }
  },
  "cursor": 0,
  "cycle": 1
}
```

`cursor` is the round-robin index; `cycle` counts completed runs. Keep the schema compact — verbose logs do not belong in state.

Done when: the selected target's entry reflects this cycle's outcome and the cursor advanced if round-robin mode ran.

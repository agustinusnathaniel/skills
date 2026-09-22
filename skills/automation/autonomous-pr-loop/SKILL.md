---
name: autonomous-pr-loop
description: Iterate one open draft improvement PR per repo on a recurring schedule. Use when running autonomous improvement cycles across a repo portfolio.
---

# Autonomous PR Loop

A recurring scheduled pattern where an agent improves a portfolio of repos without per-cycle human direction: each cycle picks one repo, iterates its open draft loop PR if one exists, otherwise opens a new one. The core loop is **Observe → Orient → Decide → Act → Repeat**.

This is distinct from one-shot PR creation — it is a persistent process that compounds small improvements over many cycles.

## When to Use

- Scheduled maintenance across a portfolio of repos
- Continuous small improvements: refactors, test additions, simplification
- Any "keep improving until told to stop" pattern on repos with authorized autonomous PR creation

## When Not to Use

- Changes needing human validation before committing
- Repos where every change needs pre-approval
- High-risk changes (infrastructure, security-critical, production schema)

## The Invariant

**One open draft loop PR per repo; iterate it, never duplicate it.** When a cycle finds an open loop PR on the selected repo, all effort goes into that PR (fix CI, address feedback, polish). A second loop PR on the same repo is never opened while the first is open.

Loop PRs are identified by branch prefix plus label — see [references/loop-cycle.md](references/loop-cycle.md).

## The Cycle

Run these steps in order, one repo per cycle step 3–5. For the observe–orient–decide–act detail of each step, see the linked reference.

### 1. Select the repo

Prefer the repo holding an open loop PR (sticky mode); otherwise advance round-robin through the repo list.

Done when: exactly one repo is named, and the reason (open PR vs round-robin cursor) is recorded.

### 2. Observe the repo state

Fetch latest `origin/main`, list open loop PRs on the repo, read CI status and review comments on the open PR if any.

Done when: you can state (a) whether an open loop PR exists, (b) its CI state, (c) any unaddressed feedback — or that all three checks ran clean.

### 3. Decide: iterate or create

Open loop PR exists → iterate it ([references/iteration-patterns.md](references/iteration-patterns.md)). None exists → create a new improvement ([references/loop-cycle.md](references/loop-cycle.md)).

Done when: the mode is named and matches the observation from step 2.

### 4. Act: implement and verify

Make the change with a coding-agent CLI, then run the repo's own quality gates (typecheck, tests, lint) until they exit 0 before pushing.

Done when: gates pass locally with exit code 0, the push landed (remote ref verified), and the PR body matches the actual diff.

### 5. Record state and report

Update the state file (selected repo, action taken, PR number/URL) and emit a short cycle summary: repo, mode, what changed, gate results, PR link.

Done when: state file reflects this cycle and the summary names all five items or notes which were skipped and why.

### 6. Operate the schedule

One repo per cycle, sequential retries on failure, bounded per-repo time budget — see [references/scheduler-ops.md](references/scheduler-ops.md).

Done when: the cycle ends with state saved and no second repo started in the same run.

## References

- [loop-cycle.md](references/loop-cycle.md) — repo selection, iterate vs create procedure, PR-complete checklist, state schema
- [iteration-patterns.md](references/iteration-patterns.md) — carried-work gating, stale-branch handling, scope control, PR body template
- [scheduler-ops.md](references/scheduler-ops.md) — scheduler setup, sequential processing, failure triage, stop conditions

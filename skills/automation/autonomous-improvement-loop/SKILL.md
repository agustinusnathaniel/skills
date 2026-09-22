---
name: autonomous-improvement-loop
description: Compound small improvements on a recurring schedule without per-cycle direction. Use when running unattended improvement cycles over one repo or a portfolio.
---

# Autonomous Improvement Loop

A recurring scheduled pattern where an agent improves code targets without per-cycle human direction. The core loop is **Observe → Orient → Decide → Act → Repeat**, plus one discipline: **finish in-flight work before starting new work**.

This is distinct from one-shot task execution — it is a persistent process that compounds small improvements over many cycles.

## Setup (once, then reuse)

Fix three decisions before the first cycle; record them where the schedule can see them:

1. **Target scope** — a single repo, a round-robin portfolio list, or a priority queue.
2. **Delivery vehicle** — draft PR, issue, direct commit (only with explicit standing approval), or report. Draft PRs are the default: reviewable, gated, reversible.
3. **Identity convention** — how loop output is recognized later (branch prefix, label, title tag). Choose once; the references below illustrate with branch `autopr/improve/` + label `autopr`.

Done when: scope, vehicle, and convention are written down and visible to every scheduled run.

## When to Use

- Scheduled maintenance over one repo or a portfolio
- Continuous small improvements: refactors, test additions, simplification
- Any "keep improving until told to stop" pattern with authorized autonomous output

## When Not to Use

- Targets where every change needs pre-approval and no standing authorization exists
- Direct-commit vehicle for anything the author would not push themselves
- High-risk changes (infrastructure, security-critical, production schema)

## The Cycle

### 1. Select the target

Prefer the target holding in-flight loop work; otherwise follow the scope policy (single → same target; round-robin → advance cursor; queue → top item).

Done when: exactly one target is named, and the reason is recorded.

### 2. Observe

Read current state: in-flight work and its verification status, plus any feedback since last cycle.

Done when: you can state (a) whether in-flight work exists, (b) its verification state, (c) any unaddressed feedback — or that all three checks ran clean.

### 3. Decide: iterate or create

In-flight work exists → iterate it ([references/iteration-patterns.md](references/iteration-patterns.md)). None exists → create one improvement ([references/loop-cycle.md](references/loop-cycle.md)).

Done when: the mode is named and matches the observation from step 2.

### 4. Act: implement and verify

Make the change with a coding-agent CLI, then run the target's own quality gates until green before delivering.

Done when: gates pass locally, the delivery landed (remote ref verified), and its description matches the actual diff.

### 5. Record state and report

Update the state file (target, action, delivery link) and emit a short cycle summary.

Done when: state reflects this cycle and the summary names target, mode, change, gate results, delivery link — or notes which were skipped and why.

### 6. Operate the schedule

One target per cycle, sequential, bounded time budget — see [references/scheduler-ops.md](references/scheduler-ops.md).

Done when: the cycle ends with state saved and no second target started in the same run.

## References

- [loop-cycle.md](references/loop-cycle.md) — delivery via draft PRs (default vehicle): target selection, iterate vs create, completion checklist, state schema
- [iteration-patterns.md](references/iteration-patterns.md) — carried-work gating, stale-branch handling, scope control, delivery description hygiene
- [scheduler-ops.md](references/scheduler-ops.md) — scheduler setup, sequential processing, failure triage, stop conditions

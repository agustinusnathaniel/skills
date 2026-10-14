---
name: plan-execution
description: Execute a phased plan task by task against its tracker, or audit a tracker whose done marks no longer match the code.
disable-model-invocation: true
---

# Plan Execution

Carry a multi-session plan forward one task at a time, leaving a tracker the
next session can trust. A done mark is a claim; evidence makes it true.

## Locate the plan

Find the execution doc, its tracker, and the completion boundary: a phase,
a task range, or a tier. Read the specs, ADRs, and docs the tasks reference.
When the user gives tiers, finish each tier before starting the next.

Choose the mode:

- **Execute** when the tracker is trusted and work remains.
- **Audit** when the user reports done items that are missing, when another
  session or agent left the tracker, or when execute mode keeps finding
  finished-looking tasks that do not work. Audit first, then execute.

Done when the doc, tracker, boundary, and mode are named.

## Execute

For each task, in tracker order:

1. Implement only that task's scope, following the conventions it touches.
2. Run the project's checks and the task's own acceptance check. For a
   user-facing flow, exercise it end to end on the built app.
3. Commit the task alone.
4. Tick the task in the tracker with its evidence: commit, checks run, and
   where the behavior was observed.
5. Continue to the next task without pausing for confirmation.

Repair a failing task within a budget: when the same failure survives three
fix attempts, record it in the tracker as blocked with what was tried, and
continue with tasks that do not depend on it. Stop early only for a decision
that belongs to the user.

Independent tasks may go to parallel workers with separate files or
worktrees. Integrate and verify their results yourself before ticking them.

## Audit

Treat every done mark inside the boundary as unverified. For each item, not a
sample:

1. Find the code, the tests, and the commit that implemented it.
2. Run its acceptance check.
3. Classify it: done, partial, missing, or drifted (built differently from
   the plan without a recorded reason).

Also record gaps the plan did not list: unhandled error paths and edge cases,
drift from the docs or ADRs, and custom code a maintained library already
covers. Correct the tracker, then execute the reopened items. Repeat the audit
until a full pass finds nothing worth fixing.

## Hand back

Done when every task inside the boundary is ticked with evidence or marked
blocked with a reason, and the boundary's user-facing outcome passes end to
end. Report completed tasks, blocked tasks with what they need, items the
audit reopened, and anything verified only partially.

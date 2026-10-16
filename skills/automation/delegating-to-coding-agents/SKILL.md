---
name: delegating-to-coding-agents
description: >
  Run coding agent sessions, hosted or local, that open and push to pull
  requests on your behalf. Use when briefing an agent session, assigning or
  handing off PR ownership between sessions, watching delegated sessions, or
  verifying what a delegate pushed before reporting it.
---

# Delegating to Coding Agents

A delegate's report is a lead. What it pushed is the fact. Give every PR one
owner, brief it so the literal reading is the right one, watch it yourself,
and verify the pushed head before telling anyone it is done.

## One owner per PR

- Each PR, including each PR in a stack, has exactly one owner session. The
  first line of the PR body names it, and only it pushes.
- Every other session is watch-only: it verifies and records, and never
  pushes or replies on the PR.
- Send fixes to the session that opened the PR; review notifications usually
  route to the opener. Start a new session only for a new PR, or when the
  opener is truly stuck.
- Before briefing a session, read its recent messages; someone else may have
  messaged it.
- Never archive a session whose PR is still open, and ask before archiving
  any session.
- Settings and rules changed mid-run reach new sessions only. Running
  sessions keep what they loaded.

## Hand off ownership deliberately

When a session grows long or expensive:

1. The old owner pushes only finished, green work.
2. It posts a handoff per PR: head commit, CI state, open review threads,
   half-done items.
3. It goes watch-only.
4. The new owner reads the handoff and the PR first, and pushes only after an
   explicit go.

Review events still reach the old opener after a handoff, so every sweep
forwards them to the new owner.

## Write briefs the delegate can follow literally

Delegates follow detail literally: a vague ask such as "match
case-insensitively" or "add a mock layer" balloons a PR. Write one brief per
session, saved somewhere durable, with numbered items. Each item carries:

- The observable rule or behaviour to reach.
- A suggested fix.
- What is ruled out.
- The tests that fail before the fix.

Inline the rubric the work is judged by (engineering bar, guard rules,
testing rules): a remote agent cannot read your local files, and an
automation running under an organization account does not load personal
rules. Leave out rules the delegate already has. A plan that spans
repositories lists every repository it touches; create the tracker items
first and reference them in the briefs.

Answer a delegate's routine questions yourself, with the reasoning, and tell
the user what you answered.

## Watch without polling agents

Polling agents misreport, time out on long waits, and lose notifications. Set
a background timer instead, and when it fires, check each session's status,
latest messages, and PR head yourself.

- Quiet time is not a stall; check for new pushes before concluding anything.
- A session waiting on the user may mean someone else is pushing to its
  branch.
- Question prompts from a delegate may not appear in message events; search
  for them.

A **sweep** is one pass over the delegate sessions, the code host (bots
listed separately from humans), agent inboxes, and chat. Report the items
that need the user one at a time, then set the timer for the next sweep.

## Verify before reporting

Verify with a read-only checker per repository. Fetch PR heads into local
refs and run tests in a scratch worktree; leave the user's checked-out branch
alone.

Give every brief item a verdict with a `file:line`:

| Verdict | Meaning |
| --- | --- |
| **DONE** | The pushed head meets the item and its tests |
| **PARTIAL** | Some of the item is met; name what is missing |
| **NOT DONE** | Nothing at the head addresses it |
| **WRONG** | The head changes the behaviour, but not to what the item asked |

Also check that each stack is linear and each PR body is true at its head.
Bot checkers mix real bugs with items already decided; verify each finding
against the code and the plan before acting on it or relaying it, and mark
which ones you verified. Relay decisions and lessons to every active agent so
they stay aligned.

Pick the correction channel deliberately: a follow-up to the owner session, a
line comment on the PR, or a separate checker.

Done when every brief item has a verdict backed by the pushed head, and the
report separates what you verified from what a delegate only claimed.

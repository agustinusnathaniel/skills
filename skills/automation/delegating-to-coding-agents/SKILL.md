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

- Each PR, including each PR in a stack, has exactly one owner session, and
  only it pushes. Record the owner where every session and reviewer sees it,
  such as the PR body.
- Every other session is watch-only: it verifies and records, and leaves
  pushing and replying to the owner.
- Send fixes to the owner session, which holds the PR's context. Start a new
  session only for a new PR, or when the owner is truly stuck.
- Before briefing a session, read its recent messages; someone else may have
  messaged it.
- Keep the owner session available while its PR is open, and ask the user
  before ending or archiving any session they started.
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

Some hosts deliver review events only to the session that opened the PR.
On those, every sweep forwards the old opener's events to the new owner.

## Write briefs the delegate can follow literally

Delegates follow detail literally: a vague ask such as "match
case-insensitively" or "add a mock layer" balloons a PR. Write one brief per
session, saved somewhere durable, with numbered items. Each item carries:

- The observable rule or behaviour to reach.
- A suggested fix.
- What is ruled out.
- The tests that fail before the fix.

Inline the rubric the work is judged by (engineering bar, guard rules,
testing rules): a delegate running elsewhere loads only what its own
environment provides, not your local files or personal rules. Leave out
rules the delegate already has. A plan that spans repositories lists every
repository it touches, and each brief links the issue or tracker item it
serves.

Answer a delegate's routine questions yourself, with the reasoning, and tell
the user what you answered.

## Watch on a timer

Watch delegates yourself rather than through another agent: a watcher's
report is one more claim you would have to verify. Set a background timer,
and when it fires, check each session's status, latest messages, and PR head
yourself. Quiet time is not a stall; check for new pushes before concluding
anything.

A **sweep** is one pass over everywhere delegates and reviewers report: the
delegate sessions, the code host (bots listed separately from humans), and
any channel where they post. Report the items that need the user one at a
time, then set the timer for the next sweep.

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

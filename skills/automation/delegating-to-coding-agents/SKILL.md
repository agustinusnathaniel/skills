---
name: delegating-to-coding-agents
description: >
  Run several coding agent sessions, hosted or local, that open and push to
  pull requests on your behalf. Use when briefing an agent session, assigning
  PR ownership between sessions, or verifying what a delegate pushed before
  reporting it.
---

# Delegating to Coding Agents

A delegate's report is a lead. What it pushed is the fact. Give every PR one
owner, brief it so the literal reading is the right one, and verify the
pushed head before telling anyone it is done.

This applies when you run several agent sessions that open or push PRs. For a
single agent session, most of it is unnecessary.

## One owner per PR

- Each PR, including each PR in a stack, has exactly one owner session, and
  only it pushes. Record the owner where every session and reviewer sees it,
  such as the PR body.
- Every other session is watch-only: it verifies and records, and leaves
  pushing and replying to the owner.
- Send fixes to the owner session, which holds the PR's context. When
  ownership moves, the old owner pushes only finished, green work and hands
  over the head, CI state, and open threads before the new owner pushes.
- When the user pauses a PR, its owner pushes nothing until told.
- Ask the user before ending or archiving any session they started.

## Write briefs the delegate can follow literally

Delegates follow detail literally: a vague ask such as "match
case-insensitively" or "add a mock layer" balloons a PR. Write one brief per
session, saved somewhere durable, with numbered items. Each item carries:

- The observable rule or behaviour to reach.
- A suggested fix.
- What is ruled out.
- For a bug fix, the tests that fail before the fix.

Before sending, re-check every premise the delegate will act on (file:line,
counts, history claims, suggested wording) against the live source, and stamp
the evidence with repository, commit, and date so the delegate re-confirms it
at its base. Give a size budget for code and tests; past it, the delegate
sends an estimate and design before building further.

Inline the rubric the work is judged by (engineering bar, guard rules,
testing rules): a delegate running elsewhere loads only what its own
environment provides, not your local files or personal rules. Leave out
rules the delegate already has.

A watcher agent is fine, but its report is another claim: check each
session's status, latest messages, and PR head yourself before acting on it.

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

Also check that each PR body is true at its head. Bot checkers mix real bugs
with items already decided; verify each finding against the code and the
plan before acting on it or relaying it.

Done when every brief item has a verdict backed by the pushed head, and the
report separates what you verified from what a delegate only claimed.

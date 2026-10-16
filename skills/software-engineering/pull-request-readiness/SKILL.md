---
name: pull-request-readiness
description: >
  Get a pull request, or a stack of them, to mergeable. Use when splitting
  work into PRs, building or fixing stacked PRs, deciding whether a PR is
  ready for review, marking it ready or requesting review, triaging bot and CI
  findings, or preparing the merge and deploy steps for the user.
---

# Pull Request Readiness

A PR is ready when a reviewer can approve it in one sitting and the user can
merge it without discovering a new step afterward. Shape the PRs before the
code, check readiness against evidence, and hand over the merge checklist
before anyone merges.

For writing or refreshing the title and body, use the repository's PR
template or a PR-writing skill when one is available; this skill covers what
the body must promise and keep true.

## Shape the PR list first

Write the list of PRs before writing code, one purpose each:

1. Fixes first.
2. Each redesign, or reversal of an earlier reviewed decision, in its own PR.
3. Behaviour-free refactors and dead-code removal last.

Changes to shared behaviour (authentication, shared clients, retry strategy)
never ride along with a feature. A fix for unsafe live behaviour is a
standalone hotfix on the base branch, never stacked on unmerged work.

Before proposing a new PR, check whether an open PR already covers the scope.
Fold a follow-up into an open PR only when it fits that PR's stated purpose.
Question size, including test size; leave unrelated files alone and raise
pre-existing cross-cutting problems separately. Split for risk
(reviewability, blast radius, staged rollout), never by estimated human
effort or time.

## Keep stacks correct

- Fix a problem in the lowest PR that introduced the code, then merge it
  forward through the stack. Where the repository forbids rebasing or force
  pushes, merge forward plainly.
- Each PR is correct at its own head: tests and checks pass with only the PRs
  below it.
- Shared contract files are byte-identical across the branches that carry
  them; compare hashes.
- Generated code goes in its own commit.
- The body of each stacked PR names the PR it is stacked on.
- Merge bottom-up. Some hosts' native stacks require the bottom PR to be up
  to date before the next can merge.

## Make the body a contract

The body names the owner (the person or agent session that pushes to the
branch), follows the repository's template, carries a size line split into
`code / tests / generated`, and lists anything new the change introduces with
its justification. After any push, re-read the title and body against the new
head and remove what is no longer true.

## Check readiness

Run every check before marking a PR ready or requesting review:

- Synced with the base branch.
- Full affected test suites pass, and the new tests fail without the fix.
- New specs actually ran in CI at the current head; a broken stack base can
  skip them silently.
- Every CI check read, not only the summary. Some required checks do not
  re-run when the base changes; reopen the PR or push an empty commit.
- Every bot comment since the PR opened is read and triaged with evidence
  against the code and the plan. Some bots report real defects, some only
  scores, and some repeat items already decided.
- Every human reviewer's last comment is resolved, and lessons from earlier
  reviewers are applied across the PR, not only at the commented line.
- Feature flags: whether one is needed, whether it exists, whether it
  defaults to off. Shared paths are safe to merge with the flag off.
- Quality gates the repository uses: an independent review of the diff from a
  clean checkout, cleanup of leftover scaffolding and restating comments,
  lint scoped to the diff.

Then read the merge box itself. Commits authored by bots can need extra
approvals, and the API may not say whose. Once everything is green, mark
ready promptly; marking ready and requesting review stay the user's call
unless they have delegated it.

## Hand over the merge checklist up front

Before the user merges, give the complete checklist for each PR in one
message:

- **Pre-merge:** flags to create and their default, indexes built and query
  plans attached, approvals still missing.
- **Deploy order:** which services deploy first (consumers before producers)
  and which PRs must be live before the next merges.
- **Post-merge:** flags to turn on and in which environment, backfills or
  scripts to run (dry run first), what to watch and for how long, and
  follow-up PRs or tickets.

Done when nothing about the merge depends on a step the user hears of only
after merging.

## Report

State, per PR: its purpose, its position in any stack, each readiness check
with its result, open items with who owns them, and the merge checklist.

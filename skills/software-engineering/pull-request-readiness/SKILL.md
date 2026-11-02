---
name: pull-request-readiness
description: >
  Get a pull request, or a stack of them, to mergeable. Use when splitting
  work into PRs or stacks, checking a PR is ready before marking it ready or
  requesting review, triaging bot and CI findings, or preparing the merge and
  deploy steps for the user.
---

# Pull Request Readiness

A PR is ready when a reviewer can approve it in one sitting and the user can
merge it without discovering a new step afterward.

For the wording of the title and body, use the repository's PR template or a
PR-writing skill; this skill covers what the body must keep true.

## Shape the PR list first

Write the list of PRs before writing code, one purpose each, ordered so each
merges safely on its own. Keep behaviour-free refactors and dead-code removal
out of PRs that change behaviour, and give each redesign, or reversal of an
earlier reviewed decision, its own PR.

Changes to shared behaviour (authentication, shared clients, retry strategy)
never ride along with a feature. A fix for unsafe live behaviour is a
standalone hotfix on the base branch, never stacked on unmerged work.

Before proposing a new PR, check whether an open PR already covers the scope.
Fold a follow-up into an open PR only when it fits that PR's stated purpose.
Question size, including test size; leave unrelated files alone and raise
pre-existing cross-cutting problems separately. Split for risk:
reviewability, blast radius, staged rollout.

## Keep stacks correct

- Fix a problem in the lowest PR that introduced the code, then carry it up
  the stack the way the repository does (rebase, or merge where force pushes
  are not allowed).
- Each PR is correct at its own head: tests and checks pass with only the PRs
  below it.
- When a contract file (schema, API spec) is copied into several branches or
  repositories, keep the copies identical and compare hashes.
- Generated code goes in its own commit.
- The body of each stacked PR names the PR it is stacked on.
- Merge bottom-up.

## Make the body a contract

The body follows the repository's template, states the PR's size with
generated code counted separately so reviewers know what to read, and
justifies anything new as `challenge-every-guard` asks. When the change
alters a shared command, route, or helper, it names every caller, workflow,
and runbook that uses it and shows each still works. After a reviewer has
reviewed or approved, a "Since review" section lists the commits added after
the head they saw. When several
people or agent sessions work on the same branch, it names the one who
pushes. After any push, re-read the title and body against the new head and
remove what is no longer true. Check that the body renders on the host (On
GitHub: `gh api /markdown -f mode=gfm -F text=@body.md`); literal angle-bracket text
goes in backticks.

## Check readiness

Run every check before marking a PR ready or requesting review:

- Synced with the base branch.
- Full affected suites pass at the current head, new or extended tests fail
  without the fix, and CI shows the new specs ran; a broken stack base can skip them.
- Every CI check read, not only the summary. Some required checks do not
  re-run when the base changes; re-trigger them the way the repository allows.
- Every bot comment since the PR opened is read and triaged with evidence
  against the code and the plan.
- Every request from every reviewer round still holds at the current head; a
  later cleanup or simplification pass never undoes one. Lessons from earlier
  reviewers are applied across the PR, not only at the commented line.
  Correctness findings are fixed by default, and style suggestions stay the
  author's call; leaving a correctness finding as is needs evidence, given in
  its thread, that it cannot occur. Approval bodies are read too, since
  remarks hide in them.
- Every review thread is answered (draft replies with `pull-request-review`),
  bot threads included, and resolved where the host requires conversation
  resolution.
- When a PR has many reviewer points, one summary comment maps each point to
  the commit that addressed it, so reviewers can re-check in one pass.
- Where the repository uses feature flags: whether one is needed, whether it
  exists, whether it defaults to off. A change to an existing shared path is
  live as soon as it deploys, so it must be safe with the flag off.
- Quality gates the repository uses: an independent review of the diff from a
  clean checkout, the `challenge-every-guard` "Clean before review" pass,
  lint scoped to the diff against the PR base (without a base ref, some
  linters check only uncommitted changes and report clean).

Then read the merge box itself, and read it again after every push, not only
before merge: a push or a merge from the base can drop an approval. Branch
protection can require approvals or checks that a summary or API response
does not name. Once everything is green, mark
ready promptly; marking ready and requesting review stay the user's call
unless they have delegated it.

A PR held on purpose (waiting on a dependency, a proof, or another PR) stays
draft, and every status lists it as held with what it waits for. To put a PR
on hold, convert it to draft and remove its requested reviewers; draft status
alone leaves it in their queue.

## Hand over the merge checklist up front

Before the user merges, give the complete
[merge checklist](references/merge-checklist.md) for each PR in one message:
pre-merge items, production asks, deploy order, and post-merge steps. Done
when nothing about the merge depends on a step the user hears of only after
merging.

## Report

State, per PR: its purpose, its position in any stack, each readiness check
with its result, open items with who owns them, and the merge checklist.

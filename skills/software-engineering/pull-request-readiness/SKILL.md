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
- Merge bottom-up. Some hosts' native stacks require the bottom PR to be up
  to date before the next can merge.

## Make the body a contract

The body follows the repository's template, states the PR's size with
generated code counted separately so reviewers know what to read, and lists
anything new the change introduces with its justification. When the change
alters a shared helper's behaviour, it names every affected caller so their
owners know. After a reviewer has reviewed or approved, a "Since review"
section lists the commits added after the head they saw. When several
people or agent sessions work on the same branch, it names the one who pushes. After any push, re-read the title and body against the new
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
  Correctness findings are fixed by default, and style suggestions stay the
  author's call; leaving a correctness finding as is needs evidence, given in
  its thread, that it cannot occur. Every part of a multi-part finding is
  answered, and approval bodies are read too, since remarks hide in them.
- Every review thread is answered, bot threads included, and resolved where
  the host requires conversation resolution.
- When a PR has many reviewer points, one summary comment maps each point to
  the commit that addressed it, so reviewers can re-check in one pass.
- Where the repository uses feature flags: whether one is needed, whether it
  exists, whether it defaults to off. Shared paths are safe to merge with the
  flag off.
- Quality gates the repository uses: an independent review of the diff from a
  clean checkout, cleanup of leftover scaffolding and restating comments,
  lint scoped to the diff.

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

Before the user merges, give the complete checklist for each PR in one
message:

- **Pre-merge:** approvals still missing, and anything that must exist
  before the code lands, such as flags with their defaults, database
  indexes, or new environment variables in each environment. Version
  changes follow the repository's release tooling (changesets,
  semantic-release, and the like). When the PR sets a published version by
  hand, check it against the registry right before merge so it does not
  collide, and give dependent work the final number only after the publish
  succeeds. A change that needs a field from another package's published
  client waits for that publish, confirms on the registry a version that has
  the field, and depends on it in the repository's usual style.
- **Production asks:** every ask to merge to production or turn on a
  production flag states what could go wrong, the blast radius, what will be
  watched, how to roll back, and what is unverified. For a promotion or deploy
  PR approved earlier, list what landed after the approval and whether each
  change ships dark or live.
- **Deploy order:** when several services or PRs depend on each other, which
  deploys first (consumers before producers) and which must be live before
  the next merges.
- **Post-merge:** flags to turn on and in which environment, backfills or
  scripts to run (dry run first), what to watch and for how long, and
  follow-up PRs or tickets.

Done when nothing about the merge depends on a step the user hears of only
after merging.

## Report

State, per PR: its purpose, its position in any stack, each readiness check
with its result, open items with who owns them, and the merge checklist.

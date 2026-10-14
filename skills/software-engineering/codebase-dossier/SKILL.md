---
name: codebase-dossier
description: Write an evidence-cited dossier of a codebase or a family of related repos, covering purpose, architecture, operations, history, decisions, and sharp edges.
disable-model-invocation: true
triggers: ["user"]
---

# Codebase Dossier

A dossier lets a newcomer, human or agent, work in a codebase without
re-deriving it. Every claim in it is either cited to evidence or tagged as
inferred, so readers can tell what was checked.

## Scope the subject

Name the repos covered, the commit each was read at, and the audience. For a
family of repos (copied templates, sibling apps), put shared material on one
platform page and keep per-repo pages for what differs. Done when each page's
scope is stated in its first lines.

## Gather evidence

- Read the code, configuration, CI, and docs at the stated commit. Cite
  `path:line` or a commit SHA for every claim.
- Read history for why things are the way they are: eras of change, reverts,
  fix chains, and commit bodies. A decision is recorded with its source:
  stated by the owner, an instruction file, a tool default, or inferred.
- Separate what a repo inherited from a template or fork from what it
  decided; count an inherited decision once, at its source.
- Mark each mechanism as seen once or recurring, with the count.
- When readers or delegated agents summarized the repo, verify their key
  claims against the code and raw git before using them. Summaries add tidy
  checklists and plausible items the source never had.

## Verify across the family

A claim on a shared page must hold in every repo it covers. Check each one
per repo; where a repo diverges, say so on the shared page or narrow the
claim. Done when every shared claim names the repos it was checked in.

## Write

Follow the [dossier outline](references/dossier-outline.md). Lead each page
with a plain summary. Describe what the code does today; history explains it
but does not replace it. Fetch every external link before placing it, and
replace any that fail.

## Finish

Done when every section of the outline is filled or marked not applicable,
every claim is cited or tagged inferred, and the evidence-gaps section lists
what could not be checked and why.

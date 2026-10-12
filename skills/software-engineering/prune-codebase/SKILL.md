---
name: prune-codebase
description: >
  Use for substantial codebase pruning, reduction, or removal of overengineering
  across production code and supporting tests, documentation, agent instructions,
  configuration, and tooling, including follow-up passes after a reduction PR.
  Preserve intended behavior and useful rationale; exclude ordinary feature work
  and minor cleanup.
---

# Prune Codebase

Deliver substantially less live application code that humans and agents can
understand and maintain. Preserve intended capabilities and correct confirmed
defects. Judge savings by eliminated maintenance, with line counts as evidence.

When the user explicitly applies this skill to documentation, follow
[documentation reduction](references/documentation.md). For docs-only work, use
that workflow instead of the production targets below; for mixed work, report docs
separately. When the scope includes text agents follow as instructions (`AGENTS.md`,
`CLAUDE.md`, directives, prompts, skills), follow
[agent instruction reduction](references/agent-instructions.md) for that text.

## Establish scope and evidence

Use the user's scope, budget, and existing evidence. Survey main subsystems for
whole-project work; trace relevant paths for focused work. Inspect missing evidence
needed to establish intended behavior and constraints. Challenge inherited
conventions and ADRs when a simpler design can meet the requirements. Honor
existing authorization, dependency constraints, and applicable approval requirements.

Record a fixed baseline without disturbing user changes. Count with one method in
exclusive buckets: production, tests/support, docs/directives, generated/vendor,
and other. Classify maintained registries, configuration, and templates with the
behavior they implement; preserve retained component inventories unless pruning
is requested. Determine generated status from actual ownership and provenance,
not mentions of generated headers in maintained source or tests. Include
new/untracked work, reconcile with the complete diff, and explain classification
corrections. Keep current-round and cumulative deltas
distinct, using any comparison range the user specifies.

## Choose substantial reductions

Prioritize unnecessary mechanisms, parallel implementations, duplicated logic,
obsolete compatibility, speculative extensibility, and layers with little
responsibility. For the strongest candidates, establish consumers, behavior to
preserve, the smallest credible replacement, and net savings including supporting
costs. Trace scripts, hooks, entry points, bundled consumers, and downstream
or plugin contracts before declaring code unused. Absence of internal callers
does not establish that a public name is removable. Resolve specific uncertainties before dismissing major candidates.

On the first pass, sweep every reduction class without waiting for the user to name one: ecosystem delegation, implementation simplification, comment triage, and test deduplication. Account for each class with concrete candidates or an evidence-based retention reason.

Derive a substantial production target in lines and percentage from those
candidates, then proceed with authorized implementation. Formatting compression,
file moves, and redistributed complexity do not count as simplification. Favor
reductions that make behavior easier to locate and follow; splitting large files
or unifying helpers is not an improvement when it adds indirection or obscures
ownership, and inlining a cohesive module into its consumer is not a saving when
it blurs module boundaries. Bound each restructure to the smallest unit with checks green before and after; a net-small diff that adds indirection, tables, or cross-module coupling is redistribution and gets reverted. Approved feature retirement is separate and does not count toward
the preservation target.

Evaluate built-ins, existing dependencies, and established packages before
rewriting utilities. Compare simpler library usage with removal, accounting for
replacement glue, error handling, concurrency, and ongoing costs. Ground each
ecosystem candidate, and each claim that none exists, in a current registry,
source, or official-docs lookup rather than memory, and record what was checked.
Choose the option with lower ownership cost and verify its application contract,
including invalid inputs, side effects, and failure semantics.

## Implement and correct defects

Batch compatible reductions into coherent changes with straightforward code and
clear ownership. Preserve public contracts, security properties, and required
performance. Before applying a repeated rewrite, validate the transformation on
representative semantic variants, especially exception scope, cleanup,
evaluation order, and side effects. Review the affected variants, not just one
successful example. Before removing a defense, identify the boundary or equivalent
protection that enforces its invariant and verify relevant invalid inputs.
Triage comments with the code: delete what-comments; keep why-comments only for external quirks, invariants, and surprising behavior the code cannot express. When a named test already pins the invariant, prefer the test and drop the duplicate comment. Hold comments your own changes add to the same bar; a reviewer asking why a comment exists is evidence it fails the bar.

For behavior-sensitive reductions, establish representative real inputs before
editing, including cases served by the mechanism being removed. Compare baseline
and replacement on relevant user outcomes, such as search recall and ranking or
detection accuracy. Passing documented examples or mock-only tests does not
establish parity. A measurable capability loss needs an explicit user decision
about that loss; permission to remove an implementation alone does not settle it.
Keep the mechanism or find a smaller replacement when preservation is unproven.

Correct encountered defects within scope when intended behavior is established
and the fix can be verified, preferably by eliminating their causes. Distinguish
corrections from refactoring; report unresolved issues with evidence and impact.
Keep the delivery a reduction: larger work it uncovers, such as security
remediation, new test harnesses, or permission and policy changes, becomes a
separate, named delivery the user decides on.

Amend affected docs, instructions, or ADRs that would recreate the complexity.
Preserve decision history and record durable rationale; keep transient line counts
and verification logs in the delivery report. Add an ADR only when policy requires
it or an architectural decision changes.

## Verify proportionately

Reuse existing coverage and still-valid evidence. Run focused checks during edits,
then review meaningful changes independently and run repository-required checks on
the integrated batch. After a repair, revisit affected evidence and findings;
repeat broader checks only when the change or repository policy warrants them.
Report unavailable review or verification as a gap. Where stable contracts can
be captured, compare baseline and replacement directly, including exported
names, schemas, CLI behavior, and serialized shapes. Use exact comparison when
representation is contractual; otherwise compare semantics and normalize only
known nondeterminism.

When CLI or integration flows change, exercise the affected user journey through
the built or published entry point the user actually runs, in an isolated
environment. Check choices, cancellation, scope, and resulting state where
relevant; help output and helper tests alone do not establish that the flow works. Report unexercised paths as verification gaps.

Add repeatable coverage at the smallest boundary that catches an uncovered
regression risk. When replacing an implementation, reducing tests, or removing
test-only production support, follow [test audit](references/test-audit.md) to
identify redundant proof and preserve behavioral contracts. Simplify any new
glue, test setup, and docs.

## Continue and finish

An opened PR is a checkpoint, not the finish line. Continue through known
worthwhile reductions across the whole requested scope and range within budget,
after meeting the target and without waiting to be asked. Land a candidate that
fits the current scope in this delivery or the next stacked PR rather than an
unscheduled later one. Each further pass needs a credible candidate or unresolved
uncertainty. Revise targets only when evidence invalidates an estimate or reveals
a constraint; report both targets and the reason.

Completion requires all of the following:

- The production target is met through substantive simplification, and total
  maintained code, including tests and helpers, also has a net reduction.
- Intended behavior is preserved, confirmed fixes are verified, required
  verification is complete, and actionable review findings are resolved.
- Known significant candidates are implemented or have concrete evidence-based
  retention or deferral reasons; meeting the target alone is not such a reason.
  A report that nothing worthwhile remains lists the strongest rejected
  candidates with those reasons.

Correctness and budget limits take precedence. Report partial progress and the
concrete limitation when completion criteria remain unmet.

For generated projections, edit canonical sources and verify regeneration. For
PRs/releases, apply release policy through affected shipped consumers, including
private/shared packages bundled into published ones: any change that reaches a
published package needs the changeset or release note the repository requires.
Split large reductions into reviewable stacked PRs and give their merge order in
the handoff. Verify required delivery checks at the final revision;
distinguish local checks from remote CI. Write release notes around user-visible
changes, keeping implementation accounting in the PR report.

Re-count deltas at the current head of every delivered branch when reporting, never at an earlier revision or before a rebase. Report target and actual deltas over the full delivery range: production, tests/support, combined maintained code, and reconciled overall totals led together so production-only savings never stand alone as the result. Label round subtotals. Keep generated/vendor and lockfile churn on their own line; they never count as production savings. Explain eliminated mechanisms, dependency tradeoffs, corrected defects, verification gaps, and remaining candidates.

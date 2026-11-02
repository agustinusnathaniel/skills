---
name: prune-codebase
description: >
  Use for substantial codebase pruning or removal of overengineering across
  production code and its tests, documentation, agent instructions,
  configuration, and tooling, including follow-up passes after a reduction PR.
  Not for ordinary feature work or minor cleanup.
---

# Prune Codebase

Deliver substantially less live application code that humans and agents can
understand and maintain. Preserve intended capabilities and correct confirmed
defects. Judge savings by eliminated maintenance, with line counts as evidence.

When the user applies this skill to documentation, follow
[documentation reduction](references/documentation.md) instead of the
production targets below; for mixed work, report docs separately. For text
agents follow as instructions (`AGENTS.md`, `CLAUDE.md`, directives, prompts,
skills), follow [agent instruction reduction](references/agent-instructions.md).

## Establish scope and evidence

Use the user's scope, budget, and existing evidence. Challenge inherited
conventions and ADRs when a simpler design can meet the requirements.

Record a fixed baseline without disturbing user changes. Count with one method in
exclusive buckets: production, tests/support, docs/directives, generated/vendor,
and other. Classify maintained registries, configuration, and templates with the
behavior they implement; preserve retained component inventories unless pruning
is requested. Decide what is generated from ownership and provenance, not from
generated headers mentioned in maintained source. Include new and untracked
work, reconcile with the complete diff, and explain classification
corrections. Keep current-round and cumulative deltas distinct, using any
comparison range the user specifies.

## Choose substantial reductions

Prioritize unnecessary mechanisms, parallel implementations, duplicated logic,
obsolete compatibility, speculative extensibility, and layers with little
responsibility. For the strongest candidates, establish consumers, behavior to
preserve, the smallest credible replacement, and net savings including supporting
costs. Trace scripts, hooks, entry points, bundled consumers, and downstream
or plugin contracts before declaring code unused; a public name without
internal callers may still have consumers. Resolve specific uncertainties
before dismissing major candidates.

On the first pass, sweep every reduction class unprompted: ecosystem
delegation, implementation simplification, comment triage, test
deduplication, and inherited scaffold. Account for each with concrete
candidates or an evidence-based retention reason.

Inherited scaffold is what a starter template or fork brought in that the
product never used: sample features, integrations, configuration, content,
and the tests and docs presenting them as real, plus a fork's upstream keys,
identifiers, and defaults. Delete unused capability rather than hardening it,
and rewrite docs that present it as the product.

Derive a substantial production target in lines and percentage from those
candidates, then proceed with authorized implementation. Formatting
compression, file moves, and redistributed complexity do not count. Favor
reductions that make behavior easier to locate and follow: splitting files or
unifying helpers that adds indirection or obscures ownership, and inlining a
cohesive module that blurs a boundary, are not savings. Bound each
restructure to the smallest unit with checks green before and after; a
net-small diff that adds indirection, tables, or cross-module coupling is
redistribution and gets reverted. Approved feature retirement is separate and
does not count toward the target.

Evaluate built-ins, existing dependencies, and established packages before
rewriting utilities, counting replacement glue, error handling, concurrency,
and ongoing costs. Ground each ecosystem candidate, and each claim that none
exists, in a current registry, source, or official-docs lookup rather than
memory, and record what was checked. Choose the lower ownership cost and
verify its contract, including invalid inputs, side effects, and failure
semantics.

## Implement and correct defects

Preserve public contracts, security properties, and required
performance. Before applying a repeated rewrite, validate it on every affected
semantic variant (exception scope, cleanup, evaluation order, side effects),
not one successful example. Before removing a defense, run the removal check in
`challenge-every-guard` ("Preserve prior behaviour when refactoring").
Triage comments with the code: delete what-comments; keep why-comments only
for external quirks, invariants, and surprising behavior the code cannot
express, and drop one a named test already pins. Comments your changes add
meet the same bar.

For behavior-sensitive reductions, gather representative real inputs before
editing, including cases served by the mechanism being removed, and compare
baseline and replacement on user outcomes such as search recall and ranking or
detection accuracy; documented examples and mock-only tests do not establish
parity. A measurable capability loss needs the user's explicit decision about
that loss, not only permission to remove the implementation. Keep the
mechanism or find a smaller replacement when preservation is unproven.

Correct encountered defects within scope when intended behavior is established
and the fix can be verified, preferably by eliminating their causes. Distinguish
corrections from refactoring; report unresolved issues with evidence and impact.
Keep the delivery a reduction: larger work it uncovers, such as security
remediation, new test harnesses, or permission and policy changes, becomes a
separate, named delivery the user decides on.

Amend affected docs, instructions, or ADRs that would recreate the complexity.
Preserve decision history and record durable rationale; keep transient line
counts and verification logs in the delivery report. Add an ADR only when
policy requires it or an architectural decision changes.

## Verify proportionately

Reuse existing coverage and still-valid evidence. Run focused checks during
edits, then an independent review of meaningful changes and the
repository-required checks on the integrated batch. After a repair, revisit
affected evidence and findings. Report unavailable review or verification as a
gap. Where stable contracts can
be captured, compare baseline and replacement directly, including exported
names, schemas, CLI behavior, and serialized shapes. Use exact comparison when
representation is contractual; otherwise compare semantics and normalize only
known nondeterminism.

When CLI or integration flows change, exercise the affected journey through the
built or published entry point in an isolated environment, as `test-strategy`'s
"Prove behavior at the real boundary" describes, checking choices,
cancellation, scope, and resulting state. Report unexercised paths as gaps.

Add repeatable coverage at the smallest boundary that catches an uncovered
regression risk. When replacing an implementation, reducing tests, or removing
test-only production support, follow [test audit](references/test-audit.md) to
identify redundant proof and preserve behavioral contracts. Simplify any new
glue, test setup, and docs.

## Continue and finish

An opened PR is a checkpoint, not the finish line. At the first PR, list the
remaining worthwhile reductions across the requested scope, and continue
through them only where the user's scope or budget covers them. Each further
pass needs a credible candidate or unresolved uncertainty. Revise targets only
when evidence invalidates an estimate or reveals a constraint; report both
targets and the reason.

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

For generated projections, edit canonical sources and verify regeneration.
Split, check, and hand over PRs with `pull-request-readiness`. Any change that
reaches a published package, including private packages bundled into
published ones, needs the changeset or release note the repository requires;
write release notes around user-visible changes and keep implementation
accounting in the PR report.

Re-count deltas at the current head of every delivered branch, never at an
earlier revision or before a rebase. Report target and actual deltas over the
full delivery range, leading with production, tests/support, combined
maintained code, and reconciled overall totals together so production-only
savings never stand alone. Label round subtotals. Keep generated/vendor and
lockfile churn on their own line; it never counts as savings. Explain
eliminated mechanisms, dependency tradeoffs, corrected defects, verification
gaps, and remaining candidates.

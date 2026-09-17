---
name: reduce-production-code
description: >
  Use when the user requests substantial production-code reduction or removal
  of overengineering while preserving intended behavior.
---

# Reduce Production Code

Deliver substantially less live application code that humans and agents can
understand and maintain. Preserve intended capabilities and correct confirmed
defects. Judge savings by eliminated maintenance, with line counts as evidence.

When the user explicitly applies this skill to documentation, follow
[documentation reduction](references/documentation.md). For docs-only work, use
that workflow instead of the production targets below; for mixed work, report docs
separately. Ordinary feature work and minor cleanup do not need this skill.

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
is requested. Include new/untracked work, reconcile with the complete diff, and
explain classification corrections. Keep current-round and cumulative deltas
distinct, using any comparison range the user specifies.

## Choose substantial reductions

Prioritize unnecessary mechanisms, parallel implementations, duplicated logic,
obsolete compatibility, speculative extensibility, and layers with little
responsibility. For the strongest candidates, establish consumers, behavior to
preserve, the smallest credible replacement, and net savings including supporting
costs. Trace scripts, hooks, entry points, bundled consumers, and downstream
or plugin contracts before declaring code unused. Absence of internal callers
does not establish that a public name is removable. Resolve specific uncertainties before dismissing major candidates.

Derive a substantial production target in lines and percentage from those
candidates, then proceed with authorized implementation. Formatting compression,
file moves, and redistributed complexity do not count as simplification. Approved
feature retirement is separate and does not count toward the preservation target.

Evaluate built-ins, existing dependencies, and established packages before
rewriting utilities. Compare simpler library usage with removal, accounting for
replacement glue, error handling, concurrency, and ongoing costs. Use available
source and docs; browse current official sources when an unanswered capability,
compatibility, or maintenance question affects the decision. Choose the option
with lower ownership cost and verify its application contract, including invalid
inputs, side effects, and failure semantics.

## Implement and correct defects

Batch compatible reductions into coherent changes with straightforward code and
clear ownership. Preserve public contracts, security properties, and required
performance. Before applying a repeated rewrite, validate the transformation on
representative semantic variants, especially exception scope, cleanup,
evaluation order, and side effects. Review the affected variants, not just one
successful example. Before removing a defense, identify the boundary or equivalent
protection that enforces its invariant and verify relevant invalid inputs.

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

Add repeatable coverage at the smallest boundary that catches an uncovered
regression risk. After replacing an implementation, retire obsolete internal and
upstream-algorithm tests while preserving application contracts, integration
coverage, and compatibility pins. Retain cases exercising removed mechanisms until
their behavior is protected at the replacement boundary. Remove obsolete test-only
exports while preserving public APIs. Simplify any new glue, test setup, and docs.

## Continue and finish

Continue through known worthwhile reductions within scope and budget after meeting
the target. Each further pass needs a credible candidate or unresolved uncertainty.
Revise targets only when evidence invalidates an estimate or reveals a constraint;
report both targets and the reason.

Completion requires all of the following:

- The production target is met through substantive simplification, and total
  maintained code, including tests and helpers, also has a net reduction.
- Intended behavior is preserved, confirmed fixes are verified, required
  verification is complete, and actionable review findings are resolved.
- Known significant candidates are implemented or have concrete evidence-based
  retention or deferral reasons; meeting the target alone is not such a reason.

Correctness and budget limits take precedence. Report partial progress and the
concrete limitation when completion criteria remain unmet.

For generated projections, edit canonical sources and verify regeneration. For
PRs/releases, apply release policy through affected shipped consumers, including
private/shared packages. Verify required delivery checks at the final revision;
distinguish local checks from remote CI. Write release notes around user-visible
changes, keeping implementation accounting in the PR report.

Report target and actual deltas over the full delivery range: production first,
tests/support, combined maintained code, then reconciled overall totals. Label
round subtotals. Explain eliminated mechanisms, dependency tradeoffs, corrected
defects, verification gaps, and remaining candidates.

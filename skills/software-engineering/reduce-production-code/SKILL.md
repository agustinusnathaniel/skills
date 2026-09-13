---
name: reduce-production-code
description: >
  Reduce maintained production code through substantive simplification,
  consolidation, and ecosystem reuse while preserving intended behavior.
  Use when the user requests substantial application-code reduction or removal
  of overengineering. Ordinary feature work, minor refactoring, and test-only
  cleanup are outside its scope.
---

# Reduce Production Code

Deliver a substantial, verified net reduction in live application code while
making it easier for humans and agents to understand and maintain. Preserve
intended capabilities and correct confirmed defects. Testing, documentation, and
process changes support this production-code objective.

## Establish scope and baseline

Use the user's scope; otherwise examine the main subsystems and shared utilities.
Understand the project's vision, intended users, workflows, architecture, and
constraints. Trace execution paths, compare documentation with implementation,
and identify gaps in understanding. Challenge existing assumptions and decisions,
including your own previous work, with concrete evidence. Distinguish actual
requirements from revisitable architectural choices and conventions; existing
patterns and ADRs do not by themselves justify retaining complexity.

Record the starting state without disturbing existing user changes. Classify by
ownership and purpose: live application code, tests/support, docs, shipped
directives, generated/vendor outputs, and other files. Classify maintained
registries, configuration, and templates by the behavior they implement. Preserve
intentionally retained component inventories; pruning them is a separate scope.

Use fixed comparison endpoints, one counting method, and mutually exclusive file
buckets. Include new/untracked work and reconcile bucket totals with the complete
diff. Keep classifications fixed and explain corrections. On follow-ups, report
both the current round and cumulative change; earlier savings cannot conceal new
growth. If the user specifies a release or commit range, measure that range too.
PR/release headline figures must use the full delivery range; label reduction-run
subtotals separately when that range also contains earlier or unrelated work.

## Choose substantial reductions

Investigate the largest credible opportunities before editing: unnecessary
mechanisms, parallel implementations, duplicated logic, obsolete compatibility
paths, speculative extensibility, and layers with little responsibility.

For the strongest candidates, identify consumers, what can disappear, behavior to
preserve, estimated net production savings after replacement, and supporting
costs. Zero imports alone do not prove obsolescence: trace scripts, hooks, runtime
entry points, and bundled consumers. Follow repository approval requirements for
decisions outside existing authorization.

Select the strongest viable candidates for implementation and state a concrete
target in net production lines removed and as a percentage of the starting
production-code size. Derive it from those candidates and explain why it is
substantial for the chosen scope. Proceed with authorized implementation after
stating it. A target based only on trivial cleanups is insufficient. Before
dismissing a major behavior-sensitive candidate, assess its smallest credible
replacement and probe the specific uncertainty.

Before rewriting custom utilities, evaluate built-ins, existing dependencies, then
established community packages. Browse current official documentation/source to
verify credible replacements, compatibility, maintenance, and integration costs. Before removing an existing
library, compare simpler usage with removal and inventory guarantees it supplies,
including error handling and concurrency; unused advanced APIs prove little.
Count all replacement glue. Adopt dependencies when ownership savings justify
ongoing costs; retain small helpers when simpler. Use architectural references or
skills for concrete questions.

## Implement and correct defects

Work through the strongest viable candidates in coherent, reviewable steps.
Remove unnecessary mechanisms, unify equivalent implementations, and simplify
control flow. Write straightforward, idiomatic code with descriptive names,
cohesive modules, and clear ownership. Preserve intended features, public
contracts, security properties, and required performance.

Assess the complete replacement. File moves, compressed formatting, and complexity
redistributed among new abstractions do not demonstrate simplification. Removing
tests, documentation, or generated output cannot satisfy application-code targets.

Before deleting a defensive branch, identify its input boundary and prove the
condition impossible or locate equivalent protection. Probe affected invalid-input
behavior. For ecosystem swaps, compare relevant accepted/rejected inputs, outputs,
side effects, and failure semantics; library defaults can alter the contract.
Separate authorized behavior changes from accidental incompatibilities. Report
feature retirement or reduced functionality separately, even when approved; those
savings do not satisfy a behavior-preserving reduction target.

Investigate pre-existing bugs and inconsistencies encountered. Correct confirmed
defects within the authorized scope when intended behavior is established and the
correction can be verified; prefer eliminating their causes through simplification.
Distinguish intentional behavior corrections from refactoring. Report unrelated or
unresolved issues with evidence, impact, and a reason without expanding the work.

## Verify proportionately

Inspect existing coverage and run relevant checks first. Reuse or adapt existing
tests. Add tests, fixtures, mocks, or infrastructure only for a specific, meaningful
regression risk that existing coverage does not adequately protect. Explain the
benefit and choose the smallest suitable boundary. A new file alone does not
require approval unless an applicable instruction explicitly requires it.

Test observable behavior and durable contracts; implementation details merit
assertions when they are themselves contractual. Preserve useful regression
protection. Use static checks and runtime/browser verification where appropriate,
while retaining repeatable coverage where future regressions warrant it.

After removing or outsourcing an implementation, reassess its tests and helpers.
Retire obsolete internal assertions and redundant upstream-algorithm tests while
preserving application contracts, integration boundaries, and compatibility pins.
Remove exports maintained solely for obsolete tests, preserving public APIs.

Revisit affected assumptions, conventions, docs, agent instructions, and ADRs
that would recreate the complexity. Prefer concise amendments;
add a superseding ADR only when needed, preserve history, and avoid duplicated
rationale. Put rejected/deferred candidates in the final report; create a decision
record only when repository policy requires it or an architectural decision changes.
Follow canonical ownership and verify regenerated projections. Apply
repository release policy to affected shipped artifacts, including those bundling
private/shared packages; include required release metadata.

## Review, continue, and finish

Batch compatible reductions into coherent changes. Use focused checks while
editing, then independent review and required full checks on the integrated result.
Repeat only checks/review affected by later changes or required by repository policy;
each small loop does not need its own reconnaissance, docs pass, and full review.
If review is unavailable, report the gap. Verify required delivery checks on the
final artifact; local checks do not establish remote CI success.

After fixes and review, simplify your own new production glue, test setup, and
documentation before declaring completion. Necessary additions still deserve
economical implementation. Compare actual savings with the target; if additions
consume them, reassess the largest growth and next strongest candidate. Complete
selected substantive reductions; green checks or a slightly negative diff are
insufficient to stop.

Revise the target only when concrete new evidence invalidates an estimate or
reveals a necessary constraint. Explain that evidence and retain both targets in
the report. Before declaring the target unattainable, investigate the remaining
major candidates within scope and substantiate the constraints preventing them.
Treat the target as a progress checkpoint, not a ceiling. Continue through known,
worthwhile reductions within scope; meeting the target alone is not a deferral
reason. Stop when those candidates are implemented or ruled out with concrete
evidence and verification is complete. Further exploration requires an unresolved
question or a credible additional opportunity, not an exhaustive search.

Completion requires:

- The stated production-code reduction target is met through substantive changes.
- Substantial implementations or unnecessary mechanisms are removed, replaced, or
  consolidated, making maintenance simpler.
- Total maintained code, including tests and helpers, also has a net reduction.
- Intended capabilities remain intact, defect corrections are verified, required
  checks pass, and actionable independent-review findings are resolved.
- Remaining major candidates are assessed, with concrete retention or deferral
  reasons.

Correctness takes priority over deletion targets. Preserve useful behavior and
safeguards. If these criteria cannot be met, report the reduction goal as unmet
with the evidence; partial improvements are not completed reduction work.

Report concisely:

- Target, justified revisions, comparison endpoints, and actual production lines
  added, removed, and net reduction, including the percentage.
- Test/support and combined maintained-code deltas; other buckets and reconciled
  overall total separately. Distinguish current-round from cumulative results.
- Mechanisms eliminated, maintenance benefits, and ecosystem replacements with
  their remaining costs.
- Defects corrected, verification/review results, unresolved issues, and remaining
  significant reduction candidates with reasons.

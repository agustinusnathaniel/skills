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

Deliver a substantial, verified net reduction in the code that implements product
behavior. Keep testing, documentation, and process changes proportional to that
work. Preserve intended capabilities and correct confirmed defects encountered.

## Establish scope and baseline

Use the user's scope; otherwise examine the project's main subsystems and shared
utilities. Understand its purpose, workflows, architectural boundaries, and
constraints by tracing execution paths and checking relevant documentation
against the implementation. Treat overengineering as a hypothesis to substantiate,
including when assessing your own previous work.

Record the starting state without disturbing existing user changes. Use a
consistent before/after counting method and separate production/application code,
test/support code, documentation, and generated outputs. Include new and untracked
files introduced by the work. Keep the baseline and file classification fixed;
explain any necessary correction. For products that ship directives, report their
canonical sources separately from executable application code.

## Choose substantial reductions

Investigate the largest credible opportunities before editing: unnecessary
mechanisms, parallel implementations, duplicated logic, obsolete compatibility
paths, speculative extensibility, and layers with little responsibility.

For the strongest candidates, identify the implementation and its consumers, what
can disappear, behavior to preserve, estimated net production lines removed after
replacement, and expected supporting additions. Rank by viable reduction and
maintenance benefit. Follow repository approval requirements for decisions outside
the user's existing authorization.

Select the strongest viable candidates for implementation and state a concrete
target in net production lines removed and as a percentage of the starting
production-code size. Derive it from those candidates and explain why it is
substantial for the chosen scope. Proceed with authorized implementation after
stating it. A target based only on trivial cleanups is insufficient.

Before rewriting utilities, evaluate language/platform built-ins, existing
dependencies, then established community packages. Browse current official
documentation or source to verify behavior, compatibility, maintenance, and
integration costs. Count adapters, configuration, error handling, and replacement
helpers in the result. Adopt dependencies when their ownership savings justify
their ongoing costs; retain small helpers when that is simpler. Use architectural
references or relevant skills to resolve concrete design questions.

## Implement and correct defects

Work through the strongest viable candidates in coherent, reviewable steps.
Remove unnecessary mechanisms, unify equivalent implementations, and simplify
control flow. Preserve descriptive names, cohesive modules, clear ownership,
intended features, public contracts, security properties, and required performance.

Assess the complete replacement. File moves, compressed formatting, and complexity
redistributed among new abstractions do not demonstrate simplification. Removing
tests, documentation, or generated output cannot satisfy application-code targets.

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
while retaining repeatable coverage where future regressions warrant it. Include
all test/support additions in the maintained-code delta.

Update affected assumptions, conventions, documentation, and agent instructions
that would recreate the complexity. Consolidate overlapping guidance. Supersede
replaced ADRs while preserving their historical rationale. Follow canonical source
ownership, regenerate projections when applicable, and verify synchronization.

## Review, continue, and finish

Run affected checks during implementation and obtain independent review for
meaningful changes. Review correctness, unnecessary additions, and remaining
substantive reductions. Resolve actionable findings and repeat affected checks or
review when changes warrant it. If independent review is unavailable, report the
verification gap.

Compare actual savings with the target. If savings are small or supporting
additions consume them, reassess the implementation and investigate the next
strongest candidate. Complete the selected substantive reductions; passing checks
or reaching a slightly negative diff is insufficient to stop.

Revise the target only when concrete new evidence invalidates an estimate or
reveals a necessary constraint. Explain that evidence and retain both targets in
the report. Before declaring the target unattainable, investigate the remaining
major candidates within scope and substantiate the constraints preventing them.
Once the target, selected reductions, and verification are complete, stop expanding
the search. Record evidence-based retention or deferral reasons for other known
candidates; further exploration requires a concrete unresolved question.

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

- Original target, justified revisions, and actual production lines added,
  removed, and net reduction, including the percentage.
- Test/support changes and the combined maintained-code delta; documentation,
  shipped directives, and generated changes separately.
- Mechanisms eliminated, maintenance benefits, and ecosystem replacements with
  their remaining costs.
- Defects corrected, verification/review results, unresolved issues, and remaining
  significant reduction candidates with reasons.

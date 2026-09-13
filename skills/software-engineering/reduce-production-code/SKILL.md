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

Deliver substantially less live application code that humans and agents can
understand and maintain. Preserve intended capabilities and correct confirmed
defects. Testing, documentation, and process changes support this objective.

## Establish scope and evidence

Use the user's scope and budget. For whole-project work, survey the main
subsystems and shared utilities; for focused work, trace the relevant paths.
Use existing context and inspect missing evidence needed to understand the vision,
intended users, behavior, architecture, and constraints. Challenge assumptions and
previous decisions, including your own, with evidence. Distinguish actual
requirements from revisitable conventions; an existing pattern or ADR alone does
not justify retaining complexity. Honor existing authorization and applicable
approval requirements.

Record a fixed starting state without disturbing user changes. Classify files by
ownership and purpose, separating live application code and tests/support from
docs, shipped directives, generated/vendor outputs, and other files. Maintained
registries, configuration, and templates belong with the behavior they implement.
Preserve intentionally retained component inventories unless pruning is requested.

Use one counting method and mutually exclusive buckets. Include new/untracked work
and reconcile totals with the complete diff. Explain classification corrections.
On follow-ups, distinguish current-round and cumulative changes so earlier savings
cannot conceal new growth. Measure any comparison range the user specifies.

## Choose substantial reductions

Investigate the largest credible opportunities: unnecessary mechanisms, parallel
implementations, duplicated logic, obsolete compatibility paths, speculative
extensibility, and layers with little responsibility. For the strongest candidates,
identify consumers, what can disappear, behavior to preserve, and estimated net
production savings including replacement and supporting costs. Trace scripts,
hooks, runtime entry points, and bundled consumers before declaring code unused.

State a concrete reduction target in production lines and percentage of baseline,
derived from those candidates. Explain why it represents substantial progress;
trivial cleanups alone are insufficient. Proceed with authorized implementation.
Before dismissing a major behavior-sensitive candidate, assess its smallest
credible replacement and investigate the specific uncertainty.

Before rewriting custom utilities, evaluate built-ins, existing dependencies, and
established community packages. Use available source and documentation; browse
current official sources when a decision depends on unanswered questions about
capabilities, compatibility, maintenance, or integration costs. Use architectural
references or skills to resolve concrete design questions.

Before removing a library, compare simpler usage with removal and inventory its
current guarantees, including error handling and concurrency. Count all replacement
glue and ongoing costs. Adopt a dependency when ownership savings justify those
costs; retain a small helper when simpler. Verify relevant accepted/rejected inputs,
outputs, side effects, and failure semantics; library defaults may differ from the
application contract.

## Implement and correct defects

Batch compatible reductions into coherent changes. Remove unnecessary mechanisms,
unify equivalent implementations, and simplify control flow. Write straightforward,
idiomatic code with descriptive names, cohesive modules, and clear ownership.
Preserve public contracts, security properties, and required performance.

Assess the complete replacement. File moves, compressed formatting, or complexity
redistributed among abstractions do not demonstrate simplification. Test, doc, or
generated-file deletions cannot satisfy application-code targets. Report approved
feature retirement separately and exclude its savings from the reduction target.

Before removing a defensive branch, identify the boundary enforcing its invariant
or the equivalent protection that remains. Verify relevant invalid-input cases;
retain the protection when that evidence is insufficient.

Investigate pre-existing defects encountered within scope. Correct them when
intended behavior is established and the fix can be verified, preferably by
eliminating their causes. Distinguish intentional corrections from refactoring;
report unrelated or unresolved issues with evidence, impact, and a reason.

Revisit affected assumptions, conventions, docs, agent instructions, and ADRs that
would recreate the complexity. Prefer concise amendments and preserve decision
history. Keep deferred candidates in the final report; add a decision record only
when policy requires it or an architectural decision changes.

## Verify proportionately

Reuse existing coverage and still-valid evidence. Use focused checks during edits,
then independent review for meaningful changes and repository-required checks on
the integrated result. Repeat only verification affected by later changes or
required by repository policy. Report unavailable review or verification as a gap.

Add tests, fixtures, mocks, or infrastructure only for concrete regression risks
not adequately covered; explain the benefit and choose the smallest suitable
boundary. A new file alone needs no approval unless an applicable instruction
requires it. Verify observable behavior and durable contracts with suitable tests,
static checks, or runtime/browser checks. Preserve repeatable protection where
future regressions warrant it.

After removing or outsourcing an implementation, retire obsolete internal
assertions and redundant upstream-algorithm tests while retaining application
contracts, integration boundaries, and compatibility pins. Remove exports kept
solely for obsolete tests, preserving public APIs. Before finishing, simplify new
production glue, test setup, and documentation introduced by the work.

## Continue and finish

The target is a checkpoint, not a ceiling: continue through known worthwhile
reductions within scope and budget. Investigate remaining major candidates before
calling the target unattainable. Revise estimates only when concrete evidence
invalidates them or reveals a necessary constraint, and retain both targets in the
report. Further exploration needs a specific uncertainty or credible opportunity.

Completion requires all of the following:

- The production target is met through substantive simplification, and total
  maintained code, including tests and helpers, also has a net reduction.
- Intended behavior is preserved, confirmed fixes are verified, required
  verification is complete, and actionable review findings are resolved.
- Known significant candidates are implemented or have concrete evidence-based
  retention or deferral reasons; meeting the target alone is not such a reason.

Correctness and explicit budget limits take precedence over deletion targets. If
these criteria remain unmet, report partial progress and the concrete limitation
without claiming the reduction goal complete.

For generated projections, edit canonical sources and verify regeneration. When
preparing a PR or release, apply repository release policy through affected shipped
consumers, including private/shared packages. Verify required delivery checks at
the final revision; local success does not establish remote CI success. Headline
figures must cover the full delivery range, with reduction-run subtotals labeled.

Report the target and actual deltas using the recorded baseline and buckets,
production first, followed by test/support, combined maintained code, and the
reconciled overall total. Explain eliminated mechanisms, maintenance benefits,
dependency tradeoffs, defects corrected, verification gaps, and remaining candidates.

---
name: architecture-decision-framework
description: >
  Use when choosing or revisiting architectural boundaries, dependencies,
  platforms, or migration approaches with consequential trade-offs.
---

# Architecture Decision Framework

Produce an evidence-backed recommendation that serves the user's goal, explains
its trade-offs, and states when to reconsider. Scale the analysis to the impact
and cost of changing the decision later. A small reversible choice may need only
a paragraph; a consequential choice needs evidence for its decisive trade-offs.

## Frame the decision

Identify the outcome, exact system or artifact in scope, current behavior to
preserve, and constraints from the user's request and existing context. Distinguish
hard requirements from preferences and revisitable conventions. Labels such as
“MVP” or “production” alone do not establish acceptable reliability or scope.

Verify premises that could change the recommendation against relevant code,
configuration, or current official sources. Distinguish observed facts, estimates,
and unknowns. Read existing decisions when they constrain this choice; preserve
their rationale while checking whether their assumptions still hold.

Ask only for missing information that could change the recommendation or establish
required authority. Reuse supplied answers. State low-impact assumptions and
proceed; when a consequential unknown remains, explain what depends on it and
continue analysis that does not require the answer. In a delegated task, return
unresolved owner decisions to the caller with a provisional recommendation.

## Compare viable alternatives

Consider retaining or simplifying the current approach alongside credible
alternatives. Compare options that solve the same problem at the same boundary;
separate independent decisions instead of treating complementary layers as rivals.
Use only alternatives that could plausibly win under the stated constraints.

Evaluate hard requirements first: an option that fails a required capability,
security property, compliance obligation, or firm resource limit is infeasible
regardless of its other advantages. Record why it is excluded. Changing a hard
requirement needs the appropriate owner's decision, not a higher aggregate score.
When none qualify, report the conflicting constraints and what must change to
make an option feasible.

Compare viable options on the few criteria that distinguish them. Include adoption
and ongoing ownership costs: integration, migration, operations, team capability,
and the effort to change course. Make reversibility concrete through what would
need undoing, including data and external contracts; shipping alone does not make
a decision irreversible.

Use a short narrative or comparison table with evidence and uncertainties. When
explicit priorities need weighting, or the user requests numerical scoring, use
[weighted scoring](references/scoring.md). Resolve a decision-changing uncertainty
with the smallest useful source check, experiment, or prototype. Define the
question and stopping condition before doing further research.

## Recommend and respond to feedback

Lead with the recommended option, the decisive evidence, its main cost or
limitation, and why the strongest alternative loses. State confidence and any
remaining uncertainty that could reverse the recommendation. If evidence cannot
separate the options, prefer a smaller reversible commitment or propose a bounded
experiment with a decision criterion.

Treat feedback as evidence to examine. Correct a false premise and reconsider the
affected comparison; retain supported conclusions when challenged without new
evidence. Revise priorities when the user changes them. Keep weights tied to those
priorities rather than tuning them to a preferred answer.

A recommendation is ready when the relevant constraints are accounted for,
decisive claims have evidence or explicit uncertainty, and the choice, consequence,
and next action are clear. Further analysis needs a specific unresolved question.
Honor existing authorization: carry authorized implementation forward; when an
owner decision is required, present the concrete recommendation for that decision.

## Record what must survive

Use an ADR when repository policy requires it or the decision has lasting impact
on contracts, data, operations, or future changes. For a local reversible choice,
the task or PR rationale can be enough. Follow the repository's format and record:

- Context and decision drivers, including binding constraints.
- Decision and status: proposed until accepted by the authorized owner.
- Decisive evidence, alternatives rejected, and consequences.
- A concrete revisit trigger and any unresolved validation or migration condition.

Preserve superseded decisions with links or dated amendments. Keep durable reasons
in the record; leave changing file inventories, line counts, and execution logs in
their canonical sources or delivery report. Record the final rationale once and
link to it instead of repeating the full analysis.

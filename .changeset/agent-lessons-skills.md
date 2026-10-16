---
"agustinusnathaniel-skills": minor
---

Add four skills distilled from recurring review and delegation lessons:

- **challenge-every-guard**: triage each guard as impossible, rare, real, or unknown with evidence, match sibling code, write once from one computation, and check backend changes against a checklist of recurring failure classes, each tiered by evidence.
- **pull-request-readiness**: shape the PR list before code, keep stacks correct at every head, check readiness against CI, bots, and reviewers, and give the full pre-merge and post-merge checklist before anyone merges.
- **pull-request-review**: review others' PRs for critical findings only, in the user's own voice, and post review comments only after the user approves the exact text.
- **delegating-to-coding-agents**: one owner session per PR, literal-proof briefs, watching on a timer instead of through another agent, and DONE / PARTIAL / NOT DONE / WRONG verdicts against the pushed head.

**test-strategy** now reproduces a bug with the cheapest failing check before patching it, keeps that reproduction as a regression test only when it guards a production failure no other test covers, and requires every kept test to name the production failure it catches using production-reachable inputs.

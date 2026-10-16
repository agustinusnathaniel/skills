---
"agustinusnathaniel-skills": minor
---

Add four skills distilled from recurring review and delegation lessons:

- **challenge-every-guard**: triage each guard as impossible, rare, real, or unknown with evidence, match sibling code, write once from one computation, and check backend changes against a checklist of recurring review findings.
- **pull-request-readiness**: shape the PR list before code, keep stacks correct at every head, check readiness against CI, bots, reviewers, and flags, and give the full pre-merge and post-merge checklist before anyone merges.
- **pull-request-review**: review others' PRs for critical findings only, and draft review comments, thread replies, chat messages, and status updates the user approves before anything is posted.
- **delegating-to-coding-agents**: one owner session per PR, literal-proof briefs, watching without polling agents, and DONE / PARTIAL / NOT DONE / WRONG verdicts against the pushed head.

**test-strategy** now reproduces a bug with the cheapest failing check before patching it, keeps that reproduction as a regression test only when it guards a production failure no other test covers, and requires every kept test to name the production failure it catches using production-reachable inputs.

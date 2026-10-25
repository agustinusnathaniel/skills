# Candidate Assessment: Replacement Proposals

Use when a tool is proposed as a replacement for an existing capability in the repo.

## Checklist

1. Identify the product category first: hosted service/API, embeddable widget, client library, docs/marketing site, or example app. A docs site is not a hosted API — verify the category before comparing anything.
2. Follow install, API, license, and architecture links; cross-check registry and repository metadata.
3. Inspect the current implementation before judging the candidate. Record its privacy model, offline behavior, bundle budget, accessibility, background-task safeguards, dependencies, and user-facing capabilities.
4. Compare what the candidate actually replaces, one or more of these capabilities:
   - computation/algorithm
   - rendering/presentation
   - transport/hosting
   - workflow/UX
5. Measure integration cost and package weight. Check whether the candidate duplicates an existing dependency while adding unrelated machinery.
6. Give a go/no-go adoption decision with authoritative URLs and measured facts.
7. If the candidate is a poor fit but reveals a real product gap, evaluate a bounded alternative using existing primitives. Report the two decisions separately.
8. Never install or adopt a dependency during evaluation without explicit authorization. A no-go result is valid; do not manufacture a PR.

## Worked Pattern

A docs site resolved to the marketing page for an openly licensed library,
not a hosted API. Registry metadata showed it duplicated an existing
dependency at significant unpacked size, and its extra syntax-highlighting,
theming, and edit-mode machinery fell outside the replacement scope.

The correct outcome was not adoption. The evaluation exposed a separate product gap (no side-by-side view), which was implemented as a small adapter plus tests with no new dependency.

Re-check versions, size, license, and product surface before reusing these facts; they illustrate the method, not timeless metadata.

Done when: the candidate's product category and the capabilities it replaces are stated, the comparison is scoped to what it actually replaces, and the verdict cites measured facts with URLs.

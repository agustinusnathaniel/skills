# agustinusnathaniel-skills

## 2.3.0

### Minor Changes

- [#38](https://github.com/agustinusnathaniel/skills/pull/38) [`8a11c17`](https://github.com/agustinusnathaniel/skills/commit/8a11c17f20559effb050fa9d811c8079caa1e0f2) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Add `typescript-code-conventions` (signatures, control flow, errors, types, modules, and React components, with a self-check for repositories without a linter) and `react-app-structure` (where pages, routes, page logic, and API calls go in a React web app). Both follow the repository's own rules and sibling files first.

## 2.2.0

### Minor Changes

- [#35](https://github.com/agustinusnathaniel/skills/pull/35) [`833df7b`](https://github.com/agustinusnathaniel/skills/commit/833df7b91bef56560f38c74e4de209e88e95e60f) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Retire and rename skills so each covers a recurring task in a stack the repo maintains:
  
  - **webhook-integration**, **domain-research**, **release-notes**, and **delegating-to-coding-agents** are retired. Uninstall them, or keep an installed copy if you still rely on it.
  - **mobile-app-shell** is renamed **expo-app-foundations** and scoped to Expo and React Native app foundations: a remotely controllable minimum supported version before the first release, other remote values only over a secured channel, over-the-air updates matched to binaries by runtime version and environment, proactive refresh where clocks are trustworthy plus one shared refresh on 401, and screen-capture blocking per screen. Reinstall and select the new name.
  - **autonomous-improvement-loop** names GitHub and `gh` as its target, follows the repository's branch-update policy, and uses neutral branch, label, and base-ref names.

- [#33](https://github.com/agustinusnathaniel/skills/pull/33) [`d345c2a`](https://github.com/agustinusnathaniel/skills/commit/d345c2aae2a852258c5dff270f351c5538d06156) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Fold recurring review lessons into the skills that own them, and generalize skills for public use: stack-specific advice is labelled (React, JavaScript, node-postgres, MongoDB, GitHub, Expo/EAS, Astro, TanStack Query) and personal preferences are scaled to stakes.
  
  - **challenge-every-guard**: security and trust-boundary checks stay whatever their tier, and practically-never cases are handled like impossible ones unless they would leave real users with wrong data, locked out, or visibly broken. Enumerate every caller, reader, and writer before claiming coverage; find why a guard or test exists before cutting it; optimizations lose no signal; no placeholders for later phases; let the owning service validate its own invariants; risks a person decides go in the written steps someone follows. The backend checklist adds acknowledging only final outcomes, reading retry and dead-letter policy, bounding work per delivery, failing closed on missing safety inputs, logging and counting every silent path, and an atomic per-element update.
  - **test-strategy**: keep a bug's reproduction as a regression test unless an existing test pins it; label a defensive fix for an unreproduced bug as unverified; prefer E2E that ends in a reproducible artifact; assert at the serialized boundary, extend existing tests, test claims in both directions, pin output before swapping an implementation; judge model-driven behavior with an eval.
  - **pull-request-readiness**: re-read the merge box after every push, answer every review thread (bots included), fix correctness findings by default, map many reviewer points to commits, hold a PR by drafting it and removing reviewers, follow the repository's release tooling for versions, and give the production safety answer.
  - **pull-request-review**: follow the user's preferred depth, lead with must-fix findings and mark minor points non-blocking, check fixture provenance, follow the project's AI-disclosure policy, and answer the reviewer's actual question.
  - **github-actions-authoring**: an aggregator job for required checks, timeout headroom from recent runs, full-SHA action pins, the concurrency re-run trap, bot PRs for protected branches, the `GITHUB_TOKEN` trigger limit, and speed-ups that lose no signal.
  - **admin-panel-engineering**: Cancel focus on destructive confirmations, destructive styling per the design system, closable dialogs while jobs run, operator status copy with a reason code and next step, exact permission identifiers, grant rules without a single role ladder, self-approval only where policy allows, irreversible capabilities in approvals and notifications, and fixing every instance of copied code.
  - **tool-evaluation-and-adoption**: version claims checked against the registry; prefer aligning a package family on one release and pin back only with a recorded reason; static source inspection allowed in evaluate-only; a jurisdiction and licensing check; dependency and supply-chain alert triage.
  - **prune-codebase**: list remaining reductions at the first PR and continue within the user's scope or budget; split into independently reviewable PRs.
  - **codebase-dossier**: the outline is an example to adapt, not a required format.
  - **config-drift**: the client version skew reference covers detecting and refreshing stale clients in general, with service workers (vite-plugin-pwa and Workbox, including its reload behavior) labelled as one stack.
  - **client-trust-boundary**, **hydration-safe-state**, **url-state**, **bulk-import-engineering**, **calculation-correctness**, and **architecture-decision-framework**: generalized wording and stack labels.

## 2.1.0

### Minor Changes

- [#31](https://github.com/agustinusnathaniel/skills/pull/31) [`959397b`](https://github.com/agustinusnathaniel/skills/commit/959397b134606269ac2235546b249e339cb4b192) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Add four skills distilled from recurring review and delegation lessons:
  
  - **challenge-every-guard**: triage each guard as impossible, rare, real, or unknown with evidence, match sibling code, write once from one computation, and check backend changes against a checklist of recurring failure classes, each tiered by evidence.
  - **pull-request-readiness**: shape the PR list before code, keep stacks correct at every head, check readiness against CI, bots, and reviewers, and give the full pre-merge and post-merge checklist before anyone merges.
  - **pull-request-review**: review others' PRs for critical findings only, in the user's own voice, and post review comments only after the user approves the exact text.
  - **delegating-to-coding-agents**: one owner session per PR, literal-proof briefs, watching on a timer instead of through another agent, and DONE / PARTIAL / NOT DONE / WRONG verdicts against the pushed head.
  
  **test-strategy** now reproduces a bug with the cheapest failing check before patching it, keeps that reproduction as a regression test only when it guards a production failure no other test covers, and requires every kept test to name the production failure it catches using production-reachable inputs.

## 2.0.0

### Major Changes

- [#29](https://github.com/agustinusnathaniel/skills/pull/29) [`134daf0`](https://github.com/agustinusnathaniel/skills/commit/134daf032b2a1e1ce306c27d9f81e9b48e0b93f4) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Remove the **framework-migration** skill. In testing, agents did not load it for routine migrations such as replacing axios with ky, even when its description named that exact case, and results matched runs without it.
  
  Its most useful rule moves into **tool-evaluation-and-adoption**: when an adoption replaces a tool, match the old tool's implicit defaults (retries, timeouts, serialization) and remove the old tool everywhere in the same change, including dependencies, scripts, hooks, CI, editor settings, and docs.
  
  If you invoked `framework-migration` by name, use `tool-evaluation-and-adoption` instead.

## 1.2.0

### Minor Changes

- [#27](https://github.com/agustinusnathaniel/skills/pull/27) [`cd2a164`](https://github.com/agustinusnathaniel/skills/commit/cd2a164a44943bb191162950281df7cd8ee9ea68) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Update five existing skills:
  
  - **bulk-import-engineering** now also covers backup and restore and JSON, CSV, or spreadsheet import and export in offline-first apps, so it loads for those tasks too. Imports validate the whole file before writing, can roll back a failed restore, and merge rows field by field instead of skipping existing ids.
  - **test-strategy** prefers real storage over mocks, fails tests on unhandled network requests, and takes expected values from the real consumer. When a change breaks a test, the agent fixes the code or states why the test's contract changed, instead of weakening the test.
  - **prune-codebase** also removes what a starter template or fork brought in but the product never used, such as demo keys, sample auth, and upstream URLs.
  - **autonomous-improvement-loop** keeps per-target rules learned from merged and closed deliveries, treats a cycle that changes nothing as valid, and pins the model for each scheduled job.
  - **tool-evaluation-and-adoption** records why a tool was switched and what would reverse that decision, and covers evaluating a platform that client work will be built on.
  
  If you installed these skills individually into a user-level skills folder, reinstall them. Some hosts load a user-level copy in place of the plugin's newer one.

- [#27](https://github.com/agustinusnathaniel/skills/pull/27) [`cd2a164`](https://github.com/agustinusnathaniel/skills/commit/cd2a164a44943bb191162950281df7cd8ee9ea68) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Add twelve software-engineering skills. Each is listed with the tasks it applies to:
  
  - **admin-panel-engineering**: building admin panels, backoffice apps, and internal tools, covering permission-gated pages and menus, login and logout, tenant scoping, list pages, exports, and audit trails. Includes Ant Design, Filament, and SWR references.
  - **client-trust-boundary**: exposing environment variables or API keys to a web or mobile client, calling Firebase, Supabase, or Convex from the client, or gating features by role in the UI.
  - **calculation-correctness**: code that computes money, dates, units, counters, or derived metrics.
  - **config-drift**: changing environment variables, build or header config, service workers, hosting config, or CI, and when a setting seems to have no effect.
  - **framework-migration**: replacing a library, linter, framework, or host, or upgrading across a major version. Includes HTTP client, lint and format, and hosting references.
  - **github-actions-authoring**: writing or debugging GitHub Actions workflows and reusable workflows.
  - **hydration-safe-state**: hydration mismatches, theme flashes, and browser state (localStorage, sessions, viewer time) in prerendered or server-rendered apps.
  - **mobile-app-shell**: React Native and Expo app shells covering environments and release channels, remote config and forced updates, token refresh, push notifications and deep links, and web views.
  - **release-notes**: changelogs and release notes for end users, developers, or maintainers. It asks which reader to write for when the target doesn't say.
  - **url-state**: filters, pagination, and share links stored in the URL.
  - **webhook-integration**: payment and other provider webhooks, settlement and reconciliation, partner APIs, queues, and scheduled sync jobs.
  - **codebase-dossier**: writing an evidence-cited dossier of a codebase. It runs only when you invoke it by name, on every host that supports manual-only skills.

## 1.1.0

### Minor Changes

- [#21](https://github.com/agustinusnathaniel/skills/pull/21) [`c07c96c`](https://github.com/agustinusnathaniel/skills/commit/c07c96c94060aa2571235675dec21813250eaeca) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Fold recurring session feedback into prune-codebase, test-strategy, architecture-decision-framework, and tool-evaluation-and-adoption: an open PR is a checkpoint rather than completion, agent-instruction reductions are audited by obligation, verification runs on the surface users run, feedback naming one item triggers a whole-artifact audit, and tool evaluation now covers upgrade and switch questions.

### Patch Changes

- [#26](https://github.com/agustinusnathaniel/skills/pull/26) [`19ca935`](https://github.com/agustinusnathaniel/skills/commit/19ca9359c84db2e5422006f723f758c984197ef9) Thanks [@agustinusnathaniel](https://github.com/agustinusnathaniel)! - Add a ZCode-native manifest (`.zcode-plugin/plugin.json`) so ZCode no longer relies on the `.claude-plugin/plugin.json` fallback.

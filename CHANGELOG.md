# agustinusnathaniel-skills

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

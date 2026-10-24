---
name: github-actions-authoring
description: >
  Write or change GitHub Actions workflows. Use when adding CI jobs, caching,
  or timeouts; building a reusable workflow or composite action that other
  repos call; automating commits, releases, or dependency-update PRs; or
  debugging a workflow that passes without checking anything or behaves
  differently than its YAML suggests.
---

# GitHub Actions Authoring

Workflow YAML fails quietly: a misplaced cache never restores, an expression
stays a literal string, a gate always passes. Write each job so its failure is
visible and bounded, then read the run log to confirm what actually happened.

## Bound and order every job

- Give every job a `timeout-minutes` sized from run history, about two to three
  times the longest of its recent successful runs, and report the numbers. A
  hung step otherwise runs to the platform maximum. A job that calls a
  reusable workflow cannot set it; the reusable workflow's own jobs must.
- Restore a cache before the step that would fill it, and skip that step on a
  cache hit. A cache saved after an install never saves time.
- Split independent checks into parallel jobs so one failure reports early.
- Keep gates as gates: a check under `continue-on-error`, or piped into
  `|| true`, always passes and reports nothing.
- A skipped required check counts as passing. To block merge on several jobs,
  add one final job named exactly as the required check, with `needs` on those
  jobs and `if: always()`, that fails unless `needs.<job>.result` is `success`
  for each one, so skipped, cancelled, and failed jobs all fail it. Leave
  advisory jobs out of its `needs`. When adding the pattern, prove it once by
  breaking one needed job on a branch.
- A `concurrency` group keyed on the PR alone with `cancel-in-progress`
  lets a re-run of an older commit cancel the newest commit's run. Re-run at
  the head, or give re-runs their own group.
- A speed-up keeps every check (see `challenge-every-guard`): each test still
  runs in exactly one job, and the gain is measured on real runs against a
  stated baseline window.

## Move values across the shell boundary on purpose

- `with:` inputs are not run through a shell, and `${{ }}` holds expressions,
  not commands. Compute dynamic values in a `run:` step, write them to
  `$GITHUB_OUTPUT`, and reference `steps.<id>.outputs.<name>`.
- Pass untrusted event text (PR titles, branch names, issue bodies) into
  `run:` through `env:`, never by `${{ }}` interpolation into the script, which
  lets the text execute as shell.
- Change the runner OS and any shell-dialect commands in the same edit; `sed
  -i`, `date`, and `xargs` take different flags on macOS and Linux.

## Grant least privilege

Set restrictive top-level `permissions` and grant write scopes per job.
Reusable workflows receive at most what the caller grants, so document the
permissions callers must give. Scope automated commits to the files they
own, and have bots open pull requests with their checks named rather than
pushing to the default branch.

## Write shared workflows for their callers

A reusable workflow or action runs inside other repos' constraints:

- Take toolchain versions as inputs with a safe default; installing the
  newest runtime breaks callers whose `engines` or `devEngines` pin an exact
  version.
- Test new inputs and sub-features against representative callers before
  release, and document the caller YAML for each supported setup.
- Pin third-party actions to a release tag or commit SHA, and version the
  shared workflow so callers can pin it too.

## Verify on a real run

Lint workflows with `actionlint` when available, run the change on a branch or
`workflow_dispatch`, and read the job log: the tool versions installed,
whether the cache hit, and that each gate ran its command. Done when the log
shows each changed step doing what the YAML intends.

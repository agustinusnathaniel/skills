# Scheduler Operations

Running the loop on any scheduler (cron, systemd timers, hosted schedulers) with any coding-agent CLI.

## Scheduler setup

Each scheduled run fires a self-contained agent session. The scheduled prompt carries everything the run needs:

- The repo list and working directory
- The cycle procedure (this skill)
- Which coding-agent CLI to delegate implementation to
- Where to deliver the summary

Prefer a cadence with room to spare (e.g. every 6 hours) — the first cycle over a portfolio is the heaviest (scan plus create on every repo); later cycles are mostly check-and-iterate.

Done when: a fired run needs no interactive input to complete steps 1–5 of the parent skill.

## Process repos sequentially

One repo per run, never parallel implementations in the same working tree. Concurrent suites in one tree produce false reds (temp-dir races, worker timeouts); concurrent runs across repos saturate CPU and turn spawn timeouts into phantom failures. When several scheduled runs fail at once, re-fire them one at a time and wait for each to finish.

Done when: at most one implementation is active per working tree at any moment.

## Bound each repo's time

Set a per-repo time budget and skip repos that exceed it — record the skip in state so the next cycle resumes there. Long full-suite runs get targeted first (affected packages), then typecheck-only for structural changes, then build-only for behavior-preserving refactors.

Done when: the run ends inside its total budget with state saved, even if that means a repo was skipped.

## Triage failures by layer

Scheduled runs fail at three distinct layers — diagnose in this order:

1. **Provider/scheduler layer.** Retried API errors, quota/rate-limit messages, broken streams, empty runs with zero changes after a cold start. Response: retry once; a second identical failure means wait for the next cycle, not rework the code.
2. **Environment layer.** Missing CLIs, wrong binary versions, expired tokens, absent toolchains. Response: fix the environment, then re-run. Verify `gh` is the real GitHub CLI (`gh auth status` succeeds) and pin the coding-agent CLI version the loop was tested against.
3. **Code layer.** Gate failures naming repo files, red CI on the PR's head SHA. Response: this is genuine iterate-mode work — fix it in the PR.

A red gate under concurrent load is suspect until re-run alone: contention timeouts (workers that never spawned, `0ms` across phases) are environment noise, not regressions.

Done when: the failure is attributed to exactly one layer and the response matches that layer.

## Authenticate with least scope

Use `gh` authenticated with a token scoped to the portfolio repos. Validate the token before API calls (`gh auth status`); when API calls return auth errors but git works, treat the token as degraded — push the branch and report the PR-creation URL rather than burning the cycle on auth debugging.

Done when: every run starts with a verified token and ends with no credentials in logs or state.

## Stop conditions

Pause the schedule when: every repo's loop PR is merged and no new improvements surface for two full rounds; the token or scheduler errors twice in a row at the provider layer; or the portfolio owner withdraws autonomous-PR authorization. Pausing preserves state — resuming continues the cursor, never restarts the portfolio.

Done when: a paused loop names the condition that paused it and the state file is intact for resume.

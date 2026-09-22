# Scheduler Operations

Running the loop on any scheduler (cron, systemd timers, hosted schedulers) with any coding-agent CLI.

## Scheduler setup

Each scheduled run fires a self-contained agent session. The scheduled prompt carries everything the run needs:

- The setup decisions (target scope, delivery vehicle, identity convention) and working directories
- The cycle procedure (this skill)
- Which coding-agent CLI to delegate implementation to
- Where to deliver the summary

Prefer a cadence with room to spare — the first cycle is the heaviest (scan plus create); later cycles are mostly check-and-iterate.

Done when: a fired run needs no interactive input to complete steps 1–5 of the parent skill.

## Process targets sequentially

One target per run, never parallel implementations in the same working tree. Concurrent suites in one tree produce false reds (temp-dir races, worker timeouts); concurrent runs across targets saturate CPU and turn spawn timeouts into phantom failures. When several scheduled runs fail at once, re-fire them one at a time and wait for each to finish.

Done when: at most one implementation is active per working tree at any moment.

## Bound each target's time

Set a per-target time budget and skip targets that exceed it — record the skip in state so the next cycle resumes there. Long full-suite runs get targeted first (affected packages), then typecheck-only for structural changes, then build-only for behavior-preserving refactors.

Done when: the run ends inside its total budget with state saved, even if that means a target was skipped.

## Triage failures by layer

Scheduled runs fail at three distinct layers — diagnose in this order:

1. **Provider/scheduler layer.** Retried API errors, quota/rate-limit messages, broken streams, empty runs with zero changes after a cold start. Response: retry once; a second identical failure means wait for the next cycle, not rework the code.
2. **Environment layer.** Missing CLIs, wrong binary versions, expired tokens, absent toolchains. Response: fix the environment, then re-run. Verify the forge CLI is genuine (`gh auth status` succeeds) and pin the coding-agent CLI version the loop was tested against.
3. **Code layer.** Gate failures naming target files, red CI on the delivery's head SHA. Response: this is genuine iterate-mode work — fix it in the delivery.

A red gate under concurrent load is suspect until re-run alone: contention timeouts are environment noise, not regressions.

Done when: the failure is attributed to exactly one layer and the response matches that layer.

## Authenticate with least scope

Use a token scoped to the target scope. Validate the token before API calls; when API calls return auth errors but git works, treat the token as degraded — push the branch and report the creation URL rather than burning the cycle on auth debugging.

Done when: every run starts with a verified token and ends with no credentials in logs or state.

## Stop conditions

Pause the schedule when: all in-flight work is delivered and no new improvements surface for two full rounds; the token or scheduler errors twice in a row at the provider layer; or the owner withdraws autonomous-change authorization. Pausing preserves state — resuming continues where it stopped, never restarts the scope.

Done when: a paused loop names the condition that paused it and the state file is intact for resume.

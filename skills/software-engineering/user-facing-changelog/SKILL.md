---
name: user-facing-changelog
description: >
  Write or review changelog entries and release notes that users read. Use
  when adding a changelog entry, writing a changeset for a published package,
  drafting release notes or an in-app "what's new", or checking a changelog
  against what actually shipped.
---

# User-Facing Changelog

A changelog answers what changed for the reader and what they need to do.
Every entry must be true for the version it sits under.

## Pick the surface and its reader

Each surface carries one level of detail:

- **App changelog or "what's new":** end users. Outcomes they will notice.
- **Package changeset or release notes:** developers using the package.
  Changed APIs, defaults, and migration steps.
- **Commits, PRs, ADRs:** maintainers. Mechanisms, pins, cache keys, and the
  reasons behind them.

Write for the surface's reader and leave the other levels on their own
surfaces. Follow the repository's changelog conventions, entry template, and
registration steps; when its own example breaks its stated rules, follow the
rules.

## Collect what shipped

List the commits and merged PRs between the previous release tag and this
one. Every entry maps to a shipped change in that range, and every
user-visible change in the range has an entry or a deliberate omission.
Internal work (refactors, dependency bumps, tooling) is left out or summarized
as one line, per the repository's convention.

## Write in the reader's words

- Name what the reader can now do, or what now works, in the product's own
  vocabulary: "Shared links keep your filters", not the library or mechanism
  behind it.
- Describe a fix by the symptom the reader saw.
- Lead with breaking changes and required actions, each with the step to take.
- Group the rest as new, improved, and fixed.

## Keep history append-only

Add new entries; leave published ones as they were. Correct a wrong entry
with a note in the next one, and restore any history that was condensed or
rewritten. Keep version, date, and tag consistent with the release.

## Verify

Done when each entry maps to a shipped change, a read from the reader's seat
finds no internal terms, required actions are stated, and the changelog page
or file builds.

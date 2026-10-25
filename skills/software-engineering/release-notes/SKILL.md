---
name: release-notes
description: >
  Write or review changelogs and release notes for any audience. Use when
  adding a CHANGELOG.md entry or a changeset, drafting GitHub release notes,
  writing customer-facing release notes, an in-app "what's new", or app store
  notes, or checking a changelog against what actually shipped.
---

# Release Notes

Release notes answer what changed for one reader and what that reader needs
to do. Every entry must be true for the version it sits under.

## Identify the reader

Each surface serves one reader at one level of detail:

| Reader | Typical surfaces | What they need |
|---|---|---|
| End users and customers | In-app "what's new", changelog page, store notes, customer emails | Outcomes they will notice, in product vocabulary |
| Developers who consume the project | Package changesets, GitHub releases, API changelogs | Changed APIs and defaults, deprecations, migration steps |
| Maintainers | `CHANGELOG.md` technical history, commits, PRs, ADRs | Mechanisms, pins, and the reasons behind them |

Infer the reader from the target file and the repository's conventions. When
the target is unclear, or one release needs several surfaces, ask which
readers to write for before drafting, then write each surface separately.
Follow the repository's format, entry template, and registration steps; when
its own example breaks its stated rules, follow the rules and flag the
mismatch.

## Collect what shipped

List the commits and merged PRs between the previous release (tag, build,
or date) and this one. Every entry maps to a shipped change in that range,
and every change that
matters to this reader has an entry or a deliberate omission. Internal work
(refactors, dependency bumps, tooling) appears only in maintainer notes,
unless it changes behavior a reader relies on.

## Write at the reader's level

- **End users:** name what they can now do, or what now works, in the
  product's own words: "Shared links keep your filters", not the library or
  mechanism behind it. Describe a fix by the symptom they saw.
- **Developers:** name the changed API, default, or requirement, show the
  before and after when usage changes, and give the migration step.
- **Maintainers:** record the mechanism and the reason, and link the PR.

For every reader, lead with breaking changes and required actions, then
group the rest (new, improved, fixed, or the repository's own categories).

## Keep history append-only

Add new entries; never silently change what a published entry claims. Correct
a wrong claim in the next entry; fix typos and broken links in place. Restore
any history that was condensed or rewritten. When the changelog is generated,
follow the repo tooling. Keep version, date, and tag consistent with the
release.

## Verify

Done when each entry maps to a shipped change, a read from the reader's seat
finds nothing pitched at another reader, required actions are stated, a
changeset is added where the repo uses them, and the changelog page or file
builds.

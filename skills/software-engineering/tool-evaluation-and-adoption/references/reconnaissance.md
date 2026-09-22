# Reconnaissance

Map what the tool is and how healthy its project looks before judging it.

## Repo Metadata

Fetch from the forge API (or equivalent):

- Stars, forks, license, primary language, description
- Last commit date, commit count, release count
- Open issue count (maintenance-quality signal)
- Topics/tags

## README Understanding

Read the full README and record:

- What problem it solves
- Who it is for
- Claimed differentiators vs alternatives
- Quick-start commands

## Docs and Registry Cross-Check

Beyond the README:

- Probe the docs site for a machine-readable export (`<docs-site>/llms.txt`) — cleaner than HTML scraping for feature lists and architecture pages.
- For packages, check the registry API (e.g. crates.io, npm) for latest version, download counts, and release cadence. A pre-1.0 version is a risk signal to state in the verdict.
- Cross-check the forge `homepage` field against the README's URLs. A mismatch (or an org/repo name that differs from expectations) can reveal a name collision or a fork.

## Codebase Layout

Map entry points, key modules, build system, package manager, and configuration files.

## User-Shared Repos

When the user shares one of their own projects, clone it and read the key documents (agent instruction files, architecture decision records, operations references, current branch state) before asking them to describe it. Only ask about what the files could not answer.

Done when: the metadata table, the one-paragraph purpose statement, and the layout map all exist in the working notes.

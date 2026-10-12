# skills

A collection of agent skills for AI coding agents.

## Available Skills

### software-engineering

| Skill | Description |
|---|---|
| [architecture-decision-framework](skills/software-engineering/architecture-decision-framework/SKILL.md) | Make architecture decisions using decision matrices, weighted scoring, and iterative refinement. |
| [bulk-import-engineering](skills/software-engineering/bulk-import-engineering/SKILL.md) | Plan, build, or audit bulk file import features with validation previews, execution identity, and safe recovery. |
| [prune-codebase](skills/software-engineering/prune-codebase/SKILL.md) | Prune code, tests, documentation, configuration, and tooling while preserving intended behavior and useful rationale. |
| [test-strategy](skills/software-engineering/test-strategy/SKILL.md) | Choose tests that pin meaningful behavior at the smallest useful boundary. |
| [tool-evaluation-and-adoption](skills/software-engineering/tool-evaluation-and-adoption/SKILL.md) | Vet an open-source tool before adopting it: reconnaissance, security review, fit analysis, go/no-go verdict, verified install. |

### automation

| Skill | Description |
|---|---|
| [autonomous-improvement-loop](skills/automation/autonomous-improvement-loop/SKILL.md) | Compound small improvements on a recurring schedule without per-cycle direction. |

### research

| Skill | Description |
|---|---|
| [domain-research](skills/research/domain-research/SKILL.md) | Research a domain via its canonical authorities and frameworks. |

## Installing Skills

### Interactive picker

```bash
npx skills add agustinusnathaniel/skills
```

This will present an interactive picker of all available skills. Select the ones you want.

### Bundled plugin

The repository also packages all maintained skills as one plugin for Claude Code, Codex CLI, ZCode, Cursor, Kimi Code CLI, and omp.
The root `marketplace.json` is a compatibility mirror of `.claude-plugin/marketplace.json`; keep their plugin entries aligned (versions sync automatically; see Versioning).

In Claude Code, add the marketplace and install the bundled plugin:

```text
/plugin marketplace add agustinusnathaniel/skills
/plugin install agustinusnathaniel-skills@agustinusnathaniel-skills
```

In Codex CLI, add the marketplace and install the same plugin:

```bash
codex plugin marketplace add agustinusnathaniel/skills
codex plugin add agustinusnathaniel-skills@agustinusnathaniel-skills
```

In ZCode, open a workspace, then go to **Settings > Plugins > Create > Add marketplace** and enter `agustinusnathaniel/skills`. Find the marketplace in the **Personal** section and install the bundled plugin.

In Cursor, test the plugin locally before publishing. Copy this repository to
`~/.cursor/plugins/local/agustinusnathaniel-skills` (the `.cursor-plugin/plugin.json`
manifest loads the same skills the Claude manifest lists), restart Cursor or run
**Developer: Reload Window**, then confirm the skills under **Customize**. See
[Plugins](https://cursor.com/docs/plugins) and the
[Plugins reference](https://cursor.com/docs/reference/plugins.md).

In Kimi Code CLI, install directly from the repository URL:

```text
/plugins install https://github.com/agustinusnathaniel/skills
```

then run `/reload` or open a new session. The `kimi.plugin.json` manifest loads the
same skills the Claude manifest lists. See
[Plugins](https://www.kimi.com/code/docs/en/kimi-code-cli/customization/plugins.html).

In omp, add this repository as a marketplace catalog (omp reads the
Claude-compatible `.claude-plugin/marketplace.json` as a fallback) and install the
bundled plugin:

```bash
omp plugin marketplace add agustinusnathaniel/skills
omp plugin install --scope project agustinusnathaniel-skills@agustinusnathaniel-skills
```

See [Plugins](https://omp.sh/docs/plugins).

In Devin, install it from **Customize → Plugins → Add plugin → From repository** with `agustinusnathaniel/skills`, or with the CLI:

```bash
devin plugins install agustinusnathaniel/skills
```

The Devin manifest (`.devin-plugin/plugin.json`) takes precedence over `.claude-plugin/plugin.json` in Devin and loads only the `software-engineering` skills.

### Skill rename

`reduce-production-code` is now `prune-codebase`. Reinstall from this repository
and select `prune-codebase`, then update saved invocations and links that use the
old name. Existing installed copies retain their old name until migrated.

## Adding New Skills

Create a new skill directory under `skills/<domain>/<skill-name>/` with a `SKILL.md` containing YAML frontmatter (`name` and `description` fields), then add it to `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`, `kimi.plugin.json`, the appropriate `skills.sh.json` grouping, and the table above. Add a changeset (`pnpm changeset`) following the bump policy under Versioning.

Validate the skill frontmatter and relative reference links. Keep the directory, frontmatter name, and both registry entries consistent.

[AGENTS.md](AGENTS.md) covers authoring standards and the feedback loop for improving skills from real sessions.

## Versioning

`package.json` is the single source of truth for the plugin version. Every host
manifest mirrors it: `.claude-plugin/plugin.json`, the matching plugin entry in
`.claude-plugin/marketplace.json` and the root `marketplace.json` mirror,
`.devin-plugin/plugin.json`, `.cursor-plugin/plugin.json`, and `kimi.plugin.json`.
(`.claude-plugin/plugin.json` wins when both it and a marketplace entry set a
version, so they are kept identical to avoid a validator warning.) Never edit those
version fields by hand; `scripts/sync-plugin-version.mjs` copies the version over,
and `node scripts/sync-plugin-version.mjs --check` (also run in CI on every PR)
fails when any manifest drifts.

Each PR that changes skills should add a changeset:

```bash
pnpm changeset
```

The release workflow then versions the package, syncs every manifest, and opens a
`chore: version skills` PR; merging it tags the release.

Bump policy: patch for wording fixes, minor for new or changed skill behavior,
major for skill renames or removals.

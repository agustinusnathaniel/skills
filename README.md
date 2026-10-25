# skills

A collection of agent skills for AI coding agents.

## Available Skills

### software-engineering

| Skill | Description |
|---|---|
| [admin-panel-engineering](skills/software-engineering/admin-panel-engineering/SKILL.md) | Build admin panels and backoffice apps whose permissions, sessions, tenancy, audit trails, and list contracts match the server. |
| [architecture-decision-framework](skills/software-engineering/architecture-decision-framework/SKILL.md) | Make architecture decisions using decision matrices, weighted scoring, and iterative refinement. |
| [bulk-import-engineering](skills/software-engineering/bulk-import-engineering/SKILL.md) | Plan, build, or audit bulk file import features with validation previews, execution identity, and safe recovery, including local-first import and export. |
| [calculation-correctness](skills/software-engineering/calculation-correctness/SKILL.md) | Keep money, dates, units, counters, and derived metrics correct across retries, timezones, and edits. |
| [challenge-every-guard](skills/software-engineering/challenge-every-guard/SKILL.md) | Size defensive code to evidence, match sibling code, and check backend changes against recurring review findings. |
| [client-trust-boundary](skills/software-engineering/client-trust-boundary/SKILL.md) | Keep secrets and authorization on the server; treat everything the client holds as public and editable. |
| [codebase-dossier](skills/software-engineering/codebase-dossier/SKILL.md) | Write an evidence-cited dossier of a codebase or a family of related repos (user-invoked). |
| [config-drift](skills/software-engineering/config-drift/SKILL.md) | Verify that a configuration change is what the running system actually uses. |
| [github-actions-authoring](skills/software-engineering/github-actions-authoring/SKILL.md) | Write GitHub Actions workflows whose timeouts, caches, gates, permissions, and shared inputs behave as written. |
| [hydration-safe-state](skills/software-engineering/hydration-safe-state/SKILL.md) | Keep hydration consistent when prerendered or server-rendered HTML meets browser-only state. |
| [mobile-app-shell](skills/software-engineering/mobile-app-shell/SKILL.md) | Build React Native and Expo app shells that survive cold starts, stale tokens, flaky networks, and long-lived binaries. |
| [prune-codebase](skills/software-engineering/prune-codebase/SKILL.md) | Prune code, tests, documentation, configuration, and tooling while preserving intended behavior and useful rationale. |
| [pull-request-readiness](skills/software-engineering/pull-request-readiness/SKILL.md) | Shape PRs and stacks, check readiness against evidence, and hand over the merge checklist before anyone merges. |
| [pull-request-review](skills/software-engineering/pull-request-review/SKILL.md) | Review others' PRs, leading with must-fix findings and marking minor points non-blocking, and draft comments the user approves before they are posted. |
| [release-notes](skills/software-engineering/release-notes/SKILL.md) | Write changelogs and release notes for end users, developers, or maintainers, verified against what shipped. |
| [test-strategy](skills/software-engineering/test-strategy/SKILL.md) | Choose tests that pin meaningful behavior at the smallest useful boundary. |
| [tool-evaluation-and-adoption](skills/software-engineering/tool-evaluation-and-adoption/SKILL.md) | Vet an open-source tool before adopting it: reconnaissance, security review, fit analysis, go/no-go verdict, verified install. |
| [url-state](skills/software-engineering/url-state/SKILL.md) | Carry filters, pagination, and share links in the URL with a tested string round trip. |
| [webhook-integration](skills/software-engineering/webhook-integration/SKILL.md) | Handle provider webhooks, payment settlement and reconciliation, partner APIs, queues, and sync jobs so replays and failures are recoverable. |

### automation

| Skill | Description |
|---|---|
| [autonomous-improvement-loop](skills/automation/autonomous-improvement-loop/SKILL.md) | Compound small improvements on a recurring schedule without per-cycle direction. |
| [delegating-to-coding-agents](skills/automation/delegating-to-coding-agents/SKILL.md) | Brief, own, watch, and verify coding agent sessions that push to pull requests. |

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

In ZCode, open a workspace, then go to **Settings > Plugins > Create > Add marketplace** and enter `agustinusnathaniel/skills`. Find the marketplace in the **Personal** section and install the bundled plugin. ZCode loads `.zcode-plugin/plugin.json`, which lists the same skills as the Claude manifest.

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

Create a new skill directory under `skills/<domain>/<skill-name>/` with a `SKILL.md` containing YAML frontmatter (`name` and `description` fields), then add it to `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`, `.zcode-plugin/plugin.json`, `kimi.plugin.json`, the appropriate `skills.sh.json` grouping, and the table above. Add a changeset (`pnpm changeset`) following the bump policy under Versioning.

Keep frontmatter to the portable [Agent Skills](https://agentskills.io/specification) fields (`name` matching the directory, `description` up to 1024 characters). A skill that should run only when a user invokes it needs three settings, because hosts read different keys: `disable-model-invocation: true` (Claude Code, Cursor, Kimi, omp), `triggers: ["user"]` (Devin), and `agents/openai.yaml` with `policy.allow_implicit_invocation: false` (Codex). ZCode has no manual-only setting, so the description must still read as a trigger.

Validate the skill frontmatter and relative reference links. Keep the directory, frontmatter name, and both registry entries consistent.

[AGENTS.md](AGENTS.md) covers authoring standards and the feedback loop for improving skills from real sessions.

## Versioning

`package.json` is the single source of truth for the plugin version. Every host
manifest mirrors it: `.claude-plugin/plugin.json`, the matching plugin entry in
`.claude-plugin/marketplace.json` and the root `marketplace.json` mirror,
`.devin-plugin/plugin.json`, `.cursor-plugin/plugin.json`, `.zcode-plugin/plugin.json`, and
`kimi.plugin.json`.
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

# skills

A collection of agent skills for AI coding agents.

## Available Skills

### software-engineering

| Skill | Description |
|---|---|
| [architecture-decision-framework](skills/software-engineering/architecture-decision-framework/SKILL.md) | Make architecture decisions using decision matrices, weighted scoring, and iterative refinement. |
| [bulk-import-engineering](skills/software-engineering/bulk-import-engineering/SKILL.md) | Plan, build, or audit bulk file import features with validation previews, execution identity, and safe recovery. |
| [external-integration-engineering](skills/software-engineering/external-integration-engineering/SKILL.md) | Plan, build, or audit safe retries and recovery for third-party writes, webhooks, and database-to-provider work. |
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

```bash
npx skills add agustinusnathaniel/skills
```

This will present an interactive picker of all available skills. Select the ones you want.

### Skill rename

`reduce-production-code` is now `prune-codebase`. Reinstall from this repository
and select `prune-codebase`, then update saved invocations and links that use the
old name. Existing installed copies retain their old name until migrated.

## Adding New Skills

Create a new skill directory under `skills/<domain>/<skill-name>/` with a `SKILL.md` containing YAML frontmatter (`name` and `description` fields), then add it to `.claude-plugin/plugin.json`, the appropriate `skills.sh.json` grouping, and the table above.

Validate the skill frontmatter and relative reference links. Keep the directory, frontmatter name, and both registry entries consistent.

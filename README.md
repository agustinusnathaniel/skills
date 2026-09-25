# skills

A collection of agent skills for AI coding agents.

## Available Skills

### software-engineering

| Skill | Description |
|---|---|
| [architecture-decision-framework](skills/software-engineering/architecture-decision-framework/SKILL.md) | Make architecture decisions using decision matrices, weighted scoring, and iterative refinement. |
| [reduce-production-code](skills/software-engineering/reduce-production-code/SKILL.md) | Reduce production code through substantive simplification and ecosystem reuse while preserving intended behavior. |
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

## Adding New Skills

Create a new skill directory under `skills/<domain>/<skill-name>/` with a `SKILL.md` containing YAML frontmatter (`name` and `description` fields), then add it to `.claude-plugin/plugin.json`.

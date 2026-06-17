# skills

A collection of agent skills for AI coding agents.

## Available Skills

### software-engineering

| Skill | Description |
|---|---|
| [architecture-decision-framework](skills/software-engineering/architecture-decision-framework/SKILL.md) | Make architecture decisions using decision matrices, weighted scoring, and iterative refinement. |

## Installing Skills

```bash
npx skills add agustinusnathaniel/skills
```

This will present an interactive picker of all available skills. Select the ones you want.

## Adding New Skills

Create a new skill directory under `skills/<domain>/<skill-name>/` with a `SKILL.md` containing YAML frontmatter (`name` and `description` fields), then add it to `.claude-plugin/plugin.json`.

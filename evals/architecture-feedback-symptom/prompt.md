---
description: Feedback naming one item triggers an audit of the whole artifact against the reference model.
tags: [architecture-decision-framework, behavior]
max_turns: 6
---

Earlier you recommended this layout, matching the reference repo I gave you: one folder
per host under `plugins/`, and shared skills only in the top-level `skills/` directory.
Nothing should remain in `packages/agent-plugins/`.

Current tree after your change:

```
plugins/claude/.claude-plugin/plugin.json
plugins/codex/.codex-plugin/plugin.json
packages/agent-plugins/claude/hooks/hooks.json
packages/agent-plugins/codex/config.toml
skills/review/SKILL.md
plugins/claude/skills/review/SKILL.md
```

I already told you about `packages/agent-plugins/claude/hooks`. It is still there.
Fix your recommendation.

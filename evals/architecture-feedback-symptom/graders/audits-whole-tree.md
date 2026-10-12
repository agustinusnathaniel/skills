---
type: llm
---

Pass only if the response identifies all three deviations from the stated layout:
the leftover `packages/agent-plugins/claude/hooks/hooks.json`, the leftover
`packages/agent-plugins/codex/config.toml`, and the duplicated skill at
`plugins/claude/skills/review/SKILL.md` that should exist only under `skills/`.
Fail if it addresses only the hooks file.

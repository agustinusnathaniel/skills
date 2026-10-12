---
description: Reducing agent instructions preserves each obligation's trigger, exception, and strength.
tags: [prune-codebase, behavior]
max_turns: 6
---

Our agent instructions have grown across AGENTS.md, CLAUDE.md, and three skills, and agents
keep missing rules. Prune them substantially without changing how agents behave. Start
with AGENTS.md below: reply with the reduced file and a short note on what you removed
and why.

```markdown
# Repo rules
- Always run `pnpm test` before committing.
- Before you commit anything, make sure the test suite passes by running pnpm test.
- You must never force-push to `main`.
- Use pnpm, not npm or yarn.
- When a change touches anything under `packages/`, add a changeset with `pnpm changeset`, except for `packages/internal-*`, which are never published.
- Write clean code.
- The CI config lives in `.github/workflows/ci.yml`.
```

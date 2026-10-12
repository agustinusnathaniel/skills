# Skill authoring

Every `SKILL.md` and reference here is a document agents load. Write and edit them
with the `writing-for-agents` skill, and calibrate against current model guidance:
[OpenAI on skills for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)
and [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).
Registration steps live in the README under "Adding New Skills".

- Fold a learning into the skill that owns the behavior, or a conditional
  reference behind a pointer. A new skill needs a trigger no existing description
  covers.
- Generalize to the mechanism behind an incident. A rule earns its line when the
  failure recurs across sessions or repos, or one miss is costly; repo names,
  tools, and one-off details stay in the PR description.
- Skills install into Claude Code, Codex, opencode, and Devin. Use plain Markdown
  and portable frontmatter, and name tools generically.

## Feedback loop

Improve skills from observed runs, not imagined ones.

1. Mine recent sessions where a skill loaded: user corrections, re-asks, and "why
   did you stop" after the load, plus tasks where a skill fit but never loaded.
   Local stores: `~/.local/share/opencode/opencode.db` (SQLite, `part` table),
   `~/.codex/sessions/`, `~/.claude/projects/`. Keep secrets and personal data out
   of anything committed.
2. Check each finding against the current text and git history; a finding the
   skill already answers is a triggering or wording problem, not a missing rule.
3. Add or update an eval case under `evals/` that fails on the observed behavior,
   then edit the skill.
4. Run the suite with and without the plugin:
   `claude plugin eval . --model <pinned model> --json evals/results/latest.json`.
   Keep a change when the with-plugin arm improves on its case without
   regressing others.

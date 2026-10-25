# Skill authoring

Every `SKILL.md` and reference here is a document agents load. Write and edit them
with the `writing-for-agents` skill, and calibrate against current model guidance:
[OpenAI on skills for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)
and [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).
Registration and versioning steps live in the README.

- This repo is independent of maestria. A skill belongs here when a specific
  kind of task triggers it, and it stays only if it is recurring, adds what a
  model gets wrong without it, is verifiable from public docs or repeated
  experience, and sits in a stack the maintainer uses. Agent behaviour for
  every task belongs in maestria; personal workflow and one-company lessons
  stay out. Label stack-specific advice.
- Fold a learning into the skill that owns the behavior, or a conditional
  reference behind a pointer. A new skill needs a trigger no existing description
  covers.
- Generalize to the mechanism behind an incident. A rule earns its line when the
  failure recurs across sessions or repos, or one miss is costly. Private project
  names and one-off details stay out of skill text and PR descriptions alike;
  this repo is public.
- Skills install into several agent hosts (see the README). Use plain Markdown and
  portable frontmatter, and name tools generically.

## Feedback loop

Improve skills from observed runs, not imagined ones.

1. Review recent agent sessions where a skill loaded: user corrections, re-asks,
   and "why did you stop" after the load, plus tasks where a skill fit but never
   loaded. Transcripts can hold secrets and private project details; only the
   generalized finding enters the repo.
2. Check each finding against the current text and git history; a finding the
   skill already answers is a triggering or wording problem, not a missing rule.
3. Generalize the finding into the skill that owns the behavior, then watch the
   next sessions where it loads.
4. When a change's effect is uncertain, such as a description edit meant to fix
   triggering, run a one-shot eval: a few cases under an untracked `evals/`, run
   once with and without the skill (`claude plugin eval . --allow-tools Read`, or
   the same prompts through opencode). Record the result in the PR description,
   and keep the eval files out of git.

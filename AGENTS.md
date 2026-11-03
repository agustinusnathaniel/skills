---
trigger: manual
---

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
- A new skill needs a trigger no existing description covers.
- Private project names and one-off details stay out of skill text and PR
  descriptions alike; this repo is public.
- Skills install into several agent hosts (see the README). Use plain Markdown and
  portable frontmatter, and name tools generically.

## Keeping skills small

Instruction sets rot by accumulation: agents skip rules, misapply narrow ones,
and pick arbitrarily between contradicting ones. A description is loaded on
every turn and a `SKILL.md` body on every trigger, so both stay lean.

- One home per rule. The skill that owns the behaviour holds it, and other
  skills point there in one line that names the skill and section, so a
  reader without that skill installed still knows what to look for. Fold a
  learning into that home or into a conditional reference behind a pointer.
- Edit an existing line before adding one. Generalize to the mechanism behind
  an incident, and merge lessons that share a root into one principle plus its
  test.
- Keep a line only if it passes the deletion test: a current frontier model
  would not do it unprompted, a failure that recurs across sessions or repos
  (or one costly miss) or an authoritative source stands behind it, no other
  skill holds it, and it contradicts no other rule.
- Keep a `SKILL.md` body under about 1,000 words; past that, move what only
  some branches need into references.
- Prune descriptions hardest: one trigger per real branch, no synonyms, no
  identity the body already carries.
- Every skill PR reports word counts before and after (repo total, each changed
  `SKILL.md` and description) and lists any rule dropped rather than merged or
  moved.

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

---
name: pull-request-review
description: >
  Review someone else's pull request and draft the comments the user will
  post under their name. Use when asked to review a PR, draft review or line
  comments, or reply in a review thread.
---

# Pull Request Review

A review the user posts carries their name and their credibility. Raise only
what matters, phrase it so the author can act on it, and post nothing the
user has not approved word for word.

## Gather context

Read the PR body, the linked issue or spec, and the full diff before judging.
For a large change, also read the tracker item and the design discussion, and
judge the diff against the spec it implements rather than against your own
design. Check whether other open PRs or comments already raise the point.

## Keep only critical findings

Unless the user asks for a full review, comment only on what must change
before merge:

- Wrong behaviour, data loss, races, unhandled failure paths.
- Security, authorization, secrets, personal data.
- Breaking API or schema changes, irreversible migrations.
- Unrelated changes hidden in the commits.
- Large additions the feature does not need.

Verify each finding against the code before drafting it.

## Draft the review

Start with a one-line verdict: **LGTM**, **LGTM after a small fix**, or
**needs changes**. When nothing is critical, say LGTM and stop.

For each finding give:

- The exact file and line in the diff.
- One sentence on the problem for the user.
- A short, paste-ready comment phrased as a question or a concrete ask. For a
  one- or two-line fix, include a suggestion block.

When the comments are questions rather than blockers, say so in the summary.
Post as a single comment review at the head commit; approve or request
changes only when the user asks for that.

## Write in the user's voice

Read a few of the user's recent review comments and match their tone, length,
and way of addressing people. When the user says they are new to the area,
write as a learner: questions rather than verdicts, one plain "what if" per
point, and asking which doc to read rather than asserting a contradiction.

Follow the user's and the project's policy on disclosing AI assistance. Keep
the comments about the code, without narrating which tools ran or how many
review rounds happened.

Make every reference a full markdown link with a few plain words on what it
is, rather than a bare `#123` or `file:850`. Use standard markdown links, `-`
bullets with indented sub-bullets, and backticks for code, so the text pastes
cleanly anywhere.

## Post only after approval

1. End the message with the full, paste-ready draft as the last thing the
   user sees, then ask: post, edit, or skip. One version, no variants.
2. Across revision rounds, keep a running list of every change the user asked
   for; when two asks conflict, name the conflict and ask.
3. Post only the exact text the user approved. Proofread it first.
4. Fetch the posted text back and compare it with the approved draft. Fix a
   slip in place only after the user says yes.

Without a posting tool you are authorized to use, stop at step 1: the user
posts it.

## On pushback

Agree with what is right first, then add the missing context. Credit whoever
caught something, and flag corrections openly.

---
name: pull-request-review
description: >
  Review someone else's pull request and draft text the user will post under
  their own name. Use when asked to review a PR, draft review or line
  comments, reply in a review thread or issue, or write a team-chat message,
  support reply, or status update for the user to send.
---

# Pull Request Review

A review the user posts carries their name and their credibility. Raise only
what matters, phrase it so the author can act on it, and post nothing the
user has not approved word for word.

## Gather context

Read the PR body, the linked issue or spec, and the full diff before judging.
For a large change, especially from someone senior in the area, also read the
tracker item and the design discussion, and judge the diff against the spec
it implements rather than against your own design. Check whether other open
PRs or comments already raise the point.

## Keep only critical findings

Comment only on what must change before merge:

- Wrong behaviour, data loss, races, unhandled failure paths.
- Security, authorization, secrets, personal data.
- Breaking API or schema changes, irreversible migrations.
- Unrelated changes hidden in the commits.
- Large additions the feature does not need.

Verify each finding against the code before drafting it. Style and naming
preferences stay out.

## Draft the review

Start with a one-line verdict: **LGTM**, **LGTM after a small fix**, or
**needs changes**. When nothing is critical, say LGTM and stop.

For each finding give:

- The exact file and line in the diff.
- One sentence on the problem for the user.
- A short, paste-ready comment phrased as a question or a concrete ask. For a
  one- or two-line fix, include a suggestion block.

Open the review summary with thanks. When the comments are questions rather
than blockers, say so. Post as a single comment review at the head commit,
never as approve or request-changes unless the user asks for that.

## Write in the user's voice

When the user is new to the area, write as a learner: questions, not
verdicts, one plain "what if" per point. "I" for the user's own
accountability, "we" for shared work. Asking which doc to read beats pointing
out a contradiction. Raise confidence gradually as the user's footing in the
area grows.

Address the owning team rather than one person, and point at PRs and
comments, not people, when raising overlap. Leave out how the review was
produced: no mention of agents, tools, or internal review rounds.

Make every reference a full markdown link with a few plain words on what it
is: never a bare `#123` or `file:850`. Use standard markdown links, `-`
bullets with indented sub-bullets, backticks for code, and sparing bold, so
the text pastes cleanly anywhere.

## Post only after approval

1. End the message with the full, paste-ready draft as the last thing the
   user sees, then ask: post, edit, or skip. One version, no variants.
2. Across revision rounds, keep a running list of every change the user asked
   for; when two asks conflict, name the conflict and ask.
3. Post only the exact text the user approved. Proofread it first.
4. Fetch the posted text back and compare it with the approved draft. Fix a
   slip in place only after the user says yes.

On a team-chat or other channel without a posting tool you are authorized to
use, stop at step 1: the user sends it.

For team-chat messages, issue replies, support replies, and status updates,
also use [other outbound text](references/other-outbound-text.md).

## On pushback

Agree with what is right first, add the missing context, and say the user is
happy either way when that is true. Credit whoever caught something, and flag
corrections openly.

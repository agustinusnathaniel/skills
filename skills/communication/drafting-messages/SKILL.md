---
name: drafting-messages
description: >
  Draft or edit text another person will post under their own name: chat
  messages, review requests and nudges, status updates, asks to other teams,
  bug reports, and meeting or go/no-go prep. Use when writing or revising
  such a draft, or polishing a draft the user wrote. PR review comments
  belong to pull-request-review.
---

# Drafting Messages

A draft posted under someone's name spends their credibility. Write only what
the author can explain and defend line by line, check it with a second pass,
and hand it over so the final text is never in doubt.

For review comments on someone else's pull request, use `pull-request-review`,
which owns choosing findings and posting them.

## Write what the author can defend

- Every claim matches live data or the current source. Drop what is
  unverified, or turn it into a question.
- State the plain mechanism: what happens, to whom, when. Drop a caveat whose
  meaning lives elsewhere ("two rare cases are known limits") unless the
  sentence says what the cases are.
- Every number says what it measured and how, over which window: "every answer
  named the failure reason, by keyword check", not "cause naming 100%".
- Every cited source gets an inline link, and every PR or issue reference is
  a full link rather than a bare number, since readers jump in mid-thread.
- Spell out internal shorthand. A message to readers outside the team opens
  with one plain line on what the work is.
- State verified facts plainly; hedge only judgment calls and open questions.
- Before the author posts a finding new to them, explain the problem and the
  fix with one concrete case. Put no question, risk, or proposal in the draft
  that they have not had explained.
- Commit the author or their team only to dates, estimates, and work they have
  stated for this audience.
- Match the author's voice from their recent messages, and keep the text about
  the subject rather than the tools or rounds that produced it, unless the
  author or the venue wants that disclosed.

## Edit the author's draft in place

Keep every point they made. Cut only unsourced claims and lecturing they did
not ask for, fix facts and links, and say what changed. Across revision rounds,
keep a running list of everything they asked for and check each new version
against all of it. Recipients, tags, and cc lines change only on their say.

## Shape by message type

- **Review requests.** One plain line per PR on its purpose and whether it
  blocks anything. The evidence answers what a reviewer will ask: is it real,
  how often, who is affected, what the fix touches. Label each claim that
  rests on a diagnosis as proven, strong but unproven, or inferred.
- **Status posts.** Cover every item the audience tracks, parked and flag-off
  ones included with why when they track them: what worked (with evidence),
  what is in progress, what blocks, and the plan's next steps in order, not
  only the one PR that exists.
- **Asks to another team.** Give a concrete expectation and its reason ("this
  week if possible, because ...") rather than "no rush". Check whether an order
  or dependency is real before writing "once X lands"; when it is not, say
  either order is fine, and keep the ask as light as the dependency allows.
  Follow the shape of a post that channel already accepted.
- **Breakage reports.** What was observed (environment, version, steps,
  evidence), the scope in one clause ("staging only; production does not use
  this yet"), and any cause as a hypothesis. When the cause traces to a
  teammate's change, re-check it against what that change claimed, state the
  data neutrally, and bring a proposal such as revert or fix forward.
- **Where it goes.** Reply in the existing thread on the topic; start a thread
  only for a new topic or a broad update. Link related threads both ways: the
  new post links earlier ones, and each earlier thread gets a one-line pointer
  to the new one.
- **Result posts.** Shorten words, not facts: keep the full table, the method,
  and the links.
- **Meeting prep.** One useful shape: group items as Share / Decide / Ask /
  Warn, at most about seven, each one sentence the author can say aloud, links
  after it, and no ids or jargon in the spoken part. Add short answers to the
  likely questions.
- **Go/no-go and "what's left" lists.** Build from the full source checklist
  (runbook and the plan's open items), never from a summary or an earlier list.
  Each item gets an owner, a status (done, not done, unknown), and evidence;
  done means verified where it broke, not merged.

## Check, then hand over

1. For a draft with factual claims or one going outside the team, run a
   separate checker pass, a fresh subagent where available, given the draft,
   its destination and audience, and the author's earlier asks; a quick
   self-check is enough otherwise. It
   checks each fact against its source, each rule above, and that links and
   formatting render. Fix every failure, and check again after any change
   beyond wording.
2. Hand over a short note of what was checked and what could not be, then the
   full final text as the last thing in the message. Label several drafts by
   recipient and topic, not by number. When the author asks for the final
   version, or the draft changed since they last saw it, print the whole
   current text, not a list of edits; show a short paste-ready draft in full
   whenever it is still pending.
3. Post or save only the exact approved text, through a channel you are
   authorized to use. Proofread it first, then read the rendered post back and
   compare.

Done when the author has one complete, checked draft per destination, with no
claim they cannot source and no commitment they did not make.

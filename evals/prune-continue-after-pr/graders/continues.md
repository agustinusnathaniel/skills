---
type: llm
---

The eval workspace contains no code, so a reply may condition its next steps on getting
access to the checkout; do not penalize that.

Pass only if the response treats PR #41 as an intermediate checkpoint and plans to work
candidates (a), (b), and (c) as part of the current effort, in PR #41 or follow-up PRs
stacked on it, or gives a concrete evidence-based reason to keep a specific one. Fail if
it reports the pruning task as complete, or leaves the candidates as optional ideas for
an unspecified later time.

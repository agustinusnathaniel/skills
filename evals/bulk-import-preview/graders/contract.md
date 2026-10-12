---
type: llm
---

Pass only if the outline (1) ties the preview to the exact file and options validated, so
changing either requires validating again, (2) makes execution a separate explicit
action after preview, (3) covers partial success or failure and retry semantics, and
(4) handles a lost or ambiguous execution response through an operation identity,
idempotent replay, or status lookup rather than blindly resubmitting.

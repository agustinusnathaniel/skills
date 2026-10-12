---
description: An opened PR is a checkpoint; remaining in-scope candidates get worked, not deferred.
tags: [prune-codebase, behavior]
max_turns: 6
---

We're pruning the `billing` package with a target of 15% fewer production lines.
PR #41 is open: it removed the legacy retry wrapper (-120 production lines, -40 test lines).
That puts us at 9% so far. During the survey you also noted three candidates:

(a) `formatCurrency` reimplements what `Intl.NumberFormat` already does,
(b) two parallel invoice serializers that produce the same JSON,
(c) a feature flag that has been enabled for every customer for a year.

The PR is up. Give me your status report and what happens next.

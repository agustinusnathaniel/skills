# Delta accounting

Read this when recording the baseline and when reporting deltas.

## Baseline

Record the baseline without disturbing user changes. Count with one method in
exclusive buckets: production, tests/support, docs/directives, generated/vendor,
and other. Classify maintained registries, configuration, and templates with the
behavior they implement; preserve retained component inventories unless pruning
is requested. Decide what is generated from ownership and provenance, not from
generated headers mentioned in maintained source or tests. Include new and untracked
work, reconcile with the complete diff, and explain classification
corrections. Keep current-round and cumulative deltas distinct, using any
comparison range the user specifies.

## Report

Re-count deltas at the current head of every delivered branch, never at an
earlier revision or before a rebase. Report target and actual deltas over the
full delivery range, leading with production, tests/support, combined
maintained code, and reconciled overall totals together so production-only
savings never stand alone. Label round subtotals. Keep generated/vendor and
lockfile churn on their own line; it never counts as savings.

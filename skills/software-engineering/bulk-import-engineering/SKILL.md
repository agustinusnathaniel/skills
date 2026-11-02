---
name: bulk-import-engineering
description: >
  Build, fix, or audit data import and export: bulk file imports with
  validation previews, job status, and safe recovery; backup and restore; and
  JSON, CSV, or spreadsheet import and export, including in local-first
  apps. Excludes ordinary single-file uploads and file analysis.
---

# Bulk Import Engineering

Keep validation, preview, execution, and status tied to the same import operation.

When the import or export runs against client-side storage rather than a server, follow [local import and export](references/local-import-export.md).

## Trace the server contract

Before changing the flow, inspect the backend contract for validation, execution, status, retries, permissions, and concurrent submissions, and trace how the selected file and options are tied to the validation result and preview. Build on existing capabilities and surface gaps; the UI never defines server behavior, so invent no endpoints.

## Bind preview to its inputs

A preview is valid only for the file contents and options that were validated; replacing or editing either requires validating again before execution. Execution is an explicit action after review, and validation and preview commit nothing.

If preview rows are editable, establish how the server validates the edited
revision and binds execution to it. Ignore obsolete validation responses so an
earlier selection cannot replace the current preview.

Represent pending, in-progress, successful, partial, and failed outcomes, and define retry and reset (failed items or the whole operation), from the server contract. Imports are not necessarily atomic, and a lost response does not prove that no work occurred.

Recover an uncertain outcome through the backend's supported mechanism. When
the server guarantees idempotent replay for the same operation key and unchanged
payload, and the operation remains within that guarantee's retention window,
replay that existing intent without requiring a separate status lookup.
Otherwise reconcile through an available
status or recovery path before creating another intent. If neither safe replay
nor reconciliation is supported, keep the outcome unknown and surface the
contract gap; generating a fresh key does not resolve it.

Use a stable operation identity when the backend supports one. A disabled button or client-generated identifier improves the interface but does not enforce duplicate handling, authorization, or concurrency. Keep those decisions authoritative at the server boundary, and associate displayed progress and results with the correct operation.

Review access, cleanup, and retention for original files and temporary import artifacts. Retain files only as long as the product and applicable policy require.

Check the transitions the contract supports: changing a file after preview, duplicate or concurrent submission, partial failure and retry, uncertain execution outcome, and reset during an unfinished import.

For implementation, verify the affected transitions and resulting job state.
For an audit, state the setup, action, and expected result of the smallest checks
that would expose the material gaps. Separate inspected behavior from untested
runtime behavior and unresolved server guarantees.

---
name: bulk-import-workflows
description: >
  Build or audit bulk file imports with validation previews and explicit
  execution. Use for import workflows rather than ordinary uploads or analysis.
---

# Bulk Import Workflows

Keep validation, preview, execution, and status tied to the same import operation.

## Trace the server contract

Before changing the flow, inspect the backend contract for validation, execution, status, retries, permissions, and concurrent submissions. Trace how the selected file and import options are associated with the validation result and preview. Follow existing capabilities and make gaps visible; do not invent endpoints or assume the UI defines server behavior.

## Bind preview to its inputs

Treat a preview as valid only for the file contents and options that were validated. Replacing or editing either invalidates that preview and requires validation again before execution. Keep execution as an explicit action after review; validation and preview must not commit imported work.

If preview rows are editable, establish how the server validates the edited
revision and binds execution to it. Ignore obsolete validation responses so an
earlier selection cannot replace the current preview.

Represent pending, in-progress, successful, partial, and failed outcomes according to the server contract. Define retry and reset behavior from that contract, including whether retry applies to failed items or the whole operation. Do not assume every import is atomic. If a connection fails after execution may have started, reconcile the existing operation and its status before submitting again; a lost response does not prove that no work occurred.

Use a stable operation identity when the backend supports one. A disabled button or client-generated identifier improves the interface but does not enforce duplicate handling, authorization, or concurrency. Keep those decisions authoritative at the server boundary, and associate displayed progress and results with the correct operation.

Review access, cleanup, and retention for original files and temporary import artifacts. Retain files only as long as the product and applicable policy require.

Check meaningful transitions such as changing a file after preview, duplicate or concurrent submission, partial failure and retry, uncertain execution outcome, and reset during an unfinished import. Keep checks aligned with the supported contract.

For implementation, verify the affected transitions and resulting job state.
For an audit, state the setup, action, and expected result of the smallest checks
that would expose the material gaps. Separate inspected behavior from untested
runtime behavior and unresolved server guarantees.

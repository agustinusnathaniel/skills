# API-Backed Form and Attachment Checks

Read this reference when a change affects create or edit forms whose fields
depend on other answers, or forms that save persisted attachments. Choose only
the checks that cover the changed contract; a form does not need a full
scenario matrix by default.

## Follow the value contract

Trace the affected value through the rendered control, request payload, saved
record, and edit prefill. Verify that each representation preserves the
field's intended meaning. For an unchanged edit and save, compare the reread
record with the loaded record, allowing documented normalization such as a
canonical date or time zone. Include valid `false` and `0` values when those
values are allowed.

Resolve omitted, `null`, empty, and explicit clear behavior from the API and
product contract. For partial updates, check whether omission preserves the
stored value and which representation clears it. Conditional fields follow
the documented policy when they become inactive, such as retaining or clearing
their values. A field disappearing from the UI does not define the save
semantics.

When a change affects conditional validation, check the relevant active and
inactive branch and a transition in its controlling value. Confirm that the
validation outcome matches the submitted payload and the documented policy
for inactive fields. Where authorization or server validation changes, check
that request boundary separately from client-side messages and disabled
controls.

## Follow attachment identity and save boundaries

Distinguish a new file upload from a reference to an attachment already stored
by the server. Follow the actual API shape, whether the record request carries
multipart file data or a prior upload returns an identifier that the record
request attaches. Treat server attachment identifiers as identity; filenames,
display labels, list positions, and temporary URLs can change. When affected,
verify that reorder, removal, and replacement apply to the intended persisted
attachments after rereading the record.

If upload succeeds but saving the record fails, establish what a retry does:
reuse the uploaded object, upload again, or follow another documented
recovery path. For a lost or ambiguous response, use only server-supported
replay, status, or reconciliation behavior. Do not infer atomic rollback,
idempotency, or deletion from the UI. Check cleanup only when the server
provides and authorizes that capability. For broader retry and external-effect
cases, see [workflow failure checks](workflow-failures.md).

## Check asynchronous ownership and recovery

When prefill or upload is asynchronous, exercise the relevant stale-response
case if a record, file, or controlling selection can change while work is in
flight. An older response must not overwrite newer edits, replace the current
file selection, or attach an upload to a different selected record.

After validation or save errors, verify that the user can correct or retry
without losing entered values or the intended retained attachments. Apply
reset behavior only where the product defines a reset action; an error alone
does not imply that the form should be cleared. For other pending, failure,
and retry UI transitions, see [UI state verification](ui-state-verification.md).

Use the smallest boundary that proves the affected behavior, often the form
interaction plus the request and a reread of persisted state. Capture only the
setup, action, request or resulting state needed to judge the contract, using
synthetic data and redacted evidence. Bulk import previews, jobs, and recovery
are outside this reference; use `bulk-import-engineering` when available.

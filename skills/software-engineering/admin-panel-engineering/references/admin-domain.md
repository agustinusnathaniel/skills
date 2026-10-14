# Admin domain

Read this when a change adds or alters an action that changes data, an
approval, a role, or anything an auditor or operator will later need to
reconstruct.

## Audit trail

Record who did what to which record, when, and from where, with the old and
new values of each changed field. Write the entry on the server, in the same
transaction as the change, so a failed change leaves no entry and a
successful one always has one. Log logins, permission changes, and exports
as well as edits. Never let the client supply the actor.

## Destructive actions

Match friction to reversibility:

- **Reversible** (hide, archive, deactivate): one click with an undo.
- **Recoverable with effort** (bulk status change, unassign): a confirmation
  that names the records and the effect.
- **Irreversible** (hard delete, payout, sending to customers): a
  confirmation that requires typing or re-reading the target, and server-side
  checks that do not rely on the dialog.

Label buttons with the action and its object ("Deactivate 3 users"), not
"OK". Prefer deactivation to deletion for records that other records,
reports, or the audit trail reference.

## Approvals

When an action needs approval, the approver must be someone other than the
requester; enforce this on the server. Record each transition of the request
with its actor. Re-check the approver's permission at approval time, since
roles change while requests wait.

## Roles and permissions

Model permissions at three levels: which menus and pages show, which actions
are offered, and which API calls succeed. The first two are presentation; the
third is the boundary. Clone roles from a template rather than editing a
shared role in place, and show what a role grants before it is assigned.

## Exports and reports

State the scope on every export (visible page, full filtered result, or a
fixed report), record the export in the audit trail, and run large exports
as server jobs with a download link.

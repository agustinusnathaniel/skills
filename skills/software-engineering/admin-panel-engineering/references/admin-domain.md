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
"OK". Focus Cancel when a confirmation for a destructive or outward action
opens, so a second Enter does not execute it. Prefer deactivation to deletion
for records that other records, reports, or the audit trail reference.

Reserve destructive styling (red rows, danger buttons) for actions after which
something people made is gone for everyone and cannot be restored. Removing
access, archiving, disconnecting, and signing out keep the default style.

Keep a dialog closable while a background job runs. Disable Close only for
the in-flight request that starts the job, and track the job with a separate
status query; awaiting the job's completion inside the action that disabled
Close traps the operator until it times out.

## Operator-facing status

Every skipped, blocked, or failed state an operator sees carries a fixed
reason code (never a user's email or id) and the next step, such as the
command or button that recovers it. Keep distinct causes distinct rather than
collapsing them into one label. Status copy is true in every state: "not
counted yet" is not failure, and a total that says "everyone" counts the
skipped people too. Reuse the app's existing label maps, and give each action
one name everywhere.

## Approvals

When an action needs approval, the approver must be someone other than the
requester; enforce this on the server. Record each transition of the request
with its actor. Re-check the approver's permission at approval time, since
roles change while requests wait.

When a change adds an irreversible capability (deleting credentials, signing
users out everywhere), route it through the approval and notification paths:
it requires an approver other than the requester even where smaller actions
allow self-approval, and when someone else can stop an action that only the
requester can restart, the requester is notified. Copy never promises an
action the viewer cannot take.

## Roles and permissions

Model permissions at three levels: which menus and pages show, which actions
are offered, and which API calls succeed. The first two are presentation; the
third is the boundary. Clone roles from a template rather than editing a
shared role in place, and show what a role grants before it is assigned.

## Exports and reports

State the scope on every export (visible page, full filtered result, or a
fixed report), record the export in the audit trail, and run large exports
as server jobs with a download link.

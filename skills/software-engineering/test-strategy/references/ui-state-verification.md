# UI State Verification

Read this reference when a change affects a rendered state, interaction, or
navigation path. Check only states and transitions within the changed
behavior contract.

## Choose observable transitions

- **Forms and uploads:** when conditional fields, edit prefill, payload mapping,
  or persisted attachments change, use [form and upload checks](form-upload-contracts.md).

- **URL navigation:** when routes, query state, or history behavior change,
  verify direct entry and the affected refresh, back, or forward transitions.
  Check both the resulting URL and rendered state.
- **Asynchronous states:** when loading or response handling changes, exercise
  the relevant pending, success, empty, failure, and retry states. Synchronize
  on observable completion instead of arbitrary delays.
- **Permissions, sessions, and accounts:** when access or identity transitions
  change, check the visible affordance and the resulting action at its
  enforcement boundary. Where account switching is supported, verify that
  stale account state does not remain visible or actionable. For report-specific
  activation and request paths, use [permission-gated report checks](permission-gated-reports.md).
- **Keyboard and focus:** when dialogs, menus, forms, or state changes affect
  keyboard use, verify the relevant tab sequence, focus entry and return, and
  focus behavior after errors or dismissal. Check accessible status or error
  announcements when those are part of the changed behavior.
- **Mixed versions:** when deployment or persisted messages can leave
  supported clients and services on different versions, check the affected
  old/new combination. Do not add version-matrix cases when mixed versions
  cannot occur in the supported rollout.

## Bound the evidence

Use a screenshot to support a visual claim and an interaction trace, browser
report, or recorded state to support navigation and behavior claims. Capture
the starting state, action, and observable result; include version details
only when mixed-version behavior is in scope. A screenshot alone does not
prove keyboard behavior, authorization, or persisted effects. Keep artifacts
small and redact credentials, session material, and user data; omit unrelated
network dumps and full production snapshots.

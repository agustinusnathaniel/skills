# UI State Verification

Read this reference when a change affects a rendered state, interaction, or
navigation path. Check only transitions the change can affect.

## Choose observable transitions

- **Forms and uploads:** when conditional fields, edit prefill, payload mapping,
  or persisted attachments change, use [form and upload checks](form-upload-contracts.md).
- **Navigation and multi-step flows:** for routes, query state, wizards,
  drawers, dialogs, and filtered lists, verify direct entry, then walk
  backwards as well as forwards: the in-page Back, the browser Back, a reload,
  and a reopen. Every step still shows the earlier choices, and the URL matches
  the rendered state.
- **Asynchronous states:** exercise the relevant pending, success, empty,
  failure, and retry states. Synchronize on observable completion instead of
  arbitrary delays.
- **Permissions, sessions, and accounts:** check the visible affordance and the
  resulting action at its enforcement boundary. Where account switching is
  supported, no stale account state stays visible or actionable. For
  report-specific activation and request paths, use
  [permission-gated report checks](permission-gated-reports.md).
- **Keyboard and focus:** verify the affected tab sequence, focus entry and
  return, focus after errors or dismissal, and any changed announcements.
- **Mixed versions:** when deployment or persisted messages can leave
  supported clients and services on different versions, check the affected
  old/new combination.

UI tests assert behavior (role, accessible name, link target, focus, text),
never styling class strings: a class assertion passes while another class
overrides the style.

## Bound the evidence

Support a visual claim with a screenshot, and a navigation or behavior claim
with an interaction trace or recorded state, capturing the starting state,
action, and result. Look at every after screenshot; a number such as an
overflow width or a row count is not evidence of what renders. A screenshot
alone does not prove keyboard behavior, authorization, or persisted effects. Keep artifacts small and redact
credentials, session material, and user data.

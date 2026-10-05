# Permission-Gated Reports

Read this when report content or retrieval depends on access that may be
unresolved, denied, or changed while the report is open.

## Prove the access boundary

- State what unresolved, allowed, and denied access permit at each boundary.
  Where readiness gates mounting or retrieval, verify that protected sections
  or requests do not activate early through the page, an ancestor, route
  loading, prefetch, or direct navigation. Check the boundary the feature
  promises rather than adding another client permission check by default.
  Track code transfer separately from UI activation and data retrieval.
- For allowed access, verify the expected section and data appear. Separately
  request the report resource directly with an identity that lacks permission
  and assert the server's documented denial and absence of protected data.
  Record UI visibility and server authorization as separate evidence.
- For account or session changes and permission revocation, verify that
  prior-identity protected content and actions are no longer exposed under the
  new access state, and late responses cannot restore them. Check observable
  isolation rather than requiring one cache or cancellation technique.
- For report date, filter, or range changes, verify that labels, actions, and
  results match the requested scope. Retained prior results may be legitimate
  if the product clearly distinguishes them from the pending selection. An
  older response must not replace the latest selected result or a sibling
  section's independent state.

## Select representative cases

Cover unresolved or denied access, an allowed report, and each distinct
authorization or data-fetch boundary affected by the change. For independent
sections, select a representative section for each distinct path. Add a
cross-section case only when shared state or effects could expose data across
sections. Include a stale-response case only when identity or report scope can
change during a request.

Keep evidence to the access transition, visible and actionable state, relevant
request outcome, and direct server response. Use synthetic report data and
redact credentials and user information.

Further reading: [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

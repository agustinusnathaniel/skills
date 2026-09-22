# Install Compatibility Checklist

Use during tool evaluation, before installation.

- Verify target OS and runtime support from source, not only README badges.
- Inspect profile and secret storage implementations for the actual target platform.
- Check installer destinations and whether they register with the current agent runtime.
- Identify background update schedulers and whether updates are pinned, manual, or automatic.
- Identify telemetry endpoints, persistent installation identifiers, and opt-in/opt-out behavior.
- For tools handling personal, financial, browser, or application data, prefer local-only operation, opt-in telemetry, and pinned/manual updates.
- A good license, tests, and active maintenance do not compensate for an incompatible install surface or unsupported platform.

Done when: every item is checked or explicitly marked not-applicable, and any incompatibility is stated as a install blocker with evidence.

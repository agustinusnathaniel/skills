# Security and Dependency Review

## Dependency Audit

For each primary dependency record:

- Actively maintained or stale (classify per [fit-assessment.md](fit-assessment.md), don't just date-shame)
- Pinned or pre-release versions (risk signal)
- Network-calling dependencies (telemetry, analytics)
- Bundled vs system dependencies

## Code Security Scan

Look for:

- Injection: are queries parameterized (bound parameters) or string-interpolated?
- Unsafe code: any `unsafe` blocks or equivalent? Project-level unsafe-code forbids?
- Input validation: size limits, type validation, sanitization
- Auth model (if applicable): constant-time comparison, token storage, CORS config
- Secret handling: API keys in config files, telemetry, phone-home calls

## CI/CD Quality

Check for:

- CI pipeline runs (test, lint, build on PR/push)
- Dependency scanning (renovate-style bots, language audit tools)
- Static analysis (SAST/CodeQL or equivalent)
- Test count and coverage signals

## License Check

State compatibility with the user's needs explicitly (e.g. MIT, Apache 2.0, copyleft implications for the intended use).

Done when: every area above has a recorded finding (pass, concern, or gap) and license compatibility is stated in one sentence.

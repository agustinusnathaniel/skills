# Test Audit for Code Reduction

Use this reference when replacing an implementation, reducing tests, or removing
production code retained only for tests. Optimize for maintained code and
confidence together; deletion count alone is not evidence of improvement.
For a whole-subsystem test reduction, follow the
[subsystem campaign](test-audit-campaign.md) before editing.

## Find and assess candidates

Prefer retiring tautological tests that restate the implementation and
change-detector tests that lock in output without a behavior contract. Also
inspect tests that compute expected values with the code under test, duplicate
a stronger test, or assert only a mock's behavior. Check whether each test
reaches the path its name promises. Check that negative controls observe the
intended rejection rather than an unrelated guard, and that fixtures or mocks
do not supply behavior the production path should produce. Identify exports,
wrappers, flags, and hooks with no production caller.

For each candidate, record its exact test and location, then establish:

- The observable behavior or independent contract it protects, and a credible regression it would catch.
- The strongest remaining proof at the owning boundary, or why none is needed; name distinct risks at other boundaries.
- Non-test callers of any production seam under consideration.
- The behavior that remains protected after the edit.
- The focused command that will validate the change.

Keep tests for public APIs, integration paths, compatibility, security, storage,
or exact bytes when those are contractual. A static or slow test may still be the
cheapest independent guard. Investigate a failing baseline test as a possible
product defect before removing it.

Done when: each proposed removal has evidence that its contract is protected elsewhere or is obsolete.

## Reduce and verify

After replacing an implementation, retire obsolete internal and upstream-algorithm
tests while preserving application contracts, integration coverage, and
compatibility pins. Retain cases exercising removed mechanisms until their
behavior is protected at the replacement boundary. Remove obsolete test-only
exports while preserving public APIs.

Add a bug regression test only for a genuine behavior gap it would have caught.
Show that it fails on pre-fix code for the intended reason; when that baseline
cannot be reconstructed, identify other direct evidence of the gap. Avoid tests
that only prove the mock or repeat the same scenario at every layer.

Make one coherent edit around the behavior owner. Run focused tests and required
repository checks, then inspect the diff for accidental loss of coverage or
production behavior. Report removed and retained candidates, verification gaps,
and production versus test/support savings.

Done when: behavior remains protected at an appropriate boundary, required checks
pass, and removed production seams have no remaining callers. Report unverified
paths as incomplete.

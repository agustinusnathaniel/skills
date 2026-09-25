# Subsystem Test Reduction

Use this branch when the scope includes the whole test surface owned by a
subsystem. Apply the parent test-audit reference's candidate and retention
rules to every case. A focused reduction can use that reference without this
inventory.

1. **Baseline.** Pin the starting revision. Record test and support code size and
   the pass/fail result of every in-scope test file. Keep baseline failures
   separate for investigation as possible product defects.
   Done when every in-scope test file has a recorded result.
2. **Inventory.** Group tests by production behavior owner, including relevant
   shared-boundary and end-to-end cases. Read each test declaration and mark it
   retain, repair, consolidate, or delete with its contract and evidence. Judge
   the assertion rather than the test name.
   Done when every declaration has an evidence-backed disposition.
3. **Plan the layers.** Choose the keeper suite for each contract before editing.
   Name assertions to move, redundant suites to retire, test-only production
   seams unlocked, and any CI or test-inventory routing to update.
   Done when every retained contract has a keeper and every deletion has a
   preservation reason.
4. **Cut over and challenge.** Edit one behavior owner at a time and run its
   focused checks. Afterward, independently compare deleted coverage with the
   keepers. Repair missing or vacuous assertions; demonstrate that restored
   high-risk contracts catch a deliberate failure in their production owner.
   Done when each review finding is fixed or rejected with source evidence.
5. **Reconcile.** Check changes to the base branch made during the campaign and
   give new regressions a keeper. Run the whole subsystem suite and relevant
   user-flow proof at the final revision. Report baseline and final production,
   test, and support size separately, plus retained gaps and product defects.
   Done when every in-scope test file and contract is accounted for at the final
   revision and required checks pass.

# Weighted scoring

Use scoring when explicit priorities need weighting across viable alternatives,
or when the user requests it. Scores expose trade-offs; they do not establish
facts or replace the owner's decision. A direct comparison is enough when one
option meets the requirements with clearly lower cost.

## Build the comparison

1. Apply the hard requirements from the main workflow before scoring. Keep
   infeasible options visible with their exclusion reason, outside the ranking.
2. Choose a few distinct criteria with observable meanings. For example, separate
   delivery effort, ongoing operating burden, and exit cost. Avoid counting the
   same advantage twice under labels such as simplicity and maintainability.
3. Derive weights from stated priorities before assigning scores. Weights must sum
   to 100%. Label unconfirmed priorities as assumptions; use qualitative comparison
   when there is no defensible basis for numerical weights. Team size or an “MVP”
   label does not supply universal percentages.
4. Define criterion-specific anchors for 1 (weak fit), 2 (adequate), and 3 (strong).
   Higher is better for every criterion; convert costs accordingly. Support each
   score with evidence or a labeled estimate. Mark unknowns explicitly instead of
   assigning a convenient midpoint. An incomplete option remains unresolved,
   rather than ranking last.
5. Compute `total = sum(weight / 100 * score)` for options with sufficient evidence.
   Check arithmetic with a calculator or short script. These are judgments on an
   ordinal scale; small decimal differences alone do not establish a winner.

## Test whether the result holds

Vary uncertain scores or plausible priorities enough to test the deciding
assumption. If the winner changes, report a conditional recommendation and the
specific evidence or preference that would settle it. Resolve only uncertainties
that could change the decision; stop when the ranking is robust enough for the
stakes, or the remaining uncertainty is explicit for the owner.

For illustration, assume two options satisfy the same required capability:

| Criterion | Weight | Extend current component | Managed replacement |
|---|---:|---:|---:|
| Delivery effort | 40% | 2 | 3 |
| Operating burden | 35% | 2 | 2 |
| Exit cost | 25% | 3 | 1 |
| **Total** | **100%** | **2.25** | **2.15** |

These scores are hypothetical. With delivery at 50% and exit cost at 15%, the
managed replacement wins 2.35 to 2.15. The useful conclusion is that the choice
depends on delivery urgency versus exit cost, not that 2.25 proves superiority.

Report the decisive trade-off, supporting evidence, uncertain assumptions, and
sensitivity result. If an ADR is warranted by the main workflow, preserve the
scoring rationale there or link to it; scoring itself does not require a new ADR.

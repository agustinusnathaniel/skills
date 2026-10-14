---
name: calculation-correctness
description: >
  Implement or review code that computes money, dates, units, counters, or
  derived metrics. Use for totals, fees, interest and penalties, rounding,
  invoice or sequence numbers, timezone and day boundaries, unit conversion,
  aggregated statistics and charts, and edits that reconcile lists of rows
  that carry state.
---

# Calculation Correctness

Wrong numbers rarely throw. They render as plausible values and surface later in
reports, reconciliations, or customer complaints. State the invariant first,
then make every path preserve it.

## State the invariant and its owner

Write what the quantity must equal and which side computes the authoritative
value. Money, sequence numbers, and anything persisted are computed on the
server; a client total is a display. Done when each derived value has a stated
formula and one owner.

## Represent values exactly

- Store money in integer minor units or a decimal type. Round at defined
  points with the business rounding step, not at every intermediate product.
- Check what the driver returns. Many database drivers return `NUMERIC` and
  `DECIMAL` as strings, so `a + b` concatenates. Coerce once at the model
  layer.
- Guard integer bounds (`Number.MAX_SAFE_INTEGER`) for counters and summed
  minor units.

## Derive instead of accumulating

Recompute derived amounts from the invariant on each run, for example a penalty
as rate × days overdue × current outstanding, plus what was already paid, rather
than adding a daily increment. Recomputation stays correct after retries,
partial payments, and missed runs; increments drift. Include every state the
formula covers, such as partially paid items alongside unpaid ones.

## Pin time to a defined clock

- Parse date-only strings with UTC getters. Local getters shift the date across
  a month boundary for viewers with negative offsets.
- Name the timezone that defines a business day: the viewer's, or the
  operating region's. Compute day boundaries in it, explicitly.
- Normalize both operands to the start of the day before counting days.
- Queries for the "next" event need the following window when the current one is
  exhausted, such as the next year after the last holiday.

## Convert units through one pair

Use one conversion function pair, applied at every display and at every
submit. A conversion missed on one screen or one input produces a silent,
proportional error.

## Aggregate after classifying

Classify gaps, exclusions, and outliers before dividing. Group by entity before
computing ratios across a fleet or portfolio, so one entity's sequence cannot
poison another's. Strip excluded points in the chart adapter rather than
plotting nulls or interpolating.

## Make updates idempotent and keyed

- Reconcile edited lists by stable row identity. Matching by array position
  moves one row's state onto its neighbour after a delete or reorder.
- Make completion actions update in place, so a double submit records once.
- Allocate counters inside the write transaction with a row lock, and protect
  first use with a unique index; a lock on a missing row locks nothing.
- For payment callbacks and other provider replays, use the
  `webhook-integration` skill.

## Verify at the boundaries

Cover the boundary cases that matter for the change, then run them: month and
year ends, negative and positive UTC offsets, partial and repeated payments,
retried jobs, replayed callbacks, deleted and reordered rows, empty and
single-item sets, and the largest supported values. Done when each changed
formula has a check that would fail on the drift or double-count it guards
against.

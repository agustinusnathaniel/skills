# Agent instruction reduction

Use this branch for text agents follow as instructions: `AGENTS.md`, `CLAUDE.md`,
directives, system prompts, skills, and their references. One dropped clause can
change behavior on every run, and builds or link checks inspect none of it, so the
unit of work is the **obligation**, not the line.

1. Inventory obligations before cutting. For each file in scope, record every
   obligation as a row: the required behavior, its trigger (when it applies), its
   exceptions, and its strength (must, should, may). Include obligations carried
   by examples, headings, and ordering.
2. Cut by obligation. Merge rows that state one meaning in several places. Remove
   rows that restate a discoverable source, and rows that are no-ops for the
   target models (they already behave that way without the line). Move rows only
   some tasks need behind a pointer. Each surviving row keeps its trigger,
   exceptions, and strength; softening "must" to "consider" or widening a trigger
   is a behavior change that needs the user's decision.
3. Map every original row to its new home or its removal reason. A row with
   neither is a loss; restore it.
4. Where the instructions drive consequential behavior, compare old and new text
   on representative tasks or the repository's eval suite, judging outcomes rather
   than wording. Report obligations no task exercised as verification gaps.

Done when: every original obligation is mapped, and the report pairs the line
delta with that map. A claim that no behavior was lost rests on the map.

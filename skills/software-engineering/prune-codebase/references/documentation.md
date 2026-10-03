# Documentation reduction

Use this branch when the user explicitly includes documentation in the reduction
scope. Success is less maintenance with accurate, readable guidance that still
lets the intended reader complete their task. Use https://diataxis.fr only as a
sorting lens for keep vs remove vs move; do not re-architect all pages or add
new mandatory structure.

1. Establish audience and scope from existing context. For a whole-docs request,
   cover the homepage, navigation, guides, reference, and ADRs that exist; for a
   focused request, inspect the affected pages and links. Reuse the production
   baseline for mixed work; record a docs baseline for docs-only work.
2. Sort each page by need before cutting: tutorial (learning), how-to (task),
   reference (lookup), explanation (understanding). Keep content that serves the
   page's need; move or link material that belongs in another quadrant instead of
   duplicating it. Split mixed pages only when splitting removes repetition or
   shortens navigation.
3. Remove repetition, stale detail, and facts cheaply discoverable from maintained
   sources. Keep setup commands, supported behavior, prerequisites, and caveats
   readers need to act. Distinguish historical decisions from current behavior.
   Put changing file inventories, line counts, and verification transcripts in source or delivery
   reports unless they serve a concrete reader need.
4. Rewrite for comprehension. Use natural sentences and descriptive headings and
   callout titles that make sense with their surrounding text. Shortening succeeds
   when the reader still understands the action, reason, and limitation. Keep
   implementation details where they support a reader's decision. Consolidate pages
   when it improves navigation; use existing docs components when they make
   content clearer or remove custom markup.
5. Verify changed behavioral claims against canonical implementation or current
   official sources, then read the edited passages in context. Run affected link,
   content, or build checks required by the repository. A successful build checks
   structure, not factual accuracy or readable prose. Browse further only for an
   unresolved writing or tooling question, or when the user requests research.

## ADR collections

Classify every scoped record by whether its decision and alternatives still help
a future maintainer. Keep consequential choices about structure, public contracts,
ownership, trust, and costly dependencies, including enduring methodology contracts
when they define the product. Procedures, routine fixes, reversible tool settings,
terminology changes, completed cleanup, and one-use editorial permissions rarely
need standalone ADRs. Preserve their useful lessons in an existing owning guide
or decision rather than moving discarded material wholesale into another file.

Consolidate overlapping records by architectural boundary while keeping distinct
choices easy to find. Trace each original decision, rationale, rejected alternative,
negative consequence, and security or authorization boundary to its retained home
or a justified retirement. A general principle cannot replace a specific constraint.
Verify that a named canonical source actually contains a relocated contract; keep
unimplemented historical specifications identifiable as history rather than
claiming that source or runtime enforces them. Git preserves full earlier wording,
but does not replace a findable account of still-useful reasoning.

Repair incoming references, including source comments and published or generated
history. Where permitted, pin historical links to an immutable revision; otherwise
consider retaining a concise, valuable historical record. Prefer stable IDs with
numbering gaps over renumbering referenced decisions, unless the user requests
renumbering and its reference migration is handled.

Within the authorized scope, revise conventions that would recreate low-value ADRs
or require new records merely to permit corrections and condensation. Keep durable
selection and maintenance guidance in its existing home; classifications, counts,
and editorial ledgers belong in the delivery report. Independently review
consequential consolidation against the original boundary decisions, not only the
rewritten summary or successful link/build checks.

## Completion

Finish when the scoped pages have been addressed, needed information remains
accurate and findable, wording reads naturally, and applicable checks pass. Report
docs deltas separately from production savings, summarize maintenance removed,
and name remaining gaps. Let clarity determine length; docs-only work has no
production-line target.

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
   readers need to act. Preserve ADR decisions, rationale, and consequences;
   distinguish historical decisions from current behavior. Put changing file
   inventories, line counts, and verification transcripts in source or delivery
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

Finish when the scoped pages have been addressed, needed information remains
accurate and findable, wording reads naturally, and applicable checks pass. Report
docs deltas separately from production savings, summarize maintenance removed,
and name remaining gaps. Let clarity determine length; docs-only work has no
production-line target.

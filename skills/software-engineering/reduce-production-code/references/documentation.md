# Documentation reduction

Use this branch when the user explicitly includes documentation in the reduction
scope. Success is less maintenance with accurate, readable guidance that still
lets the intended reader complete their task.

1. Establish audience and scope from existing context. For a whole-docs request,
   cover the homepage, navigation, guides, reference, and ADRs that exist; for a
   focused request, inspect the affected pages and links. Reuse the production
   baseline for mixed work; record a docs baseline for docs-only work.
2. Remove repetition, stale detail, and facts cheaply discoverable from maintained
   sources. Keep setup commands, supported behavior, prerequisites, and caveats
   readers need to act. Preserve ADR decisions, rationale, and consequences;
   distinguish historical decisions from current behavior. Put changing file
   inventories, line counts, and verification transcripts in source or delivery
   reports unless they serve a concrete reader need.
3. Rewrite for comprehension. Use natural sentences and descriptive headings and
   callout titles that make sense with their surrounding text. Shortening succeeds
   when the reader still understands the action, reason, and limitation. Keep
   implementation details where they support a reader's decision. Consolidate or
   restructure pages when it improves navigation; use existing docs components
   when they make content clearer or remove custom markup.
4. Verify changed behavioral claims against canonical implementation or current
   official sources, then read the edited passages in context. Run affected link,
   content, or build checks required by the repository. A successful build checks
   structure, not factual accuracy or readable prose. Browse further only for an
   unresolved writing or tooling question, or when the user requests research.

Finish when the scoped pages have been addressed, needed information remains
accurate and findable, wording reads naturally, and applicable checks pass. Report
docs deltas separately from production savings, summarize maintenance removed,
and name remaining gaps. Let clarity determine length; docs-only work has no
production-line target.

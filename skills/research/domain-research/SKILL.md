---
name: domain-research
description: Research domain frameworks or extract reusable guidance from case evidence. Use for deep domain research and synthesis across sources.
---

# Domain Research

Identify the canonical authority for each domain, extract core frameworks, and synthesize into a structured, actionable document.

## When to Use

- Deep research on an organizational, business, or operational topic (company structure, department SOPs, best practices in a field)
- Finding experienced practitioners and primary sources in a domain
- Structured synthesis organized by domain or function with actionable frameworks

## When Not to Use

- Product or tool comparisons (a tech-briefing workflow fits better)
- Single-source summarization
- Generating a formatted PDF report from already-gathered material

## Core Principle

"Deep research using prominent resources" means: use direct sources where possible, identify who originated or maintains a framework only when evidence supports that role, and use strong explanations or practitioner applications when they add value. Keep each claim traceable to its source and label useful synthesis as synthesis.

## Workflow

### Step 1: Clarify the frame

Identify what is being designed, the resource constraint, and the time horizon from the request. Use any supplied source example to calibrate authority. Ask for missing context only when it could change source selection or depth; otherwise state the assumption and proceed.

Done when: the research frame and depth are stated, with decision-changing unknowns resolved or identified.

### Step 2: Identify domain-level sources and their roles

For each domain, select sources suited to the question. Identify an originating or maintaining source when evidence supports that role; use a reliable secondary explanation or practitioner application when it adds useful context or the original material is unavailable. Treat the starting cheat sheet as a set of discovery leads, not proof of authorship or maintenance. See [references/authorities-and-frameworks.md](references/authorities-and-frameworks.md).

Done when: every in-scope domain has at least one named source with a URL, a reason for selecting it, and a source role supported by evidence or labeled unknown with the provenance gap stated.

### Step 3: Research in parallel, then verify directly

Dispatch parallel research tracks per domain group, each targeting specific URLs (never generic "search for X"), then directly verify the most important sources. Confirm the source and framework are identifiable, capture the domain's terminology, and check any claim that a source originated or maintains the framework. If the original or maintained source is unavailable, use the best accessible source and disclose the provenance gap. See [references/authorities-and-frameworks.md](references/authorities-and-frameworks.md).

Done when: every claimed framework is traced to a directly browsed source, any inaccessible source is labeled unverified, and origin or maintenance claims have supporting evidence or are labeled unknown.

### Step 4: Extract frameworks

Capture each framework's name, what it solves, its mechanism in 1-2 sentences, key terms, and when it applies. Link it to the source record and its provenance status. When the evidence includes case reports, interviews, or observed practice, also use the conditional [observational and case material guidance](references/authorities-and-frameworks.md#observational-and-case-material).

Done when: every framework entry has all five fields, uses the domain's own vocabulary, and links to a source record with a supported role or disclosed provenance gap.

### Step 5: Synthesize and deliver

Build the synthesis document: executive framework first, per-domain sections with consistent structure, cross-cutting patterns, quick-reference appendix, and a full references section with clickable markdown links. Save as a versioned markdown document. See [references/synthesis-and-delivery.md](references/synthesis-and-delivery.md).

Done when: the document opens with the conclusion, every domain section follows the same structure, every source appears in the references section as `[text](url)` with its role and any provenance gap preserved, and the file is written to disk.

## Worked Example

A full end-to-end application of this methodology. See [references/company-os-example.md](references/company-os-example.md).

## Quality Standards

1. Cross-validate: flag any claim you cannot verify; never fabricate.
2. Note research dates: organizational frameworks age differently than technical ones.
3. Use the domain's language: named frameworks and terms with accurate descriptions.
4. Include how current technology shifts change each function, or state honestly that the research did not cover it.

## Pitfalls

- **First pass too shallow**: calibrate depth against the requested decision and any source examples the requester supplied.
- **Generic sources**: investor content is rarely the best source for department operations. Prefer practitioner authorities.
- **Descriptive posts**: distinguish accounts of what happened from reusable guidance, and prioritize frameworks when they answer the question.
- **Blocked sources**: search engines and JS-heavy sites may block automated browsing. Try direct URLs or the site's own search, then record access gaps.

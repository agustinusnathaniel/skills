---
name: domain-research
description: Research a business or organizational domain via its authoritative voices and canonical frameworks, then synthesize into a structured knowledge document. Use when asked for deep research on how to build or run something (company systems, department SOPs, operational best practices), for the definitive thinkers and resources in a field, or for multi-domain knowledge synthesis.
---

# Domain Research

Identify the canonical authority for each domain, extract core frameworks, and synthesize into a structured, actionable document.

## When to Use

- Deep research on an organizational, business, or operational topic (company structure, department SOPs, best practices in a field)
- Finding the definitive voices in a domain — practitioner authorities, not generic blog posts
- Structured synthesis organized by domain or function with actionable frameworks

## When Not to Use

- Product or tool comparisons (a tech-briefing workflow fits better)
- Single-source summarization
- Generating a formatted PDF report from already-gathered material

## Core Principle

"Deep research using prominent resources" means: skip generic web results, find the canonical authority for each domain, extract their core frameworks, and assess how current technology shifts change the picture.

## Workflow

### Step 1: Clarify the frame

Confirm what is being designed (org, product, process), what "authoritative" means to the requester (ask for an example of a source they respect — it sets the quality bar), the resource constraint (startup vs enterprise), and the time horizon.

Done when: system type, quality-bar example, resource constraint, and depth horizon are all stated.

### Step 2: Identify domain-level authorities

For each domain, find the canonical resources: established publications with named authors, practitioner-leaders who wrote the field's defining book, research arms with staying power. See [references/authorities-and-frameworks.md](references/authorities-and-frameworks.md).

Done when: every in-scope domain has at least one named authority with URL and a stated reason it is canonical.

### Step 3: Research in parallel, then verify directly

Dispatch parallel research tracks per domain group, each targeting specific URLs (never generic "search for X"), then directly verify the most important sources — confirm the site is live, the framework is identifiable, and capture the domain's own terminology. See [references/authorities-and-frameworks.md](references/authorities-and-frameworks.md).

Done when: every claimed framework is traced to a browsed first-party source, and every inaccessible source is noted as unverified rather than summarized from snippets.

### Step 4: Extract frameworks

Capture each framework's name, what it solves, its mechanism in 1-2 sentences, key terms, and when it applies. See [references/authorities-and-frameworks.md](references/authorities-and-frameworks.md).

Done when: every framework entry has all five fields and uses the domain's own vocabulary.

### Step 5: Synthesize and deliver

Build the synthesis document: executive framework first, per-domain sections with consistent structure, cross-cutting patterns, quick-reference appendix, and a full references section with clickable markdown links. Save as a versioned markdown document. See [references/synthesis-and-delivery.md](references/synthesis-and-delivery.md).

Done when: the document opens with the conclusion, every domain section follows the same structure, every source appears in the references section as `[text](url)`, and the file is written to disk.

## Specialized Variants

- **First-party fee/tariff research** (marketplace commissions, seller fees): strict source hierarchy and formula normalization apply — see [references/fee-research.md](references/fee-research.md).
- **Worked example** of this methodology applied end to end — see [references/company-os-example.md](references/company-os-example.md).

## Quality Standards

1. Cross-validate — flag any claim you cannot verify; never fabricate.
2. Note research dates — organizational frameworks age differently than technical ones.
3. Use the domain's language — named frameworks and terms, not paraphrases.
4. Include how current technology shifts change each function, or state honestly that the research did not cover it.

## Pitfalls

- **First pass too shallow**: calibrate the depth bar early by asking what "good" looks like before diving deep.
- **Generic sources**: investor content is rarely the best source for department operations — prefer practitioner authorities.
- **Framework vs blog post**: a blog post says what happened; a framework says what to do — prioritize frameworks.
- **Blocked sources**: search engines and JS-heavy sites often block automated browsing — have fallbacks (direct URLs, subdomain variants, the site's own search) and note gaps honestly.

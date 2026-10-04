# Finding Authorities and Extracting Frameworks

Covers Steps 2–4 of the domain-research workflow: identifying canonical sources, researching them in parallel, verifying directly, and extracting frameworks.

## Source Roles and Provenance

Distinguish a source's authority to discuss a framework from its relationship to the framework. A source may be authoritative without originating or maintaining the work.

- **Originating source**: a creator's account or primary publication that defines or first formalizes the framework. Record the evidence that connects the creator or publisher to that work.
- **Maintaining source**: the source responsible for the current definition or guidance. Look for an explicit stewardship claim, official documentation, or a history of revisions attributable to that source.
- **Secondary explanation**: a source that explains or summarizes another party's work. Preserve attribution to the source it explains.
- **Practitioner application**: a source describing how a person or organization applied a framework. Use it as evidence of that application, not as proof of authorship.
- **Unknown**: use when the available evidence does not establish one of these roles. State what remains unverified rather than inferring a role from prominence, repetition, or association.

Roles can overlap when evidence supports each one. For each source, record its URL, why it was selected, its supported role, and the direct evidence for that role. Evidence may include an authorship statement, a dated primary publication, a stewardship statement, or an attributable update history. Do not imply legal ownership where the source only establishes authorship or maintenance. If the original or maintaining source cannot be found, keep the useful accessible source and disclose the gap.

## Recognizing Authority

Look for: established publications with named editors or authors, research arms with sustained output, and practitioners with substantial work in the field. These are ways to find useful sources, not evidence that they originated or maintain a particular framework.

Signals that a source may be useful include citations by other sources, a book with staying power, a substantial practitioner audience, or references in educational materials. Verify the source's relationship to each framework independently.

For each resource, capture: name, URL, why it is useful for the question, its source role, direct evidence for that role or an explicit unknown, and the framework or methodology it covers.

Done when: every selected source record has each field above; an unknown role is acceptable when its provenance gap is stated.

## Starting Cheat Sheet

Starting points for common business domains. Treat every association as a discovery lead only. A listed source's association with a framework does not prove that it originated or currently maintains the framework; verify that relationship before making an authorship or stewardship claim.

| Domain | Starting lead | Frameworks or material to verify | Discovery cue |
|---|---|---|---|
| Engineering leadership | LeadDev | Eng org design, 1:1s, career ladders | Named home of eng leadership |
| Product | Lenny's Newsletter | RICE, PMF, JTBD | Large practitioner subscriber base |
| Sales | SaaStr | MEDDIC, Challenger | SaaS sales reference |
| Marketing | HubSpot Blog | Inbound, growth loops | Defined inbound marketing |
| Finance | Carta Learn, standard startup financial models | Unit economics, runway | Standard startup finance reference |
| Legal | Clerky Guides | Entity, IP, compliance | Standard for startup legal |
| Management | Radical Candor (Kim Scott) | Care/challenge, 1:1s, career frameworks | Widely adopted management framework |
| Operations | GitLab Handbook | Handbook-first, async | Reference model for documented ops |
| Org design | First Round Review | Decision frameworks, culture | Founder-level practitioner content |
| AI practices | AI Hero (aihero.dev) | Agent design, RAG patterns | Practical AI engineering without marketing |

Done when: every in-scope domain has a lead to investigate. Complete source records separately using the fields listed under Recognizing Authority.

## Parallel Research Tracks

Run up to 3 research tracks simultaneously, each covering a group of domains. Give each track:

- The requester's goal (what is being designed or built)
- Specific URLs to target, never a generic "search for X"
- What to extract: resource name, URL, why it is useful, source role and evidence or provenance gap, core framework, relevant books or articles, and how current technology shifts this function

Done when: every track returns substantive extracted content with supported source roles or disclosed gaps; any thin track falls back to direct browsing.

## Direct Source Verification

Supplement track output by browsing the most important resources directly:

1. Confirm the source is accessible and the page is the intended material.
2. Confirm the framework or practice is identifiable in the source.
3. Check whether the source provides evidence of origination or maintenance. A citation, repetition, or association alone does not establish either role.
4. Extract key terminology in the domain's own words.

If a source is inaccessible, note that limit and find an accessible source when possible. Do not summarize blocked material from search snippets as though it were directly verified. If the accessible source is secondary or reports practitioner application, label that role; if provenance remains unclear, say so.

Done when: every claimed framework links to a directly browsed page, source roles are supported or marked unknown, and inaccessible sources or provenance gaps are disclosed.

## Framework Extraction Format

For each framework or methodology, capture all five fields:

- **Name**: the framework's name
- **What it solves**: the problem or decision it addresses
- **The mechanism**: how it works in 1–2 sentences
- **Key terms**: domain-specific vocabulary
- **When to use**: the conditions where it applies

Link each entry to the source record, including the source role and evidence or disclosed provenance gap.

Done when: every framework entry has all five fields and a linked source record with its role supported or marked unknown.

## Observational and Case Material

Use this section only when the research relies on interviews, case studies, postmortems, field observations, implementation accounts, or similar evidence about what happened or what someone proposes. Ordinary published-framework research does not need this additional analysis.

- Trace each factual claim to the closest available underlying evidence, with a direct link and a page, section, timestamp, or speaker when available. If only a summary is accessible, identify it as a summary and state that the underlying evidence was not inspected.
- Separate what was implemented or observed from what was proposed, recommended, or recalled. Preserve that status when synthesizing the account.
- Distinguish a recurring practice from a single case. State the scope of the evidence and avoid generalizing beyond it.
- Separate original practice from capabilities supplied by a built-in tool, configuration, or existing skill. Attribute a capability to the environment unless the source provides evidence that the people in the case created or deliberately adopted it.
- When adapting an existing capability, identify the additional integration or decision rule being proposed. A single case can motivate candidate guidance if its limits are explicit; recurrence strengthens evidence but is not proof of value by itself.
- Look for counterexamples or failed applications that materially qualify a proposed pattern. Report relevant contrary evidence, or say when none was found in the sources reviewed.
- A useful synthesis may express a pattern that no source states verbatim. Label it as an inference or synthesis, explain its evidential basis, and link the supporting observations. Do not present it as a source's recommendation.

Done when: case-derived claims link to inspected evidence or disclose its limits; implementation and proposal are distinct; pattern claims state whether evidence is recurring or from one case; and material counterexamples and inferred synthesis are identified.

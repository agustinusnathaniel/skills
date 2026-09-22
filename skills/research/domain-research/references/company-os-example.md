# Worked Example: Company Operating System Research

A full application of this methodology to the brief: "how to build the systems, SOPs, and procedures for each department of a technology company with startup-level resources, accounting for current AI capabilities."

## The Brief and the Depth Correction

The first pass came back too shallow. The requester returned with: "do really deep research, use prominent resources" plus quality-bar examples (LeadDev for engineering leadership, Basecamp Shape Up for product methodology, practitioner blogs for technical authority).

Lesson applied: the requester's examples defined the quality bar. Every department needed equivalent-level sources — not generic web results.

Done when: the requester confirms the example sources match the depth they expect, before the deep pass begins.

## Execution

**Clarify the frame.** Confirmed the ask was org design plus SOPs and procedures per department (not a software platform), with startup resource constraints.

**Parallel research tracks.** Four track groups, each given specific authoritative URLs to target:

| Track | Focus | Sources Targeted |
|---|---|---|
| 1 | AI-native company building | Practitioner AI engineering blogs, VC research arms, agent-economics writing |
| 2 | Sales, marketing, product authorities | SaaStr, First Round Review, HubSpot, Lenny's Newsletter, positioning literature |
| 3 | Finance, legal, HR, ops authorities | Startup finance guides, legal guides, HR frameworks, handbook-first ops models |
| 4 | Org design, decision-making, communication | GitLab Handbook, Shape Up, Amazon 6-pager, DACI/RAPID, Team Topologies, Radical Candor, empowered product teams |

Each track extracted: resource name, URL, why authoritative, core framework, key books or articles, and how current technology shifts change the function.

**Direct verification.** Browsed the key resources to confirm they were live and to extract each framework's native terminology: Shape Up ("appetite", "betting table", "six-week cycle"), GitLab ("handbook-first", "CREDIT values"), Team Topologies (4 team types + 3 interaction modes), Radical Candor (Care Personally × Challenge Directly).

**Known limitation.** JS-heavy publications block automated browsing; only extracted what was directly accessible and noted the gaps.

Done when: every track produced substantive extraction, key frameworks were verified against live first-party pages, and blocked sources were recorded as gaps.

## Synthesis Output

The master document followed the standard synthesis structure: executive framework (a layered company OS model), per-department sections with resources, frameworks, and technology-shift impact, a build-vs-buy decision matrix, a phase-based rollout path, the SOPs to write first, and a quick-reference appendix. Saved as a versioned markdown file.

Done when: the document passes every completion criterion in [synthesis-and-delivery.md](synthesis-and-delivery.md).

## Transferable Insights

These findings from the example generalize to other org-design research:

- **The friction paradox.** Shared understanding was partly maintained by coordination friction; when automation removes it, teams need deliberate replacements — structured syncs, decision records, written updates.
- **Team Topologies transfers to human-AI teams.** Stream-aligned, enabling, complicated-subsystem, and platform team types plus explicit interaction modes apply to agent-augmented orgs.
- **Documentation gates AI readiness.** AI tooling can only read what is written down — handbook-first culture is a prerequisite for integration speed.
- **Match org design to go-to-market.** High-touch founder-led sales vs self-serve product-led growth demand different structures.

## What Went Wrong

1. **First pass too shallow** — fixed by asking for a "good enough" example before the deep pass.
2. **Thin track output** — some tracks returned boilerplate instead of extraction; checked output substance and fell back to direct browsing.
3. **Blocked publications** — confirmed gaps honestly instead of summarizing snippets.
4. **Premature cleanup** — deleted working files still needed downstream; structure the synthesis before removing source material.

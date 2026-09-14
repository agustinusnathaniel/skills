# Architecture decision framework audit

Date: 2026-09-14

## Purpose and method

Check that the revision preserves the original skill's purpose: business context
first, bounded alternatives, decision matrices, human judgment, lightweight ADRs,
and iteration through feedback. Compare the original at `89833f3^` with the first
rewrite at `89833f3`, then make focused corrections.

The writing criteria come from the supplied writing-for-agents skill and
[OpenAI's guidance on skills and prompts](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra):
narrow invocation, conditional references, and clear completion criteria without
an obligatory recipe for every decision. Concision supports the method; it does
not replace it.

## Evidence coverage

Read the local OpenCode database without modifying it. A full search found 612
parts mentioning the skill name. Of these, 179 input or text references spanned
70 sessions; most concerned installation, inventories, or documentation rather
than applying the skill. Ten sessions explicitly invoked it: five root sessions
and five architect subtasks, dated June 23 through July 10, 2026. All ten retained
the original mandatory-question instruction in the loaded skill output.

Inspected the decision-bearing requests, responses, questions, and relevant feedback
in those ten sessions, plus caller follow-ups for the five subtasks. One caller is
already in the ten, giving 14 distinct sessions examined. The table includes
successful behavior and counterevidence, not only errors.

| Direct-use session | Observations and limits |
|---|---|
| **Evaluate merge strategy (@architect subagent)** — `ses_0b2ed5cd8ffe92sa1FSRChw1vW` | Compared four requested strategies and identified which changes were actually unique. The caller checked a decisive premise and ultimately proceeded with a merge. This supports visible alternatives and caller judgment, not automatic acceptance of the top recommendation. |
| **Design homepage architecture (@architect subagent)** — `ses_0c293d1e8ffesUiKydWJwJWhi1` | Compared three approaches and asked about interaction, sidebar, and data ownership. The request explicitly required clarification when ambiguous; the caller obtained answers and continued. These questions are not evidence of needless blocking. |
| **Feasibility of codegraph and rtk in docs/CLI** — `ses_0e265f250ffeYtAGuH3fTOd5if` | The user challenged an unsupported claim about existing CodeGraph integration and later objected to automatic agreement. Supports checking premises and reassessing feedback objectively. Later questions cover changed scope too; their total is not a count of redundant approval requests. |
| **Design PR CI improvements (@architect subagent)** — `ses_0e681c32dffeV0yCu40fHv0sXf` | Compared concrete CI options with duration and complexity costs. The caller's broader implementation later removed both explicit sync checks under a mistaken task-discovery assumption. That is evidence for verifying execution assumptions, not proof this skill caused the regression. Exact YAML was requested; detailed output was appropriate, although the ADR repeated much of the analysis. |
| **Monorepo xtarterize refactor** — `ses_0ed72d80fffeE7aR5l5R6dyeuk` | Connected observed dogfooding failures to task scoping and asked the owner to choose implementation scope. The user selected full implementation. This was a substantive scope decision, not gratuitous confirmation. Later testing and release corrections concern execution as well as design. |
| **Design analysis: docs strategy (@architect subagent)** — `ses_0ee663954ffe7iwXuPf0QJpAkF` | Recommended selective CLI-first installation guidance while retaining platform-specific usage. The caller preserved that comparison. The user later clarified that changelogs must be user-facing: audience is a decision driver, not just document placement. |
| **Fein workflow agent directive brainstorm** — `ses_10751c339ffeFucIllNzkMZvSm` | Compared several packaging approaches, but the user corrected the intended target to canonical agent directives. Supports establishing the exact artifact before elaborating options. |
| **Auditing and consolidating plugin docs** — `ses_1078ea968ffe7k1JqlfFKp6Aef` | Compared plugin-first and concept-first navigation, producing an adopted hybrid. Repeated user corrections concerned canonical ownership and contributing guidance. Preserve the audience/maintenance comparison while checking current sources. |
| **Design core-sync API and config shape (@architect subagent)** — `ses_10b4e6646ffeKy5MytTvr8NmD8` | Returned a detailed config/API specification and plugin examples because the caller explicitly requested them. Output length is not itself a defect. Downstream implementation problems do not establish that a shorter decision brief would have helped. |
| **Multi-plugin agent directive sync** — `ses_10b69d7f7ffe8mQSG9vWAJKW1F` | An initial question asked for plugin differences the agent could inspect; the user redirected it to exploration. Subsequent comparison and feedback refined the design into a shared sync tool with plugin-owned configuration. This is positive evidence for iterative design and concrete matrices, alongside a discovery failure. |

## Preserve the original intent

| Original intention | Result of the follow-up revision |
|---|---|
| Business context over technical purity | Restore this explicitly, with supplied time horizon, budget, team capability, and behavior constraints. |
| Small set of viable alternatives | Restore the usual 2-4 shortlist while allowing fewer when constraints eliminate options. |
| Decision matrices as the core comparison method | Restore the compact matrix as the default for consequential competing trade-offs; retain the original short-circuit for a clear choice. |
| Helpful weighted scoring | Restore qualitative context prompts. Keep evidence-based weights, hard constraints, and sensitivity checks; discard unsupported universal percentages. |
| Clarification and human judgment | Preserve questions that settle missing preferences, scope, or authority. Inspect discoverable facts first and offer a provisional recommendation instead of handing the whole choice back. |
| Lightweight ADRs and feedback | Record every selected decision proportionately, with an ADR for consequential choices. Preserve iteration and decision history; match the requested brief or detailed specification. |

The first rewrite made matrices too optional and removed contextual assistance
along with the arbitrary numbers. Those were real departures from the method's
emphasis. The follow-up restores them without restoring compulsory interviews,
fixed weight profiles, or duplicated decision records.

## Confidence and verification limits

This is a census of identifiable direct invocations in the available database,
not a representative sample of all projects or models. It is concentrated in the
Maestria environment, including work targeting Xtarter. Assistant messages in
the ten sessions used DeepSeek V4 Flash and MiMo v2.5, not GPT-6 Astra. Subtasks
and callers share workflows and are not independent trials. References alone do
not establish that a skill was applied; missing references do not prove non-use.

The original skill already had a question cap, a matrix shortcut, optional scoring,
and progressive disclosure. The revision adjusts their conditions rather than
claiming to invent them. Mandatory questions can encourage unnecessary asking,
but the observed prompts and orchestration also contribute. No direct load of the
scoring reference was identified in these decision sessions; criticisms of its
fixed profiles come from the document itself, not measured downstream effects.

Link, frontmatter, diff, and scoring-example arithmetic checks validate the
artifact. This historical audit does not demonstrate that the revised skill
improves model behavior; that would require controlled before/after runs.

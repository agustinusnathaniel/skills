---
name: tool-evaluation-and-adoption
description: Vet an open-source tool before adopting it. Use when asked to evaluate a tool, library, or package — or to install one.
---

# Tool Evaluation & Adoption

Assess the tool within the requested scope, then complete any authorized adoption.

## Scope Check

Match the user's language to the scope before doing anything else:

| User says | Scope |
|-----------|-------|
| "see if it fits", "check it out", "review this", "vet this", "is it good?", "can we use this?" | Evaluate only — full analysis, deliver, wait for a decision |
| "install this", "set it up", "go ahead", or equivalent | Install authorized — evaluation may be abbreviated, proceed to Step 7 after review |

During evaluate-only scope, do not run install commands, binary downloads, or package installs — even "just downloading to check" counts as installing.

Done when: the scope (evaluate-only or install-authorized) is established from the current request and prior authorization.

## Step 1: Reconnaissance

Follow [references/reconnaissance.md](references/reconnaissance.md): repo metadata, README, docs/registry cross-check, codebase layout.

Done when: a metadata table exists (stars, forks, license, language, last commit, open issues) plus a one-paragraph statement of what the tool does and who it is for.

## Step 2: Security and Dependency Review

Follow [references/security-review.md](references/security-review.md): dependency audit, code security scan, CI quality, license compatibility.

Done when: a findings table exists (each area marked pass, concern, or gap) and license compatibility is stated explicitly.

## Step 3: Fit Assessment

Follow [references/fit-assessment.md](references/fit-assessment.md): environment compatibility, spec compliance (if it implements a standard), staleness classification, integration with the existing stack.

Done when: pros/cons are listed, every stale-looking dependency carries a domain classification (frozen algorithm, moving ecosystem, or API wrapper), and stack overlap is stated.

## Step 4: Candidate Check (only when the tool is proposed as a replacement)

Follow [references/candidate-assessment.md](references/candidate-assessment.md): verify the product category before comparing, measure against current-implementation invariants.

Done when: the candidate's category (computes, renders, hosts, or workflow) is stated, or this step is skipped with a one-line reason (not a replacement proposal).

## Step 5: Geo-Accessibility Check (only for regulated or geo-licensed tools)

Follow [references/emerging-market-access.md](references/emerging-market-access.md) when the tool involves financial transactions, trading, regulated activity, or geographic licensing.

Done when: accessibility is confirmed or flagged with a restriction classification, or this step is skipped with a one-line reason (unregulated, globally available tool).

## Step 6: Verdict and Decision

Write the assessment report:

- What it is (one-liner)
- Who benefits (the human operator, the agent workflow, both, or neither — state explicitly)
- Security findings table (pass / concerns)
- Fit assessment (pros/cons for this environment)
- Verdict: **Go** or **No-go** with rationale

For evaluate-only scope, deliver the assessment and ask whether to adopt. When
installation is already authorized, carry relevant findings into Step 7 and report
the result after verification. Ask only if a newly discovered blocker requires a
user decision, such as accepting a material capability loss or expanding scope.

Done when: the verdict and its evidence are clear, and either adoption proceeds
under existing authorization or the unresolved decision is presented concretely.

## Step 7: Install (when authorized)

Follow [references/install-compatibility.md](references/install-compatibility.md) for the pre-install surface check, then:

1. Prefer checksum-verified release assets or a package manager; read install scripts before running them.
2. Configure auth, ports, directories, and integrations from environment-provided values.
3. For bundle-sensitive adoptions, follow [references/adoption-verification.md](references/adoption-verification.md) to measure impact before/after against a clean-tree control build.

Done when: the tool is installed from a verified source, configured, and a smoke test confirms it works end to end.

## Pitfalls

1. **Installing before approval** — evaluate-only language means analyze and wait.
2. **Piping install scripts blindly** — read the script or verify checksums first.
3. **Missing the auth model** — local-first tools may have a server mode with auth off by default; warn when deploying.
4. **Skipping the telemetry check** — confirm whether the tool phones home before installing.
5. **Assuming offline means no network** — some offline tools download models on first run; disclose it.
6. **Assuming working means spec-compliant** — check whether validation enforces the standard's rules or only structural sanity.
7. **Flagging staleness without classifying the domain** — report the classification alongside the date.
8. **Re-litigating a rejection after directed adoption** — when the user explicitly overrides a prior no-go, implement the integration and let measured evidence carry the argument.

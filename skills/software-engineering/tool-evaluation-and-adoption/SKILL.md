---
name: tool-evaluation-and-adoption
description: Vet an open-source tool, library, package, plugin, skill, or MCP server before adopting it. Use when asked whether to adopt, switch to, or upgrade one, to install one, or to triage dependency and supply-chain alerts.
---

# Tool Evaluation & Adoption

Assess the tool within the requested scope, then complete any authorized adoption.

## Scope Check

Match the user's language to the scope before doing anything else:

| User says | Scope |
|-----------|-------|
| "see if it fits", "check it out", "review this", "vet this", "is it good?", "can we use this?", "should we switch to / upgrade to X?" | Evaluate only — full analysis, deliver, wait for a decision |
| "install this", "set it up", "go ahead", or equivalent | Install authorized — evaluation may be abbreviated, proceed to Step 7 after review |

Evaluate-only scope is read-only: do not install or run the tool, even "just
to check". Cloning or fetching its source into an isolated directory for
static inspection is fine.

Done when: the scope (evaluate-only or install-authorized) is established from the current request and prior authorization.

## Step 1: Reconnaissance

Follow [references/reconnaissance.md](references/reconnaissance.md): repo metadata, README, docs/registry cross-check, current usage, codebase layout.

Done when: a metadata table exists (stars, forks, license, language, last commit, open issues) plus a one-paragraph statement of what the tool does and who it is for, and, when the project already uses the tool or an alternative, its current version and usage sites.

## Step 2: Security and Dependency Review

Follow [references/security-review.md](references/security-review.md): dependency audit, code security scan, CI quality, license compatibility.

Done when: a findings table exists (each area marked pass, concern, or gap) and license compatibility is stated explicitly.

## Step 3: Fit Assessment

Follow [references/fit-assessment.md](references/fit-assessment.md): environment compatibility, spec compliance (if it implements a standard), staleness classification, integration with the existing stack.

Done when: pros/cons are listed, every stale-looking dependency carries a domain classification (frozen algorithm, moving ecosystem, or API wrapper), and stack overlap is stated.

## Step 4: Candidate Check (only when the tool is proposed as a replacement)

Follow [references/candidate-assessment.md](references/candidate-assessment.md): verify the product category before comparing, measure against current-implementation invariants.

Done when: the candidate's product category and the capabilities it replaces
(computation/algorithm, rendering/presentation, transport/hosting,
workflow/UX) are stated, or this step is skipped with a
one-line reason (not a replacement proposal).

## Step 5: Jurisdiction and Licensing Check (only for regulated or geo-licensed tools)

Follow [references/jurisdiction-and-licensing.md](references/jurisdiction-and-licensing.md) when the tool involves financial transactions, trading, regulated activity, or geographic licensing.

Done when: accessibility is confirmed or flagged with a restriction classification, or this step is skipped with a one-line reason (unregulated, globally available tool).

## Step 6: Verdict and Decision

Write the assessment report:

- What it is (one-liner)
- Who benefits (which users or workflows: the human operator, the agent
  workflow, both, or neither; state explicitly)
- Security findings table (pass / concerns)
- Fit assessment (pros/cons for this environment)
- Verdict: **Go** or **No-go** with rationale
- For a replacement or a workaround (patch, pinned version, non-registry source): the measured reason, and the condition that would reverse it. Record both with the adoption change, so the next upgrade or switch can check them instead of guessing.

Check every capability claim the verdict relies on against the tool's source or
docs, including claims from delegated research or memory, and every "latest" or
"current version" claim against the registry or release page. File upstream reports
only after reproducing the problem.

For evaluate-only scope, deliver the assessment and ask whether to adopt. When
installation is already authorized, carry relevant findings into Step 7 and report
the result after verification. Ask only if a newly discovered blocker requires a
user decision, such as accepting a material capability loss or expanding scope.
A No-go verdict or unresolved security or license concern is always a blocker
requiring an explicit user decision, even when installation was previously authorized.
Once the user explicitly chooses adoption over a No-go, implement it and let
measured evidence carry any remaining argument, while still surfacing any new
security or license findings.

Done when: the verdict and its evidence are clear, and either adoption proceeds
under existing authorization or the unresolved decision is presented concretely
(the decision needed plus the options).

## Step 7: Install (when authorized)

Follow [references/install-compatibility.md](references/install-compatibility.md) for the pre-install surface check, then:

1. Prefer checksum-verified release assets or a package manager; read install scripts before running them.
2. Configure auth, ports, directories, and integrations from environment-provided values.
3. For bundle-sensitive adoptions, follow [references/adoption-verification.md](references/adoption-verification.md) to measure impact before/after against a clean-tree control build.
4. When an install or upgrade breaks on mismatched versions within a package
   family, prefer aligning the family on one consistent release: regenerate
   the lockfile and adapt the code to the new API. Pin back only with a
   recorded reason.
5. When the adoption replaces a tool, list what the old one did implicitly (defaults such as retries, timeouts, and serialization) and match it or record the intended change. Remove the old tool everywhere in the same change: dependencies, scripts, hooks, CI, editor settings, and docs.

Done when: the tool is installed from a verified source, configured, a smoke test confirms it works end to end, and no trace of a replaced tool remains.

## Dependency Alerts

Triage dependency or supply-chain alerts by first filtering to those needing action. Per alert give the affected surface and whether it is reachable, then the upgrade risk. Split verified fixes into PRs, runtime separate from dev-only, with a major upgrade as its own follow-up.

## Pitfalls

1. **Missing the auth model**: local-first tools may have a server mode with auth off by default; warn when deploying.
2. **Offline tools that still fetch**: some download models or assets on first run; disclose it.

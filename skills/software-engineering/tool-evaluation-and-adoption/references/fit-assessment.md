# Fit Assessment

## Environment Compatibility

- OS/arch support (Linux x86_64, ARM, macOS, Windows)
- Runtime dependencies (containers, language runtimes, DB servers)
- First-run setup cost (model downloads, API key provisioning)

## Spec and Standard Compliance

When the tool implements a protocol, wire format, or industry standard, verify it follows the spec — not just that it works:

1. Identify layered standards — many specs have an international base plus regional or industry extensions. The tool may implement the base correctly but miss extension-specific rules.
2. Map what the library implements — read source and docs; note which spec requirements are encoded and which are implicit.
3. Check the validation layer — does `verify()`/`validate()` enforce spec rules, or only structural correctness? Structural checks are not spec compliance.
4. Search for explicit spec references — grep the codebase for the standard body's name. Zero mentions suggests the author implemented from examples, not the spec document.
5. Report gaps as a table — covered, missing, partially implemented.

## Staleness Classification

"Last updated" is not always a risk signal. Classify the problem domain:

- **Frozen algorithm** (checksums, encodings, math): staleness is a weaker
  signal, not no signal. The algorithm cannot change, so adoption at scale
  matters more than publish date.
- **Moving ecosystem** (frameworks, security libraries): staleness is a risk — missing patches mean vulnerabilities.
- **API wrapper** (payment SDKs, cloud clients): moderate risk — upstream APIs change and wrappers break; check whether the wrapped API changed since last publish.

Always report the classification alongside the date, and state the update
cadence explicitly. For network-exposed components, expect timely security
patches.

## Integration With the Existing Stack

- Does it integrate with the tools the team uses (editors, agents, MCP)?
- Does it fit the current workflow?
- Does it overlap existing capabilities, and what is the migration cost from alternatives?
- Who benefits (which users or workflows: the human operator, the agent
  workflow, both, or neither)? State explicitly; a tool can be excellent in
  isolation but useless in this setup.

## Platforms Hosting Several Customers or Tenants

When the platform will host several customers or tenants (commerce engine,
CRM, CMS), the cost sits in operating it, not in its UI:

- Data isolation per client: separate instances, workspaces, or row-level policy, and how API keys and agent access are scoped.
- Operational ownership: upgrades, backups, incidents, and compliance you take on compared with the SaaS alternative.
- Extension model: whether custom work lives in isolated modules or plugins, or requires modifying the core, which blocks upgrades.
- Domain complexity the platform leaves to you, such as taxes, inventory concurrency, order and payment reconciliation, and webhooks.

Done when: pros/cons are listed, every stale-looking dependency carries a domain classification, and stack overlap plus beneficiary are stated.

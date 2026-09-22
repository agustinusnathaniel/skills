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

- **Frozen algorithm** (checksums, encodings, math): staleness is irrelevant — the algorithm cannot change. Adoption at scale matters more than publish date.
- **Moving ecosystem** (frameworks, security libraries): staleness is a risk — missing patches mean vulnerabilities.
- **API wrapper** (payment SDKs, cloud clients): moderate risk — upstream APIs change and wrappers break; check whether the wrapped API changed since last publish.

Always report the classification alongside the date.

## Integration With the Existing Stack

- Does it offer agent/IDE integration (e.g. MCP support)?
- Does it fit the current workflow?
- Does it overlap existing capabilities, and what is the migration cost from alternatives?
- Who benefits — the human operator, the agent workflow, both, or neither? State explicitly; a tool can be excellent in isolation but useless in this setup.

Done when: pros/cons are listed, every stale-looking dependency carries a domain classification, and stack overlap plus beneficiary are stated.

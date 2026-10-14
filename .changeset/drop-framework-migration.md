---
"agustinusnathaniel-skills": major
---

Remove the **framework-migration** skill. In testing, agents did not load it for routine migrations such as replacing axios with ky, even when its description named that exact case, and results matched runs without it.

Its most useful rule moves into **tool-evaluation-and-adoption**: when an adoption replaces a tool, match the old tool's implicit defaults (retries, timeouts, serialization) and remove the old tool everywhere in the same change, including dependencies, scripts, hooks, CI, editor settings, and docs.

If you invoked `framework-migration` by name, use `tool-evaluation-and-adoption` instead.

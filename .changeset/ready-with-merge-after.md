---
"agustinusnathaniel-skills": minor
---

`pull-request-readiness` changes how a waiting PR is held: one that waits on a dependency, a proof, or another PR opens ready with "Merge after: <what>" in its body so review runs meanwhile, and draft is kept for PRs where review would be wasted. A green CI run at the current head now counts for the suites check, so only what CI does not cover runs locally. The stack rules move to a reference file, and the base-branch rule moves to the sync check because it applies outside stacks too. `challenge-every-guard` adds that a flag attribute, log field, header, or config key needs a named reader or is left out.

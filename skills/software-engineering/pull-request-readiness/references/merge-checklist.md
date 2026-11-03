# Merge checklist

Read this when preparing the merge and deploy steps for the user. Each PR's
checklist covers four parts.

- **Pre-merge:** approvals still missing, unanswered questions from whoever
  implemented the PR (a person or an agent session), reviewer changes not yet
  pushed, and anything that must exist
  before the code lands, such as flags with their defaults, database
  indexes, or new environment variables in each environment. Version
  changes follow the repository's release tooling. A version set by hand is
  checked against the registry right before merge, and dependent work gets
  the final number only after the publish succeeds. A change that needs a
  field from another package's published client waits until the registry
  shows a version that has it.
- **Production asks:** every ask to merge to production or turn on a
  production flag states what could go wrong, the blast radius, what will be
  watched, how to roll back, and what is unverified. For a promotion or deploy
  PR approved earlier, list what landed after the approval and whether each
  change ships dark or live.
- **Deploy order:** when several services or PRs depend on each other, which
  deploys first (consumers that accept a new shape before producers that send
  it) and which must be live before the next merges; a flag stays off until
  everything it depends on is live.
- **Post-merge:** flags to turn on and in which environment, backfills or
  scripts to run (dry run first), what to watch and for how long, and
  follow-up PRs or tickets.

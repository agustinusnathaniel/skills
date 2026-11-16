# Stacks

Read this when the work is a stack of PRs, each based on the one below.

- Fix a problem in the lowest PR that introduced the code, then carry it up
  the stack the way the repository does (rebase, or merge where force pushes
  are not allowed).
- Each PR is correct at its own head: tests and checks pass with only the PRs
  below it.
- When a contract file (schema, API spec) is copied into several branches or
  repositories, keep the copies identical and compare hashes.
- Generated code goes in its own commit.
- The body of each stacked PR names the PR it is stacked on.
- Merge bottom-up.

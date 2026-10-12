---
description: An upgrade question is evaluate-only and grounded in current usage and the version delta.
tags: [tool-evaluation-and-adoption, behavior]
max_turns: 6
---

Should we upgrade `pnpm/action-setup` from v2 to v4 in our CI? Here's the workflow:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
```

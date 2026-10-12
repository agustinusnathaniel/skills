---
description: Verification runs on the shipped artifact, not a source-level wrapper.
tags: [test-strategy, behavior]
max_turns: 6
---

I fixed the bug where `mycli doctor` reported installed plugins as missing. I added a unit
test for `resolvePluginPath()` and ran `node ./src/cli.ts doctor` locally: it now prints
"installed". The CLI ships to users as the npm package `mycli`, built by `pnpm build`
into `dist/`. Plan the verification I should do before telling users it's fixed.

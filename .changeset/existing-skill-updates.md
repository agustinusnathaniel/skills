---
"agustinusnathaniel-skills": minor
---

Update five existing skills:

- **bulk-import-engineering** now also covers backup and restore and JSON, CSV, or spreadsheet import and export in offline-first apps, so it loads for those tasks too. Imports validate the whole file before writing, can roll back a failed restore, and merge rows field by field instead of skipping existing ids.
- **test-strategy** prefers real storage over mocks, fails tests on unhandled network requests, and takes expected values from the real consumer. When a change breaks a test, the agent fixes the code or states why the test's contract changed, instead of weakening the test.
- **prune-codebase** also removes what a starter template or fork brought in but the product never used, such as demo keys, sample auth, and upstream URLs.
- **autonomous-improvement-loop** keeps per-target rules learned from merged and closed deliveries, treats a cycle that changes nothing as valid, and pins the model for each scheduled job.
- **tool-evaluation-and-adoption** records why a tool was switched and what would reverse that decision, and covers evaluating a platform that client work will be built on.

If you installed these skills individually into a user-level skills folder, reinstall them. Some hosts load a user-level copy in place of the plugin's newer one.

# Local Import and Export

Read this when the import or export runs in the client against local storage
(IndexedDB, localStorage, SQLite on device): backup and restore, JSON or
spreadsheet transfer between devices, and offline-first apps. The client owns
the data, so it also owns the guarantees a server would give.

## Validate before writing

Parse the whole file against a versioned schema before touching stored data.
Accept earlier export versions the app produced, and reject the file with a
reason when it fails. Keep current data unchanged on any rejection.

## Make destructive writes recoverable

Run replace and merge inside one transaction where the store supports it.
Otherwise snapshot the affected tables first and restore them on any error;
merge mode needs this as much as replace mode.

## Merge by identity, field by field

Match incoming rows to existing ones by stable identity. Apply incoming
non-empty fields over the existing row; a rule that skips a row whose key
already exists silently discards corrections. Decide up front what happens to
rows that cannot be attributed to an owner or group: reject the file, or skip
them and say so.

## Compare against loaded data

Duplicate detection against a query that has not resolved treats every row as
new. Disable import until the comparison data has loaded, and show loading and
failure apart from empty.

## Report truthfully

Show imported, updated, skipped, and rejected counts, with reasons, that match
what was actually written.

## Keep spreadsheet escapes symmetric

Exporters guard against formula injection by prefixing `'` to cells beginning
with `=`, `+`, `-`, `@`, tab, or carriage return. The importer must strip
exactly that one prefix from those cells, or each round trip changes the data.

## Distrust stored rows

Stored rows outlive the code that wrote them. Sanitize at the write boundary,
guard render and export so one corrupt row cannot crash a page or a whole
export, and repair bad rows in place with a migration rather than wiping the
store. Cap collections that grow without bound.

## Verify

- Export, then import into an empty store: data is identical.
- Import the same file twice: the second run changes nothing.
- Import a previous-version export and a corrupt file: the first succeeds, the
  second leaves data untouched.
- Export with a corrupt row present: the export completes.

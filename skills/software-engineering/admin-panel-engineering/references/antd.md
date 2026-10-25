# Ant Design forms and tables

Read this when building or debugging forms and tables with Ant Design (antd).
Each item is a failure that type-checks and renders, then loses or misreads
data.

## Forms

- `Form.Item` binds `value` and `onChange` to its **single direct child**. A
  wrapper element or extra text inside the item breaks binding and validation.
  Put layout around the item, or use `noStyle` items inside a plain wrapper.
- A field is part of the form only while a `Form.Item` with its `name` is
  mounted. Submitted values omit unregistered fields. To keep a value without
  showing it, render `<Form.Item name="…" hidden>`.
- Content that is never mounted registers nothing: collapsed `Collapse`
  panels and inactive tabs render lazily, and so do closed modals. Use
  `forceRender` on panels that hold fields, and `preserve` on items and lists
  whose values must survive unmounting.
- `initialValues` apply at mount and on `resetFields`, not on later prop
  changes. Load fetched records with `form.setFieldsValue`, or remount the form
  with a `key` per record. Pass a stable object; one rebuilt each render, or
  mutated elsewhere, leaks between records.
- Toggles bind through `valuePropName="checked"` on the `Form.Item` wrapping a
  `Switch` or `Checkbox`.
- `min` and `max` rules check string length unless the rule says
  `type: 'number'`. Put `type: 'number'` on **each** numeric rule.
- A submit button outside the `<form>` element (modal footer, page header,
  `Popconfirm` via `okButtonProps`) submits through the HTML `form` attribute
  matching the `Form`'s `id`.
- Reset a modal's form when it opens for a new record, not when it closes; a
  reset on close discards edits a user expected to keep.

## Tables

- With fixed columns, set `scroll.x` to a number and give every column a
  `width`; `scroll.x: 'max-content'` ignores the widths.
- `virtual` needs numeric `scroll.x` and `scroll.y`, and with `rowSelection` a
  numeric `rowSelection.columnWidth`. A wrapped `Table` used with `virtual`
  must forward its ref before React 19.
- Virtualize per table, after measuring.

## Date pickers on mobile

Set `placement` to a bottom placement and `inputReadOnly` on touch devices, so
the popup is not clipped above the viewport and the on-screen keyboard does not
open over the calendar.

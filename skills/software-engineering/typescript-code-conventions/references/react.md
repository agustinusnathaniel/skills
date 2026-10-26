# React

Read this when writing React or React Native components and hooks. Rule
names are Biome first, then the ESLint-family equivalent where one exists.

## Components and hooks

- Components are functions defined at module level. A component defined
  inside another remounts on every render and loses its state; move it out
  and pass what it needs as props.
- Hooks run at the top level of a component or custom hook, never inside a
  condition, loop, or callback.
- Effect and memo dependency lists name every value the callback reads.
  When a complete list makes the effect run too often, change the code
  rather than the list: move the function inside the effect, derive the
  value during render, or move the work to an event handler.
- On React 19, `ref` is a plain prop and components take it directly
  instead of wrapping in `forwardRef`.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| Module-level components | `correctness/noNestedComponentDefinitions` | `react/no-unstable-nested-components` |
| Hooks at top level | `correctness/useHookAtTopLevel` | `react-hooks/rules-of-hooks` |
| Complete dependencies | `correctness/useExhaustiveDependencies` | `react-hooks/exhaustive-deps` |
| Function components | `style/useReactFunctionComponents` | `@eslint-react/no-class-component` |
| `ref` as a prop | `suspicious/noReactForwardRef` | `@eslint-react/no-forward-ref` |

## Lists

Every element in a rendered list has a `key` taken from the item's identity:
an id, a slug, or a value unique in the list. An array index as the key
mixes up state when items are added, removed, or reordered. A static list
without ids takes its key from the item's content.

Rules: `suspicious/noArrayIndexKey`, `correctness/useJsxKeyInIterable`;
`react/no-array-index-key`, `react/jsx-key`.

## Markup and safety (web)

- Use the semantic element (`<button>`, `<nav>`, `<ul>`) rather than a `div`
  with a `role`.
- Every `<button>` states its `type`.
- A click handler on a non-interactive element comes with a keyboard
  handler, or the element becomes a `<button>`.
- Images carry meaningful `alt` text, or `alt=""` when decorative.
- Render HTML strings through a sanitiser and a component built for it;
  `dangerouslySetInnerHTML` stays out.
- Links with `target="_blank"` carry `rel="noopener noreferrer"`.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| Semantic elements | `a11y/useSemanticElements` | `jsx-a11y/prefer-tag-over-role` |
| Button `type` | `a11y/useButtonType` | `react/button-has-type` |
| Keyboard with click | `a11y/useKeyWithClickEvents` | `jsx-a11y/click-events-have-key-events` |
| `alt` text | `a11y/useAltText` | `jsx-a11y/alt-text` |
| No raw HTML | `security/noDangerouslySetInnerHtml` | `react/no-danger` |
| Safe `_blank` | `security/noBlankTarget` | `react/jsx-no-target-blank` |

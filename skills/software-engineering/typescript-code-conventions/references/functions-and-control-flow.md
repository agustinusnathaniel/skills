# Functions and control flow

Read this when writing or splitting a function, or when one of the rules
below fails. Rule names are Biome first, then the ESLint-family equivalent
where one exists.

## Parameters

A function takes at most two positional parameters. Past two, every
parameter moves into one options object, destructured in the signature,
with defaults there too:

```ts
export function isOutlier({
  value,
  samples,
  tolerance = 0.2,
}: {
  value: number;
  samples: Array<number>;
  tolerance?: number;
}): boolean { ... }
```

Mixing positional parameters with a trailing object leaves the call site
half-named; the whole list moves together. Parameters of a positional
contract stay positional; see "Framework contracts" in the skill.

Rules: `complexity/useMaxParams` with `max: 2`; `max-params` with `max: 2`.

## Size

Functions stay within 60 lines and files within 500; the file count
excludes blank lines. The limits apply to tests too. When a limit trips,
split the code:

- A long function becomes named steps, each a helper in the same file.
- A long file splits by concept into sibling files.
- A long `describe` splits into `describe` blocks named by sub-behaviour,
  or into a sibling test file.

The limit stays where it is, and no per-file exemption is added.

Rules: `complexity/noExcessiveLinesPerFunction` (`maxLines: 60`),
`style/noExcessiveLinesPerFile` (`maxLines: 500`, `skipBlankLines: true`);
`max-lines-per-function` and `max-lines` with `skipBlankLines`.

## Branching

- Every `if`, `else`, and loop body has braces.
- Return early and drop the `else` after a `return`, `throw`, `break`, or
  `continue`. An `else` holding only an `if` collapses into `else if`.
- A nested ternary becomes an early-return helper or a lookup object.
- Every `switch` ends with a `default`.
- Cognitive complexity stays at or below 20 per function; past that, extract
  the branches into named helpers.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| Braces | `style/useBlockStatements` | `curly: all` |
| Early return | `style/noUselessElse` | `no-else-return` |
| Collapsed `else if` | `style/useCollapsedElseIf` | `no-lonely-if` |
| No nested ternary | `style/noNestedTernary` | `no-nested-ternary` |
| `default` clause | `style/useDefaultSwitchClause` | `default-case` |
| Complexity 20 | `complexity/noExcessiveCognitiveComplexity` | `sonarjs/cognitive-complexity` |

## Loops and values

- Iterate with `for...of`; `.map`, `.filter`, and `.reduce` stay for
  transforms that return a value.
- `const` by default, `let` only when reassigned, never `var`; compare with
  `===`.
- Leave parameters unassigned; copy into a local first. Defaulted
  parameters come last.
- Arrow functions for callbacks and function expressions.
- Template literals over concatenation, optional chaining over `&&` chains,
  `.at(-1)` over `arr[arr.length - 1]`.
- Regex literals live at module level, not inside functions or loops.
- Accumulators push into an array or set keys on an object; spreading the
  accumulator in each iteration copies it every time. Build a new object
  instead of using `delete`.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| `for...of` | `complexity/noForEach`, `style/useForOf` | `unicorn/no-array-for-each` |
| `const`, no `var`, `===` | `style/useConst`, `suspicious/noVar`, `suspicious/noDoubleEquals` | `prefer-const`, `no-var`, `eqeqeq` |
| Parameters | `style/noParameterAssign`, `style/useDefaultParameterLast` | `no-param-reassign`, `default-param-last` |
| Arrow functions | `complexity/useArrowFunction` | `prefer-arrow-callback` |
| Template, chaining, `.at()` | `style/useTemplate`, `complexity/useOptionalChain`, `style/useAtIndex` | `prefer-template`, `@typescript-eslint/prefer-optional-chain`, `unicorn/prefer-at` |
| Top-level regex | `performance/useTopLevelRegex` | none |
| Accumulators, `delete` | `performance/noAccumulatingSpread`, `performance/noDelete` | `oxc/no-accumulating-spread` |

# Errors and async

Read this when throwing, catching, or rethrowing an error, writing async
code, or logging. Rule names are Biome first, then the ESLint-family
equivalent where one exists.

## Throwing

Throw `Error` objects, or subclasses, created with `new` and carrying a
message. When rethrowing, wrap the original as `cause` so the stack
survives:

```ts
try {
  await writeConfig(path);
} catch (error) {
  throw new Error(`Could not write ${path}`, { cause: error });
}
```

A `catch` exists to add context, recover, or translate the error; one that
only rethrows the same error goes away. For `try` blocks around code that
cannot throw, see the `challenge-every-guard` skill, "Clean before review".

| Convention | Biome | ESLint family |
| --- | --- | --- |
| Throw only errors | `style/useThrowOnlyError` | `@typescript-eslint/only-throw-error` |
| `new` and a message | `style/useThrowNewError`, `suspicious/useErrorMessage` | `unicorn/throw-new-error`, `unicorn/error-message` |
| `cause` on rethrow | `style/useErrorCause` | `preserve-caught-error` |
| No rethrow-only `catch` | `complexity/noUselessCatch` | `no-useless-catch` |

## Async

- An `async` function awaits something; otherwise it drops `async` and
  returns the value or promise directly.
- Promise chains read as `async`/`await`; a `.then` nested inside another
  `.then` flattens into sequential `await`s.
- A Promise executor stays synchronous: `new Promise((resolve) => ...)`,
  with the async work inside it.

| Convention | Biome | ESLint family |
| --- | --- | --- |
| `async` awaits | `suspicious/useAwait` | `require-await` |
| Flat chains | `suspicious/noNestedPromises` | `promise/no-nesting` |
| Sync executor | `suspicious/noAsyncPromiseExecutor` | `no-async-promise-executor` |

## Logging

Application code logs through `console.error` and `console.info` only.
Debug output (`console.log`, `debugger`) comes out before the change is
done. Scripts and test files may log freely.

Rules: `suspicious/noConsole` with `allow: ["error", "info"]`;
`no-console` with `allow: ["error", "info"]`.

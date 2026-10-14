# SWR and client data caches

Read this when an admin app fetches through SWR, or a similar keyed cache
such as TanStack Query. Defaults below are SWR 2.x; check the installed
version.

## Keys

- A key must include every input that changes the response: path, query
  params, request body, and options such as `responseType`. A key that omits
  one serves the first response to every caller; a file hook keyed on a
  static path returned the same file for different file names.
- Lists fetched with POST and a filter body key on the path plus the cleaned
  body. Strip empty filter values before both the key and the request, or
  `{}` and `{ status: '' }` cache as different lists.
- Build keys in one place per endpoint, next to the hook, so prefetching and
  invalidation produce the same key.

## Gating

Pass `null` as the key until the request can succeed: before the session or
permission map is ready, and after logout. Hooks that fetch without a session
fire a burst of 401s, and in apps that log out on 401 the burst ends the next
session too.

## Logout and identity changes

Clear the whole cache on logout and on the session-expired path, without
refetching: `mutate(() => true, undefined, { revalidate: false })`. Clearing
only the auth store leaves the previous user's lists in memory for the next
user. Run it from the shared logout function.

## Writes

After a mutation, revalidate every key that shows the changed entity. Keys
that vary by filter or page need a matcher: `mutate((key) => isOrdersKey(key))`.

## Revalidation and retries

- `revalidateOnFocus` and error retries are on by default. Retries back off
  exponentially, so a 4xx can repeat for a minute and focus can refetch
  heavy reports. Decide both per app; retry server errors, not 4xx.
- Use `keepPreviousData` on paginated and filtered lists so the table keeps
  its rows while the next page loads.
- A form initialized from SWR data can be reset by a background revalidation.
  Seed the form once per record and ignore later updates while it is dirty.

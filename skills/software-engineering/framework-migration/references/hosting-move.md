# Hosting, adapter, and site framework moves

Read this when moving a site to another host, adding or removing a deploy
adapter, switching rendering mode (static, prerendered, server-rendered), or
moving content to another site framework.

## Inventory the old output

Before switching, record from the deployed site and the last build:

- Every URL: the sitemap, route list, and generated files (feeds, `robots.txt`,
  `llms.txt`, Open Graph images, service worker, manifest).
- Response headers per route type: CSP and other security headers, caching,
  and redirects.
- Environment variables set in the host's dashboard rather than in the repo.
- Which routes were static, prerendered, or rendered per request.

## Rebuild it on the new host

- Add redirects for every URL that moves; keep them after the move.
- Recreate headers in the new host's format, and validate the CSP the new
  build actually needs (inline bootstrap scripts, font and image origins).
- Check where the new adapter writes output; plugins that write to a fixed
  path (sitemaps, service workers) may land outside the published directory.
- Decide how reloads reach dynamic logic: some hosts serve prerendered HTML
  before any worker or function runs, so a page can stay stale until its
  route is set to run the worker first.
- Set the SPA fallback to the file the build actually emits.

## Verify

Diff the old URL inventory against the new deployment (every URL returns the
expected status or redirects), compare headers per route type, reload and
navigate to each dynamic page, and confirm generated files exist and changed.

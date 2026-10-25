---
name: config-drift
description: >
  Verify that a configuration change is what the running system actually uses.
  Use when changing environment variables, build-time config, security headers
  or CSP, service worker or update settings, hosting or platform config files,
  shared CI workflows, or agent and tool config, and when a setting has no
  effect or a feature silently stops working.
---

# Config Drift

A declared setting is a claim. The effective setting is what the running
artifact does. Treat every configuration change as unverified until it is read
back where it takes effect.

## Locate where the value takes effect

Name the consumer of the value and when it reads it:

- **Build:** baked into the artifact. Changing it needs a rebuild, and any
  build cache must key on it or a stale artifact ships.
- **Deploy:** applied by the platform. Changing it needs a redeploy.
- **Startup:** read once by the process. Changing it needs a restart.
- **Runtime:** read per request or per use.

List every source that can set the value and their precedence: per-platform
files, dashboards, CLI flags, host-injected environment, and defaults. A file
can silently take precedence over a dashboard. A file with an unrecognized name
or extension is silently ignored. A parse error in one entry can drop the whole
file back to defaults. A schema can accept a key that the runtime never reads,
because the code reads the environment directly.

Done when the consumer, its read timing, every source, and their precedence are
named.

## Keep one source per value

Define values that must agree across targets once, such as security headers per
host or versions across manifests. Generate the copies or validate them in CI,
and remove validator references to files that no longer exist.

## Read back the effective value

Observe each changed value at its consumer: the built bundle, the headers the
deployed URL actually serves, the version of the deployed worker, the rendered
page, the process's resolved config, or the tool version a CI job actually ran.
Grep built output for values that should appear, and confirm absence for
values that must not. Anything shipped to a client is public; use the
`client-trust-boundary` skill for what may ship.

Done when every changed value is observed at its consumer, or the gap is
reported together with the check that was attempted.

## Make failure paths speak

Find the places where a broken value degrades quietly: a `catch` that swallows,
an ignore list, `continue-on-error`, a fallback provider or default, or success
parsed from unstructured output. For observability and alerting changes, send
a test event and confirm it arrives. Make updaters and probes fail closed on
output they cannot parse.

## Clients that outlive a deploy

Running clients keep old code after a deploy: service workers that activate
without reloading, lazy chunks the deploy removed, over-the-air updates
(Expo/EAS) bound to a runtime version, cached config. Decide how an old
client learns about the
new version and moves to it, then exercise an update with a tab or app already
open. Read [client version skew](references/client-version-skew.md) when the
change touches service workers, code splitting, or mobile updates.

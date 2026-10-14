# Dossier outline

One page per section for a large codebase; one page with these headings for a
small one.

## Index

At-a-glance facts (stack, size, active period, deploy target), a reader
orientation table (which page answers which question), and the files that best
exemplify the structure.

## Purpose

The problem solved, domain scope with evidence, users and roles, where it
runs, why it is custom rather than bought, non-goals, and how success is
judged.

## Architecture

Overview, components, infrastructure, runtime flow (startup, auth, data
fetching, error handling), and the conventions that differ from framework
defaults.

## Capabilities

- **Product:** what users can do, by role.
- **Operations:** deploy, configuration and when it takes effect, access
  administration, observability, security, health and recovery, and an
  operator checklist.
- **Developer experience:** the inner loop and the release loop, extension
  points, and known sharp edges.

## History

Eras of change with their causes, causal chains (one change forcing the
next), and what never happened: options never taken, which are decisions by
omission.

## Decisions

Recurring principles; choices to keep; liabilities with guidance; things not
to reintroduce, each with the incident behind it; trade-offs accepted; and
mistakes with the lesson each taught.

## References

Sources read, evidence anchors, and evidence gaps: what could not be verified,
why, and what would settle it.

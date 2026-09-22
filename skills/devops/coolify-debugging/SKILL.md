---
name: coolify-debugging
description: Fix misbehaving Coolify-managed containers. Use when a Coolify-deployed service is stuck or unhealthy; inspecting service config via the DB or API; adding persistent volumes; or triggering deployments.
---

# Coolify Debugging

Diagnose and reconfigure Coolify-managed Docker services when the Coolify UI is unreachable. Confirm actual names and ports with `docker ps` first — use those live values in every command below.

## Safety rules (every run)

1. **Snapshot before mutating.** Before any `UPDATE`/`INSERT`, `SELECT` the current row into a file (`\copy (SELECT ...) TO '/tmp/coolify-backup-<table>-<id>.sql'`). A DB write with no rollback path is not attempted.
2. **Least-privilege token.** Create the temp token with only the abilities the run needs (`read` for diagnosis; add `deploy` to trigger deploys; add `write` only for API-side mutations). The `*` wildcard works but is root-equivalent — prefer the minimal set. The acting user must be a team admin/owner; member-owned tokens get `403` on write/deploy.
3. **Short-lived tokens.** Set `expires_at` at creation and delete the token when the run ends. Never print the raw token into reports or logs — capture once, reference by ID afterwards.

## Triage

1. List state: `docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'` — identifies the target container and whether it is restarting, unhealthy, or merely slow.
   Done when: the target container's actual name and status are known.
2. Read recent logs: `docker logs --tail 100 <container> 2>&1 | tail -50` — surfaces crash loops, failed init steps, and dependency-install delays.
   Done when: the failure signature (or its absence) is identified.
3. Read Coolify labels: `docker inspect <container> --format '{{json .Config.Labels}}' | jq` — yields `coolify.serviceId`, `coolify.resourceUuid`, and `coolify.type` for every follow-up step.
   Done when: the service ID and resource UUID are in hand.

## Branch

- Container unhealthy, stuck restarting, slow to start, or using unexpected resources → [references/container-diagnostics.md](references/container-diagnostics.md)
- Inspect service config, create an API token, or query the Coolify API → [references/coolify-db-api.md](references/coolify-db-api.md)
- Persist data across redeploys with a new volume → [references/persistent-volumes.md](references/persistent-volumes.md)
- Trigger a deployment programmatically or apply a config change → [references/deployments.md](references/deployments.md)

## Pitfalls

- Pipe multi-line SQL via stdin (`cat update.sql | docker exec -i coolify-db psql ...`) — compose YAML contains quotes and newlines that break `psql -c` quoting.
- Treat the stored compose as a template: edits take effect on the next deploy, never retroactively.
- Wait for any in-flight deployment to finish before triggering another — the deploy snapshot may predate your edit.
- Confirm `is_api_enabled` in `instance_settings` before calling the API.
- Distinguish `services` (Compose-based, with a `service_applications` sub-table) from `applications` (standalone) — schema and API calls differ.

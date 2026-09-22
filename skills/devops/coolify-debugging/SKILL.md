---
name: coolify-debugging
description: Fix unhealthy Coolify-managed containers via DB and API inspection. Use when a Coolify-deployed container is stuck, unhealthy, or slow to start; inspecting service config via the Coolify database or API; adding persistent volumes to a service; or triggering deployments programmatically.
---

# Coolify Debugging

Diagnose and reconfigure Coolify-managed Docker services when the Coolify UI is unreachable. Confirm actual names and ports with `docker ps` first — use those live values in every command below.

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

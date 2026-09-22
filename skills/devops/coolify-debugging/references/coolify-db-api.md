# Coolify DB and API Access

Inspect Coolify-managed service configuration through the PostgreSQL database and the REST API. Confirm Coolify's own container names with `docker ps` — defaults below match a standard install (`coolify` app, `coolify-db` Postgres, `coolify-proxy` reverse proxy).

## Finding Coolify containers

| Container | Purpose |
|-----------|---------|
| `coolify` | Main application |
| `coolify-db` | PostgreSQL database |
| `coolify-redis` | Cache |
| `coolify-proxy` | Reverse proxy |

Done when: each container's live name is confirmed from `docker ps` output.

## Creating a temporary API token

Insert a token directly into the database (the app user with `id = 0` breaks some in-app token flows, so direct insertion is the reliable path):

```bash
docker exec coolify-db psql -U coolify -d coolify -c "SELECT id, email FROM users;"

API_TOKEN=$(openssl rand -hex 32)
TOKEN_HASH=$(echo -n "$API_TOKEN" | sha256sum | cut -d' ' -f1)

docker exec coolify-db psql -U coolify -d coolify -c "
INSERT INTO personal_access_tokens
(tokenable_type, tokenable_id, name, token, abilities, created_at, updated_at, team_id)
VALUES ('App\\Models\\User', <user_id>, 'temp-api-token', '$TOKEN_HASH', '[\"*\"]', NOW(), NOW(), 0);
"

echo "API Token: $API_TOKEN"
```

Done when: a subsequent authenticated API call returns `200`.

## Enabling the API

```bash
docker exec coolify-db psql -U coolify -d coolify -c \
  "UPDATE instance_settings SET is_api_enabled = true, updated_at = NOW() WHERE id = 0;"
```

Done when: `SELECT is_api_enabled FROM instance_settings;` returns `t`.

## API endpoints

Base URL: `http://<coolify-host>:<port>/api/v1/` (default installs map the app to port 8000). Headers: `Authorization: Bearer <token>`, `Accept: application/json`.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/projects` | GET | List projects |
| `/api/v1/resources` | GET | List all resources (apps + services) |
| `/api/v1/services` | GET | List Compose services (verbose) |
| `/api/v1/services/<uuid>` | GET | Service detail by UUID |
| `/api/v1/applications` | GET | List standalone applications |
| `/api/v1/deploy?uuid=<uuid>&type=service` | POST | Trigger a service deployment |

Done when: `GET /api/v1/resources` lists the target service.

## Finding service and app IDs

Via Docker labels (fastest — no DB access needed):

```bash
docker inspect <container> --format '{{json .Config.Labels}}' | jq
```

Key labels: `coolify.serviceId` (row in `services`), `coolify.service.subId` (row in `service_applications`), `coolify.type` (`service` for Compose, `application` for standalone), `coolify.resourceName`, `coolify.resourceUuid` (UUID for API calls). Coolify renames deployed containers to `<project-hash>-<n>`, so a name filter that returns nothing may mean a rename rather than an absence — check `caddy_0` (reverse-proxy hostname) on each running container to identify which app a hash-named container belongs to, and `com.docker.compose.project` for the project hash.
Done when: `serviceId` and `resourceUuid` are known.

Via DB queries:

```bash
docker exec coolify-db psql -U coolify -d coolify -c \
  "SELECT id, uuid, name, image, service_id FROM service_applications WHERE name LIKE '%my-app%';"

docker exec coolify-db psql -U coolify -d coolify -c \
  "SELECT id, uuid, name FROM services WHERE name LIKE '%my-service%';"

docker exec coolify-db psql -U coolify -d coolify -c \
  "SELECT * FROM local_persistent_volumes WHERE resource_id = <app_id>;"
```

Done when: the target row's `id` and `uuid` are returned.

## Schema map

Compose-based services store config in two places that both need updating (see [persistent-volumes.md](persistent-volumes.md)): the `services.docker_compose` TEXT column (full Compose YAML template, with `${VAR}` placeholders resolved at deploy time) and the `local_persistent_volumes` table. Key volume columns: `name` (Docker volume name, often `<resource_uuid>_<volume_name>`), `mount_path` (container path), `resource_type` (`App\Models\ServiceApplication` or `App\Models\Application`), `resource_id`, `host_path` (NULL means named volume; a set path means bind mount). Standalone apps live in the `applications` table instead — confirm `coolify.type` before querying.
Done when: the target's table (`services` + `service_applications`, or `applications`) is identified.

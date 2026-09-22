# Triggering Deployments

Apply a config change or redeploy a Coolify service programmatically. Resolve the resource UUID first via [coolify-db-api.md](coolify-db-api.md).

## Bump the config hash

After editing the stored compose, force Coolify to re-read it on the next deploy:

```bash
docker exec coolify-db psql -U coolify -d coolify -c \
  "UPDATE services SET config_hash = md5(random()::text), updated_at = NOW() WHERE id = <service_id>;"
```

Done when: `SELECT config_hash FROM services WHERE id = <service_id>;` returns a new value.

## Trigger the deploy

```bash
curl -s -X POST "http://<coolify-host>:8000/api/v1/deploy?uuid=<resource_uuid>&type=service" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

Use `type=application` with the application UUID for standalone apps. Confirm the API is enabled (`is_api_enabled` in `instance_settings`) before calling.
Done when: the API returns success and the Coolify dashboard shows a running deployment, or `docker ps` shows the container recreating.

## Timing rules

- Finish any in-flight deployment before triggering another — Coolify snapshots the compose when a deployment queues, so edits made between queue and execution may be ignored.
- Treat environment-variable changes as recreate operations: variables are baked at container creation, so trigger a full redeploy rather than a plain container restart.
- Verify after deploy: `docker logs --tail 50 <container>` shows a clean start and `docker inspect <container> --format '{{.State.Health.Status}}'` reports the expected health state.
  Done when: the redeployed container reaches the expected running or healthy state.

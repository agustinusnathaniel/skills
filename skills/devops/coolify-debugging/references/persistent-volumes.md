# Adding a Persistent Volume

Persist a directory across redeploys of a Compose-based Coolify service. Both the volume-tracking table and the stored Compose template need updating — either one alone leaves the volume unmounted. Resolve IDs first via [coolify-db-api.md](coolify-db-api.md).

## Step 1: Register the volume

```bash
docker exec coolify-db psql -U coolify -d coolify -c "
INSERT INTO local_persistent_volumes
(name, mount_path, host_path, resource_type, resource_id, created_at, updated_at, is_preview_suffix_enabled, uuid)
VALUES
('<resource_uuid>_<volume_name>', '/container/path', NULL, 'App\\Models\\ServiceApplication', <app_id>, NOW(), NOW(), false, '<new_uuid>');
"
```

Use `resource_type = 'App\Models\Application'` with the `applications` row ID for standalone apps. Generate `<new_uuid>` with `uuidgen` or `python3 -c 'import uuid; print(uuid.uuid4())'`.
Done when: `SELECT * FROM local_persistent_volumes WHERE resource_id = <app_id>;` returns the new row.

## Step 2: Update the stored Compose template

Edit the `services.docker_compose` field with a `PL/pgSQL` block that adds the mount to the service's `volumes` list and declares the top-level volume. Write the SQL to a file and pipe it via stdin to avoid shell-quoting breakage:

```sql
DO $$
DECLARE
    orig TEXT;
    updated TEXT;
BEGIN
    SELECT docker_compose INTO orig FROM services WHERE id = <service_id>;

    updated := REPLACE(
        orig,
        E'      - ''<existing_volume_mount>''',
        E'      - ''<existing_volume_mount>''\n      - ''<resource_uuid>_<volume_name>:/container/path'''
    );

    updated := REPLACE(
        updated,
        E'  <existing_volume_declaration>',
        E'  <existing_volume_declaration>\n  <resource_uuid>_<volume_name>:\n    name: <resource_uuid>_<volume_name>'
    );

    UPDATE services SET docker_compose = updated, config_hash = md5(random()::text), updated_at = NOW() WHERE id = <service_id>;
END $$;
```

```bash
cat /path/to/update.sql | docker exec -i coolify-db psql -U coolify -d coolify
```

Done when: `SELECT docker_compose FROM services WHERE id = <service_id>;` contains both the new mount line and the new top-level volume declaration.

## Step 3: Deploy

Trigger a fresh deployment as described in [deployments.md](deployments.md) — the stored compose is a template, so the volume mounts only on the next deploy.
Done when: `docker inspect <container> --format '{{json .Mounts}}'` shows the new mount after redeploy.

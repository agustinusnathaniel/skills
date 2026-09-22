# Container Diagnostics

Diagnose a Coolify-managed container that is unhealthy, stuck restarting, slow to start, or consuming unexpected resources.

## Slow-start patterns

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Container restarts several times then stabilizes | Init script step fails once (e.g. UID setup conflict) and succeeds on retry | Confirm stabilization in `docker logs`; fix the init step only if restarts persist |
| Multi-minute startup on every deploy | Dependencies reinstall on each deploy | Persist the dependency/cache directory as a volume ([persistent-volumes.md](persistent-volumes.md)) |
| `health: starting` for 90+ seconds | Healthcheck retry window (start period + interval × retries) elapsing | Read the healthcheck config; fix the underlying startup blocker rather than only lengthening the window |

Typical deploy-with-install timeline: init script 30–90s, server start plus first health check 5–15s, healthcheck retry window 10–100s depending on config.
Done when: measured startup time is attributed to one of the rows above.

## Resource diagnosis

Start from container-local numbers — host-wide tools mislead inside containers:

- **Limits vs usage**: read the cgroup directly — `docker exec <container> cat /sys/fs/cgroup/memory.max` for the byte limit and `memory.current` for usage; CPU quota lives in `cpu.max` (e.g. `400000 100000` means 4 cores). `free -m` reports host-wide memory, never the container's share.
  Done when: usage is expressed as a fraction of the container's own limit.
- **Load**: `/proc/loadavg` inside a container is host-wide — pair it with container-local signals: `cpu.pressure` (avg10/avg60) and `cpu.stat` (`nr_throttled`, `throttled_usec`).
  Done when: pressure metrics confirm or rule out CPU throttling.
- **Process audit**: `docker exec <container> ps -eo pid,ppid,rss,etime,comm --sort=-rss | head` ranks consumers; PPID-1 processes are orphan candidates; `docker exec <container> ss -tlnp` lists listeners; count zombies with `ps -eo stat | grep -c Z`.
  Done when: the top memory/CPU consumers are named with PIDs.
- **Sibling baseline**: compare against a container running the same image — `docker stats --no-stream <a> <b>`, then `docker inspect <name> --format '{{.HostConfig.Memory}} {{.HostConfig.NanoCpus}}'` plus per-container `ps` rankings. Same image with different features enabled legitimately differs by hundreds of MB.
  Done when: the gap is attributed to workload difference or flagged as a genuine anomaly.

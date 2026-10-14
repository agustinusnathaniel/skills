# Filament tenancy

Read this when building Laravel admin panels with Filament, multi-tenancy, and
role-based permissions (Spatie Permission, often through Filament Shield).

## Scope every model

- Every tenant-owned model needs the tenant foreign key, a `tenant()`
  relationship, and the tenant scope. One model without the relationship
  breaks tenant scoping for every resource that touches it. Audit all models
  when enabling tenancy, not only the ones in the current change.
- Make uniqueness tenant-scoped with composite unique indexes, such as
  `(tenant_id, email)`.
- When each user belongs to exactly one tenant, a `tenant_id` column on the
  user with a global scope is simpler than Filament's switchable many-to-many
  tenancy. Choose before building resources.

## Keep permission context aligned

- Set the permission team to the current tenant on every tenant request
  (Shield's tenant-sync middleware, or `setPermissionsTeamId`), and pass the
  panel's guard when checking permissions. A missing team or guard checks the
  wrong role set without failing.
- After assigning or revoking roles in the same request or test, clear the
  user's cached `roles` and `permissions` relations before checking again.
- Enforce authorization in policies; resource visibility only hides UI.

## Version-specific traps

- Row-level selectability goes through `checkIfRecordIsSelectableUsing()`.
  A `selectable()` closure is evaluated for the whole table, so a `$record`
  parameter does not resolve.
- Major versions move namespaces (for example actions consolidated under
  `Filament\Actions`). Check the upgrade guide before copying examples.

## Test isolation

- Prove isolation with two tenants: a user of one requests another tenant's
  record by direct URL and receives a denial with no data.
- Test writes through the service layer or `Livewire::test()`. Filament forms
  are Livewire components, not plain POST endpoints.
- `DatabaseTransactions` keeps tenancy-heavy suites fast compared with
  rebuilding the schema per test.

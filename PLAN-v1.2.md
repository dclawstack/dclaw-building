# Building Management — v1.2 Feature Roadmap

> **For coding agents:** Pick features from this list, implement them fully, and update this doc with a checkmark.
> **Do NOT change the basic stack.** See `AGENTS.md` for architecture lock.

## Pre-Flight Checklist — Do This First

Before implementing any v1.2 feature, verify:

- [x] `frontend/package-lock.json` is committed after any `npm install` / dependency change
- [x] `frontend/next-env.d.ts` exists and is committed (required for Next.js TypeScript builds)
- [x] `frontend/.gitignore` excludes `node_modules/` and `.next/`
- [x] `docker-compose.yml` healthchecks use `python urllib.request.urlopen()` (backend) and `wget -q --spider` (frontend)
- [x] `frontend/Dockerfile` declares `ARG NEXT_PUBLIC_API_URL` before `RUN npm run build`

## v1.0 Feature Inventory (Current)

- [x] Core entity CRUD: Buildings, MaintenanceRequests, BuildingSystems, Tenants
- [x] Dashboard / main page
- [x] Real backend CRUD (no mocks)
- [x] Docker + Helm deployment
- [x] Alembic migrations
- [x] Backend tests (25 tests across 6 test files)

---

## v1.2 Roadmap

### P0 — Must Have

#### 1. ✅ Building Dashboard
**Description:** Real-time overview of all buildings with health metrics.
- **Backend:** Dashboard aggregator endpoint (`GET /api/v1/dashboard`) returning total buildings, average occupancy, average tenant satisfaction, total open maintenance, needs-attention count, recent buildings.
- **Frontend:** Dashboard page with summary stat cards (buildings, occupancy, satisfaction, open maintenance), alert banner for critical items, recent buildings list, quick-action buttons (add building, log maintenance).
- **Files:** `backend/app/api/v1/dashboard.py`, `backend/app/services/dashboard.py`, `frontend/src/app/page.tsx`, `frontend/app/page.tsx`

#### 2. ✅ Building Health Monitoring API
**Description:** Track and update health metrics per building (occupancy_rate, hvac_efficiency, tenant_satisfaction, maintenance_backlog_count). Replaced all mock data with real DB-backed CRUD.
- **Backend:** Building model with health fields + full CRUD endpoints.
- **Frontend:** Building list page with metrics table, building detail page with health cards + edit dialog, new building form with health metrics fields.
- **Files:** `backend/app/models/building.py`, `backend/app/schemas/building.py`, `backend/app/repositories/building.py`, `backend/app/api/v1/buildings.py`, `frontend/src/app/buildings/page.tsx`, `frontend/src/app/buildings/[id]/page.tsx`, `frontend/src/app/buildings/new/page.tsx`

#### 3. ✅ Maintenance Request Management
**Description:** Full lifecycle management of maintenance tickets.
- **Backend:** MaintenanceRequest model (building_id, title, description, priority [low/medium/high/critical], status [open/in_progress/resolved/closed], assigned_to, created_at, resolved_at). CRUD endpoints with filtering by building, status.
- **Frontend:** Maintenance list page with status/priority badges + filter bar, create form with building selector, delete confirmation dialog.
- **Files:** `backend/app/models/maintenance.py`, `backend/app/schemas/maintenance.py`, `backend/app/repositories/maintenance.py`, `backend/app/api/v1/maintenance.py`, `frontend/src/app/maintenance/page.tsx`, `frontend/src/app/maintenance/new/page.tsx`

### P1 — Should Have

#### 4. ✅ Building Systems Monitoring
**Description:** Per-building tracking of critical systems (HVAC, elevators, fire safety, lighting, plumbing, electrical, security) with operational status.
- **Backend:** BuildingSystem model (building_id, system_name, system_type, status, last_inspected, notes). CRUD endpoints with filtering by building.
- **Frontend:** Systems tab within building detail showing status cards with color-coded badges, add system dialog.
- **Files:** `backend/app/models/system.py`, `backend/app/schemas/system.py`, `backend/app/repositories/system.py`, `backend/app/api/v1/systems.py`, `frontend/src/app/buildings/[id]/page.tsx` (systems tab)

#### 5. ✅ Tenant Management
**Description:** Track tenants per building with lease details and contact info.
- **Backend:** Tenant model (building_id, name, contact_email, phone, unit_number, lease_start, lease_end). CRUD endpoints with filtering by building.
- **Frontend:** Tenants tab within building detail showing tenant table with lease dates, add tenant dialog.
- **Files:** `backend/app/models/tenant.py`, `backend/app/schemas/tenant.py`, `backend/app/repositories/tenant.py`, `backend/app/api/v1/tenants.py`, `frontend/src/app/buildings/[id]/page.tsx` (tenants tab)

### P2 — Could Have

#### 6. Analytics & Trends Dashboard
**Description:** Historical trends for occupancy, satisfaction, and maintenance volume.
- **Backend:** Aggregation endpoints for metrics over time (`GET /api/v1/analytics/occupancy-trends`, etc.)
- **Frontend:** Charts showing occupancy trends, satisfaction scores over time, maintenance resolution times. Use summary cards and simple bar/line representations.

#### 7. Activity Log / Audit Trail
**Description:** Timestamped log of all changes to buildings, health metrics, maintenance requests.
- **Backend:** ActivityLog model (entity_type, entity_id, action, changes, timestamp). Auto-created on CUD operations via service layer.
- **Frontend:** Activity feed on dashboard and per-building detail, filterable by action type and date range.

---

## Implementation Priority

1. ✅ Building CRUD + Dashboard (foundation)
2. ✅ Building Health Monitoring (core domain)
3. ✅ Maintenance Request Management (P0)
4. ✅ Building Systems Monitoring (P1)
5. ✅ Tenant Management (P1)
6. [ ] Analytics Dashboard (P2)
7. [ ] Activity Log (P2)

## Summary

### Completed in this iteration:
- **Backend:** 4 models (Building, MaintenanceRequest, BuildingSystem, Tenant), 4 repositories, 4 CRUD routers + 1 dashboard router, service layer, all wired in `app/api/main.py`
- **Alembic Migration:** `002_building_management.py` — creates all v1.2 tables
- **Tests:** 25 tests across 6 files covering buildings, maintenance, systems, tenants, dashboard, and health
- **Frontend:** Dashboard, Building list/detail/new, Maintenance list/new, Systems management (tab), Tenant management (tab)
- **Old code cleanup:** `app/models.py`, `app/routers.py`, `app/config.py`, `app/dependencies.py` rewritten to re-export proper architecture
- **Infra:** Helm values updated to correct ports (8143/3057), docker-compose healthchecks verified
- **`npm run build` passes** — all 6 routes compile successfully

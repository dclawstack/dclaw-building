# DClaw Building

Building management SaaS — monitor buildings, tenants, systems, and maintenance requests.

## Ports

| Service | Port |
|---------|------|
| Backend (FastAPI) | 8143 |
| Frontend (Next.js) | 3057 |
| Database (Postgres) | 5434 |

## Local Dev

### Prerequisites
- Docker running
- Python venv at `backend/.venv`
- Node modules at `frontend/node_modules`

### Start Database
```bash
docker start dclaw-building-db
# First time:
# docker run -d --name dclaw-building-db -e POSTGRES_USER=learn -e POSTGRES_PASSWORD=learn -e POSTGRES_DB=dclaw_building -p 5434:5432 postgres:15
```

### Run Migrations
```bash
cd backend
source .venv/bin/activate
alembic upgrade head
```

### Start Backend
```bash
cd backend
source .venv/bin/activate
uvicorn app.api.main:app --reload --port 8143
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Seed Demo Data
```bash
curl -X POST http://localhost:8143/api/v1/building/demo/seed
# Or use the SeedWidget on the landing page at http://localhost:3057
# The SeedWidget shows a success/clear toast and the "Clear Data" button
# is always visible (disabled when no demo data is seeded).
```

## E2E Tests
Requires backend running on port 8143 and Docker DB on 5434.
```bash
cd frontend
npx playwright test
```

## Frontend Pages

| Path | Description |
|------|-------------|
| `/` | Landing page — hero, feature grid, SeedWidget |
| `/dashboard` | Portfolio dashboard — aggregate stats, recent buildings |
| `/buildings` | Building list with CRUD |
| `/buildings/new` | Create a new building |
| `/buildings/[id]` | Building detail — tenants, systems, maintenance |
| `/maintenance` | All maintenance requests |
| `/maintenance/new` | Create maintenance request (with status field) |

## Backend Entry Point
`backend/app/api/main.py` — routers mounted at `/api/v1/<resource>/`

## Key Routes
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/v1/buildings/` | List buildings |
| GET | `/api/v1/buildings/{id}` | Get building |
| POST | `/api/v1/buildings/` | Create building |
| PUT | `/api/v1/buildings/{id}` | Update building |
| DELETE | `/api/v1/buildings/{id}` | Delete building |
| GET | `/api/v1/tenants/` | List tenants |
| GET | `/api/v1/systems/` | List systems |
| GET | `/api/v1/maintenance/` | List maintenance requests |
| POST | `/api/v1/maintenance/` | Create maintenance request |
| PUT | `/api/v1/maintenance/{id}` | Update maintenance request |
| DELETE | `/api/v1/maintenance/{id}` | Delete maintenance request |
| GET | `/api/v1/dashboard/` | Dashboard aggregate stats |
| POST | `/api/v1/building/demo/seed` | Seed demo data |
| DELETE | `/api/v1/building/demo/clear` | Clear demo data |
| GET | `/api/v1/building/demo/status` | Demo data status |

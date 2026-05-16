# Graph Report - .  (2026-05-16)

## Corpus Check
- Corpus is ~24,214 words - fits in a single context window. You may not need a graph.

## Summary
- 461 nodes · 682 edges · 63 communities (46 shown, 17 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Frontend UI Components|Frontend UI Components]]
- [[_COMMUNITY_Frontend API Client|Frontend API Client]]
- [[_COMMUNITY_Product Documentation|Product Documentation]]
- [[_COMMUNITY_AI Agent Prompts|AI Agent Prompts]]
- [[_COMMUNITY_Backend API & Services|Backend API & Services]]
- [[_COMMUNITY_Frontend Dependencies|Frontend Dependencies]]
- [[_COMMUNITY_Backend Pydantic Schemas|Backend Pydantic Schemas]]
- [[_COMMUNITY_Building & Tenant API|Building & Tenant API]]
- [[_COMMUNITY_SQLAlchemy ORM Models|SQLAlchemy ORM Models]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Infrastructure & DevOps|Infrastructure & DevOps]]
- [[_COMMUNITY_Building Systems API|Building Systems API]]
- [[_COMMUNITY_Building CRUD Tests|Building CRUD Tests]]
- [[_COMMUNITY_Maintenance Tests|Maintenance Tests]]
- [[_COMMUNITY_Tenant Tests|Tenant Tests]]
- [[_COMMUNITY_Database Migrations|Database Migrations]]
- [[_COMMUNITY_App Startup & DB Init|App Startup & DB Init]]
- [[_COMMUNITY_API Health Tests|API Health Tests]]
- [[_COMMUNITY_Building Systems Tests|Building Systems Tests]]
- [[_COMMUNITY_App Configuration|App Configuration]]
- [[_COMMUNITY_Docs Metadata|Docs Metadata]]
- [[_COMMUNITY_App Layout|App Layout]]
- [[_COMMUNITY_Initial CRM Migration|Initial CRM Migration]]
- [[_COMMUNITY_Building Mgmt Migration|Building Mgmt Migration]]
- [[_COMMUNITY_Dashboard Tests|Dashboard Tests]]
- [[_COMMUNITY_Core Utilities|Core Utilities]]
- [[_COMMUNITY_Helm DClaw Chart|Helm DClaw Chart]]
- [[_COMMUNITY_Helm K8s Templates|Helm K8s Templates]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]
- [[_COMMUNITY_Services Init|Services Init]]
- [[_COMMUNITY_Claude Code Review Workflow|Claude Code Review Workflow]]
- [[_COMMUNITY_Claude Code Workflow|Claude Code Workflow]]

## God Nodes (most connected - your core abstractions)
1. `fetchJson()` - 23 edges
2. `compilerOptions` - 15 edges
3. `BaseRepository` - 13 edges
4. `Select` - 13 edges
5. `cn()` - 13 edges
6. `BuildingRepository` - 12 edges
7. `dependencies` - 12 edges
8. `MaintenanceRequestRepository` - 11 edges
9. `TenantRepository` - 10 edges
10. `BuildingSystemRepository` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Activity Log / Audit Trail (P2)` --semantically_similar_to--> `Activity Entity`  [INFERRED] [semantically similar]
  PLAN-v1.2.md → PRODUCT-SPEC.md
- `DB Naming Convention (dclaw-<app>-db-rw ExternalName)` --semantically_similar_to--> `App Port Registry`  [INFERRED] [semantically similar]
  PATCH-2026-05-15-shared-hub-postgres.md → SCALING-PLAYBOOK.md
- `Docker Compose Service Stack` --semantically_similar_to--> `Helm Chart (dclaw-building)`  [INFERRED] [semantically similar]
  docker-compose.yml → helm/Chart.yaml
- `Helm ConfigMap Template` --shares_data_with--> `FastAPI Backend Component`  [INFERRED]
  helm/dclaw-building/templates/configmap.yaml → docs/reference/architecture.md
- `cn()` --calls--> `clsx`  [INFERRED]
  frontend/lib/utils.ts → frontend/package.json

## Hyperedges (group relationships)
- **Parallel Agent Build Pipeline: Backend + Frontend + DevOps Agents** — dclaw_building_agent_prompts_backend, dclaw_building_agent_prompts_frontend, dclaw_building_agent_prompts_devops [EXTRACTED 1.00]
- **Docker Compose Full Service Stack: Postgres + Backend + Frontend** — dclaw_building_docker_compose_postgres, dclaw_building_docker_compose_backend, dclaw_building_docker_compose_frontend [EXTRACTED 1.00]
- **Building Management Domain Entities: Building + MaintenanceRequest + BuildingSystem + Tenant** — dclaw_building_plan_v12_building_entity, dclaw_building_plan_v12_maintenance_entity, dclaw_building_plan_v12_building_system_entity, dclaw_building_plan_v12_tenant_entity [EXTRACTED 1.00]
- **Helm Kubernetes Resource Templates: ConfigMap, Service, Ingress, HPA** — templates_configmap_configmap, templates_service_service, templates_ingress_ingress, templates_hpa_horizontalpodautoscaler [EXTRACTED 1.00]
- **Three-Tier App Architecture: Next.js Frontend to FastAPI Backend to PostgreSQL** — reference_architecture_nextjs_frontend, reference_architecture_fastapi_backend, reference_architecture_postgresql_database [EXTRACTED 1.00]
- **DClaw Platform Deployment: DPanel to DClawApp CRD to DClaw Operator** — getting_started_installation_dpanel, getting_started_installation_dclawapp_crd, reference_architecture_dclaw_operator [INFERRED 0.85]

## Communities (63 total, 17 thin omitted)

### Community 0 - "Frontend UI Components"
Cohesion: 0.11
Nodes (31): DashboardPage(), DashboardData, cn(), Avatar, AvatarFallback, AvatarImage, Badge(), BadgeProps (+23 more)

### Community 1 - "Frontend API Client"
Cohesion: 0.09
Nodes (41): ApiError, Building, BuildingCreate, BuildingSystem, BuildingUpdate, createBuilding(), createMaintenance(), createSystem() (+33 more)

### Community 2 - "Product Documentation"
Cohesion: 0.08
Nodes (39): DClaw Building Documentation Root, DClaw Platform, DATABASE_URL Config Variable, Environment Variable Configuration, NEXT_PUBLIC_API_URL Config Variable, REDIS_URL Config Variable, Getting Started Guide Index, CloudNativePG PostgreSQL Operator (+31 more)

### Community 3 - "AI Agent Prompts"
Cohesion: 0.09
Nodes (34): Agent Prompt Templates (AGENT-PROMPTS.md), Backend Architect Agent Prompt, DevOps Engineer Agent Prompt, Frontend Builder Agent Prompt, QA / Code Review Agent Prompt, Architecture Lock (FastAPI+SQLAlchemy2+Next.js), Directory Structure Convention, Agent Development Guide (AGENTS.md) (+26 more)

### Community 4 - "Backend API & Services"
Cohesion: 0.08
Nodes (16): BaseRepository, Generic async CRUD repository.      Subclass per entity:         class UserRepos, MaintenanceRequestRepository, Maintenance request repository., get_dashboard_metrics(), Dashboard service layer., Aggregate dashboard metrics across all buildings., Select (+8 more)

### Community 5 - "Frontend Dependencies"
Cohesion: 0.08
Nodes (25): dependencies, autoprefixer, class-variance-authority, clsx, lucide-react, next, postcss, react (+17 more)

### Community 6 - "Backend Pydantic Schemas"
Cohesion: 0.13
Nodes (19): BaseModel, BuildingBase, BuildingCreate, BuildingResponse, BuildingUpdate, MaintenanceRequestBase, MaintenanceRequestCreate, MaintenanceRequestResponse (+11 more)

### Community 7 - "Building & Tenant API"
Cohesion: 0.14
Nodes (13): BuildingRepository, TenantRepository, create_building(), delete_building(), get_building(), list_buildings(), Buildings API router., update_building() (+5 more)

### Community 8 - "SQLAlchemy ORM Models"
Cohesion: 0.12
Nodes (10): Base, DeclarativeBase, Base, Base class for all SQLAlchemy models.      ALL models MUST inherit from this cla, Building, MaintenanceRequest, Maintenance request model., BuildingSystem (+2 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Infrastructure & DevOps"
Cohesion: 0.18
Nodes (13): Backend Python Requirements (FastAPI, SQLAlchemy 2.0, pytest-asyncio==0.24.0), Pre-Built UI Components (no shadcn CLI), Docker Compose Service Stack, Backend Service (FastAPI port 8143), Frontend Service (Next.js port 3057), Postgres Service (dclaw_building), pytest-asyncio==0.24.0 Pinning Rationale, Onboarding Lessons (shadcn v4, pytest-asyncio pinning, CI deletion) (+5 more)

### Community 11 - "Building Systems API"
Cohesion: 0.25
Nodes (8): BuildingSystemRepository, Building system repository., create_system(), delete_system(), get_system(), list_systems(), Building systems API router., update_system()

### Community 19 - "App Configuration"
Cohesion: 0.5
Nodes (4): BaseSettings, Config, get_settings(), Settings

### Community 20 - "Docs Metadata"
Cohesion: 0.4
Nodes (4): app_id, nav, title, version

### Community 21 - "App Layout"
Cohesion: 0.6
Nodes (3): inter, metadata, RootLayout()

### Community 28 - "Helm DClaw Chart"
Cohesion: 0.67
Nodes (3): Helm dclaw-building Sub-Chart, Helm dclaw-building Deployment Template, Helm dclaw-building Values (ClusterIP port 80)

### Community 29 - "Helm K8s Templates"
Cohesion: 0.67
Nodes (3): Helm HorizontalPodAutoscaler Template, Helm Ingress Template, Helm Service Template

## Knowledge Gaps
- **104 isolated node(s):** `Tests for maintenance requests API.`, `Tests for building systems API.`, `Tests for dashboard API.`, `Smoke tests for the API.`, `Tests for buildings API.` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Select` connect `Backend API & Services` to `Frontend UI Components`, `Frontend API Client`, `Building & Tenant API`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `cn()` connect `Frontend UI Components` to `Frontend API Client`, `Frontend Dependencies`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `BaseRepository` (e.g. with `TenantRepository` and `BuildingRepository`) actually correct?**
  _`BaseRepository` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 9 inferred relationships involving `Select` (e.g. with `.list_by_building()` and `.list_all()`) actually correct?**
  _`Select` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Tests for maintenance requests API.`, `Tests for building systems API.`, `Tests for dashboard API.` to the rest of the system?**
  _104 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Frontend API Client` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
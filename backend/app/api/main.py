from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db
from app.api.routes import health


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/health", tags=["health"])

from app.api.v1 import buildings_router, maintenance_router, systems_router, tenants_router, dashboard_router, demo_router
app.include_router(buildings_router, prefix="/api/v1/buildings", tags=["buildings"])
app.include_router(maintenance_router, prefix="/api/v1/maintenance", tags=["maintenance"])
app.include_router(systems_router, prefix="/api/v1/systems", tags=["systems"])
app.include_router(tenants_router, prefix="/api/v1/tenants", tags=["tenants"])
app.include_router(dashboard_router, prefix="/api/v1/dashboard", tags=["dashboard"])
app.include_router(demo_router, prefix="/api/v1/building", tags=["demo"])

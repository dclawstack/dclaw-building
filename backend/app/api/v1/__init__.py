from app.api.v1.buildings import router as buildings_router
from app.api.v1.maintenance import router as maintenance_router
from app.api.v1.systems import router as systems_router
from app.api.v1.tenants import router as tenants_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.demo import router as demo_router
from app.api.v1.seed import router as seed_router

__all__ = [
    "buildings_router",
    "maintenance_router",
    "systems_router",
    "tenants_router",
    "dashboard_router",
    "demo_router",
    "seed_router",
]

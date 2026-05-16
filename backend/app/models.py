# Re-exports from app.models package for backward compatibility
from app.models.building import Building
from app.models.maintenance import MaintenanceRequest
from app.models.system import BuildingSystem
from app.models.tenant import Tenant

__all__ = ["Building", "MaintenanceRequest", "BuildingSystem", "Tenant"]

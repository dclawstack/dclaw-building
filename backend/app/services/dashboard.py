"""Dashboard service layer."""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.building import Building
from app.models.maintenance import MaintenanceRequest
from app.models.system import BuildingSystem


async def get_dashboard_metrics(db: AsyncSession) -> dict:
    """Aggregate dashboard metrics across all buildings."""
    total_buildings_result = await db.execute(select(func.count()).select_from(Building))
    total_buildings = total_buildings_result.scalar() or 0

    avg_occ_result = await db.execute(
        select(func.avg(Building.occupancy_rate))
        .where(Building.occupancy_rate.isnot(None))
    )
    avg_occupancy = round(avg_occ_result.scalar() or 0, 1)

    avg_sat_result = await db.execute(
        select(func.avg(Building.tenant_satisfaction))
        .where(Building.tenant_satisfaction.isnot(None))
    )
    avg_satisfaction = round(avg_sat_result.scalar() or 0, 1)

    open_maint_result = await db.execute(
        select(func.count()).select_from(MaintenanceRequest)
        .where(MaintenanceRequest.status.in_(["open", "in_progress"]))
    )
    open_maintenance = open_maint_result.scalar() or 0

    critical_result = await db.execute(
        select(func.count()).select_from(MaintenanceRequest)
        .where(MaintenanceRequest.priority.in_(["high", "critical"]))
        .where(MaintenanceRequest.status.in_(["open", "in_progress"]))
    )
    needs_attention = critical_result.scalar() or 0

    # System status summary
    systems_result = await db.execute(select(BuildingSystem))
    systems = systems_result.scalars().all()
    systems_operational = sum(1 for s in systems if s.status == "operational")
    systems_needs_service = sum(1 for s in systems if s.status == "needs_service")
    systems_offline = sum(1 for s in systems if s.status == "offline")

    return {
        "total_buildings": total_buildings,
        "avg_occupancy": avg_occupancy,
        "avg_satisfaction": avg_satisfaction,
        "open_maintenance": open_maintenance,
        "needs_attention": needs_attention,
        "systems_summary": {
            "operational": systems_operational,
            "needs_service": systems_needs_service,
            "offline": systems_offline,
        },
    }

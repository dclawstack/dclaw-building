"""Dashboard API router."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.models.building import Building
from app.models.maintenance import MaintenanceRequest

router = APIRouter()


@router.get("/")
async def get_dashboard(db: AsyncSession = Depends(get_db)):
    # Count buildings
    total_buildings_result = await db.execute(select(func.count()).select_from(Building))
    total_buildings = total_buildings_result.scalar() or 0

    # Average occupancy
    avg_occ_result = await db.execute(
        select(func.avg(Building.occupancy_rate))
        .where(Building.occupancy_rate.isnot(None))
    )
    avg_occupancy = round(avg_occ_result.scalar() or 0, 1)

    # Average tenant satisfaction
    avg_sat_result = await db.execute(
        select(func.avg(Building.tenant_satisfaction))
        .where(Building.tenant_satisfaction.isnot(None))
    )
    avg_satisfaction = round(avg_sat_result.scalar() or 0, 1)

    # Total maintenance backlog
    maint_count_result = await db.execute(
        select(func.count()).select_from(MaintenanceRequest)
        .where(MaintenanceRequest.status.in_(["open", "in_progress"]))
    )
    open_maintenance = maint_count_result.scalar() or 0

    # Buildings needing attention (high/critical maintenance)
    attention_result = await db.execute(
        select(func.count()).select_from(MaintenanceRequest)
        .where(MaintenanceRequest.priority.in_(["high", "critical"]))
        .where(MaintenanceRequest.status.in_(["open", "in_progress"]))
    )
    needs_attention = attention_result.scalar() or 0

    # Recent buildings
    recent_result = await db.execute(
        select(Building).order_by(Building.created_at.desc()).limit(5)
    )
    recent_buildings = []
    for b in recent_result.scalars().all():
        recent_buildings.append({
            "id": b.id,
            "name": b.name,
            "status": b.status,
            "occupancy_rate": b.occupancy_rate,
            "created_at": b.created_at.isoformat() if b.created_at else None,
        })

    return {
        "total_buildings": total_buildings,
        "avg_occupancy": avg_occupancy,
        "avg_satisfaction": avg_satisfaction,
        "open_maintenance": open_maintenance,
        "needs_attention": needs_attention,
        "recent_buildings": recent_buildings,
    }

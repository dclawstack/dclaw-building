"""Maintenance request repository."""

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.maintenance import MaintenanceRequest
from app.repositories.base_repo import BaseRepository


class MaintenanceRequestRepository(BaseRepository[MaintenanceRequest]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, MaintenanceRequest)

    async def list_by_building(self, building_id: str, limit: int = 20, offset: int = 0) -> tuple[list[MaintenanceRequest], int]:
        result = await self.db.execute(
            select(MaintenanceRequest)
            .where(MaintenanceRequest.building_id == building_id)
            .limit(limit).offset(offset)
        )
        items = list(result.scalars().all())
        count_result = await self.db.execute(
            select(func.count()).select_from(MaintenanceRequest)
            .where(MaintenanceRequest.building_id == building_id)
        )
        total = count_result.scalar() or 0
        return items, total

    async def list_by_status(self, status: str, limit: int = 20, offset: int = 0) -> tuple[list[MaintenanceRequest], int]:
        result = await self.db.execute(
            select(MaintenanceRequest)
            .where(MaintenanceRequest.status == status)
            .limit(limit).offset(offset)
        )
        items = list(result.scalars().all())
        count_result = await self.db.execute(
            select(func.count()).select_from(MaintenanceRequest)
            .where(MaintenanceRequest.status == status)
        )
        total = count_result.scalar() or 0
        return items, total

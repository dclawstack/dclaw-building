"""Building system repository."""

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.system import BuildingSystem
from app.repositories.base_repo import BaseRepository


class BuildingSystemRepository(BaseRepository[BuildingSystem]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, BuildingSystem)

    async def list_by_building(self, building_id: str, limit: int = 20, offset: int = 0) -> tuple[list[BuildingSystem], int]:
        result = await self.db.execute(
            select(BuildingSystem)
            .where(BuildingSystem.building_id == building_id)
            .limit(limit).offset(offset)
        )
        items = list(result.scalars().all())
        count_result = await self.db.execute(
            select(func.count()).select_from(BuildingSystem)
            .where(BuildingSystem.building_id == building_id)
        )
        total = count_result.scalar() or 0
        return items, total

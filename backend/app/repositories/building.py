"""Building repository."""

from sqlalchemy.ext.asyncio import AsyncSession
from app.models.building import Building
from app.repositories.base_repo import BaseRepository


class BuildingRepository(BaseRepository[Building]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Building)

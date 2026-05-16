"""Building systems API router."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.system import BuildingSystemCreate, BuildingSystemUpdate, BuildingSystemResponse
from app.repositories.system import BuildingSystemRepository

router = APIRouter()


@router.get("/", response_model=list[BuildingSystemResponse])
async def list_systems(
    building_id: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    repo = BuildingSystemRepository(db)
    if building_id:
        items, _ = await repo.list_by_building(building_id, limit=limit, offset=offset)
    else:
        items, _ = await repo.list_all(limit=limit, offset=offset)
    return items


@router.get("/{system_id}", response_model=BuildingSystemResponse)
async def get_system(system_id: str, db: AsyncSession = Depends(get_db)):
    repo = BuildingSystemRepository(db)
    item = await repo.get_by_id(system_id)
    if not item:
        raise HTTPException(status_code=404, detail="System not found")
    return item


@router.post("/", response_model=BuildingSystemResponse, status_code=201)
async def create_system(body: BuildingSystemCreate, db: AsyncSession = Depends(get_db)):
    from app.models.system import BuildingSystem
    from app.repositories.building import BuildingRepository
    building_repo = BuildingRepository(db)
    building = await building_repo.get_by_id(body.building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")

    repo = BuildingSystemRepository(db)
    item = BuildingSystem(**body.model_dump())
    return await repo.create(item)


@router.put("/{system_id}", response_model=BuildingSystemResponse)
async def update_system(system_id: str, body: BuildingSystemUpdate, db: AsyncSession = Depends(get_db)):
    repo = BuildingSystemRepository(db)
    item = await repo.get_by_id(system_id)
    if not item:
        raise HTTPException(status_code=404, detail="System not found")
    update_data = body.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(item, key, value)
    return await repo.create(item)


@router.delete("/{system_id}", status_code=204)
async def delete_system(system_id: str, db: AsyncSession = Depends(get_db)):
    repo = BuildingSystemRepository(db)
    item = await repo.get_by_id(system_id)
    if not item:
        raise HTTPException(status_code=404, detail="System not found")
    await repo.delete(item)

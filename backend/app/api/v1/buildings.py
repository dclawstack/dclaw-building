"""Buildings API router."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.building import BuildingCreate, BuildingUpdate, BuildingResponse
from app.repositories.building import BuildingRepository

router = APIRouter()


@router.get("", response_model=list[BuildingResponse])
async def list_buildings(
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    repo = BuildingRepository(db)
    items, _ = await repo.list_all(limit=limit, offset=offset)
    return items


@router.get("/{building_id}", response_model=BuildingResponse)
async def get_building(building_id: str, db: AsyncSession = Depends(get_db)):
    repo = BuildingRepository(db)
    building = await repo.get_by_id(building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    return building


@router.post("", response_model=BuildingResponse, status_code=201)
async def create_building(body: BuildingCreate, db: AsyncSession = Depends(get_db)):
    repo = BuildingRepository(db)
    from app.models.building import Building
    building = Building(**body.model_dump())
    return await repo.create(building)


@router.put("/{building_id}", response_model=BuildingResponse)
async def update_building(building_id: str, body: BuildingUpdate, db: AsyncSession = Depends(get_db)):
    repo = BuildingRepository(db)
    building = await repo.get_by_id(building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    update_data = body.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(building, key, value)
    return await repo.create(building)


@router.delete("/{building_id}", status_code=204)
async def delete_building(building_id: str, db: AsyncSession = Depends(get_db)):
    repo = BuildingRepository(db)
    building = await repo.get_by_id(building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    await repo.delete(building)

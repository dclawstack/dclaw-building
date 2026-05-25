"""Maintenance requests API router."""

from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.maintenance import (
    MaintenanceRequestCreate,
    MaintenanceRequestUpdate,
    MaintenanceRequestResponse,
)
from app.repositories.maintenance import MaintenanceRequestRepository

router = APIRouter()


@router.get("", response_model=list[MaintenanceRequestResponse])
async def list_maintenance(
    building_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    repo = MaintenanceRequestRepository(db)
    if building_id:
        items, _ = await repo.list_by_building(building_id, limit=limit, offset=offset)
    elif status:
        items, _ = await repo.list_by_status(status, limit=limit, offset=offset)
    else:
        items, _ = await repo.list_all(limit=limit, offset=offset)
    return items


@router.get("/{request_id}", response_model=MaintenanceRequestResponse)
async def get_maintenance(request_id: str, db: AsyncSession = Depends(get_db)):
    repo = MaintenanceRequestRepository(db)
    item = await repo.get_by_id(request_id)
    if not item:
        raise HTTPException(status_code=404, detail="Maintenance request not found")
    return item


@router.post("", response_model=MaintenanceRequestResponse, status_code=201)
async def create_maintenance(body: MaintenanceRequestCreate, db: AsyncSession = Depends(get_db)):
    from app.models.maintenance import MaintenanceRequest
    from app.repositories.building import BuildingRepository
    # Verify building exists
    building_repo = BuildingRepository(db)
    building = await building_repo.get_by_id(body.building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")

    repo = MaintenanceRequestRepository(db)
    item = MaintenanceRequest(**body.model_dump())
    return await repo.create(item)


@router.put("/{request_id}", response_model=MaintenanceRequestResponse)
async def update_maintenance(request_id: str, body: MaintenanceRequestUpdate, db: AsyncSession = Depends(get_db)):
    repo = MaintenanceRequestRepository(db)
    item = await repo.get_by_id(request_id)
    if not item:
        raise HTTPException(status_code=404, detail="Maintenance request not found")
    update_data = body.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(item, key, value)
    return await repo.create(item)


@router.delete("/{request_id}", status_code=204)
async def delete_maintenance(request_id: str, db: AsyncSession = Depends(get_db)):
    repo = MaintenanceRequestRepository(db)
    item = await repo.get_by_id(request_id)
    if not item:
        raise HTTPException(status_code=404, detail="Maintenance request not found")
    await repo.delete(item)

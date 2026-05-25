"""Tenants API router."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.tenant import TenantCreate, TenantUpdate, TenantResponse
from app.repositories.tenant import TenantRepository

router = APIRouter()


@router.get("", response_model=list[TenantResponse])
async def list_tenants(
    building_id: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    repo = TenantRepository(db)
    if building_id:
        items, _ = await repo.list_by_building(building_id, limit=limit, offset=offset)
    else:
        items, _ = await repo.list_all(limit=limit, offset=offset)
    return items


@router.get("/{tenant_id}", response_model=TenantResponse)
async def get_tenant(tenant_id: str, db: AsyncSession = Depends(get_db)):
    repo = TenantRepository(db)
    item = await repo.get_by_id(tenant_id)
    if not item:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return item


@router.post("", response_model=TenantResponse, status_code=201)
async def create_tenant(body: TenantCreate, db: AsyncSession = Depends(get_db)):
    from app.models.tenant import Tenant
    from app.repositories.building import BuildingRepository
    building_repo = BuildingRepository(db)
    building = await building_repo.get_by_id(body.building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")

    repo = TenantRepository(db)
    item = Tenant(**body.model_dump())
    return await repo.create(item)


@router.put("/{tenant_id}", response_model=TenantResponse)
async def update_tenant(tenant_id: str, body: TenantUpdate, db: AsyncSession = Depends(get_db)):
    repo = TenantRepository(db)
    item = await repo.get_by_id(tenant_id)
    if not item:
        raise HTTPException(status_code=404, detail="Tenant not found")
    update_data = body.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(item, key, value)
    return await repo.create(item)


@router.delete("/{tenant_id}", status_code=204)
async def delete_tenant(tenant_id: str, db: AsyncSession = Depends(get_db)):
    repo = TenantRepository(db)
    item = await repo.get_by_id(tenant_id)
    if not item:
        raise HTTPException(status_code=404, detail="Tenant not found")
    await repo.delete(item)

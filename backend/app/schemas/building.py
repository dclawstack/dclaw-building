"""Building schemas."""

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class BuildingBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    address: str = Field(..., min_length=1, max_length=500)
    building_type: str = Field(default="commercial")
    total_floors: int = Field(default=1, ge=1)
    year_built: int | None = None
    status: str = Field(default="active")
    notes: str | None = None
    occupancy_rate: float | None = Field(default=None, ge=0, le=100)
    hvac_efficiency: str | None = Field(default=None, max_length=50)
    tenant_satisfaction: float | None = Field(default=None, ge=0, le=100)
    maintenance_backlog_count: int = Field(default=0, ge=0)


class BuildingCreate(BuildingBase):
    pass


class BuildingUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    address: str | None = Field(default=None, min_length=1, max_length=500)
    building_type: str | None = None
    total_floors: int | None = Field(default=None, ge=1)
    year_built: int | None = None
    status: str | None = None
    notes: str | None = None
    occupancy_rate: float | None = Field(default=None, ge=0, le=100)
    hvac_efficiency: str | None = Field(default=None, max_length=50)
    tenant_satisfaction: float | None = Field(default=None, ge=0, le=100)
    maintenance_backlog_count: int | None = Field(default=None, ge=0)


class BuildingResponse(BuildingBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
    created_at: datetime
    updated_at: datetime

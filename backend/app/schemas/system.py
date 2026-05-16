"""Building system schemas."""

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class BuildingSystemBase(BaseModel):
    building_id: str
    system_name: str = Field(..., min_length=1, max_length=100)
    system_type: str = Field(default="other")
    status: str = Field(default="operational")
    last_inspected: datetime | None = None
    notes: str | None = None


class BuildingSystemCreate(BuildingSystemBase):
    pass


class BuildingSystemUpdate(BaseModel):
    building_id: str | None = None
    system_name: str | None = Field(default=None, min_length=1, max_length=100)
    system_type: str | None = None
    status: str | None = None
    last_inspected: datetime | None = None
    notes: str | None = None


class BuildingSystemResponse(BuildingSystemBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
    created_at: datetime
    updated_at: datetime

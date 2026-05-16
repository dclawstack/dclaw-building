"""Maintenance request schemas."""

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class MaintenanceRequestBase(BaseModel):
    building_id: str
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    priority: str = Field(default="medium")
    status: str = Field(default="open")
    assigned_to: str | None = Field(default=None, max_length=255)


class MaintenanceRequestCreate(MaintenanceRequestBase):
    pass


class MaintenanceRequestUpdate(BaseModel):
    building_id: str | None = None
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, min_length=1)
    priority: str | None = None
    status: str | None = None
    assigned_to: str | None = Field(default=None, max_length=255)
    resolved_at: datetime | None = None


class MaintenanceRequestResponse(MaintenanceRequestBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
    resolved_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

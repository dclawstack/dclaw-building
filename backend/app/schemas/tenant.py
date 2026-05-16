"""Tenant schemas."""

from datetime import datetime, date
from pydantic import BaseModel, ConfigDict, Field


class TenantBase(BaseModel):
    building_id: str
    name: str = Field(..., min_length=1, max_length=255)
    contact_email: str | None = Field(default=None, max_length=255)
    contact_phone: str | None = Field(default=None, max_length=50)
    unit_number: str | None = Field(default=None, max_length=50)
    lease_start: date | None = None
    lease_end: date | None = None
    notes: str | None = None


class TenantCreate(TenantBase):
    pass


class TenantUpdate(BaseModel):
    building_id: str | None = None
    name: str | None = Field(default=None, min_length=1, max_length=255)
    contact_email: str | None = Field(default=None, max_length=255)
    contact_phone: str | None = Field(default=None, max_length=50)
    unit_number: str | None = Field(default=None, max_length=50)
    lease_start: date | None = None
    lease_end: date | None = None
    notes: str | None = None


class TenantResponse(TenantBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
    created_at: datetime
    updated_at: datetime

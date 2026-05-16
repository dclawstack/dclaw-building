"""Building model."""

import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Enum, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class Building(Base):
    __tablename__ = "buildings"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str] = mapped_column(String(500), nullable=False)
    building_type: Mapped[str] = mapped_column(
        Enum("commercial", "residential", "industrial", "mixed_use", name="buildingtype"),
        nullable=False,
        default="commercial",
    )
    total_floors: Mapped[int] = mapped_column(nullable=False, default=1)
    year_built: Mapped[int | None] = mapped_column(nullable=True)
    status: Mapped[str] = mapped_column(
        Enum("active", "inactive", "under_maintenance", name="buildingstatus"),
        nullable=False,
        default="active",
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    occupancy_rate: Mapped[float | None] = mapped_column(nullable=True)
    hvac_efficiency: Mapped[str | None] = mapped_column(String(50), nullable=True)
    tenant_satisfaction: Mapped[float | None] = mapped_column(nullable=True)
    maintenance_backlog_count: Mapped[int] = mapped_column(nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
        onupdate=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
    )

    # Relationships
    maintenance_requests: Mapped[list["MaintenanceRequest"]] = relationship(
        "MaintenanceRequest", back_populates="building", lazy="selectin", cascade="all, delete-orphan"
    )
    systems: Mapped[list["BuildingSystem"]] = relationship(
        "BuildingSystem", back_populates="building", lazy="selectin", cascade="all, delete-orphan"
    )
    tenants: Mapped[list["Tenant"]] = relationship(
        "Tenant", back_populates="building", lazy="selectin", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Building {self.name}>"

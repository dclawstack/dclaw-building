"""Building system model."""

import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Enum, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


class BuildingSystem(Base):
    __tablename__ = "building_systems"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    building_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("buildings.id", ondelete="CASCADE"), nullable=False
    )
    system_name: Mapped[str] = mapped_column(String(100), nullable=False)
    system_type: Mapped[str] = mapped_column(
        Enum("hvac", "elevator", "fire_safety", "lighting", "plumbing", "electrical", "security", "other", name="systemtype"),
        nullable=False,
        default="other",
    )
    status: Mapped[str] = mapped_column(
        Enum("operational", "needs_service", "offline", name="systemstatus"),
        nullable=False,
        default="operational",
    )
    last_inspected: Mapped[datetime | None] = mapped_column(nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
        onupdate=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
    )

    # Relationships
    building: Mapped["Building"] = relationship("Building", back_populates="systems")

    def __repr__(self) -> str:
        return f"<BuildingSystem {self.system_name} [{self.status}]>"

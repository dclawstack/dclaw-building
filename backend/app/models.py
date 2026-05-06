from sqlalchemy import Column, String, Float, Integer, DateTime, func
from app.database import Base

class BuildingHealthDB(Base):
    __tablename__ = "building_healths"
    id = Column(String, primary_key=True)
    building_id = Column(String, nullable=False)
    occupancy_rate = Column(Float)
    hvac_efficiency = Column(String)
    maintenance_backlog_count = Column(Integer)
    tenant_satisfaction = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

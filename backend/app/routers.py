from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import uuid, random
from app.database import get_db

router = APIRouter()

class CreateHealthRequest(BaseModel):
    building_id: str

class BuildingHealth(BaseModel):
    id: str
    building_id: str
    occupancy_rate: float
    hvac_efficiency: str
    maintenance_backlog_count: int
    tenant_satisfaction: float
    created_at: datetime

    class Config:
        from_attributes = True

@router.post("/healths", response_model=BuildingHealth)
def create_health(req: CreateHealthRequest, db: Session = Depends(get_db)):
    return BuildingHealth(
        id=str(uuid.uuid4()),
        building_id=req.building_id,
        occupancy_rate=round(random.uniform(60, 95), 1),
        hvac_efficiency="B+",
        maintenance_backlog_count=random.randint(0, 15),
        tenant_satisfaction=round(random.uniform(3.5, 5.0), 1),
        created_at=datetime.utcnow(),
    )

@router.get("/healths/{id}/systems")
def get_systems(id: str, db: Session = Depends(get_db)):
    return [
        {"system_name": "HVAC", "status": random.choice(["Operational", "Needs Service", "Optimal"])},
        {"system_name": "Elevators", "status": random.choice(["Operational", "Needs Service"])},
        {"system_name": "Fire Safety", "status": random.choice(["Operational", "Optimal"])},
        {"system_name": "Lighting", "status": random.choice(["Operational", "Needs Service", "Optimal"])},
    ]

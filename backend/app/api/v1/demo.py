"""Demo seed/clear/status endpoints for dclaw-building."""

from datetime import date, datetime
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.core.database import get_db
from app.models.building import Building
from app.models.tenant import Tenant
from app.models.system import BuildingSystem
from app.models.maintenance import MaintenanceRequest

router = APIRouter()

B1 = "11111111-0000-0000-0000-000000000001"
B2 = "11111111-0000-0000-0000-000000000002"
B3 = "11111111-0000-0000-0000-000000000003"
DEMO_BUILDING_IDS = [B1, B2, B3]

_now = datetime(2024, 6, 1, 12, 0, 0)

DEMO_BUILDINGS = [
    dict(id=B1, name="Riverside Office Tower", address="1 Riverside Plaza, San Francisco, CA 94105",
         building_type="commercial", total_floors=12, year_built=1998, status="active",
         occupancy_rate=0.87, hvac_efficiency="82%", tenant_satisfaction=4.2, maintenance_backlog_count=3),
    dict(id=B2, name="Harborview Retail Plaza", address="250 Harbor Blvd, Oakland, CA 94607",
         building_type="commercial", total_floors=3, year_built=2005, status="active",
         occupancy_rate=0.72, hvac_efficiency="91%", tenant_satisfaction=3.8, maintenance_backlog_count=1),
    dict(id=B3, name="Maple Grove Residential", address="88 Maple Grove Dr, San Jose, CA 95112",
         building_type="residential", total_floors=8, year_built=2012, status="active",
         occupancy_rate=0.95, hvac_efficiency="78%", tenant_satisfaction=4.6, maintenance_backlog_count=0),
]

DEMO_TENANTS = [
    dict(id="22220000-0000-0000-0000-000000000001", building_id=B1, name="Apex Consulting LLC",
         unit_number="3A", contact_email="ops@apexconsulting.com", contact_phone="415-555-0101",
         lease_start=date(2022,1,1), lease_end=date(2025,12,31)),
    dict(id="22220000-0000-0000-0000-000000000002", building_id=B1, name="BlueSky Analytics",
         unit_number="7C", contact_email="admin@bluesky.io", contact_phone="415-555-0202",
         lease_start=date(2023,3,1), lease_end=date(2026,2,28)),
    dict(id="22220000-0000-0000-0000-000000000003", building_id=B2, name="Fresh Grounds Coffee",
         unit_number="G1", contact_email="hello@freshgrounds.com", contact_phone="510-555-0303",
         lease_start=date(2021,6,1), lease_end=date(2024,5,31)),
    dict(id="22220000-0000-0000-0000-000000000004", building_id=B2, name="Metro Pharmacy",
         unit_number="G2", contact_email="store@metrorx.com", contact_phone="510-555-0404",
         lease_start=date(2020,9,1), lease_end=date(2025,8,31)),
    dict(id="22220000-0000-0000-0000-000000000005", building_id=B3, name="Jordan Williams",
         unit_number="4B", contact_email="jordan@email.com", contact_phone="408-555-0505",
         lease_start=date(2023,1,1), lease_end=date(2024,12,31)),
    dict(id="22220000-0000-0000-0000-000000000006", building_id=B3, name="Sam Chen",
         unit_number="6D", contact_email="sam.chen@email.com", contact_phone="408-555-0606",
         lease_start=date(2022,7,1), lease_end=date(2025,6,30)),
]

DEMO_SYSTEMS = [
    dict(id="33330000-0000-0000-0000-000000000001", building_id=B1, system_name="Central HVAC",
         system_type="hvac", status="operational", last_inspected=_now),
    dict(id="33330000-0000-0000-0000-000000000002", building_id=B1, system_name="Passenger Elevator A",
         system_type="elevator", status="needs_service", last_inspected=_now),
    dict(id="33330000-0000-0000-0000-000000000003", building_id=B1, system_name="Fire Suppression System",
         system_type="fire_safety", status="operational", last_inspected=_now),
    dict(id="33330000-0000-0000-0000-000000000004", building_id=B2, system_name="Rooftop HVAC Unit",
         system_type="hvac", status="operational", last_inspected=_now),
    dict(id="33330000-0000-0000-0000-000000000005", building_id=B2, system_name="Fire Alarm System",
         system_type="fire_safety", status="operational", last_inspected=_now),
    dict(id="33330000-0000-0000-0000-000000000006", building_id=B3, system_name="Heat Pump HVAC",
         system_type="hvac", status="operational", last_inspected=_now),
    dict(id="33330000-0000-0000-0000-000000000007", building_id=B3, system_name="Elevator Bank",
         system_type="elevator", status="operational", last_inspected=_now),
    dict(id="33330000-0000-0000-0000-000000000008", building_id=B3, system_name="Sprinkler System",
         system_type="fire_safety", status="operational", last_inspected=_now),
]

DEMO_MAINTENANCE = [
    dict(id="44440000-0000-0000-0000-000000000001", building_id=B1,
         title="Elevator A annual inspection overdue",
         description="Passenger elevator A is past its annual inspection date. Needs scheduling.",
         priority="high", status="open", assigned_to=None),
    dict(id="44440000-0000-0000-0000-000000000002", building_id=B1,
         title="Lobby water fountain leaking",
         description="Water fountain near main lobby has a slow drip. Maintenance team notified.",
         priority="low", status="in_progress", assigned_to="Mike Torres"),
    dict(id="44440000-0000-0000-0000-000000000003", building_id=B2,
         title="Parking lot lighting outage",
         description="Six parking lot lights on the north side are not functioning.",
         priority="medium", status="in_progress", assigned_to="Electric Co."),
    dict(id="44440000-0000-0000-0000-000000000004", building_id=B2,
         title="Roof drain blockage",
         description="Roof drainage partially blocked causing slow drainage after rain.",
         priority="high", status="open", assigned_to=None),
    dict(id="44440000-0000-0000-0000-000000000005", building_id=B3,
         title="Unit 2C HVAC filter replacement",
         description="Routine filter replacement for unit 2C. Resident requested.",
         priority="low", status="open", assigned_to=None),
    dict(id="44440000-0000-0000-0000-000000000006", building_id=B3,
         title="Common area carpet deep clean",
         description="Lobby and hallway carpets need professional deep cleaning.",
         priority="medium", status="open", assigned_to=None),
]


@router.post("/demo/seed")
async def seed_demo(db: AsyncSession = Depends(get_db)):
    for b in DEMO_BUILDINGS:
        if not await db.get(Building, b["id"]):
            db.add(Building(**b))
    await db.flush()
    for t in DEMO_TENANTS:
        if not await db.get(Tenant, t["id"]):
            db.add(Tenant(**t))
    for s in DEMO_SYSTEMS:
        if not await db.get(BuildingSystem, s["id"]):
            db.add(BuildingSystem(**s))
    for m in DEMO_MAINTENANCE:
        if not await db.get(MaintenanceRequest, m["id"]):
            db.add(MaintenanceRequest(**m))
    await db.commit()
    return {"status": "seeded", "buildings": 3, "tenants": 6, "systems": 8, "maintenance_requests": 6}


@router.delete("/demo/clear")
async def clear_demo(db: AsyncSession = Depends(get_db)):
    await db.execute(delete(MaintenanceRequest).where(MaintenanceRequest.id.in_([m["id"] for m in DEMO_MAINTENANCE])))
    await db.execute(delete(BuildingSystem).where(BuildingSystem.id.in_([s["id"] for s in DEMO_SYSTEMS])))
    await db.execute(delete(Tenant).where(Tenant.id.in_([t["id"] for t in DEMO_TENANTS])))
    await db.execute(delete(Building).where(Building.id.in_(DEMO_BUILDING_IDS)))
    await db.commit()
    return {"status": "cleared"}


@router.get("/demo/status")
async def demo_status(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Building).where(Building.id.in_(DEMO_BUILDING_IDS)))
    count = len(result.scalars().all())
    return {"seeded": count > 0, "building_count": count}

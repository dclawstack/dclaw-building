"""
Seed / clear demo data for DClaw Building.

POST   /api/v1/seed  — wipe every table, then create a realistic portfolio of
                       buildings with tenants, systems, and maintenance requests
                       so the dashboard and all routes show full functionality.
DELETE /api/v1/seed  — wipe all data from every table (back to a fresh state).

This whole module is a self-contained demo utility. To remove the feature,
delete this file, the two lines that register it in app/api/main.py and
app/api/v1/__init__.py, and the SeedControls block on the frontend landing page.
"""

from datetime import date, datetime

from fastapi import APIRouter, Depends
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.building import Building
from app.models.tenant import Tenant
from app.models.system import BuildingSystem
from app.models.maintenance import MaintenanceRequest

router = APIRouter()

# Wiped on clear / re-seed, ordered child → parent so the wipe works even when
# ON DELETE CASCADE is not enforced.
_WIPE_ORDER = [MaintenanceRequest, BuildingSystem, Tenant, Building]

_INSPECTED = datetime(2024, 5, 1, 9, 0, 0)


def _building_defs():
    """Building blueprints. Each carries its own tenants, systems, and
    maintenance requests so the seed populates the whole domain."""
    return [
        dict(
            name="Riverside Office Tower",
            address="1 Riverside Plaza, San Francisco, CA 94105",
            building_type="commercial", total_floors=12, year_built=1998,
            status="active", occupancy_rate=0.87, hvac_efficiency="82%",
            tenant_satisfaction=4.2, maintenance_backlog_count=3,
            notes="Class-A downtown office tower with ground-floor retail.",
            tenants=[
                dict(name="Apex Consulting LLC", unit_number="3A",
                     contact_email="ops@apexconsulting.com", contact_phone="415-555-0101",
                     lease_start=date(2022, 1, 1), lease_end=date(2025, 12, 31)),
                dict(name="BlueSky Analytics", unit_number="7C",
                     contact_email="admin@bluesky.io", contact_phone="415-555-0202",
                     lease_start=date(2023, 3, 1), lease_end=date(2026, 2, 28)),
            ],
            systems=[
                dict(system_name="Central HVAC", system_type="hvac",
                     status="operational", last_inspected=_INSPECTED),
                dict(system_name="Passenger Elevator A", system_type="elevator",
                     status="needs_service", last_inspected=_INSPECTED),
                dict(system_name="Fire Suppression System", system_type="fire_safety",
                     status="operational", last_inspected=_INSPECTED),
            ],
            maintenance=[
                dict(title="Elevator A annual inspection overdue",
                     description="Passenger elevator A is past its annual inspection date. Needs scheduling.",
                     priority="high", status="open", assigned_to=None),
                dict(title="Lobby water fountain leaking",
                     description="Water fountain near main lobby has a slow drip. Maintenance team notified.",
                     priority="low", status="in_progress", assigned_to="Mike Torres"),
            ],
        ),
        dict(
            name="Harborview Retail Plaza",
            address="250 Harbor Blvd, Oakland, CA 94607",
            building_type="commercial", total_floors=3, year_built=2005,
            status="active", occupancy_rate=0.72, hvac_efficiency="91%",
            tenant_satisfaction=3.8, maintenance_backlog_count=1,
            notes="Open-air retail plaza near the waterfront.",
            tenants=[
                dict(name="Fresh Grounds Coffee", unit_number="G1",
                     contact_email="hello@freshgrounds.com", contact_phone="510-555-0303",
                     lease_start=date(2021, 6, 1), lease_end=date(2024, 5, 31)),
                dict(name="Metro Pharmacy", unit_number="G2",
                     contact_email="store@metrorx.com", contact_phone="510-555-0404",
                     lease_start=date(2020, 9, 1), lease_end=date(2025, 8, 31)),
            ],
            systems=[
                dict(system_name="Rooftop HVAC Unit", system_type="hvac",
                     status="operational", last_inspected=_INSPECTED),
                dict(system_name="Fire Alarm System", system_type="fire_safety",
                     status="operational", last_inspected=_INSPECTED),
                dict(system_name="Parking Lot Lighting", system_type="lighting",
                     status="needs_service", last_inspected=_INSPECTED),
            ],
            maintenance=[
                dict(title="Parking lot lighting outage",
                     description="Six parking lot lights on the north side are not functioning.",
                     priority="medium", status="in_progress", assigned_to="Electric Co."),
                dict(title="Roof drain blockage",
                     description="Roof drainage partially blocked causing slow drainage after rain.",
                     priority="high", status="open", assigned_to=None),
            ],
        ),
        dict(
            name="Maple Grove Residential",
            address="88 Maple Grove Dr, San Jose, CA 95112",
            building_type="residential", total_floors=8, year_built=2012,
            status="active", occupancy_rate=0.95, hvac_efficiency="78%",
            tenant_satisfaction=4.6, maintenance_backlog_count=0,
            notes="Mid-rise residential building with strong occupancy.",
            tenants=[
                dict(name="Jordan Williams", unit_number="4B",
                     contact_email="jordan@email.com", contact_phone="408-555-0505",
                     lease_start=date(2023, 1, 1), lease_end=date(2024, 12, 31)),
                dict(name="Sam Chen", unit_number="6D",
                     contact_email="sam.chen@email.com", contact_phone="408-555-0606",
                     lease_start=date(2022, 7, 1), lease_end=date(2025, 6, 30)),
            ],
            systems=[
                dict(system_name="Heat Pump HVAC", system_type="hvac",
                     status="operational", last_inspected=_INSPECTED),
                dict(system_name="Elevator Bank", system_type="elevator",
                     status="operational", last_inspected=_INSPECTED),
                dict(system_name="Sprinkler System", system_type="fire_safety",
                     status="operational", last_inspected=_INSPECTED),
            ],
            maintenance=[
                dict(title="Unit 2C HVAC filter replacement",
                     description="Routine filter replacement for unit 2C. Resident requested.",
                     priority="low", status="open", assigned_to=None),
                dict(title="Common area carpet deep clean",
                     description="Lobby and hallway carpets need professional deep cleaning.",
                     priority="medium", status="resolved", assigned_to="CleanCo"),
            ],
        ),
        dict(
            name="Cedar Industrial Park",
            address="4500 Cedar Way, Fremont, CA 94538",
            building_type="industrial", total_floors=1, year_built=1988,
            status="under_maintenance", occupancy_rate=0.60, hvac_efficiency="65%",
            tenant_satisfaction=3.4, maintenance_backlog_count=2,
            notes="Warehouse and light-industrial units undergoing roof work.",
            tenants=[
                dict(name="Pacific Logistics", unit_number="Bay 1",
                     contact_email="dispatch@paclogistics.com", contact_phone="510-555-0707",
                     lease_start=date(2021, 2, 1), lease_end=date(2026, 1, 31)),
            ],
            systems=[
                dict(system_name="Loading Dock Doors", system_type="other",
                     status="needs_service", last_inspected=_INSPECTED),
                dict(system_name="Warehouse Lighting", system_type="lighting",
                     status="operational", last_inspected=_INSPECTED),
                dict(system_name="Main Electrical Panel", system_type="electrical",
                     status="operational", last_inspected=_INSPECTED),
            ],
            maintenance=[
                dict(title="Roof membrane replacement",
                     description="Replace aging roof membrane over bays 1-3 before winter.",
                     priority="critical", status="in_progress", assigned_to="ProRoof Inc."),
                dict(title="Dock leveler hydraulic leak",
                     description="Bay 2 dock leveler is leaking hydraulic fluid. Needs repair.",
                     priority="high", status="open", assigned_to=None),
            ],
        ),
    ]


async def _wipe(db: AsyncSession) -> None:
    for model in _WIPE_ORDER:
        await db.execute(delete(model))


@router.post("", status_code=201)
async def seed_data(db: AsyncSession = Depends(get_db)):
    """Reset to a fully-populated demo portfolio."""
    await _wipe(db)
    await db.flush()

    counts = {"buildings": 0, "tenants": 0, "systems": 0, "maintenance_requests": 0}

    for bdef in _building_defs():
        building = Building(
            name=bdef["name"],
            address=bdef["address"],
            building_type=bdef["building_type"],
            total_floors=bdef["total_floors"],
            year_built=bdef["year_built"],
            status=bdef["status"],
            notes=bdef["notes"],
            occupancy_rate=bdef["occupancy_rate"],
            hvac_efficiency=bdef["hvac_efficiency"],
            tenant_satisfaction=bdef["tenant_satisfaction"],
            maintenance_backlog_count=bdef["maintenance_backlog_count"],
        )
        db.add(building)
        await db.flush()
        counts["buildings"] += 1

        for t in bdef["tenants"]:
            db.add(Tenant(building_id=building.id, **t))
            counts["tenants"] += 1
        for s in bdef["systems"]:
            db.add(BuildingSystem(building_id=building.id, **s))
            counts["systems"] += 1
        for m in bdef["maintenance"]:
            db.add(MaintenanceRequest(building_id=building.id, **m))
            counts["maintenance_requests"] += 1

    await db.commit()
    return {"seeded": True, **counts}


@router.delete("", status_code=200)
async def clear_data(db: AsyncSession = Depends(get_db)):
    """Wipe all data from every table — back to a clean install."""
    await _wipe(db)
    await db.commit()
    return {"cleared": True}

"""Tests for building systems API."""

import pytest


@pytest.mark.asyncio
async def test_create_system(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "SysTest Building",
        "address": "1 System Ave",
        "building_type": "commercial",
        "total_floors": 4,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    payload = {
        "building_id": building_id,
        "system_name": "Main HVAC",
        "system_type": "hvac",
        "status": "operational",
    }
    response = await client.post("/api/v1/systems/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["system_name"] == "Main HVAC"
    assert data["system_type"] == "hvac"
    assert "id" in data


@pytest.mark.asyncio
async def test_list_systems_by_building(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "MultiSys Building",
        "address": "2 System Blvd",
        "building_type": "commercial",
        "total_floors": 3,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    systems = [
        {"building_id": building_id, "system_name": "HVAC", "system_type": "hvac", "status": "operational"},
        {"building_id": building_id, "system_name": "Elevator A", "system_type": "elevator", "status": "needs_service"},
    ]
    for s in systems:
        await client.post("/api/v1/systems/", json=s)

    response = await client.get(f"/api/v1/systems/?building_id={building_id}")
    assert response.status_code == 200
    assert len(response.json()) == 2


@pytest.mark.asyncio
async def test_update_system_status(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "StatusTest",
        "address": "3 Status Rd",
        "building_type": "commercial",
        "total_floors": 2,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    create_resp = await client.post("/api/v1/systems/", json={
        "building_id": building_id,
        "system_name": "Fire Alarm",
        "system_type": "fire_safety",
        "status": "operational",
    })
    sys_id = create_resp.json()["id"]

    response = await client.put(f"/api/v1/systems/{sys_id}", json={"status": "offline"})
    assert response.status_code == 200
    assert response.json()["status"] == "offline"

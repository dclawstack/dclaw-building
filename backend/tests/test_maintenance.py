"""Tests for maintenance requests API."""

import pytest


@pytest.mark.asyncio
async def test_create_maintenance(client):
    # First create a building
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Test Building",
        "address": "123 Test St",
        "building_type": "commercial",
        "total_floors": 5,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    payload = {
        "building_id": building_id,
        "title": "Fix elevator",
        "description": "Elevator on floor 3 is not working",
        "priority": "high",
        "status": "open",
    }
    response = await client.post("/api/v1/maintenance/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Fix elevator"
    assert data["priority"] == "high"
    assert "id" in data


@pytest.mark.asyncio
async def test_create_maintenance_nonexistent_building(client):
    payload = {
        "building_id": "nonexistent-id",
        "title": "Fix something",
        "description": "Broken stuff",
        "priority": "medium",
    }
    response = await client.post("/api/v1/maintenance/", json=payload)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_list_maintenance_by_building(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Building A",
        "address": "A St",
        "building_type": "commercial",
        "total_floors": 3,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    for i in range(2):
        await client.post("/api/v1/maintenance/", json={
            "building_id": building_id,
            "title": f"Issue {i}",
            "description": f"Description {i}",
            "priority": "medium",
        })

    response = await client.get(f"/api/v1/maintenance/?building_id={building_id}")
    assert response.status_code == 200
    assert len(response.json()) == 2


@pytest.mark.asyncio
async def test_update_maintenance_status(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Building B",
        "address": "B St",
        "building_type": "commercial",
        "total_floors": 2,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    create_resp = await client.post("/api/v1/maintenance/", json={
        "building_id": building_id,
        "title": "Leaky pipe",
        "description": "Pipe is leaking in basement",
        "priority": "medium",
    })
    maint_id = create_resp.json()["id"]

    response = await client.put(f"/api/v1/maintenance/{maint_id}", json={"status": "in_progress"})
    assert response.status_code == 200
    assert response.json()["status"] == "in_progress"


@pytest.mark.asyncio
async def test_delete_maintenance(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Building C",
        "address": "C St",
        "building_type": "commercial",
        "total_floors": 1,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    create_resp = await client.post("/api/v1/maintenance/", json={
        "building_id": building_id,
        "title": "Replace light",
        "description": "Light bulb needs replacing",
        "priority": "low",
    })
    maint_id = create_resp.json()["id"]

    response = await client.delete(f"/api/v1/maintenance/{maint_id}")
    assert response.status_code == 204

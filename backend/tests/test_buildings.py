"""Tests for buildings API."""

import pytest


@pytest.mark.asyncio
async def test_list_buildings_empty(client):
    response = await client.get("/api/v1/buildings/")
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_create_building(client):
    payload = {
        "name": "Tower A",
        "address": "123 Main St",
        "building_type": "commercial",
        "total_floors": 10,
        "year_built": 2010,
        "status": "active",
    }
    response = await client.post("/api/v1/buildings/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Tower A"
    assert data["address"] == "123 Main St"
    assert data["total_floors"] == 10
    assert "id" in data
    assert "created_at" in data


@pytest.mark.asyncio
async def test_get_building(client):
    payload = {
        "name": "Tower B",
        "address": "456 Oak Ave",
        "building_type": "residential",
        "total_floors": 5,
        "status": "active",
    }
    create_resp = await client.post("/api/v1/buildings/", json=payload)
    building_id = create_resp.json()["id"]

    response = await client.get(f"/api/v1/buildings/{building_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Tower B"


@pytest.mark.asyncio
async def test_get_building_not_found(client):
    response = await client.get("/api/v1/buildings/nonexistent")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_building(client):
    payload = {
        "name": "Tower C",
        "address": "789 Pine Rd",
        "building_type": "commercial",
        "total_floors": 3,
        "status": "active",
    }
    create_resp = await client.post("/api/v1/buildings/", json=payload)
    building_id = create_resp.json()["id"]

    update_payload = {"name": "Tower C Renovated", "occupancy_rate": 85.5}
    response = await client.put(f"/api/v1/buildings/{building_id}", json=update_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Tower C Renovated"
    assert data["occupancy_rate"] == 85.5


@pytest.mark.asyncio
async def test_delete_building(client):
    payload = {
        "name": "Tower D",
        "address": "111 Elm St",
        "building_type": "industrial",
        "total_floors": 2,
        "status": "active",
    }
    create_resp = await client.post("/api/v1/buildings/", json=payload)
    building_id = create_resp.json()["id"]

    response = await client.delete(f"/api/v1/buildings/{building_id}")
    assert response.status_code == 204

    get_resp = await client.get(f"/api/v1/buildings/{building_id}")
    assert get_resp.status_code == 404


@pytest.mark.asyncio
async def test_list_buildings_with_data(client):
    for i in range(3):
        await client.post("/api/v1/buildings/", json={
            "name": f"Building {i}",
            "address": f"{i}00 Test Ave",
            "building_type": "commercial",
            "total_floors": i + 1,
            "status": "active",
        })

    response = await client.get("/api/v1/buildings/?limit=10")
    assert response.status_code == 200
    assert len(response.json()) == 3

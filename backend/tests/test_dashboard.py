"""Tests for dashboard API."""

import pytest


@pytest.mark.asyncio
async def test_dashboard_empty(client):
    response = await client.get("/api/v1/dashboard/")
    assert response.status_code == 200
    data = response.json()
    assert data["total_buildings"] == 0
    assert data["open_maintenance"] == 0


@pytest.mark.asyncio
async def test_dashboard_with_data(client):
    # Create a building with health metrics
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Dashboard Tower",
        "address": "100 Metrics Blvd",
        "building_type": "commercial",
        "total_floors": 15,
        "status": "active",
        "occupancy_rate": 85.0,
        "tenant_satisfaction": 92.0,
        "maintenance_backlog_count": 3,
    })
    building_id = building_resp.json()["id"]

    # Create maintenance requests
    await client.post("/api/v1/maintenance/", json={
        "building_id": building_id,
        "title": "Urgent leak",
        "description": "Water leak in lobby",
        "priority": "critical",
        "status": "open",
    })
    await client.post("/api/v1/maintenance/", json={
        "building_id": building_id,
        "title": "AC fix",
        "description": "AC not cooling",
        "priority": "medium",
        "status": "in_progress",
    })

    # Create systems
    await client.post("/api/v1/systems/", json={
        "building_id": building_id,
        "system_name": "HVAC Unit 1",
        "system_type": "hvac",
        "status": "operational",
    })
    await client.post("/api/v1/systems/", json={
        "building_id": building_id,
        "system_name": "Elevator B",
        "system_type": "elevator",
        "status": "needs_service",
    })

    response = await client.get("/api/v1/dashboard/")
    assert response.status_code == 200
    data = response.json()
    assert data["total_buildings"] == 1
    assert data["avg_occupancy"] == 85.0
    assert data["avg_satisfaction"] == 92.0
    assert data["open_maintenance"] == 2
    assert data["needs_attention"] >= 1

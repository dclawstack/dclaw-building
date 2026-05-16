"""Tests for tenants API."""

import pytest


@pytest.mark.asyncio
async def test_create_tenant(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Rental Tower",
        "address": "1 Lease Ln",
        "building_type": "residential",
        "total_floors": 12,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    payload = {
        "building_id": building_id,
        "name": "Acme Corp",
        "contact_email": "acme@example.com",
        "contact_phone": "555-0100",
        "unit_number": "4A",
        "lease_start": "2025-01-01",
        "lease_end": "2027-01-01",
    }
    response = await client.post("/api/v1/tenants/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Acme Corp"
    assert data["unit_number"] == "4A"
    assert "id" in data


@pytest.mark.asyncio
async def test_list_tenants_by_building(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Office Plaza",
        "address": "2 Business Park",
        "building_type": "commercial",
        "total_floors": 6,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    for i in range(2):
        await client.post("/api/v1/tenants/", json={
            "building_id": building_id,
            "name": f"Tenant {i}",
            "unit_number": f"{i}A",
        })

    response = await client.get(f"/api/v1/tenants/?building_id={building_id}")
    assert response.status_code == 200
    assert len(response.json()) == 2


@pytest.mark.asyncio
async def test_update_tenant(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Update Tower",
        "address": "3 Update St",
        "building_type": "commercial",
        "total_floors": 3,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    create_resp = await client.post("/api/v1/tenants/", json={
        "building_id": building_id,
        "name": "Old Name Inc",
        "unit_number": "2B",
    })
    tenant_id = create_resp.json()["id"]

    response = await client.put(f"/api/v1/tenants/{tenant_id}", json={"name": "New Name LLC"})
    assert response.status_code == 200
    assert response.json()["name"] == "New Name LLC"


@pytest.mark.asyncio
async def test_delete_tenant(client):
    building_resp = await client.post("/api/v1/buildings/", json={
        "name": "Delete Tower",
        "address": "4 Delete Ave",
        "building_type": "commercial",
        "total_floors": 2,
        "status": "active",
    })
    building_id = building_resp.json()["id"]

    create_resp = await client.post("/api/v1/tenants/", json={
        "building_id": building_id,
        "name": "Temp Tenant",
    })
    tenant_id = create_resp.json()["id"]

    response = await client.delete(f"/api/v1/tenants/{tenant_id}")
    assert response.status_code == 204

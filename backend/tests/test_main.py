"""Smoke tests for the API."""

import pytest


@pytest.mark.asyncio
async def test_health_check(client):
    response = await client.get("/health/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_api_docs(client):
    response = await client.get("/docs")
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_openapi_schema(client):
    response = await client.get("/openapi.json")
    assert response.status_code == 200
    data = response.json()
    assert "paths" in data
    # Verify our v1 routes are registered
    assert "/api/v1/buildings/" in data["paths"]
    assert "/api/v1/maintenance/" in data["paths"]
    assert "/api/v1/systems/" in data["paths"]
    assert "/api/v1/tenants/" in data["paths"]
    assert "/api/v1/dashboard/" in data["paths"]

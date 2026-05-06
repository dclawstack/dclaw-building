from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_health():
    response = client.post("/healths", json={"building_id": "BLD-001"})
    assert response.status_code == 200
    data = response.json()
    assert data["building_id"] == "BLD-001"
    assert "id" in data

def test_get_systems():
    response = client.get("/healths/abc/systems")
    assert response.status_code == 200
    assert len(response.json()) == 4

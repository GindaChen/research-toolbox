"""Smoke tests for the Research Toolbox API."""

import pytest
from fastapi.testclient import TestClient

from main import app


@pytest.fixture
def client():
    """Create a test client."""
    with TestClient(app) as c:
        yield c


def test_health(client: TestClient):
    """Health endpoint returns 200."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "version" in data


def test_list_tasks_empty(client: TestClient):
    """Task list starts empty."""
    response = client.get("/api/tasks/")
    assert response.status_code == 200
    assert response.json() == []


def test_create_task(client: TestClient):
    """Can create a task."""
    payload = {
        "title": "Test task",
        "description": "A test task for CI",
        "priority": "p2-medium",
    }
    response = client.post("/api/tasks/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test task"
    assert data["status"] == "backlog"
    assert "id" in data


def test_list_extensions(client: TestClient):
    """Extension list returns without error."""
    response = client.get("/api/extensions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

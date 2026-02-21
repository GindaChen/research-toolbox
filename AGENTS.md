# AGENTS.md

This file provides guidance for AI assistants working with this codebase.

## Project Overview

**Research Toolbox** is a monorepo for building an AI-powered research orchestration platform. It has two pillars:

1. **Kanban + Chat UI** — A clean React + TypeScript web interface combining automated kanban boards with agentic chat for research workflow management.
2. **Extension System** — A pluggable Python extension architecture for experiment tracking (W&B), scheduling, alerts, summarization, and custom research tools.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | FastAPI + Python 3.11+ |
| Extensions | Python packages extending `BaseExtension` |
| Package Manager | npm (frontend), uv/pip (backend) |
| CI | GitHub Actions |

## Directory Map

```
├── frontend/               # React + TypeScript (Vite)
│   ├── src/
│   │   ├── views/          # Page-level components (Kanban, Chat, Journey)
│   │   ├── components/     # Reusable UI components
│   │   ├── types/          # TypeScript type definitions
│   │   └── api/            # API client
│   └── package.json
├── backend/                # FastAPI server
│   ├── api/                # Route handlers
│   ├── core/               # Config, models, shared logic
│   ├── extensions/         # Extension loader + base class
│   └── tests/              # pytest tests
├── extensions/             # Pluggable extensions (each is a Python package)
│   ├── wandb_tracker/
│   ├── scheduler/
│   ├── alerts/
│   └── summarizer/
├── .agents/                # Agent skills and prompts
│   ├── skills/             # SKILL.md files for agent capabilities
│   └── prompts/            # Reusable prompt fragments
├── .github/                # CI workflows + issue templates
└── docs/                   # Architecture, roadmap
```

## Key Commands

```bash
# Frontend
cd frontend && npm install && npm run dev     # Dev server on :5173
cd frontend && npm run build                  # Production build
cd frontend && npm run lint                   # Lint check

# Backend
cd backend && pip install -r requirements.txt
cd backend && uvicorn main:app --reload       # Dev server on :8000
cd backend && pytest tests/ -v                # Run tests

# Full stack (from repo root)
# Terminal 1: cd frontend && npm run dev
# Terminal 2: cd backend && uvicorn main:app --reload
```

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌──────────────┐
│  Frontend   │───▶│   Backend   │───▶│  Extensions  │
│  (React)    │    │  (FastAPI)  │    │  (Plugins)   │
│   :5173     │    │   :8000     │    │              │
└─────────────┘    └─────────────┘    └──────────────┘
                         │
                   ┌─────────────┐
                   │   Agent     │
                   │  Runtime    │
                   └─────────────┘
```

## PR Conventions

- Branch from `main`, name branches descriptively (e.g., `feat/kanban-dnd`, `ext/wandb-tracker`)
- All PRs must pass CI (frontend build + backend tests)
- Use conventional commits: `feat:`, `fix:`, `docs:`, `ext:`, `ci:`, `refactor:`
- Keep PRs focused — one feature/fix per PR

## Coding Patterns

### Frontend (TypeScript)
- Functional components with hooks
- Types in `frontend/src/types/`
- API calls through `frontend/src/api/client.ts`
- Views are page-level, components are reusable

### Backend (Python)
- FastAPI routers in `backend/api/`
- Pydantic models for request/response validation
- Extensions discovered via `backend/extensions/`
- Config via environment variables + `backend/core/config.py`

### Extensions (Python)
- Each extension is a directory under `extensions/`
- Must subclass `BaseExtension` from `backend/extensions/base.py`
- Must implement `name`, `setup()`, `teardown()`, `get_status()`
- See `extensions/README.md` for the full guide

## Testing

- **Backend**: pytest — `cd backend && pytest tests/ -v`
- **Frontend**: Vitest (planned) — `cd frontend && npm test`
- **CI**: Runs on every PR via `.github/workflows/ci.yml`

## Labels & Issues

Issues use a structured label taxonomy:
- `type:` — feature, bug, extension, research-idea, infra, docs
- `area:` — frontend, backend, extensions, ci, agent
- `priority:` — p0-critical, p1-high, p2-medium, p3-low
- `status:` — backlog, in-progress, blocked, review
- `effort:` — small, medium, large
- Special: `good-first-issue`, `agent-task`, `needs-design`

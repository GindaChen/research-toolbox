# Research Toolbox 🧪

AI-powered research orchestration platform combining **automated Kanban boards** with **agentic chat** and a **pluggable extension system** for ML experiment management.

> Diverged from [research-agent](https://github.com/hao-ai-lab/research-agent). This project focuses on extensibility, research journey logging, and agent-first development.

## YOLO Quick Start

```bash
# Clone and run everything
git clone https://github.com/GindaChen/research-toolbox.git && cd research-toolbox
cd frontend && npm install && npm run dev &
cd ../backend && pip install -r requirements.txt && uvicorn main:app --reload &
```

Frontend: http://localhost:5173 • Backend: http://localhost:8000

## Architecture

```
Frontend (React+TS)  ←→  Backend (FastAPI)  ←→  Extensions (Plugins)
     :5173                    :8000                  Python packages
                                ↕
                          Agent Runtime
```

<details>
<summary><strong>📦 Detailed Setup</strong></summary>

### Prerequisites
- Node.js 20+ (see `.nvmrc`)
- Python 3.11+
- npm
- uv or pip

### Frontend

```bash
cd frontend
npm install
npm run dev          # Dev server on :5173
npm run build        # Production build
npm run lint         # Lint check
```

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Running Tests

```bash
# Backend
cd backend && pytest tests/ -v
```

</details>

<details>
<summary><strong>🔌 Extension Development</strong></summary>

Extensions are pluggable Python packages under `extensions/`. Each one:

1. Subclasses `BaseExtension` from `backend/extensions/base.py`
2. Implements `name`, `setup()`, `teardown()`, `get_status()`
3. Gets auto-discovered by the backend at startup

```bash
# Scaffold a new extension
mkdir extensions/my_extension
# See extensions/README.md for the full guide
```

Built-in extension stubs: `wandb_tracker`, `scheduler`, `alerts`, `summarizer`

</details>

<details>
<summary><strong>🤖 Agent Skills</strong></summary>

Agent skills live in `.agents/skills/`. Each skill has a `SKILL.md` with structured instructions:

| Skill | Purpose |
|-------|---------|
| `summarize` | Summarize research sessions and conversations |
| `reflect` | Reflect on experiment results, propose next steps |
| `propose-idea` | Generate research ideas from context |
| `optimize-workflow` | Analyze and optimize research workflows |
| `guide-pr` | Guide PR creation, review, and merge |
| `create-extension` | Scaffold a new extension package |

</details>

<details>
<summary><strong>🏷️ Issue Labels</strong></summary>

| Category | Labels |
|----------|--------|
| Type | `type:feature` `type:bug` `type:extension` `type:research-idea` `type:infra` `type:docs` |
| Area | `area:frontend` `area:backend` `area:extensions` `area:ci` `area:agent` |
| Priority | `priority:p0-critical` `priority:p1-high` `priority:p2-medium` `priority:p3-low` |
| Status | `status:backlog` `status:in-progress` `status:blocked` `status:review` |
| Effort | `effort:small` `effort:medium` `effort:large` |
| Special | `good-first-issue` `agent-task` `needs-design` |

</details>

## Contributing

1. Create a branch: `git checkout -b feat/my-feature`
2. Make changes, ensure CI passes
3. Open a PR with conventional commit messages (`feat:`, `fix:`, `docs:`, `ext:`)
4. Get review and merge

See [AGENTS.md](AGENTS.md) for coding patterns and conventions.

## License

MIT
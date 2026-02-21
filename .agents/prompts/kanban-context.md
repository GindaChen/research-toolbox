# Kanban Context Template

Use this template to inject the current Kanban state into agent prompts.

## Board State

### 📥 Backlog
{{#each backlog_tasks}}
- [{{priority}}] **{{title}}** — {{labels}}
{{/each}}

### 📋 To Do
{{#each todo_tasks}}
- [{{priority}}] **{{title}}** — {{labels}}
{{/each}}

### 🔄 In Progress
{{#each in_progress_tasks}}
- [{{priority}}] **{{title}}** ({{assignee}}) — {{labels}}
{{/each}}

### 👀 Review
{{#each review_tasks}}
- [{{priority}}] **{{title}}** — {{labels}}
{{/each}}

### ✅ Done (Recent)
{{#each recent_done_tasks}}
- **{{title}}** — completed {{completed_date}}
{{/each}}

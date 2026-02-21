# Research Context Template

Use this template to inject the current research context into agent prompts.

## Current Project
- **Name**: {{project_name}}
- **Goal**: {{project_goal}}
- **Phase**: {{project_phase}}

## Active Experiments
{{#each active_runs}}
- **{{name}}** ({{status}}): {{key_metric_name}}={{key_metric_value}}
{{/each}}

## Recent Decisions
{{#each recent_decisions}}
- {{date}}: {{decision}} — {{rationale}}
{{/each}}

## Open Questions
{{#each open_questions}}
- {{question}}
{{/each}}

## Kanban Snapshot
- Backlog: {{backlog_count}} tasks
- In Progress: {{in_progress_count}} tasks
- Blocked: {{blocked_count}} tasks

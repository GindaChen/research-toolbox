import type { Task, TaskStatus } from '../types'
import './KanbanView.css'

const COLUMNS: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'backlog', label: 'Backlog', color: 'var(--text-tertiary)' },
    { status: 'todo', label: 'To Do', color: 'var(--accent)' },
    { status: 'in-progress', label: 'In Progress', color: 'var(--warning)' },
    { status: 'review', label: 'Review', color: 'var(--info)' },
    { status: 'done', label: 'Done', color: 'var(--success)' },
]

const MOCK_TASKS: Task[] = [
    {
        id: '1', title: 'Set up W&B integration', description: 'Connect experiment tracking with Weights & Biases API',
        status: 'todo', priority: 'p1-high', labels: ['extension', 'backend'],
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '2', title: 'Design chat streaming protocol', description: 'Define WebSocket message format for agentic chat',
        status: 'in-progress', priority: 'p1-high', labels: ['feature', 'backend'],
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '3', title: 'Implement drag-and-drop', description: 'Add DnD for Kanban cards between columns',
        status: 'backlog', priority: 'p2-medium', labels: ['feature', 'frontend'],
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '4', title: 'Add loss spike alert', description: 'Extension: detect sudden loss increases during training',
        status: 'todo', priority: 'p2-medium', labels: ['extension'],
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '5', title: 'Research LoRA fine-tuning', description: 'Investigate LoRA r16/a32 configurations for 7B models',
        status: 'review', priority: 'p1-high', labels: ['research'],
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
        id: '6', title: 'Fix login redirect bug', description: 'Users are redirected to / instead of /dashboard after login',
        status: 'done', priority: 'p0-critical', labels: ['bug', 'frontend'],
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
]

interface KanbanViewProps {
    onTaskClick: (task: Task) => void
    selectedTaskId?: string
}

export function KanbanView({ onTaskClick, selectedTaskId }: KanbanViewProps) {
    return (
        <div className="kanban">
            <div className="kanban-header">
                <h2 className="kanban-title">Board</h2>
                <span className="kanban-count">{MOCK_TASKS.length} tasks</span>
            </div>
            <div className="kanban-columns">
                {COLUMNS.map((col) => {
                    const tasks = MOCK_TASKS.filter((t) => t.status === col.status)
                    return (
                        <div key={col.status} className="kanban-col">
                            <div className="col-header">
                                <span className="col-dot" style={{ background: col.color }} />
                                <span className="col-label">{col.label}</span>
                                <span className="col-count">{tasks.length}</span>
                            </div>
                            <div className="col-cards">
                                {tasks.map((task) => (
                                    <button
                                        key={task.id}
                                        className={`task-card ${selectedTaskId === task.id ? 'selected' : ''}`}
                                        onClick={() => onTaskClick(task)}
                                        data-tooltip="Click to open details"
                                    >
                                        <div className="card-top">
                                            <span className={`card-priority p-${task.priority}`} data-tooltip={task.priority}>
                                                {task.priority === 'p0-critical' ? '🔴' :
                                                    task.priority === 'p1-high' ? '🟠' :
                                                        task.priority === 'p2-medium' ? '🟡' : '🟢'}
                                            </span>
                                            <span className="card-id">#{task.id}</span>
                                        </div>
                                        <div className="card-title">{task.title}</div>
                                        <div className="card-desc">{task.description}</div>
                                        <div className="card-labels">
                                            {task.labels.map((l) => (
                                                <span key={l} className="card-label">{l}</span>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                                {tasks.length === 0 && (
                                    <div className="col-empty">No tasks</div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

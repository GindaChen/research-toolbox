import type { Task, TaskStatus } from '../types'
import './KanbanView.css'

const COLUMNS: { status: TaskStatus; label: string; dot: string }[] = [
    { status: 'backlog', label: 'Backlog', dot: '#484f58' },
    { status: 'todo', label: 'To do', dot: 'var(--info)' },
    { status: 'in-progress', label: 'In progress', dot: 'var(--warning)' },
    { status: 'review', label: 'In review', dot: 'var(--accent)' },
    { status: 'done', label: 'Done', dot: 'var(--success)' },
]

const MOCK_TASKS: Task[] = [
    { id: '1', title: 'Set up W&B integration', description: 'Connect experiment tracking with W&B API', status: 'todo', priority: 'p1-high', labels: ['extension', 'backend'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', title: 'Design chat streaming protocol', description: 'Define WebSocket message format', status: 'in-progress', priority: 'p1-high', labels: ['feature', 'backend'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', title: 'Implement drag-and-drop', description: 'Add DnD for cards between columns', status: 'backlog', priority: 'p2-medium', labels: ['feature', 'frontend'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', title: 'Add loss spike alert', description: 'Detect sudden loss increases', status: 'todo', priority: 'p2-medium', labels: ['extension'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '5', title: 'Research LoRA fine-tuning', description: 'r16/a32 configs for 7B', status: 'review', priority: 'p1-high', labels: ['research'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '6', title: 'Fix login redirect', description: 'Redirect to /dashboard', status: 'done', priority: 'p0-critical', labels: ['bug'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '7', title: 'Scheduler priority queue', description: 'Time estimation + GPU allocation', status: 'backlog', priority: 'p2-medium', labels: ['extension'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
]

interface KanbanViewProps {
    onTaskClick: (task: Task) => void
    selectedTaskId?: string
}

const PRIORITY_ICONS: Record<string, string> = {
    'p0-critical': '🔴',
    'p1-high': '🟠',
    'p2-medium': '🟡',
    'p3-low': '⚪',
}

export function KanbanView({ onTaskClick, selectedTaskId }: KanbanViewProps) {
    return (
        <div className="kanban">
            <div className="kanban-toolbar">
                <span className="toolbar-label">Board</span>
                <span className="toolbar-count">{MOCK_TASKS.length} issues</span>
            </div>
            <div className="kanban-columns">
                {COLUMNS.map((col) => {
                    const tasks = MOCK_TASKS.filter((t) => t.status === col.status)
                    return (
                        <div key={col.status} className="k-col">
                            <div className="k-col-header">
                                <span className="k-dot" style={{ background: col.dot }} />
                                <span className="k-col-name">{col.label}</span>
                                <span className="k-col-count">{tasks.length}</span>
                                <button className="k-col-add" data-tooltip="Add task">+</button>
                            </div>
                            <div className="k-col-body">
                                {tasks.map((task) => (
                                    <button
                                        key={task.id}
                                        className={`k-card ${selectedTaskId === task.id ? 'selected' : ''}`}
                                        onClick={() => onTaskClick(task)}
                                    >
                                        <div className="k-card-row">
                                            <span className="k-priority" data-tooltip={task.priority}>
                                                {PRIORITY_ICONS[task.priority]}
                                            </span>
                                            <span className="k-card-title">{task.title}</span>
                                        </div>
                                        <div className="k-card-meta">
                                            <span className="k-id">RT-{task.id}</span>
                                            {task.labels.map(l => (
                                                <span key={l} className="k-label">{l}</span>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

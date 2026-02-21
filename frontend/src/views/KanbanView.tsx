import type { Task, TaskStatus } from '../types'
import './KanbanView.css'

const COLUMNS: { status: TaskStatus; label: string; borderColor: string }[] = [
    { status: 'backlog', label: 'Backlog', borderColor: 'var(--text-tertiary)' },
    { status: 'todo', label: 'To Do', borderColor: 'var(--info)' },
    { status: 'in-progress', label: 'In Progress', borderColor: 'var(--warning)' },
    { status: 'review', label: 'Review', borderColor: 'var(--accent)' },
    { status: 'done', label: 'Done', borderColor: 'var(--success)' },
]

const MOCK_TASKS: Task[] = [
    { id: '1', title: 'Set up W&B integration', description: 'Connect experiment tracking with Weights & Biases API for live metric sync', status: 'todo', priority: 'p1-high', labels: ['extension', 'backend'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', title: 'Design chat streaming protocol', description: 'Define WebSocket message format for bidirectional agentic chat communication', status: 'in-progress', priority: 'p1-high', labels: ['feature', 'backend'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', title: 'Implement drag-and-drop', description: 'Add DnD for Kanban cards between columns using @dnd-kit/sortable', status: 'backlog', priority: 'p2-medium', labels: ['feature', 'frontend'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', title: 'Add loss spike alert', description: 'Extension to detect sudden loss increases during training and notify the researcher', status: 'todo', priority: 'p2-medium', labels: ['extension'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '5', title: 'Research LoRA fine-tuning', description: 'Investigate LoRA r16/a32 configurations for 7B parameter models on summarization task', status: 'review', priority: 'p1-high', labels: ['research'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '6', title: 'Fix login redirect bug', description: 'Users are redirected to / instead of /dashboard after successful authentication', status: 'done', priority: 'p0-critical', labels: ['bug', 'frontend'], created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
]

interface KanbanViewProps {
    onTaskClick: (task: Task) => void
    selectedTaskId?: string
}

const PRIORITY_LABEL: Record<string, string> = {
    'p0-critical': '🔴 Critical',
    'p1-high': '🟠 High',
    'p2-medium': '🟡 Medium',
    'p3-low': '🟢 Low',
}

export function KanbanView({ onTaskClick, selectedTaskId }: KanbanViewProps) {
    return (
        <div className="kanban">
            <div className="kanban-header">
                <h2 className="kanban-title">Research Board</h2>
                <span className="kanban-meta">{MOCK_TASKS.length} tasks · 2 in progress</span>
            </div>
            <div className="kanban-columns">
                {COLUMNS.map(col => {
                    const tasks = MOCK_TASKS.filter(t => t.status === col.status)
                    return (
                        <div key={col.status} className="w-col">
                            <div className="w-col-header">
                                <span className="w-col-bar" style={{ background: col.borderColor }} />
                                <span className="w-col-name">{col.label}</span>
                                <span className="w-col-count">{tasks.length}</span>
                            </div>
                            <div className="w-col-body">
                                {tasks.map(task => (
                                    <button
                                        key={task.id}
                                        className={`w-card ${selectedTaskId === task.id ? 'selected' : ''}`}
                                        style={{ '--card-border': col.borderColor } as React.CSSProperties}
                                        onClick={() => onTaskClick(task)}
                                        data-tooltip="Click to open details & chat"
                                    >
                                        <div className="w-card-title">{task.title}</div>
                                        <div className="w-card-desc">{task.description}</div>
                                        <div className="w-card-footer">
                                            <span className="w-card-priority" data-tooltip={PRIORITY_LABEL[task.priority]}>
                                                {task.priority === 'p0-critical' ? '🔴' : task.priority === 'p1-high' ? '🟠' : task.priority === 'p2-medium' ? '🟡' : '🟢'}
                                            </span>
                                            <div className="w-card-labels">
                                                {task.labels.map(l => (
                                                    <span key={l} className="w-label">{l}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                {tasks.length === 0 && (
                                    <div className="w-col-empty">Nothing here yet</div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

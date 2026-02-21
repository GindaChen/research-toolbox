import type { Task, TaskStatus } from '@/types'
import './KanbanView.css'

const COLUMNS: { status: TaskStatus; label: string; emoji: string }[] = [
    { status: 'backlog', label: 'Backlog', emoji: '📥' },
    { status: 'todo', label: 'To Do', emoji: '📋' },
    { status: 'in-progress', label: 'In Progress', emoji: '🔄' },
    { status: 'review', label: 'Review', emoji: '👀' },
    { status: 'done', label: 'Done', emoji: '✅' },
]

// Placeholder tasks for development
const MOCK_TASKS: Task[] = [
    {
        id: '1',
        title: 'Set up W&B integration',
        description: 'Connect experiment tracking with Weights & Biases API',
        status: 'todo',
        priority: 'p1-high',
        labels: ['type:extension', 'area:backend'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Design chat streaming protocol',
        description: 'Define WebSocket message format for agentic chat',
        status: 'in-progress',
        priority: 'p1-high',
        labels: ['type:feature', 'area:backend'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Implement drag-and-drop',
        description: 'Add drag-and-drop for Kanban cards between columns',
        status: 'backlog',
        priority: 'p2-medium',
        labels: ['type:feature', 'area:frontend'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
]

export function KanbanView() {
    return (
        <div className="kanban">
            {COLUMNS.map((col) => (
                <div key={col.status} className="kanban-column">
                    <div className="column-header">
                        <span className="column-emoji">{col.emoji}</span>
                        <span className="column-title">{col.label}</span>
                        <span className="column-count">
                            {MOCK_TASKS.filter((t) => t.status === col.status).length}
                        </span>
                    </div>
                    <div className="column-body">
                        {MOCK_TASKS.filter((t) => t.status === col.status).map((task) => (
                            <div key={task.id} className="kanban-card">
                                <div className="card-title">{task.title}</div>
                                <div className="card-desc">{task.description}</div>
                                <div className="card-labels">
                                    {task.labels.map((label) => (
                                        <span key={label} className="card-label">{label}</span>
                                    ))}
                                </div>
                                <div className={`card-priority priority-${task.priority}`}>
                                    {task.priority}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

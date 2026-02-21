// ── Kanban Types ──

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'p0-critical' | 'p1-high' | 'p2-medium' | 'p3-low'

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    labels: string[]
    assignee?: string
    created_at: string
    updated_at: string
    estimated_hours?: number
    linked_run_id?: string
}

// ── Chat Types ──

export type MessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
    id: string
    role: MessageRole
    content: string
    timestamp: string
    metadata?: Record<string, unknown>
}

export interface ChatSession {
    id: string
    title: string
    messages: ChatMessage[]
    created_at: string
    updated_at: string
}

// ── Extension Types ──

export type ExtensionStatus = 'active' | 'inactive' | 'error'

export interface Extension {
    name: string
    version: string
    status: ExtensionStatus
    description: string
    config: Record<string, unknown>
}

// ── Journey Types ──

export interface JourneyEntry {
    id: string
    title: string
    summary: string
    conversation_id?: string
    created_at: string
    tags: string[]
}

// ── Experiment Types ──

export type RunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'

export interface ExperimentRun {
    id: string
    name: string
    status: RunStatus
    metrics: Record<string, number>
    config: Record<string, unknown>
    created_at: string
    updated_at: string
    duration_seconds?: number
}

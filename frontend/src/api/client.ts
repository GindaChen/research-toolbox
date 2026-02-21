import type { Task, ChatMessage, Extension, JourneyEntry } from '@/types'

const API_BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    })
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`)
    }
    return res.json()
}

// ── Tasks (Kanban) ──

export const tasksApi = {
    list: () => request<Task[]>('/tasks'),
    get: (id: string) => request<Task>(`/tasks/${id}`),
    create: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) =>
        request<Task>('/tasks', { method: 'POST', body: JSON.stringify(task) }),
    update: (id: string, updates: Partial<Task>) =>
        request<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }),
    delete: (id: string) =>
        request<void>(`/tasks/${id}`, { method: 'DELETE' }),
}

// ── Chat ──

export const chatApi = {
    send: (message: string, sessionId?: string) =>
        request<ChatMessage>('/chat/send', {
            method: 'POST',
            body: JSON.stringify({ message, session_id: sessionId }),
        }),
    history: (sessionId: string) =>
        request<ChatMessage[]>(`/chat/history/${sessionId}`),
}

// ── Extensions ──

export const extensionsApi = {
    list: () => request<Extension[]>('/extensions'),
    status: (name: string) => request<Extension>(`/extensions/${name}/status`),
}

// ── Journey ──

export const journeyApi = {
    list: () => request<JourneyEntry[]>('/journey'),
    create: (entry: Omit<JourneyEntry, 'id' | 'created_at'>) =>
        request<JourneyEntry>('/journey', { method: 'POST', body: JSON.stringify(entry) }),
}

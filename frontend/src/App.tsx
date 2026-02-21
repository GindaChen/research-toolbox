import { useState, useCallback } from 'react'
import { KanbanView } from './views/KanbanView'
import { ChatView } from './views/ChatView'
import type { Task } from './types'
import './App.css'

type Theme = 'light' | 'dark'

function App() {
    const [theme, setTheme] = useState<Theme>('dark')
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [panelOpen, setPanelOpen] = useState(false)

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

    const handleTaskClick = useCallback((task: Task) => {
        if (selectedTask?.id === task.id) {
            setPanelOpen(false)
            setTimeout(() => setSelectedTask(null), 150)
        } else {
            setSelectedTask(task)
            setPanelOpen(true)
        }
    }, [selectedTask])

    const handleClosePanel = useCallback(() => {
        setPanelOpen(false)
        setTimeout(() => setSelectedTask(null), 150)
    }, [])

    return (
        <div className="app" data-theme={theme}>
            <header className="nav-bar">
                <div className="nav-left">
                    <span className="nav-logo">🧪</span>
                    <span className="nav-title">research-toolbox</span>
                    <span className="nav-sep">/</span>
                    <span className="nav-view">Board</span>
                </div>
                <div className="nav-right">
                    <span className="nav-shortcut" data-tooltip="Toggle theme">
                        <button className="nav-btn" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                        <kbd>T</kbd>
                    </span>
                </div>
            </header>

            <div className="main-layout">
                <div className={`kanban-area ${panelOpen ? 'collapsed' : ''}`}>
                    <KanbanView onTaskClick={handleTaskClick} selectedTaskId={selectedTask?.id} />
                </div>

                {panelOpen && (
                    <div className="detail-panel">
                        <div className="panel-header">
                            <div className="panel-id" data-tooltip="Task ID">
                                {selectedTask && `RT-${selectedTask.id}`}
                            </div>
                            <div className="panel-task-title">{selectedTask?.title}</div>
                            <button className="panel-close" onClick={handleClosePanel} data-tooltip="Close (Esc)">✕</button>
                        </div>
                        <div className="panel-tabs">
                            <button className="ptab active">Chat</button>
                            <button className="ptab" data-tooltip="Coming soon">Activity</button>
                            <button className="ptab" data-tooltip="Coming soon">Details</button>
                        </div>
                        <div className="panel-body">
                            <ChatView task={selectedTask} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App

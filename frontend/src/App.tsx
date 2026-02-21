import { useState, useCallback } from 'react'
import { KanbanView } from './views/KanbanView'
import { ChatView } from './views/ChatView'
import type { Task } from './types'
import './App.css'

type Theme = 'light' | 'dark'

function App() {
    const [theme, setTheme] = useState<Theme>('light')
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [panelOpen, setPanelOpen] = useState(false)

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

    const handleTaskClick = useCallback((task: Task) => {
        setSelectedTask(task)
        setPanelOpen(true)
    }, [])

    const handleClosePanel = useCallback(() => {
        setPanelOpen(false)
        setTimeout(() => setSelectedTask(null), 300)
    }, [])

    return (
        <div className="app" data-theme={theme}>
            <header className="nav-bar">
                <div className="nav-left">
                    <span className="nav-logo">📓</span>
                    <h1 className="nav-title">Research Toolbox</h1>
                </div>
                <div className="nav-center">
                    <div className="nav-pill active" data-tooltip="View your research board">
                        📋 Board
                    </div>
                </div>
                <div className="nav-right">
                    <button
                        className="nav-btn"
                        onClick={toggleTheme}
                        data-tooltip={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            <div className="main-layout">
                <div className={`kanban-area ${panelOpen ? 'with-panel' : ''}`}>
                    <KanbanView onTaskClick={handleTaskClick} selectedTaskId={selectedTask?.id} />
                </div>

                <div className={`detail-panel ${panelOpen ? 'open' : ''}`}>
                    <div className="panel-header">
                        {selectedTask && (
                            <div className="panel-task-badge">
                                <span className={`status-pip s-${selectedTask.status}`} />
                                <span className="panel-task-status">{selectedTask.status.replace('-', ' ')}</span>
                            </div>
                        )}
                        <h3 className="panel-title">{selectedTask?.title ?? 'Chat'}</h3>
                        <button className="panel-close" onClick={handleClosePanel} data-tooltip="Close panel">✕</button>
                    </div>
                    <div className="panel-body">
                        <ChatView task={selectedTask} />
                    </div>
                </div>

                {panelOpen && <div className="panel-overlay" onClick={handleClosePanel} />}
            </div>
        </div>
    )
}

export default App

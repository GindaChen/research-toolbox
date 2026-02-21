import { useState, useCallback } from 'react'
import { KanbanView } from './views/KanbanView'
import { ChatView } from './views/ChatView'
import type { Task } from './types'
import './App.css'

type Theme = 'light' | 'dark'

function App() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'dark'
    })
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [panelOpen, setPanelOpen] = useState(false)

    const toggleTheme = () => {
        setTheme(t => t === 'light' ? 'dark' : 'light')
    }

    const handleTaskClick = useCallback((task: Task) => {
        setSelectedTask(task)
        setPanelOpen(true)
    }, [])

    const handleClosePanel = useCallback(() => {
        setPanelOpen(false)
        setTimeout(() => setSelectedTask(null), 250)
    }, [])

    return (
        <div className="app" data-theme={theme}>
            {/* ── Compact Nav Bar ── */}
            <header className="nav-bar">
                <div className="nav-left">
                    <span className="nav-logo" data-tooltip="Research Toolbox">🧪</span>
                    <span className="nav-title">Research Toolbox</span>
                </div>
                <div className="nav-right">
                    <button
                        className="nav-btn"
                        onClick={toggleTheme}
                        data-tooltip={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            {/* ── Main Content ── */}
            <div className="main-layout">
                <div className={`kanban-area ${panelOpen ? 'with-panel' : ''}`}>
                    <KanbanView
                        onTaskClick={handleTaskClick}
                        selectedTaskId={selectedTask?.id}
                    />
                </div>

                {/* ── Chat / Detail Panel ── */}
                <div className={`detail-panel ${panelOpen ? 'open' : ''}`}>
                    <div className="panel-header">
                        <h3 className="panel-title">
                            {selectedTask ? selectedTask.title : 'Chat'}
                        </h3>
                        <button
                            className="panel-close"
                            onClick={handleClosePanel}
                            data-tooltip="Close panel"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="panel-body">
                        <ChatView task={selectedTask} />
                    </div>
                </div>

                {/* Mobile overlay */}
                {panelOpen && <div className="panel-overlay" onClick={handleClosePanel} />}
            </div>
        </div>
    )
}

export default App

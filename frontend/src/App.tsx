import { useState } from 'react'
import { KanbanView } from './views/KanbanView'
import { ChatView } from './views/ChatView'
import { JourneyView } from './views/JourneyView'
import './App.css'

type View = 'kanban' | 'chat' | 'journey'

function App() {
    const [activeView, setActiveView] = useState<View>('kanban')

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">🧪 Research Toolbox</h1>
                <nav className="app-nav">
                    <button
                        className={`nav-tab ${activeView === 'kanban' ? 'active' : ''}`}
                        onClick={() => setActiveView('kanban')}
                    >
                        📋 Kanban
                    </button>
                    <button
                        className={`nav-tab ${activeView === 'chat' ? 'active' : ''}`}
                        onClick={() => setActiveView('chat')}
                    >
                        💬 Chat
                    </button>
                    <button
                        className={`nav-tab ${activeView === 'journey' ? 'active' : ''}`}
                        onClick={() => setActiveView('journey')}
                    >
                        📖 Journey
                    </button>
                </nav>
            </header>

            <main className="app-content">
                {activeView === 'kanban' && <KanbanView />}
                {activeView === 'chat' && <ChatView />}
                {activeView === 'journey' && <JourneyView />}
            </main>
        </div>
    )
}

export default App

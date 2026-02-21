import type { JourneyEntry } from '@/types'
import './JourneyView.css'

const MOCK_ENTRIES: JourneyEntry[] = [
    {
        id: '1',
        title: 'Project Seed',
        summary: 'Initialized research-toolbox monorepo with Kanban + Chat UI, extension system, agent skills, CI, and comprehensive issue tracking.',
        tags: ['milestone', 'infra'],
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Architecture Decision: Vite + React',
        summary: 'Chose Vite + React + TypeScript for the frontend instead of Next.js. Simpler build, better dev experience for desktop-first research tool.',
        tags: ['decision', 'frontend'],
        created_at: new Date().toISOString(),
    },
]

export function JourneyView() {
    return (
        <div className="journey">
            <div className="journey-header">
                <h2>📖 Research Journey</h2>
                <p className="journey-subtitle">
                    Track decisions, milestones, and insights across your research.
                </p>
            </div>
            <div className="journey-timeline">
                {MOCK_ENTRIES.map((entry) => (
                    <div key={entry.id} className="journey-entry">
                        <div className="entry-dot" />
                        <div className="entry-content">
                            <div className="entry-title">{entry.title}</div>
                            <div className="entry-summary">{entry.summary}</div>
                            <div className="entry-meta">
                                <span className="entry-date">
                                    {new Date(entry.created_at).toLocaleDateString()}
                                </span>
                                <div className="entry-tags">
                                    {entry.tags.map((tag) => (
                                        <span key={tag} className="entry-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

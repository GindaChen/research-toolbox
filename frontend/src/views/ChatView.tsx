import { useState, useRef, useEffect } from 'react'
import type { Task, ChatMessage } from '../types'
import './ChatView.css'

const SUGGESTIONS = [
    '🔬 Train MNIST baseline',
    '⚡ Start RLVR run',
    '📊 Compare last 3 runs',
    '🧪 Propose next experiment',
]

interface ChatViewProps {
    task?: Task | null
}

export function ChatView({ task }: ChatViewProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [streaming, setStreaming] = useState(false)
    const endRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const hasMessages = messages.length > 0

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
    useEffect(() => { inputRef.current?.focus() }, [task])

    const send = (text?: string) => {
        const content = text || input.trim()
        if (!content) return
        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content, timestamp: new Date().toISOString() }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setStreaming(true)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(), role: 'assistant',
                content: `**Analysis of**: ${content}\n\nI've processed this request. Here's a quick summary:\n\n\`\`\`\nStatus: Queued for processing\nEstimated time: ~2 minutes\nGPU allocation: A100-40G\n\`\`\`\n\nMonitoring has been enabled. You'll see updates in the Kanban board.`,
                timestamp: new Date().toISOString(),
            }])
            setStreaming(false)
        }, 800)
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
    }

    return (
        <div className="chat-dense">
            {/* Task context */}
            {task && (
                <div className="ctx-bar">
                    <span className="ctx-id">RT-{task.id}</span>
                    <span className="ctx-title">{task.title}</span>
                    <span className={`ctx-badge s-${task.status}`}>{task.status}</span>
                    <span className={`ctx-priority pr-${task.priority}`}>{task.priority}</span>
                </div>
            )}

            {/* Messages or welcome */}
            <div className="msg-area">
                {!hasMessages && (
                    <div className="welcome-dense">
                        <div className="welcome-text">What can I help you with?</div>
                        <div className="quick-actions">
                            {SUGGESTIONS.map(s => (
                                <button key={s} className="quick-btn" onClick={() => send(s)}>{s}</button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map(msg => (
                    <div key={msg.id} className={`dmsg ${msg.role}`}>
                        <div className="dmsg-header">
                            <span className="dmsg-role">{msg.role === 'user' ? 'You' : 'Assistant'}</span>
                            <span className="dmsg-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="dmsg-body">{msg.content}</div>
                    </div>
                ))}
                {streaming && (
                    <div className="dmsg assistant">
                        <div className="dmsg-header">
                            <span className="dmsg-role">Assistant</span>
                            <span className="dmsg-time">thinking...</span>
                        </div>
                        <div className="dmsg-body streaming-dots">● ● ●</div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="input-dense">
                <textarea
                    ref={inputRef}
                    className="input-field"
                    placeholder="Reply... (Enter to send)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    rows={1}
                />
                <button className="send-dense" onClick={() => send()} disabled={!input.trim() || streaming} data-tooltip="Send">↑</button>
            </div>
        </div>
    )
}

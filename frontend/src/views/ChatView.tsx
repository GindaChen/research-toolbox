import { useState, useRef, useEffect } from 'react'
import type { Task, ChatMessage } from '../types'
import './ChatView.css'

const SUGGESTIONS = [
    { emoji: '🔬', title: 'Train MNIST with MLP', desc: '2-layer baseline, Adam optimizer, lr=1e-3' },
    { emoji: '⚡', title: 'Kick off RLVR run', desc: 'GSM8K reward shaping, conservative KL' },
    { emoji: '▶️', title: 'LoRA fine-tune (7B)', desc: 'r16/a32 on summarization dataset' },
    { emoji: '📊', title: 'Compare run metrics', desc: 'Last 3 experiments side by side' },
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

    const isWelcome = messages.length === 0

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
    useEffect(() => { inputRef.current?.focus() }, [task])

    const send = (text?: string) => {
        const content = text || input.trim()
        if (!content) return
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content, timestamp: new Date().toISOString() }])
        setInput('')
        setStreaming(true)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(), role: 'assistant',
                content: `Great question! Here's what I found:\n\n**${content}**\n\nI've analyzed the relevant experiments and updated the board. The results look promising — I'd suggest we explore this direction further in our next session.\n\nShall I create a follow-up task?`,
                timestamp: new Date().toISOString(),
            }])
            setStreaming(false)
        }, 1000)
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
    }

    return (
        <div className="chat-warm">
            {task && (
                <div className="warm-ctx">
                    <span className="warm-ctx-label">Discussing</span>
                    <span className="warm-ctx-title">{task.title}</span>
                </div>
            )}

            {isWelcome ? (
                <div className="warm-welcome">
                    <h2 className="warm-welcome-heading">What can I help you with?</h2>
                    <p className="warm-welcome-sub">I'm your research assistant. Ask me about experiments, results, or next steps.</p>
                    <div className="warm-input-wrap">
                        <textarea
                            ref={inputRef}
                            className="warm-input"
                            placeholder="Ask me about your research..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            rows={1}
                        />
                        <button className="warm-send" onClick={() => send()} disabled={!input.trim()} data-tooltip="Send message">
                            <span className="send-arrow">↑</span>
                        </button>
                    </div>
                    <div className="warm-suggestions">
                        {SUGGESTIONS.map(s => (
                            <button key={s.title} className="warm-sug" onClick={() => send(s.title + ': ' + s.desc)}>
                                <span className="sug-icon">{s.emoji}</span>
                                <div className="sug-text">
                                    <span className="sug-title">{s.title}</span>
                                    <span className="sug-desc">{s.desc}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="warm-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`wmsg ${msg.role}`}>
                                <div className="wmsg-avatar">{msg.role === 'user' ? '👤' : '🤖'}</div>
                                <div className="wmsg-bubble">
                                    <div className="wmsg-content">{msg.content}</div>
                                    <div className="wmsg-time">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {streaming && (
                            <div className="wmsg assistant">
                                <div className="wmsg-avatar">🤖</div>
                                <div className="wmsg-bubble">
                                    <div className="wmsg-content thinking">Thinking...</div>
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    <div className="warm-footer">
                        <textarea
                            ref={inputRef}
                            className="warm-reply"
                            placeholder="Reply..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            rows={1}
                        />
                        <button className="warm-send-sm" onClick={() => send()} disabled={!input.trim() || streaming} data-tooltip="Send">↑</button>
                    </div>
                </>
            )}
        </div>
    )
}

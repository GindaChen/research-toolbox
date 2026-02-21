import { useState, useRef, useEffect } from 'react'
import type { Task, ChatMessage } from '../types'
import './ChatView.css'

const SUGGESTION_CARDS = [
    { emoji: '🔬', title: 'Train MNIST with MLP', desc: '2-layer MLP baseline, Adam, 10 epochs' },
    { emoji: '⚡', title: 'Kick off RLVR run', desc: 'GSM8K reward/KL tracking, small model' },
    { emoji: '▶️', title: 'LoRA fine-tune (7B)', desc: 'LoRA r16/a32, 3 epochs on summarization' },
    { emoji: '📊', title: 'Compare run metrics', desc: 'Side-by-side accuracy/loss curves' },
]

const WELCOME_MSG: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: '👋 Welcome! I can help you manage experiments, analyze results, and plan next steps. Ask me anything about your research.',
    timestamp: new Date().toISOString(),
}

interface ChatViewProps {
    task?: Task | null
}

export function ChatView({ task }: ChatViewProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [isStreaming, setIsStreaming] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const isStationary = messages.length === 0

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        inputRef.current?.focus()
    }, [task])

    const handleSend = (text?: string) => {
        const content = text || input.trim()
        if (!content) return

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
        }

        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsStreaming(true)

        // Simulate streaming response
        setTimeout(() => {
            const assistantMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I'll help with that. Here's what I found:\n\n**Analysis**: ${content}\n\nI've queued this for processing. Check the Kanban board for updated status.`,
                timestamp: new Date().toISOString(),
            }
            setMessages(prev => [...prev, assistantMsg])
            setIsStreaming(false)
        }, 1200)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="chat">
            {/* Task context banner */}
            {task && (
                <div className="chat-context">
                    <span className="context-label">Context</span>
                    <span className="context-task">{task.title}</span>
                    <span className={`context-status s-${task.status}`}>{task.status}</span>
                </div>
            )}

            {/* Stationary welcome state */}
            {isStationary ? (
                <div className="chat-welcome">
                    <h2 className="welcome-heading">What can I help you with?</h2>
                    <div className="welcome-input-wrap">
                        <textarea
                            ref={inputRef}
                            className="welcome-input"
                            placeholder="Ask me about your research..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                        />
                        <button
                            className="welcome-send"
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            data-tooltip="Send message"
                        >
                            ↑
                        </button>
                    </div>
                    <div className="suggestion-cards">
                        {SUGGESTION_CARDS.map((card) => (
                            <button
                                key={card.title}
                                className="suggestion-card"
                                onClick={() => handleSend(card.title + ': ' + card.desc)}
                            >
                                <span className="sug-emoji">{card.emoji}</span>
                                <span className="sug-title">{card.title}</span>
                                <span className="sug-desc">{card.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                /* Active chat state (Claude-like) */
                <>
                    <div className="chat-messages">
                        {messages.length === 0 && (
                            <div className="msg assistant">
                                <div className="msg-content">{WELCOME_MSG.content}</div>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`msg ${msg.role}`}>
                                <div className="msg-content">{msg.content}</div>
                                <div className="msg-meta">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                        {isStreaming && (
                            <div className="msg assistant streaming">
                                <div className="msg-content">
                                    <span className="dot-pulse" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <textarea
                            ref={inputRef}
                            className="chat-textarea"
                            placeholder="Reply..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                        />
                        <button
                            className="chat-send-btn"
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isStreaming}
                            data-tooltip="Send"
                        >
                            ↑
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

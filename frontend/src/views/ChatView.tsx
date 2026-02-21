import { useState } from 'react'
import type { ChatMessage } from '@/types'
import './ChatView.css'

const WELCOME_MESSAGE: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: '👋 Welcome to Research Toolbox! I\'m your research assistant. I can help you manage experiments, analyze results, and plan next steps. What would you like to work on?',
    timestamp: new Date().toISOString(),
}

export function ChatView() {
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')

        // TODO: Connect to backend chat API
        setTimeout(() => {
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I received your message: "${userMessage.content}". Backend chat integration is coming soon!`,
                timestamp: new Date().toISOString(),
            }
            setMessages((prev) => [...prev, assistantMessage])
        }, 500)
    }

    return (
        <div className="chat">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble ${msg.role}`}>
                        <div className="bubble-role">
                            {msg.role === 'assistant' ? '🤖' : '👤'} {msg.role}
                        </div>
                        <div className="bubble-content">{msg.content}</div>
                        <div className="bubble-time">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input-bar">
                <input
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about your research..."
                />
                <button className="chat-send" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    )
}

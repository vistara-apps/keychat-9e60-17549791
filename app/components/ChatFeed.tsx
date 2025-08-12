
'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '../types'
import { Send, Lock } from 'lucide-react'

interface ChatFeedProps {
  messages: ChatMessage[]
  hasAccess: boolean
  onSendMessage?: (content: string) => void
}

export function ChatFeed({ messages, hasAccess, onSendMessage }: ChatFeedProps) {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !hasAccess || !onSendMessage) return
    
    onSendMessage(newMessage.trim())
    setNewMessage('')
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!hasAccess) {
    return (
      <div className="card text-center py-12">
        <Lock className="w-12 h-12 mx-auto mb-4 text-textSecondary" />
        <h3 className="text-heading font-semibold mb-2">Chat Access Required</h3>
        <p className="text-body text-textSecondary">
          Purchase a key to join this exclusive chat community
        </p>
      </div>
    )
  }

  return (
    <div className="card p-0 flex flex-col h-96">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Community Chat</h3>
        <p className="text-caption text-textSecondary">
          {messages.length} messages
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-textSecondary py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-caption font-medium">
                  User {message.userId.slice(-4)}
                </span>
                <span className="text-caption text-textSecondary">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-body">{message.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 input-field"
            maxLength={280}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="btn-primary p-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-caption text-textSecondary mt-2 text-right">
          {newMessage.length}/280
        </div>
      </div>
    </div>
  )
}

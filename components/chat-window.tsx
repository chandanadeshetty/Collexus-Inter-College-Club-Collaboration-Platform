"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Smile } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

interface ChatWindowProps {
  recipientName: string
  messages: Message[]
  onSendMessage: (message: string) => void
}

export function ChatWindow({ recipientName, messages, onSendMessage }: ChatWindowProps) {
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4 glass">
        <h3 className="font-semibold text-foreground">{recipientName}</h3>
        <p className="text-xs text-muted-foreground">Online</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isOwn
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-card border border-border/50 text-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border/50 px-4 py-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 glass space-y-3">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsTyping(false)}
            placeholder="Type a message..."
            className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Smile className="w-5 h-5" />
          </Button>
          <Button onClick={handleSend} className="bg-primary hover:bg-primary/90 text-primary-foreground" size="icon">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

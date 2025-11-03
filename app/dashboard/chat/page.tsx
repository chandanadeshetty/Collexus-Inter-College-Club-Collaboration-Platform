"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChatWindow } from "@/components/chat-window"
import { Search, Plus } from "lucide-react"

interface Conversation {
  id: number
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  avatar: string
  type: "direct" | "group"
}

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "See you at the event!",
    timestamp: "2m ago",
    unread: 0,
    avatar: "AJ",
    type: "direct",
  },
  {
    id: 2,
    name: "Tech Club Group",
    lastMessage: "Don't forget: Workshop tomorrow!",
    timestamp: "15m ago",
    unread: 3,
    avatar: "TC",
    type: "group",
  },
  {
    id: 3,
    name: "Bob Smith",
    lastMessage: "Let's catch up soon",
    timestamp: "1h ago",
    unread: 0,
    avatar: "BS",
    type: "direct",
  },
]

const MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 1, sender: "Alice", content: "Hey! How are you?", timestamp: "10:30 AM", isOwn: false },
    { id: 2, sender: "You", content: "Great! Just finished the workshop.", timestamp: "10:35 AM", isOwn: true },
    { id: 3, sender: "Alice", content: "See you at the event!", timestamp: "10:40 AM", isOwn: false },
  ],
  2: [
    { id: 1, sender: "Admin", content: "Welcome to Tech Club!", timestamp: "9:00 AM", isOwn: false },
    { id: 2, sender: "You", content: "Thanks! Excited to join!", timestamp: "9:05 AM", isOwn: true },
  ],
  3: [
    { id: 1, sender: "Bob", content: "Hey man!", timestamp: "11:00 AM", isOwn: false },
    { id: 2, sender: "You", content: "Hey Bob! What's up?", timestamp: "11:05 AM", isOwn: true },
  ],
}

export default function ChatPage() {
  const [search, setSearch] = useState("")
  const [selectedConv, setSelectedConv] = useState<number>(1)
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [messages, setMessages] = useState<Message[]>(MESSAGES[1])

  const filteredConversations = conversations.filter((conv) => conv.name.toLowerCase().includes(search.toLowerCase()))

  const selectConversation = (id: number) => {
    setSelectedConv(id)
    setMessages(MESSAGES[id] || [])
  }

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    }
    setMessages([...messages, newMessage])
  }

  const selectedConversation = conversations.find((c) => c.id === selectedConv)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Connect and collaborate with your network</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <Card className="bg-card/50 border-border/50 glass rounded-lg flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 bg-background border-border text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-9">
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
          </div>

          <div className="flex-1 overflow-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full p-4 border-b border-border/30 text-left transition-colors ${
                  selectedConv === conv.id ? "bg-primary/10 border-primary" : "hover:bg-background/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-semibold text-primary-foreground flex-shrink-0 mt-1">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-medium text-foreground truncate">{conv.name}</h3>
                      {conv.unread > 0 && (
                        <span className="px-2 py-0.5 bg-secondary text-primary-foreground text-xs font-semibold rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{conv.timestamp}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        {selectedConversation && (
          <div className="lg:col-span-2 rounded-lg overflow-hidden">
            <Card className="bg-card/50 border-border/50 glass h-full flex flex-col rounded-lg">
              <ChatWindow
                recipientName={selectedConversation.name}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

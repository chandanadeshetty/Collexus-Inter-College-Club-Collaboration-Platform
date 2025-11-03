"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Plus, MapPin, Users, Calendar, Clock } from "lucide-react"

interface Event {
  id: number
  title: string
  club: string
  date: string
  time: string
  location: string
  attendees: number
  capacity: number
  description: string
  tags: string[]
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: "Web Development Workshop",
    club: "Tech Club",
    date: "Nov 15, 2024",
    time: "10:00 AM",
    location: "IIT Delhi - Lab 201",
    attendees: 45,
    capacity: 100,
    description: "Learn React, Next.js, and modern web development",
    tags: ["React", "Web Dev", "Beginner"],
  },
  {
    id: 2,
    title: "Startup Pitch Competition",
    club: "Entrepreneurship Cell",
    date: "Nov 18, 2024",
    time: "2:00 PM",
    location: "BITS Pilani - Auditorium",
    attendees: 120,
    capacity: 150,
    description: "Pitch your startup idea and win prizes",
    tags: ["Startup", "Networking", "Competition"],
  },
  {
    id: 3,
    title: "Debate Championship",
    club: "Debate Society",
    date: "Nov 20, 2024",
    time: "6:00 PM",
    location: "NIT Trichy - Main Hall",
    attendees: 80,
    capacity: 200,
    description: "Inter-college debate competition",
    tags: ["Debate", "Competition", "Speaking"],
  },
  {
    id: 4,
    title: "AI & Machine Learning Summit",
    club: "Tech Club",
    date: "Nov 22, 2024",
    time: "11:00 AM",
    location: "Virtual",
    attendees: 300,
    capacity: 500,
    description: "Learn about AI trends and applications",
    tags: ["AI", "ML", "Tech"],
  },
]

export default function EventsPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<"upcoming" | "live">("upcoming")
  const [rsvped, setRsvped] = useState<number[]>([1])

  const filteredEvents = EVENTS.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.club.toLowerCase().includes(search.toLowerCase()),
  )

  const toggleRsvp = (id: number) => {
    setRsvped((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">Discover and RSVP to events happening around you</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search events or clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setTab("upcoming")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              tab === "upcoming"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setTab("live")}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              tab === "live"
                ? "text-secondary border-secondary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            Live Now
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="bg-card/50 border-border/50 glass p-6 rounded-lg hover:bg-card/70 transition-colors overflow-hidden"
          >
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.club}</p>
                </div>
                <div className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded">
                  {event.attendees < event.capacity ? "Available" : "Full"}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

              {/* Event Details */}
              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-secondary" />
                  {event.attendees} / {event.capacity} attending
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-background/50 text-xs text-muted-foreground rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="mb-4">
              <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                />
              </div>
            </div>

            {/* RSVP Button */}
            <Button
              onClick={() => toggleRsvp(event.id)}
              variant={rsvped.includes(event.id) ? "default" : "outline"}
              className={`w-full ${
                rsvped.includes(event.id)
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "border-border text-foreground hover:bg-card"
              }`}
              disabled={event.attendees >= event.capacity && !rsvped.includes(event.id)}
            >
              {rsvped.includes(event.id) ? "✓ RSVP'd" : "RSVP Now"}
            </Button>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found matching your search.</p>
        </div>
      )}
    </div>
  )
}

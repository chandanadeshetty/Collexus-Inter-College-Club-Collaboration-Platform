"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Calendar, Briefcase, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    clubs: 12,
    events: 8,
    jobs: 24,
    connections: 156,
  })

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glass p-8 rounded-lg border border-border/50">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Stay connected with your clubs, discover new events, and explore career opportunities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50 glass p-6 rounded-lg hover:bg-card/70 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Clubs Joined</p>
              <p className="text-3xl font-bold text-foreground">{stats.clubs}</p>
            </div>
            <Users className="w-12 h-12 text-primary/30" />
          </div>
        </Card>

        <Card className="bg-card/50 border-border/50 glass p-6 rounded-lg hover:bg-card/70 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Upcoming Events</p>
              <p className="text-3xl font-bold text-foreground">{stats.events}</p>
            </div>
            <Calendar className="w-12 h-12 text-secondary/30" />
          </div>
        </Card>

        <Card className="bg-card/50 border-border/50 glass p-6 rounded-lg hover:bg-card/70 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Job Opportunities</p>
              <p className="text-3xl font-bold text-foreground">{stats.jobs}</p>
            </div>
            <Briefcase className="w-12 h-12 text-primary/30" />
          </div>
        </Card>

        <Card className="bg-card/50 border-border/50 glass p-6 rounded-lg hover:bg-card/70 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Connections</p>
              <p className="text-3xl font-bold text-foreground">{stats.connections}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-secondary/30" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-lg border border-border/50">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { title: "Joined Tech Club", time: "2 hours ago" },
              { title: "Registered for Python Workshop", time: "1 day ago" },
              { title: "Applied for SDE Internship", time: "3 days ago" },
            ].map((activity, idx) => (
              <div key={idx} className="p-3 bg-background/50 rounded-lg border border-border/30">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-lg border border-border/50">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link href="/dashboard/clubs">
              <Button
                variant="outline"
                className="w-full justify-start border-border text-foreground hover:bg-card bg-transparent"
              >
                Browse All Clubs
              </Button>
            </Link>
            <Link href="/dashboard/events">
              <Button
                variant="outline"
                className="w-full justify-start border-border text-foreground hover:bg-card bg-transparent"
              >
                Explore Events
              </Button>
            </Link>
            <Link href="/dashboard/jobs">
              <Button
                variant="outline"
                className="w-full justify-start border-border text-foreground hover:bg-card bg-transparent"
              >
                View Job Postings
              </Button>
            </Link>
            <Link href="/dashboard/chat">
              <Button
                variant="outline"
                className="w-full justify-start border-border text-foreground hover:bg-card bg-transparent"
              >
                Open Messages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

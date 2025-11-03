"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, Users, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface Report {
  id: number
  type: string
  reporter: string
  target: string
  reason: string
  status: "pending" | "resolved" | "dismissed"
  date: string
}

const ANALYTICS = {
  totalUsers: 45230,
  activeClubs: 342,
  eventsHeld: 1256,
  jobPostings: 892,
  reportsPending: 23,
}

const REPORTS: Report[] = [
  {
    id: 1,
    type: "Inappropriate Content",
    reporter: "User123",
    target: "Tech Club Post",
    reason: "Offensive language",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: 2,
    type: "Spam",
    reporter: "User456",
    target: "Job Posting",
    reason: "Suspected scam",
    status: "resolved",
    date: "1 day ago",
  },
  {
    id: 3,
    type: "Harassment",
    reporter: "User789",
    target: "User Profile",
    reason: "Bullying behavior",
    status: "pending",
    date: "3 hours ago",
  },
]

export default function AdminPanel() {
  const [reports, setReports] = useState(REPORTS)

  const handleReportAction = (id: number, action: "resolve" | "dismiss") => {
    setReports(
      reports.map((r) => (r.id === id ? { ...r, status: action === "resolve" ? "resolved" : "dismissed" } : r)),
    )
  }

  const pendingReports = reports.filter((r) => r.status === "pending")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage platform, moderate content, and view analytics</p>
      </div>

      {/* Analytics Grid */}
      <div className="grid md:grid-cols-5 gap-4">
        {[
          { label: "Total Users", value: ANALYTICS.totalUsers.toLocaleString(), icon: Users },
          { label: "Active Clubs", value: ANALYTICS.activeClubs, icon: TrendingUp },
          { label: "Events Held", value: ANALYTICS.eventsHeld, icon: BarChart3 },
          { label: "Job Postings", value: ANALYTICS.jobPostings, icon: BarChart3 },
          { label: "Pending Reports", value: ANALYTICS.reportsPending, icon: AlertCircle, color: "destructive" },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-card/50 border-border/50 glass p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-center justify-between">
                <p
                  className={`text-2xl font-bold ${stat.color === "destructive" ? "text-destructive" : "text-foreground"}`}
                >
                  {stat.value}
                </p>
                <Icon
                  className={`w-8 h-8 ${stat.color === "destructive" ? "text-destructive/30" : "text-primary/30"}`}
                />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Reports Section */}
      <div className="glass p-6 rounded-lg border border-border/50">
        <h2 className="text-xl font-semibold text-foreground mb-4">Moderation Queue</h2>
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-start justify-between p-4 bg-background/50 rounded-lg border border-border/30"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{report.type}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      report.status === "pending"
                        ? "bg-destructive/20 text-destructive"
                        : report.status === "resolved"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reported by {report.reporter} about {report.target}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Reason: {report.reason}</p>
                <p className="text-xs text-muted-foreground/60 mt-2">{report.date}</p>
              </div>

              {report.status === "pending" && (
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleReportAction(report.id, "resolve")}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Resolve
                  </Button>
                  <Button
                    onClick={() => handleReportAction(report.id, "dismiss")}
                    size="sm"
                    variant="outline"
                    className="border-border text-foreground hover:bg-card gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    Dismiss
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-card h-12 font-medium bg-transparent"
        >
          Review Pending Clubs
        </Button>
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-card h-12 font-medium bg-transparent"
        >
          View User Analytics
        </Button>
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-card h-12 font-medium bg-transparent"
        >
          Export Reports
        </Button>
      </div>
    </div>
  )
}

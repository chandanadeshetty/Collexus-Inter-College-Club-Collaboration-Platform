"use client"

import { useEffect, useState } from "react"
import { Bell, Search, UserIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DashboardUser {
  name: string
  role: string
  college: string
}

export function DashboardHeader() {
  const [user, setUser] = useState<DashboardUser | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <header className="fixed top-0 right-0 left-64 md:left-64 h-16 bg-card border-b border-border glass flex items-center justify-between px-6 z-30">
      <div className="flex-1 flex items-center gap-4 max-w-md">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search clubs, events, people..."
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
        </Button>

        <div className="flex items-center gap-2 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.role || "Student"}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}

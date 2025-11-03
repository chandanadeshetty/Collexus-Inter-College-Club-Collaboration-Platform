"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Users, Calendar, MessageSquare, Briefcase, Settings, LogOut, Menu, X, Shield } from "lucide-react"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/clubs", label: "Clubs", icon: Users },
  { href: "/dashboard/events", label: "Events", icon: Calendar },
  { href: "/dashboard/chat", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/jobs", label: "Jobs & Internships", icon: Briefcase },
  { href: "/dashboard/admin", label: "Admin Panel", icon: Shield, adminOnly: true },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

interface User {
  role: string
}

export function SidebarNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  const filteredNavItems = NAV_ITEMS.filter((item) => {
    if (item.adminOnly) {
      return user?.role === "Admin" || user?.role === "Super Admin" || user?.role === "Institution"
    }
    return true
  })

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border glass transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-sidebar-border">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Collexus
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64" />
    </>
  )
}

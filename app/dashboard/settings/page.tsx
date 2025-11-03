"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bell, Lock, User, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    email: "student@example.com",
    name: "Alice Johnson",
    phone: "+91 98765 43210",
    college: "IIT Delhi",
    skills: "React, JavaScript, Python",
  })

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-card/50 border-border/50 glass p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
            <Input
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address</label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
            <Input
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">College</label>
            <Input
              value={settings.college}
              disabled
              className="bg-input border-border text-foreground/50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Skills</label>
            <Input
              value={settings.skills}
              onChange={(e) => setSettings({ ...settings, skills: e.target.value })}
              placeholder="Add skills separated by commas"
              className="bg-input border-border text-foreground"
            />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="bg-card/50 border-border/50 glass p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Current Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-input border-border text-foreground pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">New Password</label>
            <Input type="password" placeholder="••••••••" className="bg-input border-border text-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm New Password</label>
            <Input type="password" placeholder="••••••••" className="bg-input border-border text-foreground" />
          </div>
          <Button variant="outline" className="w-full border-border text-foreground hover:bg-card bg-transparent">
            Change Password
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-card/50 border-border/50 glass p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>
        <div className="space-y-3">
          {[
            { label: "Email Notifications", enabled: true },
            { label: "Club Updates", enabled: true },
            { label: "Event Reminders", enabled: true },
            { label: "Job Alerts", enabled: false },
            { label: "Marketing Emails", enabled: false },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <p className="text-foreground">{notif.label}</p>
              <input
                type="checkbox"
                defaultChecked={notif.enabled}
                className="w-4 h-4 rounded cursor-pointer accent-primary"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-destructive/5 border border-destructive/20 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-destructive mb-3">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
        >
          Delete Account
        </Button>
      </Card>
    </div>
  )
}

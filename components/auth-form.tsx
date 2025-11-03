"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ROLES = ["Student", "Club Admin", "Recruiter", "Institution", "Super Admin"]
const COLLEGES = ["IIT Delhi", "IIT Mumbai", "NIT Trichy", "NIT Allahabad", "BITS Pilani", "Other"]

interface AuthFormProps {
  type: "login" | "register"
  onSubmit: (data: any) => Promise<void>
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "Student",
    college: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (type === "register") {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          setLoading(false)
          return
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters")
          setLoading(false)
          return
        }
      }

      await onSubmit(formData)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex gap-2 items-start p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <span className="text-sm text-destructive">⚠️ {error}</span>
          </div>
        )}

        {type === "register" && (
          <>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Role</label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role} className="text-foreground">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">College/Institution</label>
              <Select value={formData.college} onValueChange={(value) => handleSelectChange("college", value)}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {COLLEGES.map((college) => (
                    <SelectItem key={college} value={college} className="text-foreground">
                      {college}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
          <Input
            type="password"
            name="password"
            placeholder={type === "login" ? "••••••••" : "Min 6 characters"}
            value={formData.password}
            onChange={handleChange}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>

        {type === "register" && (
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10"
        >
          {loading ? <>⏳ Processing...</> : type === "login" ? "Login" : "Create Account"}
        </Button>
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleRegister = async (data: any) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          college: data.college,
        }),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const result = await response.json()
      localStorage.setItem("token", result.token)
      localStorage.setItem("user", JSON.stringify(result.user))
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center px-6">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          ← Back to Home
        </Link>

        <div className="glass p-8 rounded-lg border border-border/50 backdrop-blur">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Create Account</h1>
          <p className="text-muted-foreground mb-8">Join Collexus and connect with students worldwide</p>

          <AuthForm type="register" onSubmit={handleRegister} />

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

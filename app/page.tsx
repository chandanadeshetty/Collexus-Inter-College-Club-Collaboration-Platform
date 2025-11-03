"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Collexus
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur">
            <span className="text-sm text-muted-foreground">Developed by group 12</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 leading-tight">
            Connect. Collaborate.{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Join thousands of students across institutions. Build meaningful connections, discover opportunities, and
            grow together in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-card bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 md:px-12 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500K+</div>
            <p className="text-sm text-muted-foreground">Active Students</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">50+</div>
            <p className="text-sm text-muted-foreground">Institutions</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <p className="text-sm text-muted-foreground">Clubs & Groups</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">100K+</div>
            <p className="text-sm text-muted-foreground">Opportunities</p>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Plus, Briefcase, MapPin, DollarSign, Clock, Bookmark, Share2 } from "lucide-react"

interface Job {
  id: number
  title: string
  company: string
  type: "Internship" | "Full-time" | "Part-time"
  location: string
  salary?: string
  postedDate: string
  applicants: number
  skills: string[]
  description: string
}

const JOBS: Job[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Google",
    type: "Internship",
    location: "Bangalore, India",
    salary: "₹50,000 - ₹80,000/month",
    postedDate: "2 days ago",
    applicants: 234,
    skills: ["React", "JavaScript", "CSS"],
    description: "Join our team to build scalable web applications with React and modern JavaScript.",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Microsoft",
    type: "Full-time",
    location: "Hyderabad, India",
    salary: "₹25L - ₹35L/year",
    postedDate: "1 day ago",
    applicants: 456,
    skills: ["Node.js", "React", "TypeScript", "MongoDB"],
    description: "Build cloud-native applications using modern tech stack. Competitive salary and benefits.",
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "Amazon",
    type: "Internship",
    location: "Virtual",
    salary: "₹60,000 - ₹90,000/month",
    postedDate: "5 days ago",
    applicants: 345,
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Work on real-world ML problems and build data pipelines at scale.",
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "Uber",
    type: "Full-time",
    location: "Delhi, India",
    salary: "₹30L - ₹45L/year",
    postedDate: "3 days ago",
    applicants: 267,
    skills: ["Java", "Python", "AWS", "Microservices"],
    description: "Build robust backend systems handling millions of requests daily.",
  },
]

export default function JobsPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "internship" | "full-time">("all")
  const [saved, setSaved] = useState<number[]>([])
  const [applied, setApplied] = useState<number[]>([])

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "internship" && job.type === "Internship") ||
      (filter === "full-time" && job.type === "Full-time")
    return matchesSearch && matchesFilter
  })

  const toggleSave = (id: number) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const toggleApply = (id: number) => {
    setApplied((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Jobs & Internships</h1>
          <p className="text-muted-foreground mt-1">Discover career opportunities from top companies</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          Post Job
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search jobs, companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", "internship", "full-time"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border/50 text-foreground hover:bg-card/80"
              }`}
            >
              {f === "all" ? "All Jobs" : f === "internship" ? "Internships" : "Full-time"}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card
            key={job.id}
            className="bg-card/50 border-border/50 glass p-6 rounded-lg hover:bg-card/70 transition-colors"
          >
            <div className="grid md:grid-cols-3 gap-4">
              {/* Job Details */}
              <div className="md:col-span-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    <p className="text-foreground text-sm font-medium mt-1">{job.company}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.type === "Internship"
                        ? "bg-secondary/20 text-secondary"
                        : job.type === "Full-time"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {job.location}
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      {job.salary}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {job.postedDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-secondary" />
                    {job.applicants} applicants
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-background/50 text-xs text-muted-foreground rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 justify-between md:items-end">
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    onClick={() => toggleSave(job.id)}
                    variant="outline"
                    size="icon"
                    className={`${
                      saved.includes(job.id)
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${saved.includes(job.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border text-muted-foreground hover:text-foreground bg-transparent"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => toggleApply(job.id)}
                  className={`w-full ${
                    applied.includes(job.id)
                      ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {applied.includes(job.id) ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

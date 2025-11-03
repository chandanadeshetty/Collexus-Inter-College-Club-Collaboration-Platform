import { type NextRequest, NextResponse } from "next/server"

const jobs = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Google",
    type: "Internship",
    location: "Bangalore",
    salary: "₹50,000 - ₹80,000/month",
    skills: ["React", "JavaScript"],
    applicants: 234,
    description: "Join our team to build web applications",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, company, description, location, salary, jobType, skills } = await request.json()

    if (!title || !company || !description) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
    }

    const newJob = {
      id: Date.now().toString(),
      title,
      company,
      description,
      location,
      salary,
      type: jobType,
      skills,
      applicants: 0,
    }

    jobs.push(newJob)

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job posting" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Mock user profile
    const userProfile = {
      id,
      name: "Akash verma",
      email: "av24csb0a05@student.ntiw,ac.in",
      college: "IIT Delhi",
      role: "Student",
      skills: ["React", "JavaScript", "Python"],
      clubs: 12,
      connections: 156,
      eventsAttended: 8,
      bio: "Passionate about web development and tech communities",
      avatar: "/avatars/alice.jpg",
    }

    return NextResponse.json(userProfile)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await request.json()

    // Mock update
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      updates,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, college } = await request.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user exists
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash: "hashed_" + password,
      role,
      college,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Mock token
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")

    return NextResponse.json(
      {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          college: newUser.college,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

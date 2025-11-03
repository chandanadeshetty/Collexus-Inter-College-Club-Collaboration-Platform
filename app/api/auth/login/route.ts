import { type NextRequest, NextResponse } from "next/server"

// Mock user database - replace with real database
const users = [
  {
    id: "1",
    email: "av24csb0a05@student.nitw.ac.in",
    passwordHash: "akash123",
    name: "Akash verma",
    role: "Student",
    college: "IIT Delhi",
  },
   {
    id: "2",
    email: "admin@collexus.co.in",
    passwordHash: "akash123",
    name: "Admin",
    role: "Super Admin",
    college: "ADMIN",
  },
   {
    id: "3",
    email: "normal.admin@gmail.com",
    passwordHash: "akash123",
    name: "Admin",
    role: "Admin",
    college: "ADMIN",
  },
   {
    id: "4",
    email: "recuriter@google.com",
    passwordHash: "akash123",
    name: "Akash verma",
    role: "Recuriter",
    college: "IIT Delhi",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Mock authentication
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Mock token generation
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        college: user.college,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

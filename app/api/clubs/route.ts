import { type NextRequest, NextResponse } from "next/server"

// Mock club database
const clubs = [
  {
    id: "1",
    name: "Tech Club",
    description: "For tech enthusiasts",
    members: 234,
    admins: ["user1"],
    events: 5,
    logo: "/clubs/tech.jpg",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(clubs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clubs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, logo } = await request.json()

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description required" }, { status: 400 })
    }

    const newClub = {
      id: Date.now().toString(),
      name,
      description,
      members: 1,
      admins: ["current-user"],
      events: 0,
      logo,
    }

    clubs.push(newClub)

    return NextResponse.json(newClub, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create club" }, { status: 500 })
  }
}

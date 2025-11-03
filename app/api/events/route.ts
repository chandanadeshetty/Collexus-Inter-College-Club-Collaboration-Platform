import { type NextRequest, NextResponse } from "next/server"

const events = [
  {
    id: "1",
    title: "Web Dev Workshop",
    clubId: "1",
    date: "2024-11-15",
    time: "10:00 AM",
    location: "IIT Delhi - Lab 201",
    capacity: 100,
    attendees: 45,
    description: "Learn React and modern web development",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, clubId, date, time, location, capacity } = await request.json()

    if (!title || !clubId || !date) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      clubId,
      date,
      time,
      location,
      capacity,
      attendees: 0,
    }

    events.push(newEvent)

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

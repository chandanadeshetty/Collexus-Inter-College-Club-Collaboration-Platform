import { type NextRequest, NextResponse } from "next/server"

const reports = [
  {
    id: "1",
    type: "Inappropriate Content",
    reporter: "User123",
    target: "Tech Club Post",
    reason: "Offensive language",
    status: "pending",
    date: "2024-11-10",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(reports)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { reporterId, targetId, type, reason } = await request.json()

    if (!reporterId || !targetId || !type) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
    }

    const newReport = {
      id: Date.now().toString(),
      type,
      reporter: reporterId,
      target: targetId,
      reason,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    }

    reports.push(newReport)

    return NextResponse.json(newReport, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 })
  }
}

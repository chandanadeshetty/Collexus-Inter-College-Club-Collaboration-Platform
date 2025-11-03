import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      jobId: id,
      userId,
      message: "Application submitted successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to apply for job" }, { status: 500 })
  }
}

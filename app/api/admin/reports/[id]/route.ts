import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { status, action } = await request.json()

    if (!status || !["resolved", "dismissed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      reportId: id,
      status,
      action,
      message: `Report marked as ${status}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 })
  }
}

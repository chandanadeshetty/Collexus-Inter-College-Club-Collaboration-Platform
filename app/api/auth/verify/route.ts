import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 })
    }

    // Verify JWT token (mock implementation)
    const decoded = Buffer.from(token, "base64").toString("utf-8")
    const [email] = decoded.split(":")

    return NextResponse.json({
      valid: true,
      email,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}

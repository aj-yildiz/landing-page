import { NextResponse } from "next/server"

/**
 * This API route provides an alternative way to connect to Google Sheets
 * using the environment variable GOOGLE_SCRIPT_URL
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Get the Google Script URL from environment variables
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL

    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL environment variable is not set")
      return NextResponse.json(
        {
          success: false,
          message: "Google Script URL not configured",
        },
        { status: 500 },
      )
    }

    // Send the email to the Google Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: "API Route",
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to submit to Google Sheet: ${response.status}`)
    }

    // Log the successful submission
    console.log(`API route successfully sent email to Google Sheet: ${email}`)

    return NextResponse.json({
      success: true,
      message: "Email saved successfully to Google Sheet",
    })
  } catch (error) {
    console.error("Error in Google Sheets API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save email to Google Sheet",
      },
      { status: 500 },
    )
  }
}

import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

/**
 * API route to get all waitlist emails (protected, admin only)
 * This is useful for viewing all collected emails
 */
export async function GET(request: Request) {
  try {
    // In a real app, you would add authentication here
    // to ensure only admins can access this endpoint

    // Get the path to the data file
    const filePath = path.join(process.cwd(), "data", "waitlist-emails.json")

    // Read the file
    let emails = []
    try {
      const fileContent = await fs.readFile(filePath, "utf8")
      emails = JSON.parse(fileContent)
    } catch (err) {
      // File might not exist yet
      console.error("Error reading waitlist emails file:", err)
    }

    // Return the emails
    return NextResponse.json({
      success: true,
      count: emails.length,
      emails,
    })
  } catch (error) {
    console.error("Error in waitlist API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve waitlist emails",
      },
      { status: 500 },
    )
  }
}

/**
 * API route to add an email to the waitlist
 * This can be used as an alternative to the server action
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Create a data object with the email and timestamp
    const data = {
      email,
      timestamp: new Date().toISOString(),
      source: "API Route",
    }

    // Get the path to the data directory
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "waitlist-emails.json")

    // Create the data directory if it doesn't exist
    try {
      await fs.mkdir(dataDir, { recursive: true })
    } catch (err) {
      // Directory might already exist, that's fine
    }

    // Read existing data or create an empty array
    let emails = []
    try {
      const fileContent = await fs.readFile(filePath, "utf8")
      emails = JSON.parse(fileContent)
    } catch (err) {
      // File might not exist yet, that's fine
    }

    // Add the new email
    emails.push(data)

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(emails, null, 2), "utf8")

    // Return success
    return NextResponse.json({
      success: true,
      message: "Email added to waitlist",
    })
  } catch (error) {
    console.error("Error in waitlist API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add email to waitlist",
      },
      { status: 500 },
    )
  }
}

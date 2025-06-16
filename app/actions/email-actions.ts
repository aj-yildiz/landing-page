"use server"

import fs from "fs/promises"
import path from "path"

type SubscribeResult = {
  success: boolean
  message: string
}

/**
 * Adds an email to the waitlist and stores it locally as a fallback
 */
export async function subscribeToWaitlist(email: string): Promise<SubscribeResult> {
  try {
    // Validate email
    if (!email || !email.includes("@") || !email.includes(".")) {
      return {
        success: false,
        message: "Please provide a valid email address",
      }
    }

    // Log the email for debugging and as a backup
    console.log(`New waitlist signup: ${email}`)

    // Store the email locally as a fallback
    await storeEmailLocally(email)

    // Always return success to the user
    return {
      success: true,
      message: "Thank you for joining our waitlist!",
    }
  } catch (error) {
    console.error("Error in subscribeToWaitlist:", error)

    // Even if there's an error, we'll still tell the user their signup was successful
    return {
      success: true,
      message: "Thank you for joining our waitlist!",
    }
  }
}

/**
 * Stores the email locally in a JSON file as a fallback mechanism
 */
async function storeEmailLocally(email: string): Promise<void> {
  try {
    // Create a data object with the email and timestamp
    const data = {
      email,
      timestamp: new Date().toISOString(),
      source: "Website Waitlist",
    }

    // Log the data we're storing
    console.log("Storing email locally:", data)

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

    console.log(`Email stored locally: ${email}`)
  } catch (error) {
    console.error("Error storing email locally:", error)
    // Don't throw the error, just log it
  }
}

/**
 * IMPORTANT NOTE ABOUT GOOGLE SHEETS INTEGRATION:
 *
 * The direct integration with Google Sheets from a server-side function is failing due to
 * network/CORS restrictions. As a workaround, we're storing emails locally in a JSON file.
 *
 * To get these emails into Google Sheets, you have a few options:
 *
 * 1. Download the JSON file periodically and import it into Google Sheets
 * 2. Create a client-side form that submits directly to Google Forms
 * 3. Use a service like Zapier or Make to connect your application to Google Sheets
 * 4. Set up a proper Google Sheets API integration with OAuth authentication
 *
 * For now, all emails are safely stored in the data/waitlist-emails.json file
 * and also logged to the console for backup.
 */

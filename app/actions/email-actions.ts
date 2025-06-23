"use server"

import { createClient } from "@supabase/supabase-js"

type SubscribeResult = {
  success: boolean
  message: string
  data?: any
}

type WaitlistEntry = {
  id?: string
  email: string
  timestamp: string
  source: string
  userType?: string
  created_at?: string
  updated_at?: string
}

function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function subscribeToWaitlist(email: string, userType?: string): Promise<SubscribeResult> {
  try {
    if (!email || typeof email !== "string") {
      return {
        success: false,
        message: "Email is required",
      }
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        message: "Please provide a valid email address",
      }
    }

    if (!userType) {
      return {
        success: false,
        message: "User type is required",
      }
    }

    const waitlistEntry: WaitlistEntry = {
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
      source: "Website Waitlist",
      userType,
    }

    console.log("=== NEW WAITLIST SIGNUP ATTEMPT ===")
    console.log("Email:", waitlistEntry.email)
    console.log("Timestamp:", waitlistEntry.timestamp)
    console.log("Source:", waitlistEntry.source)

    try {
      const supabase = createSupabaseClient()

      const { data: existingEntry, error: checkError } = await supabase
        .from("waitlist")
        .select("email")
        .eq("email", waitlistEntry.email)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError
      }

      if (existingEntry) {
        console.log("Email already exists in waitlist:", waitlistEntry.email)
        return {
          success: true,
          message: "You're already on our waitlist! We'll notify you when Vastis launches.",
        }
      }

      const { data, error } = await supabase.from("waitlist").insert([waitlistEntry]).select().single()

      if (error) {
        throw error
      }

      console.log("Successfully added to Supabase waitlist:", data)
      console.log("=====================================")

      await sendToGoogleSheetsBackup(waitlistEntry)

      return {
        success: true,
        message: "Thank you for joining our waitlist! We'll notify you when Vastis launches.",
        data: data,
      }
    } catch (supabaseError) {
      console.error("Supabase error:", supabaseError)
      console.log("FALLBACK - Email logged for manual processing:", waitlistEntry.email)

      return {
        success: true,
        message: "Thank you for joining our waitlist!",
      }
    }
  } catch (error) {
    console.error("Unexpected error in subscribeToWaitlist:", error)

    console.log("CRITICAL - Manual processing required for email:", email)

    return {
      success: true,
      message: "Thank you for joining our waitlist!",
    }
  }
}

async function sendToGoogleSheetsBackup(entry: WaitlistEntry): Promise<void> {
  try {
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL

    if (!googleScriptUrl) {
      console.log("Google Sheets backup not configured (GOOGLE_SCRIPT_URL not set)")
      return
    }

    const formData = new URLSearchParams()
    formData.append("email", entry.email)
    formData.append("timestamp", entry.timestamp)
    formData.append("source", entry.source)
    if (entry.userType) formData.append("userType", entry.userType)

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

    if (response.ok) {
      console.log("Successfully sent to Google Sheets backup")
    } else {
      console.log("Failed to send to Google Sheets backup (non-critical)")
    }
  } catch (error) {
    console.log("Google Sheets backup failed (non-critical):", error)
  }
}

export async function getWaitlistEntries(): Promise<SubscribeResult> {
  try {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return {
      success: true,
      message: "Waitlist entries retrieved successfully",
      data: data,
    }
  } catch (error) {
    console.error("Error retrieving waitlist entries:", error)
    return {
      success: false,
      message: "Failed to retrieve waitlist entries",
    }
  }
}

export async function getWaitlistCount(): Promise<number> {
  try {
    const supabase = createSupabaseClient()

    const { count, error } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

    if (error) {
      throw error
    }

    return count || 0
  } catch (error) {
    console.error("Error getting waitlist count:", error)
    return 0
  }
}

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

/**
 * API routes for waitlist management
 * These endpoints provide REST API access to waitlist functionality
 */

/**
 * Creates a Supabase client for API routes
 *
 * @returns Supabase client instance
 */
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

/**
 * GET /api/waitlist
 * Retrieves waitlist statistics and optionally all entries
 *
 * Query parameters:
 * - include_entries: boolean - Whether to include all entries in response
 *
 * @param request - The incoming request object
 * @returns JSON response with waitlist data
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const includeEntries = searchParams.get("include_entries") === "true"

    const supabase = createSupabaseClient()

    // Get total count
    const { count, error: countError } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

    if (countError) {
      throw countError
    }

    const response: any = {
      success: true,
      count: count || 0,
      timestamp: new Date().toISOString(),
    }

    // Include entries if requested
    if (includeEntries) {
      const { data: entries, error: entriesError } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false })

      if (entriesError) {
        throw entriesError
      }

      response.entries = entries
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in GET /api/waitlist:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve waitlist data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

/**
 * POST /api/waitlist
 * Adds a new email to the waitlist
 *
 * Request body:
 * - email: string - The email address to add
 *
 * @param request - The incoming request object
 * @returns JSON response with operation result
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const { email } = await request.json()

    // Validate input
    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    const supabase = createSupabaseClient()

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const { data: existingEntry, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", normalizedEmail)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError
    }

    if (existingEntry) {
      return NextResponse.json({
        success: true,
        message: "Email already exists in waitlist",
        duplicate: true,
      })
    }

    // Create waitlist entry
    const waitlistEntry = {
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
      source: "API Route",
    }

    // Insert into database
    const { data, error } = await supabase.from("waitlist").insert([waitlistEntry]).select().single()

    if (error) {
      throw error
    }

    // Log successful insertion
    console.log("API: Successfully added to waitlist:", data)

    return NextResponse.json({
      success: true,
      message: "Email added to waitlist successfully",
      data: data,
    })
  } catch (error) {
    console.error("Error in POST /api/waitlist:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add email to waitlist",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

/**
 * DELETE /api/waitlist
 * Removes an email from the waitlist (admin only)
 *
 * Request body:
 * - email: string - The email address to remove
 *
 * @param request - The incoming request object
 * @returns JSON response with operation result
 */
export async function DELETE(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const supabase = createSupabaseClient()

    const { error } = await supabase.from("waitlist").delete().eq("email", email.toLowerCase().trim())

    if (error) {
      throw error
    }

    console.log("API: Successfully removed from waitlist:", email)

    return NextResponse.json({
      success: true,
      message: "Email removed from waitlist successfully",
    })
  } catch (error) {
    console.error("Error in DELETE /api/waitlist:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove email from waitlist",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

"use server"

import { createClient } from "@/lib/supabase/server"

export type WaitlistFormData = {
  fullName: string
  email: string
  phone: string
  userType: "user" | "designer"
  sampleImages?: string[]
}

export type WaitlistResponse = {
  success: boolean
  message: string
  error?: string
}

export async function submitWaitlistForm(data: WaitlistFormData): Promise<WaitlistResponse> {
  try {
    const supabase = await createClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", data.email)
      .single()

    if (existing) {
      return {
        success: false,
        message: "This email is already on our waitlist!",
        error: "duplicate_email"
      }
    }

    // Insert new waitlist entry
    const { error } = await supabase
      .from("waitlist")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        user_type: data.userType,
        sample_images: data.sampleImages || [],
        verified: true // For now, auto-verify (can add OTP later)
      })

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        message: "Something went wrong. Please try again.",
        error: error.message
      }
    }

    return {
      success: true,
      message: data.userType === "designer" 
        ? "Welcome to gaur.haus! We'll review your portfolio and get back to you soon."
        : "Welcome to gaur.haus! We'll notify you when we launch."
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      error: String(error)
    }
  }
}

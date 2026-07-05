import { createClient } from "@/lib/supabase/server"
//import { Resend } from "resend"
import { NextResponse } from "next/server"

//const resend = new Resend(process.env.RESEND_API_KEY)

const customerEmailTemplate = (name: string) => `
Thank you for joining gaur.haus.

You are now part of our early access community.

We are building a curated platform where thoughtful fashion meets emerging designers.

We will keep you updated as we prepare for launch.

Warmly,
Team gaur.haus
`

const designerEmailTemplate = (name: string) => `
Thank you for applying to gaur.haus.

We have received your submission and will review your work carefully.

If your profile aligns with our curation, we will contact you with the next steps.

Warmly,
Team gaur.haus
`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userType, fullName, email, phone, aboutMe } = body
    console.log("[v0] Waitlist API called with:", { userType, fullName, email, phone })
    console.log("[v0] RESEND_API_KEY present:", !!process.env.RESEND_API_KEY)

    // Validate required fields
    if (!userType || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const supabase = await createClient()
    const { error: insertError } = await supabase.from("waitlist").insert({
      user_type: userType,
      full_name: fullName,
      email: email,
      phone: phone,
      about_me: aboutMe || null,
    })

    if (insertError) {
      console.log("[v0] Supabase insert error:", insertError)
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      )
    }

    console.log("[v0] Supabase insert success, sending email...")

    // Send confirmation email
    /*const emailTemplate =
      userType === "designer"
        ? designerEmailTemplate(fullName)
        : customerEmailTemplate(fullName)

    const subject =
      userType === "designer"
        ? "Thank you for applying to gaur.haus"
        : "Welcome to gaur.haus"

    try {
      const emailResult = await resend.emails.send({
        from: "gaur.haus <onboarding@resend.dev>",
        to: email,
        subject: subject,
        text: emailTemplate,
      })
      console.log("[v0] Email send result:", JSON.stringify(emailResult))
    } catch (emailError) {
      console.log("[v0] Email send error:", emailError)
    }
*/
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("[v0] API error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

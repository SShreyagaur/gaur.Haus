import Link from "next/link"
import { GaurHausLogo } from "@/components/gaur-haus-logo"
import { WaitlistForm } from "@/components/waitlist-form"
import { PolkaDotBackground } from "@/components/polka-dot-background"

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <PolkaDotBackground />

      {/* Back Link - Fixed Top Left */}
      <Link 
        href="/"
        className="fixed top-6 left-6 z-20 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg 
          className="mr-2 w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back
      </Link>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-6">
        {/* Logo */}
        <div className="mb-4">
          <GaurHausLogo variant="mark" size="md" />
        </div>

        {/* Form Heading */}
        <div className="text-center mb-4">
          <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-1">
            Join the Waitlist
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Be among the first to experience gaur.haus
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border p-6">
          <WaitlistForm />
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground max-w-sm">
            By joining, you agree to receive updates about gaur.haus. We respect your privacy.
          </p>
        </div>
      </div>
    </main>
  )
}

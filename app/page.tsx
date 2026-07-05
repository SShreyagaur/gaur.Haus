import Link from "next/link"
import { GaurHausLogo } from "@/components/gaur-haus-logo"
import { PolkaDotBackground } from "@/components/polka-dot-background"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <PolkaDotBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Logomark */}
        <div className="mb-12">
          <GaurHausLogo variant="mark" size="xl" />
        </div>

        {/* Bold Headline */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground text-center mb-4 text-balance leading-tight">
          Be Part of the
          <span className="block text-primary italic">Fashion Revolution</span>
        </h1>
        
        <p className="text-muted-foreground text-center mb-12 max-w-md text-lg md:text-xl text-balance leading-relaxed">
          Where intentional design meets authentic expression.
        </p>

        {/* CTA Button */}
        <Link 
          href="/join"
          className="group relative inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-medium text-lg rounded-full transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
        >
          Get Early Access
          <svg 
            className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Footer Brand */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2">
          <GaurHausLogo variant="full" size="sm" />
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Warm, intentional, and human.
          </p>
        </div>
      </div>
    </main>
  )
}

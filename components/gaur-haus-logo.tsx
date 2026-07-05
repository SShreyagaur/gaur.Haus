"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "mark"
}

export function GaurHausLogo({ className, size = "md", variant = "full" }: LogoProps) {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-24"
  }

  if (variant === "mark") {
    return (
      <div className={cn("relative", sizes[size], className)}>
        <img 
          src="/images/logomark.png"
          alt="gaur.haus logomark"
          className="h-full w-auto object-contain"
        />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn(
        "font-serif tracking-wide",
        size === "sm" && "text-xl",
        size === "md" && "text-3xl",
        size === "lg" && "text-5xl",
        size === "xl" && "text-6xl"
      )}>
        gaur.<span className="italic">haus</span>
      </span>
    </div>
  )
}

export function GHInitials({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl"
  }

  return (
    <span className={cn("font-serif italic tracking-tight text-primary", sizes[size], className)}>
      G.H
    </span>
  )
}

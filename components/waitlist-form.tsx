"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, Check, Loader2 } from "lucide-react"

type UserType = "user" | "designer"

interface FormData {
  fullName: string
  email: string
  phone: string
  otp: string
  aboutMe: string
  images: File[]
}

export function WaitlistForm() {
  const [userType, setUserType] = useState<UserType>("user")
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    otp: "",
    aboutMe: "",
    images: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.images.length + files.length <= 3) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    if (step === "form") {
      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userType,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            aboutMe: formData.aboutMe || null,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || "Something went wrong. Please try again.")
          setIsLoading(false)
          return
        }
        
        setStep("success")
      } catch {
        setError("Something went wrong. Please try again.")
      }
    } else if (step === "otp") {
      setStep("success")
    }
    setIsLoading(false)
  }

  const handleResendOtp = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">
          Welcome to gaur.haus
        </h2>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          {userType === "designer" 
            ? "We have received your submission and will contact you after review."
            : "You are now on our early access list. We will keep you updated."
          }
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
          {error}
        </div>
      )}
      
      {/* User Type Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full p-1 bg-muted/50">
          <button
            type="button"
            onClick={() => setUserType("user")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
              userType === "user" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setUserType("designer")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
              userType === "designer" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Designer
          </button>
        </div>
      </div>

      {step === "form" && (
        <>
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm text-foreground/80">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="bg-card border-border/50 focus:border-primary transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-foreground/80">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-card border-border/50 focus:border-primary transition-colors"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-foreground/80">Phone Number</Label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 bg-muted rounded-md border border-border/50 text-sm text-muted-foreground">
                +91
              </div>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="flex-1 bg-card border-border/50 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* About Me - Optional */}
          <div className="space-y-2">
            <Label htmlFor="aboutMe" className="text-sm text-foreground/80">
              Tell us about yourself <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="aboutMe"
              name="aboutMe"
              placeholder={userType === "designer" 
                ? "Share your design philosophy, inspiration, or brand story..."
                : "What draws you to intentional fashion?"
              }
              value={formData.aboutMe}
              onChange={handleInputChange}
              rows={3}
              className="bg-card border-border/50 focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Image Upload - Designer Only */}
          {userType === "designer" && (
            <div className="space-y-3">
              <Label className="text-sm text-foreground/80">
                Sample Work <span className="text-muted-foreground">(up to 3 images)</span>
              </Label>
              
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
      <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {formData.images.length < 3 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors bg-card/50">
                    <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {step === "otp" && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a verification code to
            </p>
            <p className="font-medium text-foreground">+91 {formData.phone}</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm text-foreground/80">Enter OTP</Label>
            <Input
              id="otp"
              name="otp"
              placeholder="Enter 6-digit code"
              value={formData.otp}
              onChange={handleInputChange}
              required
              maxLength={6}
              className="bg-card border-border/50 focus:border-primary transition-colors text-center text-lg tracking-widest"
            />
          </div>
          
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isLoading}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Resend code
          </button>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 rounded-full transition-all duration-200"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : step === "form" ? (
          "Continue"
        ) : (
          "Verify & Join"
        )}
      </Button>

      {step === "otp" && (
        <button
          type="button"
          onClick={() => setStep("form")}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to form
        </button>
      )}
    </form>
  )
}

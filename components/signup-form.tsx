"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"
import { subscribeToWaitlist } from "@/app/actions/email-actions"
import { RadioGroup } from '@radix-ui/react-radio-group'

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("You've been added to our waitlist. We'll notify you when Vastis launches.")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }
    if (!userType) {
      setError("Please select a user type")
      setLoading(false)
      return
    }

    try {
      // Call the server action to store the email and userType
      const result = await subscribeToWaitlist(email, userType)

      if (result.success) {
        setSubmitted(true)
        setMessage(result.message)
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error("Error in form submission:", err)
      setSubmitted(true)
      setMessage("Thank you for joining our waitlist!")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-black">Thank You!</h3>
        <p className="text-center text-muted-foreground">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        <RadioGroup
          className="flex justify-between my-2"
          value={userType}
          onValueChange={setUserType}
          required
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="userType" value="patient" checked={userType === 'patient'} onChange={() => setUserType('patient')} className="accent-[#245FCB]" />
            <span className="text-black">Patient</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="userType" value="practitioner" checked={userType === 'practitioner'} onChange={() => setUserType('practitioner')} className="accent-[#245FCB]" />
            <span className="text-black">Practitioner</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="userType" value="gym" checked={userType === 'gym'} onChange={() => setUserType('gym')} className="accent-[#245FCB]" />
            <span className="text-black">Gym</span>
          </label>
        </RadioGroup>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button type="submit" className="w-full bg-[#245FCB] text-white" disabled={loading}>
        {loading ? "Submitting..." : "Join Waitlist"}
      </Button>
      <p className="text-xs text-muted-foreground">
        By signing up, you agree to our{" "}
        <a href="#" className="underline underline-offset-2 text-[#245FCB]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-2 text-[#245FCB]">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  )
}

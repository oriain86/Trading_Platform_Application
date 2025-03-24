/**
 * File: src/components/ui/input-otp.jsx
 * Description: One-Time Password input component for verification codes
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/input-otp)
 * Built on top of the 'input-otp' library
 */

import * as React from "react"
import { DashIcon } from "@radix-ui/react-icons" // Icon for separator
import { OTPInput, OTPInputContext } from "input-otp" // Base OTP input library

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * InputOTP - Root component for the OTP input
 * Wrapper around the OTPInput from input-otp library
 * 
 * @component
 * @param {string} className - Additional CSS classes for the input
 * @param {string} containerClassName - Additional CSS classes for the container
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The OTP input component
 */
const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props} 
  />
))
InputOTP.displayName = "InputOTP"

/**
 * InputOTPGroup - Container for a group of OTP slots
 * Used to group slots with optional separators
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The OTP group container
 */
const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("flex items-center", className)} 
    {...props} 
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

/**
 * InputOTPSlot - Individual input slot for a single character
 * Shows visual feedback for active state and caret
 * 
 * @component
 * @param {number} index - Index of the slot in the OTP sequence
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The OTP slot component
 */
const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  // Access the OTP input context to get slot state
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring", // Highlight active slot
        className
      )}
      {...props}
    >
      {char} {/* Display the entered character */}
      {hasFakeCaret && (
        // Display a blinking caret when slot is active but has no character
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
})
InputOTPSlot.displayName = "InputOTPSlot"

/**
 * InputOTPSeparator - Visual separator between OTP groups
 * Typically used to separate groups of digits for better readability
 * 
 * @component
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The OTP separator component
 */
const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <DashIcon /> {/* Dash icon as separator */}
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } 

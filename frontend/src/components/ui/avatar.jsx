/**
 * File: src/components/ui/avatar.jsx
 * Description: Avatar component based on Radix UI primitives with customization support
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/avatar)
 */

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Avatar - Container component for the avatar
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Avatar root component
 */
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Base styling
      className // Allow custom class overrides
    )}
    {...props} // Pass any additional props to the underlying component
  />
))
// Set display name for debugging in React DevTools
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * AvatarImage - Component to display the image within an avatar
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Avatar image component
 */
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full", // Make image fill the entire avatar space
      className
    )}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * AvatarFallback - Component to display when image fails to load or isn't provided
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Avatar fallback component
 */
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Center content and set background
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback } 

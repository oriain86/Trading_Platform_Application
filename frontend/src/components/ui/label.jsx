/**
 * File: src/components/ui/label.jsx
 * Description: Accessible label component for form inputs
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/label)
 */

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label" // Radix UI label primitive
import { cva } from "class-variance-authority" // For creating component variants

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Define label variants using class-variance-authority
 * Currently only has a default variant, but this pattern allows for easy addition of variants in the future
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * Label - Accessible label component for form controls
 * Built on top of Radix UI's label primitive for accessibility
 * 
 * Features:
 * - Proper font styling
 * - Peer-based styling for disabled states
 * - Automatic association with inputs through htmlFor
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The label component
 * 
 * @example
 * // Basic usage with an input
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 */
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root 
    ref={ref} 
    className={cn(labelVariants(), className)} 
    {...props} 
  />
))

// Set display name for debugging in React DevTools
Label.displayName = LabelPrimitive.Root.displayName

export { Label } 

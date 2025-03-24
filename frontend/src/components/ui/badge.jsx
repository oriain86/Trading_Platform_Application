/**
 * File: src/components/ui/badge.jsx
 * Description: Badge component for displaying small status indicators or labels
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/badge)
 */

import * as React from "react"
import { cva } from "class-variance-authority" // Used for creating component variants

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Define badge variants using class-variance-authority
 * This creates a function that generates class names based on provided variants
 */
const badgeVariants = cva(
  // Base styles applied to all badges
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default style - primary color with shadow
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        // Secondary style - secondary color without shadow
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Destructive style - for error or warning states
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        // Outline style - just a border with text
        outline: "text-foreground",
      },
    },
    // Default variant if none is specified
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Badge component - Used to highlight or indicate status, categories, or counts
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {string} variant - Visual style variant ('default', 'secondary', 'destructive', 'outline')
 * @returns {JSX.Element} - The Badge component
 * 
 * @example
 * // Default badge
 * <Badge>New</Badge>
 * 
 * @example
 * // Destructive badge
 * <Badge variant="destructive">Removed</Badge>
 */
function Badge({
  className,
  variant,
  ...props
}) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants }

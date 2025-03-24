/**
 * File: src/components/ui/button.jsx
 * Description: Customizable button component with multiple variants and sizes
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/button)
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot" // Allows passing a component as children
import { cva } from "class-variance-authority" // Used for creating component variants

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Define button variants using class-variance-authority
 * This creates a function that generates class names based on provided variants
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default style - primary color with shadow
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        // Destructive style - for delete or warning actions
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // Outline style - border with transparent background
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // Secondary style - less prominent than default
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        // Ghost style - no background until hovered
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link style - appears as a text link
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Default size
        default: "h-9 px-4 py-2",
        // Small size
        sm: "h-8 rounded-md px-3 text-xs",
        // Large size
        lg: "h-10 rounded-md px-8",
        // Icon button (square)
        icon: "h-9 w-9",
      },
    },
    // Default variants if none are specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button component - Versatile button with multiple style variants and sizes
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {string} variant - Visual style variant ('default', 'destructive', 'outline', 'secondary', 'ghost', 'link')
 * @param {string} size - Size variant ('default', 'sm', 'lg', 'icon')
 * @param {boolean} asChild - When true, button will render its children as the root element
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Button component
 * 
 * @example
 * // Default button
 * <Button>Click me</Button>
 * 
 * @example
 * // Destructive large button
 * <Button variant="destructive" size="lg">Delete</Button>
 * 
 * @example
 * // Using asChild to render as a link
 * <Button asChild><a href="/somewhere">Navigate</a></Button>
 */
const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  asChild = false, 
  ...props 
}, ref) => {
  // Use the Slot component from Radix UI if asChild is true, otherwise use a regular button
  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} 
    />
  );
})

// Set display name for debugging in React DevTools
Button.displayName = "Button"

export { Button, buttonVariants } 

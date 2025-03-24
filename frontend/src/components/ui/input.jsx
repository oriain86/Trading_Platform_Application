/**
 * File: src/components/ui/input.jsx
 * Description: Base input component for form controls
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/input)
 */

import * as React from "react"

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Input - Reusable input component with consistent styling
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {string} type - HTML input type attribute (text, password, email, etc.)
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The styled input component
 * 
 * @example
 * // Basic text input
 * <Input type="text" placeholder="Enter your name" />
 * 
 * @example
 * // Password input with custom class
 * <Input type="password" className="max-w-sm" />
 */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Base styling
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
        // File input specific styling
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Placeholder styling
        "placeholder:text-muted-foreground",
        // Disabled state styling
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Custom classes
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Input.displayName = "Input"

export { Input } 

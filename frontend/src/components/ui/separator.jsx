/**
 * File: src/components/ui/separator.jsx
 * Description: Visual divider component for separating content sections
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/separator)
 */

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator" // Radix UI separator primitive

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Separator - Visual divider that can be horizontal or vertical
 * Built on top of Radix UI's separator primitive for accessibility
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {string} orientation - Direction of the separator ('horizontal' or 'vertical')
 * @param {boolean} decorative - Whether the separator is purely decorative (true) or semantically meaningful (false)
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The separator component
 * 
 * @example
 * // Horizontal separator (default)
 * <Separator />
 * 
 * @example
 * // Vertical separator
 * <Separator orientation="vertical" className="h-6" />
 */
const Separator = React.forwardRef((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative} // When true, indicated as purely visual with no semantic meaning
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border", // Base styling for all separators
      // Orientation-specific sizing
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props} 
  />
))

// Set display name for debugging in React DevTools
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator } 

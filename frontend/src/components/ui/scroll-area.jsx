/**
 * File: src/components/ui/scroll-area.jsx
 * Description: Custom scrollable area component with styled scrollbars
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/scroll-area)
 * Built on top of Radix UI's scroll area primitives
 */

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area" // Radix UI scroll area primitives

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * ScrollArea - Custom scrollable container with styled scrollbars
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to be scrollable
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The scroll area component
 */
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    {/* Viewport is the actual scrollable container */}
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    
    {/* Default vertical scrollbar */}
    <ScrollBar />
    
    {/* Corner element where horizontal and vertical scrollbars meet */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * ScrollBar - Styled scrollbar component for the ScrollArea
 * Can be horizontal or vertical based on orientation prop
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {string} orientation - Scrollbar orientation ('vertical' or 'horizontal')
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The scrollbar component
 */
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      // Vertical scrollbar styling
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      // Horizontal scrollbar styling
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    {/* Thumb is the draggable part of the scrollbar */}
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar } 

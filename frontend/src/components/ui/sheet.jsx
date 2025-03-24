/**
 * File: src/components/ui/sheet.jsx
 * Description: Slide-out panel component that can come from any side of the screen
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/sheet)
 * Built on top of Radix UI's dialog primitive
 */

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog" // Radix UI dialog primitives
import { Cross2Icon } from "@radix-ui/react-icons" // X icon for close button
import { cva } from "class-variance-authority" // For creating component variants

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Direct re-exports of Radix UI Dialog primitives
 */
const Sheet = SheetPrimitive.Root               // Main sheet container
const SheetTrigger = SheetPrimitive.Trigger     // Element that opens the sheet
const SheetClose = SheetPrimitive.Close         // Element that closes the sheet
const SheetPortal = SheetPrimitive.Portal       // Renders sheet content in a portal

/**
 * SheetOverlay - Background overlay that appears behind the sheet
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The sheet overlay component
 */
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} 
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

/**
 * Define sheet variants using class-variance-authority
 * Creates styling for different sides from which the sheet can appear
 */
const sheetVariants = cva(
  // Base styles applied to all sheets
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        // Top sheet - slides down from top of screen
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        // Bottom sheet - slides up from bottom of screen
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        // Left sheet - slides in from left side
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        // Right sheet - slides in from right side
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right", // Default side is right
    },
  }
)

/**
 * SheetContent - The main content area of the sheet
 * 
 * @component
 * @param {string} side - Which side to display from ('top', 'bottom', 'left', 'right')
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to display in the sheet
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The sheet content component
 */
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      {/* Close button currently commented out 
      <SheetPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close> */}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

/**
 * SheetHeader - Container for sheet title and description
 * Centered on mobile, left-aligned on larger screens
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The sheet header component
 */
const SheetHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} 
  />
)
SheetHeader.displayName = "SheetHeader"

/**
 * SheetFooter - Container for sheet actions
 * Stacked on mobile, horizontal on larger screens
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The sheet footer component
 */
const SheetFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} 
  />
)
SheetFooter.displayName = "SheetFooter"

/**
 * SheetTitle - Heading element for the sheet
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The sheet title component
 */
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props} 
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

/**
 * SheetDescription - Descriptive text for the sheet
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The sheet description component
 */
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} 
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} 

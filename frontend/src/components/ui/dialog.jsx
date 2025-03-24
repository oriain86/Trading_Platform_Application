/**
 * File: src/components/ui/dialog.jsx
 * Description: Accessible dialog component built on Radix UI primitives
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/dialog)
 */ 

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog" // Radix UI dialog primitives
import { Cross2Icon } from "@radix-ui/react-icons" // X icon for close button

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Dialog - Root component that manages the dialog state
 * Controls when the dialog is open or closed
 */
const Dialog = DialogPrimitive.Root

/**
 * DialogTrigger - Element that opens the dialog when clicked
 */
const DialogTrigger = DialogPrimitive.Trigger

/**
 * DialogPortal - Renders dialog content in a portal
 * Portal ensures content is rendered at the root of the DOM
 */
const DialogPortal = DialogPrimitive.Portal

/**
 * DialogClose - Element that closes the dialog when clicked
 */
const DialogClose = DialogPrimitive.Close

/**
 * DialogOverlay - Background overlay that appears behind the dialog
 * Typically semi-transparent and covers the entire viewport
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dialog overlay component
 */
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} 
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * DialogContent - Main container for dialog content
 * Positioned in the center of the screen with animations
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to be rendered inside the dialog
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dialog content component with overlay and close button
 */
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      {/* Close button in the top-right corner */}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * DialogHeader - Container for dialog title and description
 * Centered on mobile, left-aligned on larger screens
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The dialog header component
 */
const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props} 
  />
)
DialogHeader.displayName = "DialogHeader"

/**
 * DialogFooter - Container for dialog actions (buttons)
 * Stacked on mobile, horizontal on larger screens
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The dialog footer component
 */
const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} 
  />
)
DialogFooter.displayName = "DialogFooter"

/**
 * DialogTitle - Component for the dialog title
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dialog title component
 */
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} 
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * DialogDescription - Component for the dialog description
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dialog description component
 */
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} 
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

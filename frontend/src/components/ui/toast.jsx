/**
 * File: src/components/ui/toast.jsx
 * Description: Toast notification component for displaying temporary messages
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/toast)
 * Built on top of Radix UI's toast primitives
 */

import * as React from "react"
import { Cross2Icon } from "@radix-ui/react-icons" // X icon for close button
import * as ToastPrimitives from "@radix-ui/react-toast" // Radix UI toast primitives
import { cva } from "class-variance-authority" // For creating component variants

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * ToastProvider - Required provider component for toast functionality
 * Direct re-export of Radix UI's Provider
 */
const ToastProvider = ToastPrimitives.Provider

/**
 * ToastViewport - Container where toasts are rendered
 * Positioned at the top on mobile and bottom-right on larger screens
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The toast viewport component
 */
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      // Base positioning and layout
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4",
      // Responsive adjustments for larger screens
      "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

/**
 * Define toast variants using class-variance-authority
 * Creates styling for different toast types
 */
const toastVariants = cva(
  // Base styles for all toasts
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
  // Swipe gesture handling
  "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
  // Animation classes
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        // Default style - neutral colors
        default: "border bg-background text-foreground",
        // Destructive style - for errors or warnings
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Toast - Main toast notification component
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {string} variant - Visual style ('default' or 'destructive')
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The toast component
 */
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
})
Toast.displayName = ToastPrimitives.Root.displayName

/**
 * ToastAction - Interactive action button within a toast
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The toast action button component
 */
const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      // Base button styling
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors",
      // Interactive states
      "hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
      // Special styling when inside a destructive toast
      "group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

/**
 * ToastClose - Close button for the toast
 * Hidden until hovered or focused
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The toast close button component
 */
const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      // Positioning and base styling
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity",
      // Interactive states
      "hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
      // Special styling when inside a destructive toast
      "group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close="" // Custom attribute for targeting
    {...props}
  >
    <Cross2Icon className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

/**
 * ToastTitle - Title/heading for the toast
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The toast title component
 */
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)} // Affects sizing of adjacent description
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

/**
 * ToastDescription - Descriptive text content for the toast
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The toast description component
 */
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description 
    ref={ref} 
    className={cn("text-sm opacity-90", className)} 
    {...props} 
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export { 
  ToastProvider, 
  ToastViewport, 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastClose, 
  ToastAction 
} 

/**
 * File: src/components/ui/card.jsx
 * Description: Composable card component with header, content, footer, and other subcomponents
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/card)
 */

import * as React from "react"

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Card - Container component that serves as the foundation for card UI
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Card container component
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} 
  />
))
Card.displayName = "Card"

/**
 * CardHeader - Top section of the card, typically contains title and description
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Card header component
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} 
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle - Heading element for the card
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Card title component (h3)
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} 
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription - Secondary text description in the card header
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Card description component
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} 
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent - Main content area of the card
 * Has padding on sides but removes padding from top to align with CardHeader
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Card content component
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter - Bottom section of the card, typically contains actions
 * By default, items are aligned horizontally
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The Card footer component
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} 
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 

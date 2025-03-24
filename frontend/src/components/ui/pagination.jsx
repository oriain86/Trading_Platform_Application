/**
 * File: src/components/ui/pagination.jsx
 * Description: Pagination component with various subcomponents for navigation
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/pagination)
 */

import * as React from "react"
import {
  ChevronLeftIcon,    // Icon for previous button
  ChevronRightIcon,   // Icon for next button
  DotsHorizontalIcon, // Icon for ellipsis (more pages)
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils" // Utility for merging class names
import { buttonVariants } from "@/components/ui/button" // Button styling variants

/**
 * Pagination - Container component for pagination UI
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The pagination navigation container
 */
const Pagination = ({
  className,
  ...props
}) => (
  <nav
    role="navigation"
    aria-label="pagination" // Accessibility label for screen readers
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props} 
  />
)
Pagination.displayName = "Pagination"

/**
 * PaginationContent - Container for pagination items
 * Rendered as a ul element for semantic structure
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The pagination items list container
 */
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props} 
  />
))
PaginationContent.displayName = "PaginationContent"

/**
 * PaginationItem - Container for individual pagination elements
 * Rendered as a li element for semantic structure
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The pagination item container
 */
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li 
    ref={ref} 
    className={cn("", className)} 
    {...props} 
  />
))
PaginationItem.displayName = "PaginationItem"

/**
 * PaginationLink - Link element for page navigation
 * Styled using button variants for consistent appearance
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {boolean} isActive - Whether this link represents the current page
 * @param {string} size - Size variant ('default' or 'icon')
 * @returns {JSX.Element} - The pagination link component
 */
const PaginationLink = ({
  className,
  isActive,
  size = "icon", // Default to icon size (square)
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined} // Accessibility attribute for current page
    className={cn(buttonVariants({
      variant: isActive ? "outline" : "ghost", // Different styling for current page
      size,
    }), className)}
    {...props} 
  />
)
PaginationLink.displayName = "PaginationLink"

/**
 * PaginationPrevious - Previous page navigation link
 * Includes left chevron icon and "Previous" text
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The previous page link component
 */
const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page" // Accessibility label
    size="default"
    className={cn("gap-1 pl-2.5", className)} // Extra left padding for visual balance
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

/**
 * PaginationNext - Next page navigation link
 * Includes "Next" text and right chevron icon
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The next page link component
 */
const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page" // Accessibility label
    size="default"
    className={cn("gap-1 pr-2.5", className)} // Extra right padding for visual balance
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

/**
 * PaginationEllipsis - Indicates skipped pages in pagination
 * Shows dots icon when page numbers are truncated
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The pagination ellipsis component
 */
const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden // Hidden from screen readers as it's decorative
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span> {/* Text for screen readers */}
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} 

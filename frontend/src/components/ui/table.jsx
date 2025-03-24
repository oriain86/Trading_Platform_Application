/**
 * File: src/components/ui/table.jsx
 * Description: Styled table components for displaying structured data
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/table)
 */

import * as React from "react"

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Table - Root table component with horizontal scrolling support
 * Wrapped in a div to enable overflow handling for responsive design
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table component with overflow container
 */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props} 
    />
  </div>
))
Table.displayName = "Table"

/**
 * TableHeader - Container for table header row(s)
 * Adds border styling to all rows within the header
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table header component
 */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn("[&_tr]:border-b", className)} 
    {...props} 
  />
))
TableHeader.displayName = "TableHeader"

/**
 * TableBody - Container for table data rows
 * Removes border from the last row for a cleaner look
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table body component
 */
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props} 
  />
))
TableBody.displayName = "TableBody"

/**
 * TableFooter - Container for table footer row(s)
 * Adds background and border styling specific to the footer
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table footer component
 */
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props} 
  />
))
TableFooter.displayName = "TableFooter"

/**
 * TableRow - Individual table row with hover and selected states
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table row component
 */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props} 
  />
))
TableRow.displayName = "TableRow"

/**
 * TableHead - Table header cell (<th>) with consistent styling
 * Includes special handling for checkboxes
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table header cell component
 */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground",
      // Special styling when containing or being a checkbox
      "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props} 
  />
))
TableHead.displayName = "TableHead"

/**
 * TableCell - Regular table cell (<td>) with consistent styling
 * Includes special handling for checkboxes
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table cell component
 */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle",
      // Special styling when containing or being a checkbox
      "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props} 
  />
))
TableCell.displayName = "TableCell"

/**
 * TableCaption - Caption for the table, typically displayed below the table
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The table caption component
 */
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props} 
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} 

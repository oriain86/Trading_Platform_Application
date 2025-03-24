/**
 * File: src/components/ui/select.jsx
 * Description: Accessible select (dropdown) component built on Radix UI primitives
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/select)
 */

import * as React from "react"
import {
  CaretSortIcon,    // Icon for the select trigger
  CheckIcon,         // Icon for selected item indicator
  ChevronDownIcon,   // Icon for scroll down button
  ChevronUpIcon,     // Icon for scroll up button
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select" // Radix UI select primitives

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Direct re-exports of Radix UI Select primitives
 */
const Select = SelectPrimitive.Root             // Main select container
const SelectGroup = SelectPrimitive.Group       // Groups related select items
const SelectValue = SelectPrimitive.Value       // Displays the selected value

/**
 * SelectTrigger - The button that opens the select dropdown
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content inside the trigger (typically SelectValue)
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The select trigger component
 */
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border focus:outline-none bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * SelectScrollUpButton - Button to scroll up when list is too long
 * Appears at the top of the dropdown when scrollable
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The scroll up button component
 */
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * SelectScrollDownButton - Button to scroll down when list is too long
 * Appears at the bottom of the dropdown when scrollable
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The scroll down button component
 */
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

/**
 * SelectContent - The dropdown content containing the options
 * Renders in a portal to avoid clipping issues
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content inside (typically SelectItems)
 * @param {string} position - Positioning strategy ('popper' or 'item-aligned')
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The select content component
 */
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Base styling
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        // Animation classes
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Position-specific adjustments
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1", 
          // Make viewport match trigger dimensions when using popper
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * SelectLabel - Label for groups of select items
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The select label component
 */
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props} 
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * SelectItem - Individual selectable option
 * Shows a checkmark when selected
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content/text of the item
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The select item component
 */
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {/* Check icon container - positioned on the right */}
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    {/* Item text */}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * SelectSeparator - Horizontal divider between items or groups
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The select separator component
 */
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} 
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} 

/**
 * File: src/components/ui/dropdown-menu.jsx
 * Description: Accessible dropdown menu component built on Radix UI primitives
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/dropdown-menu)
 */

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu" // Radix UI dropdown menu primitives
import {
  CheckIcon,     // Icon for checkbox items
  ChevronRightIcon, // Icon for submenu indicators
  DotFilledIcon, // Icon for radio items
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * DropdownMenu - Root component that manages the dropdown state
 */
const DropdownMenu = DropdownMenuPrimitive.Root

/**
 * DropdownMenuTrigger - Element that toggles the dropdown when clicked
 */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

/**
 * DropdownMenuGroup - Groups related menu items
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group

/**
 * DropdownMenuPortal - Renders dropdown content in a portal
 */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

/**
 * DropdownMenuSub - Container for a submenu
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub

/**
 * DropdownMenuRadioGroup - Container for radio items
 * Only one radio item within a group can be checked
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/**
 * DropdownMenuSubTrigger - Element that opens a submenu when clicked or hovered
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {boolean} inset - When true, adds left padding
 * @param {React.ReactNode} children - Content to be rendered inside the trigger
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown submenu trigger component
 */
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8", // Add padding when inset is true
      className
    )}
    {...props}>
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" /> {/* Submenu indicator icon */}
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

/**
 * DropdownMenuSubContent - Container for submenu items
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown submenu content component
 */
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props} />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

/**
 * DropdownMenuContent - Main container for dropdown menu items
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {number} sideOffset - Distance from the trigger (default: 4px)
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown menu content component
 */
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props} />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

/**
 * DropdownMenuItem - Standard menu item
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {boolean} inset - When true, adds left padding to align with items that have icons
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown menu item component
 */
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props} />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

/**
 * DropdownMenuCheckboxItem - Checkbox menu item that can be toggled
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to be rendered inside the item
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown menu checkbox item component
 */
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" /> {/* Checkbox indicator icon */}
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

/**
 * DropdownMenuRadioItem - Radio menu item that can be selected
 * Only one radio item in a group can be selected at a time
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to be rendered inside the item
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown menu radio item component
 */
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" /> {/* Radio indicator icon */}
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

/**
 * DropdownMenuLabel - Non-interactive label for categorizing menu items
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {boolean} inset - When true, adds left padding to align with items that have icons
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown menu label component
 */
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props} />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

/**
 * DropdownMenuSeparator - Horizontal divider between menu items
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The dropdown menu separator component
 */
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

/**
 * DropdownMenuShortcut - Displays keyboard shortcut hints
 * Not a Radix UI primitive, but a custom component for showing keyboard shortcuts
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The dropdown menu shortcut component
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props} 
    />
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} 

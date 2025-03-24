/**
 * File: src/components/ui/radio-group.jsx
 * Description: Accessible radio group component built on Radix UI primitives
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/radio-group)
 */

import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons" // Default icon for radio item indicator
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group" // Radix UI radio group primitives

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * RadioGroup - Container component for radio options
 * Built on Radix UI's RadioGroup.Root primitive
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The radio group component
 */
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root 
      className={cn("grid gap-2", className)} 
      {...props} 
      ref={ref} 
    />
  );
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * RadioGroupItem - Individual radio button option
 * Built on Radix UI's RadioGroup.Item primitive with customizable indicator
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply to the radio button
 * @param {React.ComponentType} icon - Custom icon component to use as indicator (defaults to CheckIcon)
 * @param {string} iconClassName - CSS classes to apply to the indicator icon
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The radio group item component
 */
const RadioGroupItem = React.forwardRef(({ 
  className,
  icon: Icon = CheckIcon, // Allow custom icon with CheckIcon as default
  iconClassName = "h-3.5 w-3.5 fill-primary", // Default icon styling
  ...props 
}, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Icon className={iconClassName} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem } 

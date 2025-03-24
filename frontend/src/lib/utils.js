/**
 * File: src/lib/utils.js
 * Description: Utility function for merging Tailwind CSS classes
 * 
 * This utility is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/installation)
 */

import { clsx } from "clsx"          // Library for conditionally joining class names
import { twMerge } from "tailwind-merge" // Library for merging Tailwind CSS classes

/**
 * cn - Utility function for conditionally merging Tailwind CSS classes
 * 
 * This function combines the functionality of `clsx` and `tailwind-merge`:
 * 1. First, it uses `clsx` to conditionally concatenate class names
 * 2. Then, it passes the result to `twMerge` to handle Tailwind CSS class conflicts
 * 
 * @param {...any} inputs - Class names, objects, or arrays of class names
 * @returns {string} Merged className string with resolved Tailwind conflicts
 * 
 * @example
 * // Basic usage with static classes
 * cn("px-4 py-2", "bg-blue-500")
 * // => "px-4 py-2 bg-blue-500"
 * 
 * @example
 * // With conditional classes
 * cn("px-4", isActive && "bg-blue-500", !isActive && "bg-gray-200")
 * // => "px-4 bg-blue-500" or "px-4 bg-gray-200" depending on isActive
 * 
 * @example
 * // Resolving conflicting Tailwind classes
 * cn("px-4", "px-6") 
 * // => "px-6" (the later class overrides the earlier one)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 

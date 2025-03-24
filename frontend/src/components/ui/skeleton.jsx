/**
 * File: src/components/ui/skeleton.jsx
 * Description: Loading placeholder component for content that is still loading
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/skeleton)
 */

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * Skeleton - Visual placeholder for loading content
 * Uses animation to indicate loading state to users
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The skeleton loading component
 * 
 * @example
 * // Basic usage
 * <Skeleton className="h-8 w-full" />
 * 
 * @example
 * // Card placeholder with multiple skeletons
 * <div className="space-y-2">
 *   <Skeleton className="h-40" />
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 * </div>
 */
function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary/10", // Base styling with animation
        className
      )}
      {...props} 
    />
  );
}

export { Skeleton } 

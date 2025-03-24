/**
 * File: src/components/ui/resizable.jsx
 * Description: Resizable panel components for creating adjustable layouts
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/resizable)
 * Built on top of the 'react-resizable-panels' library
 */

import { DragHandleDots2Icon } from "@radix-ui/react-icons" // Icon for drag handle
import * as ResizablePrimitive from "react-resizable-panels" // Resizable panels library

import { cn } from "@/lib/utils" // Utility for merging class names

/**
 * ResizablePanelGroup - Container for a group of resizable panels
 * Handles layout direction (horizontal/vertical) automatically
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The resizable panel group container
 */
const ResizablePanelGroup = ({
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props} 
  />
)

/**
 * ResizablePanel - Individual panel that can be resized
 * Direct re-export of the PanelGroup.Panel component from react-resizable-panels
 */
const ResizablePanel = ResizablePrimitive.Panel

/**
 * ResizableHandle - Resize handle between panels
 * Includes styling for both horizontal and vertical orientations
 * 
 * @component
 * @param {boolean} withHandle - Whether to show a visual drag handle indicator
 * @param {string} className - Additional CSS classes to apply
 * @returns {JSX.Element} - The resize handle component
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // Base styling for the resize handle
      "relative flex w-px items-center justify-center bg-border",
      
      // Invisible touch target that's wider than the visible border
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      
      // Focus states for accessibility
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      
      // Vertical orientation adjustments using data attribute
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full",
      "data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      
      // Rotate drag handle icon in vertical orientation
      "[&[data-panel-group-direction=vertical]>div]:rotate-90",
      
      className
    )}
    {...props}
  >
    {/* Optional visual drag handle */}
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <DragHandleDots2Icon className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle } 

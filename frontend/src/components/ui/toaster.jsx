/**
 * File: src/components/ui/toaster.jsx
 * Description: Main application toast container for displaying toast notifications
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/toast)
 */

import {
  Toast,              // Individual toast notification
  ToastClose,         // Close button for toasts
  ToastDescription,   // Description text in toasts
  ToastProvider,      // Context provider for toast system
  ToastTitle,         // Title text in toasts
  ToastViewport,      // Container where toasts are rendered
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast" // Custom hook for accessing toast state

/**
 * Toaster - Main toast container component
 * Renders all active toast notifications and provides the toast context
 * 
 * This component should be included once at the root of your application
 * to enable the toast notification system throughout the app
 * 
 * @returns {JSX.Element} - The toast container with all active toasts
 */
export function Toaster() {
  // Access the current toasts from the toast context
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {/* Map through all active toasts and render each one */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {/* Content container with gap between title and description */}
            <div className="grid gap-1">
              {/* Conditionally render title if provided */}
              {title && <ToastTitle>{title}</ToastTitle>}
              
              {/* Conditionally render description if provided */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            
            {/* Custom action button if provided */}
            {action}
            
            {/* Close button for dismissing the toast */}
            <ToastClose />
          </Toast>
        );
      })}
      
      {/* Viewport defines where toasts appear on the screen */}
      <ToastViewport />
    </ToastProvider>
  );
} 

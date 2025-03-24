/**
 * File: src/components/ui/form.jsx
 * Description: Form components built with React Hook Form integration
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/form)
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot" // Allows rendering children as the root element
import { Controller, FormProvider, useFormContext } from "react-hook-form" // React Hook Form integration

import { cn } from "@/lib/utils" // Utility for merging class names
import { Label } from "@/components/ui/label" // Label component for form fields

/**
 * Form - Root component for the form
 * Alias for FormProvider from react-hook-form
 */
const Form = FormProvider

/**
 * Context for sharing form field name across components
 */
const FormFieldContext = React.createContext({})

/**
 * FormField - Connects form controls to React Hook Form
 * Wraps the Controller component from react-hook-form
 * 
 * @component
 * @param {object} props - Props including name, control, rules, etc. for react-hook-form
 * @returns {JSX.Element} - The form field component
 */
const FormField = (
  {
    ...props
  }
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

/**
 * useFormField - Custom hook to access form field context and state
 * Combines field information from contexts with field state from react-hook-form
 * 
 * @returns {object} - Object containing field information and state
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState, // Includes error, isDirty, isTouched values from react-hook-form
  }
}

/**
 * Context for sharing form item ID across components
 */
const FormItemContext = React.createContext({})

/**
 * FormItem - Container for form field components
 * Creates a unique ID for the field and shares it through context
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The form item container
 */
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId() // Generate a unique ID for the form item

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
})
FormItem.displayName = "FormItem"

/**
 * FormLabel - Label component with error styling for form fields
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The form label component
 */
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)} // Apply error styling when field has error
      htmlFor={formItemId} // Associate label with form control
      {...props} 
    />
  );
})
FormLabel.displayName = "FormLabel"

/**
 * FormControl - Connects form controls to the form context
 * Handles accessibility attributes for form validation
 * 
 * @component
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The form control wrapper component
 */
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}` // Link to description when no error
          : `${formDescriptionId} ${formMessageId}` // Link to both description and error message when has error
      }
      aria-invalid={!!error} // Mark as invalid when has error
      {...props} 
    />
  );
})
FormControl.displayName = "FormControl"

/**
 * FormDescription - Help text for form fields
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element} - The form description component
 */
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId} // ID for aria-describedby reference
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props} 
    />
  );
})
FormDescription.displayName = "FormDescription"

/**
 * FormMessage - Error message for form fields
 * Shows validation errors from react-hook-form
 * 
 * @component
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Fallback content when no error
 * @param {React.RefObject} ref - Forwarded ref
 * @returns {JSX.Element|null} - The form error message or null if no error
 */
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  // Return null if there's no error message or children
  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId} // ID for aria-describedby reference
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

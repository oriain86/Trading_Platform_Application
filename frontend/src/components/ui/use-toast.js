/**
 * File: src/components/ui/use-toast.js
 * Description: Global toast state management system
 * 
 * This component is part of the shadcn/ui component library
 * (https://ui.shadcn.com/docs/components/toast)
 * Inspired by the react-hot-toast library
 */

import * as React from "react"

/**
 * Configuration constants
 */
const TOAST_LIMIT = 1                  // Maximum number of toasts to show at once
const TOAST_REMOVE_DELAY = 1000000     // Delay before removing toast from DOM (in ms)

/**
 * Redux-like action types for state management
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",             // Add a new toast
  UPDATE_TOAST: "UPDATE_TOAST",       // Update an existing toast
  DISMISS_TOAST: "DISMISS_TOAST",     // Mark toast as dismissed (starts exit animation)
  REMOVE_TOAST: "REMOVE_TOAST"        // Remove toast from state completely
}

/**
 * Counter for generating unique toast IDs
 */
let count = 0

/**
 * Generates a unique ID for each toast
 * @returns {string} Unique ID
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString();
}

/**
 * Map to store timeout IDs for toast removal
 * Key: Toast ID, Value: Timeout ID
 */
const toastTimeouts = new Map()

/**
 * Adds a toast to the removal queue with a timeout
 * @param {string} toastId - ID of the toast to remove
 */
const addToRemoveQueue = (toastId) => {
  // If toast is already queued for removal, do nothing
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Set a timeout to remove the toast after the delay
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  // Store the timeout ID for potential cleanup
  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer function to handle toast state changes
 * @param {Object} state - Current state
 * @param {Object} action - Action to perform
 * @returns {Object} New state
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      // Add new toast to the beginning of the array and respect the limit
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      // Update an existing toast by ID
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Side effect: Queue toast(s) for removal
      if (toastId) {
        // Queue specific toast for removal
        addToRemoveQueue(toastId)
      } else {
        // Queue all toasts for removal
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      // Mark toast(s) as closed to trigger exit animation
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        // Remove all toasts
        return {
          ...state,
          toasts: [],
        }
      }
      // Remove specific toast by ID
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

/**
 * Array of state listener functions
 * Used for pub/sub pattern to notify components of state changes
 */
const listeners = []

/**
 * In-memory state storage
 * Single source of truth for toast state
 */
let memoryState = { toasts: [] }

/**
 * Dispatch function to update state and notify listeners
 * @param {Object} action - Action to dispatch
 */
function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Create and display a new toast
 * @param {Object} props - Toast properties
 * @returns {Object} Toast controls (id, dismiss, update)
 */
function toast({
  ...props
}) {
  const id = genId()

  // Function to update this specific toast
  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  
  // Function to dismiss this specific toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Add the toast to the state
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Return controls for programmatic manipulation
  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * Custom hook for accessing and managing toasts
 * @returns {Object} Toast state and control functions
 */
function useToast() {
  const [state, setState] = React.useState(memoryState)

  // Subscribe to state changes when component mounts
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      // Unsubscribe when component unmounts
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    };
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast } 

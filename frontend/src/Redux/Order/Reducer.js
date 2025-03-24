// File: src/Redux/Order/Reducer.js
// This file defines the Redux reducer for managing order state

import * as types from './ActionTypes';

/**
 * Initial state for order management
 * 
 * @property {Object|null} order - Currently selected/active order
 * @property {Array} orders - List of all orders for the current user
 * @property {boolean} loading - Indicates if an order API request is in progress
 * @property {Object|null} error - Error information if a request fails
 */
const initialState = {
  order: null,       // Stores the currently selected order or newly created order
  orders: [],        // Stores the list of orders for the user
  loading: false,    // Tracks loading state during order operations
  error: null,       // Stores error messages from failed operations
};

/**
 * Order reducer handles state changes for all order-related actions
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and optional payload/error
 * @return {Object} The new state after applying the action
 */
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // ========== REQUEST ACTIONS ==========
    // Set loading state for all order operations
    case types.PAY_ORDER_REQUEST:       // Order payment in progress
    case types.GET_ORDER_REQUEST:       // Single order fetch in progress
    case types.GET_ALL_ORDERS_REQUEST:  // All orders fetch in progress
      return {
        ...state,          // Preserve existing state
        loading: true,     // Set loading flag to true
        error: null,       // Clear any previous errors
      };

    // ========== SINGLE ORDER SUCCESS ACTIONS ==========
    // Handle successful single order operations
    case types.PAY_ORDER_SUCCESS:       // Order payment succeeded
    case types.GET_ORDER_SUCCESS:       // Single order fetch succeeded
      return {
        ...state,
        order: action.payload,  // Store the order data
        loading: false,         // Reset loading flag
        error: null,            // Clear any errors
      };

    // ========== ALL ORDERS SUCCESS ACTION ==========
    // Handle successful fetch of all orders
    case types.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,  // Store the list of orders
        loading: false,          // Reset loading flag
        error: null,             // Clear any errors
      };

    // ========== FAILURE ACTIONS ==========
    // Handle failures for all order operations
    case types.PAY_ORDER_FAILURE:       // Order payment failed
    case types.GET_ORDER_FAILURE:       // Single order fetch failed
    case types.GET_ALL_ORDERS_FAILURE:  // All orders fetch failed
      return {
        ...state,
        loading: false,          // Reset loading flag
        error: action.error,     // Store error information
      };

    // Return unchanged state for unhandled action types
    default:
      return state;
  }
};

export default orderReducer;

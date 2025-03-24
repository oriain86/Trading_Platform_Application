// File: src/Redux/Withdrawal/Reducer.js

// This file defines the Redux reducer for managing withdrawal state

import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_PROCEED_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  ADD_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_WITHDRAWAL_REQUEST_SUCCESS,
  GET_WITHDRAWAL_REQUEST_FAILURE,
  GET_WITHDRAWAL_REQUEST_REQUEST,
} from "./ActionTypes";

/**
 * Initial state for withdrawal management
 * 
 * @property {Object|null} withdrawal - Current withdrawal request
 * @property {Array} history - User's withdrawal history
 * @property {boolean} loading - Indicates if a withdrawal API request is in progress
 * @property {Object|null} error - Error information if a request fails
 * @property {Object|null} PaymentDetails - User's payment details for withdrawals
 * @property {Array} requests - List of all withdrawal requests (for admin)
 */
const initialState = {
  withdrawal: null,      // Stores current withdrawal request information
  history: [],           // Stores user's withdrawal history
  loading: false,        // Tracks loading state during withdrawal operations
  error: null,           // Stores error messages from failed operations
  PaymentDetails: null,  // Stores user's payment details (bank account, PayPal, etc.)
  requests: []           // Stores all withdrawal requests (admin view)
};

/**
 * Withdrawal reducer handles state changes for all withdrawal-related actions
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and optional payload
 * @return {Object} The new state after applying the action
 */
const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    // ========== REQUEST ACTIONS ==========
    // Set loading state for all withdrawal operations
    case WITHDRAWAL_REQUEST:              // Withdrawal request in progress
    case WITHDRAWAL_PROCEED_REQUEST:      // Admin approval/rejection in progress
    case GET_WITHDRAWAL_HISTORY_REQUEST:  // Withdrawal history fetch in progress
    case GET_WITHDRAWAL_REQUEST_REQUEST:  // Admin withdrawal requests fetch in progress
      return {
        ...state,          // Preserve existing state
        loading: true,     // Set loading flag to true
        error: null,       // Clear any previous errors
      };
      
    // ========== WITHDRAWAL SUCCESS ==========
    // Handle successful withdrawal request
    case WITHDRAWAL_SUCCESS:
      return {
        ...state,
        withdrawal: action.payload,  // Store the withdrawal request data
        loading: false,              // Reset loading state
        error: null,                 // Clear any errors
      };
      
    // ========== PAYMENT DETAILS SUCCESS ==========
    // Handle successful payment details operations
    case ADD_PAYMENT_DETAILS_SUCCESS:  // Payment details added/updated
    case GET_PAYMENT_DETAILS_SUCCESS:  // Payment details retrieved
      return {
        ...state,
        paymentDetails: action.payload,  // Store payment details
        loading: false,                  // Reset loading state
        error: null,                     // Clear any errors
      };
      
    // ========== WITHDRAWAL PROCESSING SUCCESS ==========
    // Handle successful admin approval/rejection of withdrawal
    case WITHDRAWAL_PROCEED_SUCCESS:
      return {
        ...state,
        // Update the specific withdrawal request in the list
        requests: state.requests.map((item) =>
          item.id == action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };
      
    // ========== WITHDRAWAL HISTORY SUCCESS ==========
    // Handle successful fetch of withdrawal history
    case GET_WITHDRAWAL_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload,  // Store withdrawal history
        loading: false,
        error: null,
      };

    // ========== ALL WITHDRAWAL REQUESTS SUCCESS ==========
    // Handle successful fetch of all withdrawal requests (admin)
    case GET_WITHDRAWAL_REQUEST_SUCCESS:
      return {
        ...state,
        requests: action.payload,  // Store all withdrawal requests
        loading: false,
        error: null,
      };
      
    // ========== FAILURE ACTIONS ==========
    // Handle failures for all withdrawal operations
    case WITHDRAWAL_FAILURE:            // Withdrawal request failed
    case WITHDRAWAL_PROCEED_FAILURE:    // Admin approval/rejection failed
    case GET_WITHDRAWAL_HISTORY_FAILURE: // Withdrawal history fetch failed
    case GET_WITHDRAWAL_REQUEST_FAILURE: // Admin withdrawal requests fetch failed
      return {
        ...state,
        loading: false,             // Reset loading state
        error: action.payload,      // Store error information
      };
      
    // Return unchanged state for unhandled action types
    default:
      return state;
  }
};

export default withdrawalReducer; 

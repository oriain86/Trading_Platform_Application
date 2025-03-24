// File: src/Redux/Wallet/Reducer.js
// This file defines the Redux reducer for managing wallet state

import * as types from "./ActionTypes";

/**
 * Initial state for wallet management
 * 
 * @property {Object} userWallet - User's wallet information including balance
 * @property {Array} transactions - List of wallet transactions
 * @property {boolean} loading - Indicates if a wallet API request is in progress
 * @property {Object|null} error - Error information if a request fails
 */
const initialState = {
  userWallet: {},     // Stores wallet information (balance, ID, etc.)
  loading: false,     // Tracks loading state during wallet operations
  error: null,        // Stores error messages from failed operations
  transactions: [],   // Stores transaction history
};

/**
 * Wallet reducer handles state changes for all wallet-related actions
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and optional payload/error
 * @return {Object} The new state after applying the action
 */
const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    // ========== REQUEST ACTIONS ==========
    // Set loading state for all wallet operations
    case types.GET_USER_WALLET_REQUEST:        // Wallet fetch in progress
    case types.DEPOSIT_MONEY_REQUEST:          // Deposit operation in progress
    case types.TRANSFER_MONEY_REQUEST:         // Transfer operation in progress
    case types.GET_WALLET_TRANSACTION_REQUEST: // Transaction history fetch in progress
      return {
        ...state,          // Preserve existing state
        loading: true,     // Set loading flag to true
        error: null,       // Clear any previous errors
      };

    // ========== TRANSACTION HISTORY SUCCESS ==========
    // Handle successful fetch of transaction history
    case types.GET_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.payload, // Store transaction history
        loading: false,               // Reset loading state
        error: null,                  // Clear any errors
      };

    // ========== WALLET OPERATIONS SUCCESS ==========
    // Handle successful wallet fetch and transfer operations
    case types.GET_USER_WALLET_SUCCESS:
    case types.TRANSFER_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload, // Update wallet information
        loading: false,             // Reset loading state
        error: null,                // Clear any errors
      };
      
    // ========== DEPOSIT SUCCESS ==========
    // Handle successful deposit operation
    case types.DEPOSIT_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload, // Update wallet with new balance
        loading: false,             // Reset loading state
        error: null,                // Clear any errors
      };
      
    // ========== FAILURE ACTIONS ==========
    // Handle failures for all wallet operations
    case types.GET_USER_WALLET_FAILURE:    // Wallet fetch failed
    case types.DEPOSIT_MONEY_FAILURE:      // Deposit operation failed
    case types.TRANSFER_MONEY_FAILURE:     // Transfer operation failed
      return {
        ...state,
        loading: false,          // Reset loading state
        error: action.error,     // Store error information
      };
      
    // Return unchanged state for unhandled action types
    default:
      return state;
  }
};

export default walletReducer;

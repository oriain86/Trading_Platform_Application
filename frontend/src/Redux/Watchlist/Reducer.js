// File: src/Redux/Watchlist/Reducer.js
// This file defines the Redux reducer for managing cryptocurrency watchlist state

import { existInWatchlist } from "@/Util/existInWatchlist";
import * as types from "./ActionTypes";

/**
 * Initial state for watchlist management
 * 
 * @property {Object|null} watchlist - Complete watchlist object including metadata
 * @property {Array} items - Array of cryptocurrency items in the watchlist
 * @property {boolean} loading - Indicates if a watchlist API request is in progress
 * @property {Object|null} error - Error information if a request fails
 */
const initialState = {
  watchlist: null,    // Stores the complete watchlist object from the API
  loading: false,     // Tracks loading state during watchlist operations
  error: null,        // Stores error messages from failed operations
  items: [],          // Stores the list of cryptocurrencies in the watchlist
};

/**
 * Watchlist reducer handles state changes for all watchlist-related actions
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and optional payload/error
 * @return {Object} The new state after applying the action
 */
const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // ========== REQUEST ACTIONS ==========
    // Set loading state for all watchlist operations
    case types.GET_USER_WATCHLIST_REQUEST:     // Watchlist fetch in progress
    case types.ADD_COIN_TO_WATCHLIST_REQUEST:  // Add to watchlist in progress
      return {
        ...state,          // Preserve existing state
        loading: true,     // Set loading flag to true
        error: null,       // Clear any previous errors
      };
      
    // ========== WATCHLIST FETCH SUCCESS ==========
    // Handle successful fetch of user's watchlist
    case types.GET_USER_WATCHLIST_SUCCESS:
      return {
        ...state,
        watchlist: action.payload,  // Store the complete watchlist object
        items: action.payload.coins, // Extract and store just the coins array
        loading: false,             // Reset loading state
        error: null,                // Clear any errors
      };

    // ========== ADD TO WATCHLIST SUCCESS ==========
    // Handle successful addition/removal of coin to/from watchlist
    case types.ADD_COIN_TO_WATCHLIST_SUCCESS:
      // Check if the coin already exists in the watchlist
      // If it exists, remove it (toggle off); if not, add it (toggle on)
      let updatedItems = existInWatchlist(state.items, action.payload)
        ? state.items.filter((item) => item.id !== action.payload.id)  // Remove the coin
        : [action.payload, ...state.items];                           // Add the coin at the beginning
        
      return {
        ...state,
        items: updatedItems,       // Update items with the modified array
        loading: false,            // Reset loading state
        error: null,               // Clear any errors
      };
      
    // ========== FAILURE ACTIONS ==========
    // Handle failures for all watchlist operations
    case types.GET_USER_WATCHLIST_FAILURE:    // Watchlist fetch failed
    case types.ADD_COIN_TO_WATCHLIST_FAILURE: // Add to watchlist failed
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

export default watchlistReducer;

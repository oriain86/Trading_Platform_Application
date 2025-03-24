// File: src/Redux/Assets/Reducer.js
// This file defines a Redux reducer for managing asset-related state

// Import action type constants
import * as types from './ActionTypes';

// Define the initial state structure for asset management
const initialState = {
  asset: null,         // Currently selected/active asset
  userAssets: [],      // List of all assets belonging to the user
  loading: false,      // Flag to indicate if an API request is in progress
  error: null,         // Error information if a request fails
  assetDetails: null,  // Detailed information about a specific asset
};

/**
 * The asset reducer handles all asset-related state changes in the Redux store
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and optional payload/error
 * @return {Object} The new state after applying the action
 */
const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    // When a request to fetch an asset or user assets is initiated
    case types.GET_ASSET_REQUEST:
    case types.GET_USER_ASSETS_REQUEST:
      return {
        ...state,              // Preserve existing state
        loading: true,         // Set loading to true during the API call
        error: null,           // Clear any previous errors
      };
    
    // When an asset is successfully retrieved
    case types.GET_ASSET_SUCCESS:
      return {
        ...state,
        asset: action.payload, // Store the retrieved asset
        loading: false,        // Mark loading as complete
        error: null,           // Clear any errors
      };
    
    // When asset details are successfully retrieved
    case types.GET_ASSET_DETAILS_SUCCESS:
      return {
        ...state,
        assetDetails: action.payload, // Store the detailed asset information
        loading: false,
        error: null,
      };
    
    // When user assets are successfully retrieved
    case types.GET_USER_ASSETS_SUCCESS:
      return {
        ...state,
        userAssets: action.payload, // Store the list of user assets
        loading: false,
        error: null,
      };
    
    // When any asset-related request fails
    case types.GET_ASSET_FAILURE:
    case types.GET_USER_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,   // Store the error information
      };
    
    // Return unchanged state for unhandled action types
    default:
      return state;
  }
};

export default assetReducer; 

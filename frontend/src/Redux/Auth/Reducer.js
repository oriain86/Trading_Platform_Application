// File: src/Redux/Auth/Reducer.js
// This file defines the Redux reducer for managing authentication state

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  LOGIN_TWO_STEP_FAILURE,
  LOGIN_TWO_STEP_SUCCESS,
} from "./ActionTypes";

/**
 * Initial state for authentication
 * 
 * @property {Object|null} user - User profile data when logged in, null otherwise
 * @property {boolean} loading - Indicates if an authentication API call is in progress
 * @property {Object|null} error - Error information if authentication fails
 * @property {string|null} jwt - JWT token for authenticated requests
 */
const initialState = {
  user: null,       // Stores user profile information
  loading: false,   // Tracks loading state during auth operations
  error: null,      // Stores error messages from failed auth operations
  jwt: null,        // Stores the JWT token for authenticated API calls
};

/**
 * Authentication reducer handles state changes for all authentication-related actions
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and optional payload
 * @return {Object} The new state after applying the action
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request actions - set loading to true for any auth-related request
    case REGISTER_REQUEST:  // User registration in progress
    case LOGIN_REQUEST:     // User login in progress
    case GET_USER_REQUEST:  // User profile fetching in progress
      return { 
        ...state,          // Preserve existing state
        loading: true,     // Set loading flag to true
        error: null        // Clear any previous errors
      };

    // Registration success - store JWT token
    case REGISTER_SUCCESS:
      return { 
        ...state,
        loading: false,    // Reset loading flag
        jwt: action.payload // Store JWT token from payload
      };

    // Login success - store JWT token
    case LOGIN_SUCCESS:
      return { 
        ...state,
        loading: false,    // Reset loading flag
        jwt: action.payload // Store JWT token from payload
      };

    // Two-step verification success - store JWT token
    case LOGIN_TWO_STEP_SUCCESS:
      return { 
        ...state,
        loading: false,    // Reset loading flag
        jwt: action.payload // Store JWT token from payload
      };

    // User fetch success - store user profile data
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,    // Reset loading flag
        user: action.payload, // Store user profile data
        fetchingUser: false, // Mark user fetch as complete
      };

    // Failure actions - handle all auth-related errors
    case LOGIN_FAILURE:    // Login attempt failed
    case REGISTER_FAILURE: // Registration attempt failed
    case GET_USER_FAILURE: // User profile fetch failed
    case LOGIN_TWO_STEP_FAILURE: // Two-step verification failed
      return {
        ...state,
        loading: false,    // Reset loading flag
        error: action.payload, // Store error information
      };
      
    // Logout - clear authentication data
    case LOGOUT:
      localStorage.removeItem("jwt"); // Remove JWT from local storage
      return { 
        ...state, 
        jwt: null,        // Clear JWT token
        user: null        // Clear user profile
      };
      
    // Return unchanged state for unhandled action types
    default:
      return state;
  }
};

export default authReducer; 

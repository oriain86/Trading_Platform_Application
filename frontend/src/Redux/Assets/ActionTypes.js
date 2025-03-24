/**
 * File: src/Redux/Assets/ActionTypes.js
 * Description: Redux action creators for asset-related operations
 */

// ==========================================
// REDUX ACTION TYPE CONSTANTS
// ==========================================
// This file defines constants for Redux action types used in an asset management system.
// Following the standard Redux pattern, each API operation has three states:
// REQUEST: When the API call is initiated
// SUCCESS: When the API call completes successfully
// FAILURE: When the API call fails with an error

// ==========================================
// Single Asset Fetch Actions
// ==========================================
// Used for fetching a single asset by its ID
export const GET_ASSET_REQUEST = 'GET_ASSET_REQUEST';  // Dispatched when starting to fetch a single asset
export const GET_ASSET_SUCCESS = 'GET_ASSET_SUCCESS';  // Dispatched when a single asset is successfully retrieved
export const GET_ASSET_FAILURE = 'GET_ASSET_FAILURE';  // Dispatched when fetching a single asset fails

// ==========================================
// User's Assets Collection Actions
// ==========================================
// Used for fetching all assets belonging to a specific user
export const GET_USER_ASSETS_REQUEST = 'GET_USER_ASSETS_REQUEST';  // Dispatched when starting to fetch user's assets
export const GET_USER_ASSETS_SUCCESS = 'GET_USER_ASSETS_SUCCESS';  // Dispatched when user's assets are successfully retrieved
export const GET_USER_ASSETS_FAILURE = 'GET_USER_ASSETS_FAILURE';  // Dispatched when fetching user's assets fails

// ==========================================
// Asset Details Actions
// ==========================================
// Used for fetching detailed information about a specific asset
// This may include more comprehensive data than the basic asset fetch
export const GET_ASSET_DETAILS_REQUEST = 'GET_ASSET_DETAILS_REQUEST';  // Dispatched when starting to fetch asset details
export const GET_ASSET_DETAILS_SUCCESS = 'GET_ASSET_DETAILS_SUCCESS';  // Dispatched when asset details are successfully retrieved
export const GET_ASSET_DETAILS_FAILURE = 'GET_ASSET_DETAILS_FAILURE';  // Dispatched when fetching asset details fails

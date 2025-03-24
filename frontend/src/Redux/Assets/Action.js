/**
 * File: src/Redux/Assets/Action.js
 * Description: Redux action creators for asset-related operations
 */

import api from "@/Api/api"; // API utility for making HTTP requests
import * as types from "./ActionTypes"; // Action type constants

/**
 * Get details of a specific asset by its ID
 * 
 * @param {Object} options - Parameters for the action
 * @param {string} options.assetId - ID of the asset to fetch
 * @param {string} options.jwt - JSON Web Token for authentication
 * @returns {Function} Redux thunk action function
 */
export const getAssetById =
  ({ assetId, jwt }) =>
  async (dispatch) => {
    // Dispatch request action to indicate loading state
    dispatch({ type: types.GET_ASSET_REQUEST });

    try {
      // Make API request to fetch asset by ID
      const response = await api.get(`/api/assets/${assetId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include auth token in request header
        },
      });
      
      // Dispatch success action with the fetched data
      dispatch({
        type: types.GET_ASSET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch failure action if request fails
      dispatch({
        type: types.GET_ASSET_FAILURE,
        error: error.message,
      });
    }
  };

/**
 * Get asset details for a specific coin for the current user
 * 
 * @param {Object} options - Parameters for the action
 * @param {string} options.coinId - ID of the coin to fetch asset details for
 * @param {string} options.jwt - JSON Web Token for authentication
 * @returns {Function} Redux thunk action function
 */
export const getAssetDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    // Dispatch request action to indicate loading state
    dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });

    try {
      // Make API request to fetch asset details for the specified coin
      const response = await api.get(`/api/assets/coin/${coinId}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include auth token in request header
        },
      });
      
      // Dispatch success action with the fetched data
      dispatch({
        type: types.GET_ASSET_DETAILS_SUCCESS,
        payload: response.data,
      });
      
      // Debug log for asset details
      console.log("asset details --- ", response.data);
    } catch (error) {
      // Dispatch failure action if request fails
      // Note: This uses GET_ASSET_FAILURE instead of GET_ASSET_DETAILS_FAILURE
      dispatch({
        type: types.GET_ASSET_FAILURE,
        error: error.message,
      });
    }
  };

/**
 * Get all assets owned by the current user
 * 
 * @param {string} jwt - JSON Web Token for authentication
 * @returns {Function} Redux thunk action function
 */
export const getUserAssets = (jwt) => async (dispatch) => {
  // Dispatch request action to indicate loading state
  dispatch({ type: types.GET_USER_ASSETS_REQUEST });

  try {
    // Make API request to fetch all user assets
    const response = await api.get("/api/assets", {
      headers: {
        Authorization: `Bearer ${jwt}`, // Include auth token in request header
      },
    });
    
    // Dispatch success action with the fetched data
    dispatch({
      type: types.GET_USER_ASSETS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Dispatch failure action if request fails
    dispatch({
      type: types.GET_USER_ASSETS_FAILURE,
      error: error.message,
    });
  }
};

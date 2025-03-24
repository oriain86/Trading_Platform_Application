// File: src/Redux/Watchlist/Action.js
// This file contains Redux action creators for watchlist-related operations

import * as types from './ActionTypes';
import api from '@/Api/api';

/**
 * Action creator to fetch the user's watchlist
 * 
 * This function retrieves all coins that the user has added to their watchlist.
 * It assumes the API request is authenticated using the stored JWT token in the API instance.
 * 
 * @returns {Function} - Thunk function that fetches the user's watchlist
 */
export const getUserWatchlist = () => async (dispatch) => {
  // Dispatch action to indicate watchlist fetch has started
  dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });

  try {
    // Make API request to get user's watchlist
    // Note: Authentication is handled by the api instance
    const response = await api.get('/api/watchlist/user');

    // Dispatch success action with watchlist data
    dispatch({
      type: types.GET_USER_WATCHLIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Dispatch failure action with error message
    dispatch({
      type: types.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

/**
 * Action creator to add a cryptocurrency to the user's watchlist
 * 
 * This function adds a specific coin identified by its ID to the user's watchlist.
 * It assumes the API request is authenticated using the stored JWT token in the API instance.
 * 
 * @param {string} coinId - The ID of the cryptocurrency to be added to the watchlist
 * @returns {Function} - Thunk function that adds a coin to the watchlist
 */
export const addItemToWatchlist = (coinId) => async (dispatch) => {
  // Dispatch action to indicate add to watchlist operation has started
  dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });

  try {
    // Make API request to add coin to watchlist
    // Using PATCH as it's modifying an existing resource (the watchlist)
    const response = await api.patch(`/api/watchlist/add/coin/${coinId}`);

    // Dispatch success action with updated watchlist data
    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("error", error);
    
    // Dispatch failure action with error message
    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

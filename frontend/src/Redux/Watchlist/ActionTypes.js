// File: src/Redux/Watchlist/ActionTypes.js
// This file defines constants for Redux action types used in watchlist operations

// ========== USER WATCHLIST FETCH ACTION TYPES ==========
// Action types for retrieving the user's cryptocurrency watchlist
export const GET_USER_WATCHLIST_REQUEST = 'GET_USER_WATCHLIST_REQUEST';  // Dispatched when watchlist fetch starts
export const GET_USER_WATCHLIST_SUCCESS = 'GET_USER_WATCHLIST_SUCCESS';  // Dispatched when watchlist is successfully retrieved
export const GET_USER_WATCHLIST_FAILURE = 'GET_USER_WATCHLIST_FAILURE';  // Dispatched when watchlist fetch fails

// ========== ADD TO WATCHLIST ACTION TYPES ==========
// Action types for adding a cryptocurrency to the user's watchlist
export const ADD_COIN_TO_WATCHLIST_REQUEST = 'ADD_COIN_TO_WATCHLIST_REQUEST';  // Dispatched when adding coin to watchlist starts
export const ADD_COIN_TO_WATCHLIST_SUCCESS = 'ADD_COIN_TO_WATCHLIST_SUCCESS';  // Dispatched when coin is successfully added to watchlist
export const ADD_COIN_TO_WATCHLIST_FAILURE = 'ADD_COIN_TO_WATCHLIST_FAILURE';  // Dispatched when adding coin to watchlist fails

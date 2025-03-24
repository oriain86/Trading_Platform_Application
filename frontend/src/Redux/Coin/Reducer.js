// File: src/Redux/Coin/Reducer.js
// This file defines the Redux reducer for managing cryptocurrency data

import {
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_TOP_50_COINS_SUCCESS,
  SEARCH_COIN_SUCCESS,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_FAILURE,
} from "./ActionTypes";

/**
 * Initial state for cryptocurrency data
 * 
 * @property {Array} coinList - Paginated list of cryptocurrencies
 * @property {Array} top50 - Top 50 cryptocurrencies by market cap
 * @property {Array} searchCoinList - Results from cryptocurrency search
 * @property {Object} marketChart - Price chart data with loading state
 * @property {Object|null} coinById - Basic information about a specific coin
 * @property {Object|null} coinDetails - Detailed information about a specific coin
 * @property {boolean} loading - Global loading state for coin operations
 * @property {Object|null} error - Error information for failed operations
 */
const initialState = {
  coinList: [],           // Stores paginated list of all cryptocurrencies
  top50: [],              // Stores top 50 cryptocurrencies by market cap
  searchCoinList: [],     // Stores results from coin search operations
  marketChart: {          // Stores price chart data with its own loading state
    data: [], 
    loading: false 
  },
  coinById: null,         // Stores basic data for a specific coin
  coinDetails: null,      // Stores detailed data for a specific coin
  loading: false,         // Global loading state for most coin operations
  error: null,            // Stores error information when operations fail
};

/**
 * Coin reducer handles state changes for all cryptocurrency-related actions
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and optional payload
 * @return {Object} The new state after applying the action
 */
const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    // ========== REQUEST ACTIONS ==========
    // Set loading state for general coin operations
    case FETCH_COIN_LIST_REQUEST:    // Coin list fetch started
    case FETCH_COIN_BY_ID_REQUEST:   // Coin by ID fetch started
    case FETCH_COIN_DETAILS_REQUEST: // Coin details fetch started
    case SEARCH_COIN_REQUEST:        // Coin search started
    case FETCH_TOP_50_COINS_REQUEST: // Top 50 coins fetch started
      return { 
        ...state, 
        loading: true,    // Set global loading to true
        error: null       // Clear any previous errors
      };

    // Special case for market chart with its own loading state
    case FETCH_MARKET_CHART_REQUEST:
      return {
        ...state,
        marketChart: { 
          loading: true,  // Set chart-specific loading to true
          data: []        // Clear previous chart data
        },
        error: null       // Clear any previous errors
      };

    // ========== SUCCESS ACTIONS ==========
    // Handle successful coin list fetch
    case FETCH_COIN_LIST_SUCCESS:
      return {
        ...state,
        coinList: action.payload, // Store fetched coin list
        loading: false,           // Reset loading state
        error: null               // Clear any errors
      };

    // Handle successful top 50 coins fetch
    case FETCH_TOP_50_COINS_SUCCESS:
      return {
        ...state,
        top50: action.payload,    // Store top 50 coins
        loading: false,           // Reset loading state
        error: null               // Clear any errors
      };

    // Handle successful market chart fetch
    case FETCH_MARKET_CHART_SUCCESS:
      return {
        ...state,
        marketChart: { 
          data: action.payload.prices, // Store price data points
          loading: false               // Reset chart-specific loading 
        },
        error: null                    // Clear any errors
      };

    // Handle successful coin by ID fetch
    case FETCH_COIN_BY_ID_SUCCESS:
      return {
        ...state,
        coinDetails: action.payload, // Store coin data
        loading: false,              // Reset loading state
        error: null                  // Clear any errors
      };

    // Handle successful coin search
    case SEARCH_COIN_SUCCESS:
      return {
        ...state,
        searchCoinList: action.payload.coins, // Store search results
        loading: false,                       // Reset loading state
        error: null                           // Clear any errors
      };

    // Handle successful coin details fetch
    case FETCH_COIN_DETAILS_SUCCESS:
      return {
        ...state,
        coinDetails: action.payload, // Store detailed coin information
        loading: false,              // Reset loading state
        error: null                  // Clear any errors
      };

    // ========== FAILURE ACTIONS ==========
    // Special case for market chart failure
    case FETCH_MARKET_CHART_FAILURE:
      return {
        ...state,
        marketChart: { 
          loading: false,  // Reset chart-specific loading
          data: []         // Clear chart data
        },
        error: null        // Note: This appears to clear the error instead of setting it
      };

    // Handle failures for all other coin operations
    case FETCH_COIN_LIST_FAILURE:    // Coin list fetch failed
    case SEARCH_COIN_FAILURE:        // Coin search failed
    case FETCH_COIN_BY_ID_FAILURE:   // Coin by ID fetch failed
    case FETCH_COIN_DETAILS_FAILURE: // Coin details fetch failed
    case FETCH_TOP_50_COINS_FAILURE: // Top 50 coins fetch failed
      return { 
        ...state, 
        loading: false,          // Reset loading state
        error: action.payload    // Store error information
      };
      
    // Return unchanged state for unhandled action types
    default:
      return state;
  }
};

export default coinReducer;

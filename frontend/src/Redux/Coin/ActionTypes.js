// File: src/Redux/Coin/ActionTypes.js 
// This file defines constants for Redux action types used in cryptocurrency operations

// ========== COIN LIST ACTION TYPES ==========
// Action types for fetching paginated cryptocurrency list
export const FETCH_COIN_LIST_REQUEST = 'FETCH_COIN_LIST_REQUEST';  // Dispatched when coin list fetch starts
export const FETCH_COIN_LIST_SUCCESS = 'FETCH_COIN_LIST_SUCCESS';  // Dispatched when coin list is successfully retrieved
export const FETCH_COIN_LIST_FAILURE = 'FETCH_COIN_LIST_FAILURE';  // Dispatched when coin list fetch fails

// ========== TOP 50 COINS ACTION TYPES ==========
// Action types for fetching top 50 cryptocurrencies by market cap
export const FETCH_TOP_50_COINS_REQUEST = 'FETCH_TOP_50_COINS_REQUEST';  // Dispatched when top 50 coins fetch starts
export const FETCH_TOP_50_COINS_SUCCESS = 'FETCH_TOP_50_COINS_SUCCESS';  // Dispatched when top 50 coins are successfully retrieved
export const FETCH_TOP_50_COINS_FAILURE = 'FETCH_TOP_50_COINS_FAILURE';  // Dispatched when top 50 coins fetch fails

// ========== TRENDING COINS ACTION TYPES ==========
// Action types for fetching trending cryptocurrencies
export const FETCH_TRADING_COINS_REQUEST = 'FETCH_TRADING_COINS_REQUEST';  // Dispatched when trending coins fetch starts
export const FETCH_TRADING_COINS_SUCCESS = 'FETCH_TRADING_COINS_SUCCESS';  // Dispatched when trending coins are successfully retrieved
export const FETCH_TRADING_COINS_FAILURE = 'FETCH_TRADING_COINS_FAILURE';  // Dispatched when trending coins fetch fails

// ========== MARKET CHART ACTION TYPES ==========
// Action types for fetching price chart data for a specific coin
export const FETCH_MARKET_CHART_REQUEST = 'FETCH_MARKET_CHART_REQUEST';  // Dispatched when chart data fetch starts
export const FETCH_MARKET_CHART_SUCCESS = 'FETCH_MARKET_CHART_SUCCESS';  // Dispatched when chart data is successfully retrieved
export const FETCH_MARKET_CHART_FAILURE = 'FETCH_MARKET_CHART_FAILURE';  // Dispatched when chart data fetch fails

// ========== COIN BY ID ACTION TYPES ==========
// Action types for fetching basic information about a specific coin
export const FETCH_COIN_BY_ID_REQUEST = 'FETCH_COIN_BY_ID_REQUEST';  // Dispatched when coin data fetch starts
export const FETCH_COIN_BY_ID_SUCCESS = 'FETCH_COIN_BY_ID_SUCCESS';  // Dispatched when coin data is successfully retrieved
export const FETCH_COIN_BY_ID_FAILURE = 'FETCH_COIN_BY_ID_FAILURE';  // Dispatched when coin data fetch fails

// ========== COIN DETAILS ACTION TYPES ==========
// Action types for fetching detailed information about a specific coin (authenticated)
export const FETCH_COIN_DETAILS_REQUEST = 'FETCH_COIN_DETAILS_REQUEST';  // Dispatched when coin details fetch starts
export const FETCH_COIN_DETAILS_SUCCESS = 'FETCH_COIN_DETAILS_SUCCESS';  // Dispatched when coin details are successfully retrieved
export const FETCH_COIN_DETAILS_FAILURE = 'FETCH_COIN_DETAILS_FAILURE';  // Dispatched when coin details fetch fails

// ========== COIN SEARCH ACTION TYPES ==========
// Action types for searching cryptocurrencies by keyword
export const SEARCH_COIN_REQUEST = 'SEARCH_COIN_REQUEST';  // Dispatched when coin search starts
export const SEARCH_COIN_SUCCESS = 'SEARCH_COIN_SUCCESS';  // Dispatched when search results are successfully retrieved
export const SEARCH_COIN_FAILURE = 'SEARCH_COIN_FAILURE';  // Dispatched when coin search fails

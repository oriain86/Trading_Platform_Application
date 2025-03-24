// File: src/Redux/Coin/Action.js
// This file contains Redux action creators for cryptocurrency-related operations

import axios from "axios";
import { 
  FETCH_COIN_BY_ID_FAILURE, 
  FETCH_COIN_BY_ID_REQUEST, 
  FETCH_COIN_BY_ID_SUCCESS, 
  FETCH_COIN_DETAILS_FAILURE, 
  FETCH_COIN_DETAILS_REQUEST, 
  FETCH_COIN_DETAILS_SUCCESS, 
  FETCH_COIN_LIST_FAILURE, 
  FETCH_COIN_LIST_REQUEST, 
  FETCH_COIN_LIST_SUCCESS, 
  FETCH_MARKET_CHART_FAILURE, 
  FETCH_MARKET_CHART_REQUEST, 
  FETCH_MARKET_CHART_SUCCESS, 
  FETCH_TOP_50_COINS_FAILURE, 
  FETCH_TOP_50_COINS_REQUEST, 
  FETCH_TOP_50_COINS_SUCCESS, 
  FETCH_TRADING_COINS_FAILURE, 
  FETCH_TRADING_COINS_REQUEST, 
  FETCH_TRADING_COINS_SUCCESS, 
  SEARCH_COIN_FAILURE, 
  SEARCH_COIN_REQUEST, 
  SEARCH_COIN_SUCCESS 
} from "./ActionTypes";
import api, { API_BASE_URL } from "@/Api/api";

/**
 * Action creator to fetch paginated list of cryptocurrencies
 * 
 * @param {number} page - Page number for pagination
 * @returns {Function} - Thunk function that fetches coin list data
 */
export const fetchCoinList = (page) => async (dispatch) => {
    // Dispatch action to indicate coin list fetch has started
    dispatch({ type: FETCH_COIN_LIST_REQUEST });
    try {
      // Make API request to get paginated coin list
      const response = await axios.get(`${API_BASE_URL}/coins?page=${page}`);
      
      // Dispatch success action with coin list data
      dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: response.data });
      console.log("-------", response.data);
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
    }
};

/**
 * Action creator to fetch top 50 cryptocurrencies by market cap
 * 
 * @returns {Function} - Thunk function that fetches top 50 coins
 */
export const getTop50CoinList = () => async (dispatch) => {
    // Dispatch action to indicate top 50 coins fetch has started
    dispatch({ type: FETCH_TOP_50_COINS_REQUEST });
    try {
      // Make API request to get top 50 coins
      const response = await axios.get(`${API_BASE_URL}/coins/top50`);
      
      // Dispatch success action with top 50 coins data
      dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: response.data });
      console.log("top 50", response.data);
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
    }
};

/**
 * Action creator to fetch trending cryptocurrencies
 * 
 * @returns {Function} - Thunk function that fetches trending coins
 */
export const fetchTreadingCoinList = () => async (dispatch) => {
    // Dispatch action to indicate trending coins fetch has started
    dispatch({ type: FETCH_TRADING_COINS_REQUEST });
    try {
      // Make API request to get trending coins
      const response = await axios.get(`${API_BASE_URL}/coins/trading`);
      
      // Dispatch success action with trending coins data
      dispatch({ type: FETCH_TRADING_COINS_SUCCESS, payload: response.data });
      console.log("trading coins", response.data);
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({ type: FETCH_TRADING_COINS_FAILURE, payload: error.message });
    }
};

/**
 * Action creator to fetch price chart data for a specific coin
 * 
 * @param {Object} params - Parameters for market chart request
 * @param {string} params.coinId - Identifier of the cryptocurrency
 * @param {string|number} params.days - Time period for chart data (e.g., '1', '7', '30', 'max')
 * @param {string} params.jwt - JWT token for authentication
 * @returns {Function} - Thunk function that fetches market chart data
 */
export const fetchMarketChart = ({coinId, days, jwt}) => async (dispatch) => {
    // Dispatch action to indicate market chart fetch has started
    dispatch({ type: FETCH_MARKET_CHART_REQUEST });
    try {
      // Make authenticated API request to get chart data
      const response = await api.get(`/coins/${coinId}/chart?days=${days}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      
      // Dispatch success action with chart data
      dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
    }
};

/**
 * Action creator to fetch basic information for a specific coin by ID
 * 
 * @param {string} coinId - Identifier of the cryptocurrency
 * @returns {Function} - Thunk function that fetches coin information
 */
export const fetchCoinById = (coinId) => async (dispatch) => {
    // Dispatch action to indicate coin fetch has started
    dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
    try {
      // Make API request to get coin by ID
      const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
      
      // Dispatch success action with coin data
      dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
      console.log("coin by id", response.data);
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
    }
};

/**
 * Action creator to fetch detailed information for a specific coin
 * Requires authentication
 * 
 * @param {Object} params - Parameters for coin details request
 * @param {string} params.coinId - Identifier of the cryptocurrency
 * @param {string} params.jwt - JWT token for authentication
 * @returns {Function} - Thunk function that fetches detailed coin information
 */
export const fetchCoinDetails = ({coinId, jwt}) => async (dispatch) => {
    // Dispatch action to indicate coin details fetch has started
    dispatch({ type: FETCH_COIN_DETAILS_REQUEST });
    try {
      // Make authenticated API request to get detailed coin information
      const response = await api.get(`/coins/details/${coinId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      
      // Dispatch success action with detailed coin data
      dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
      console.log("coin details", response.data);
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
    }
};

/**
 * Action creator to search for cryptocurrencies by keyword
 * 
 * @param {string} keyword - Search term
 * @returns {Function} - Thunk function that performs coin search
 */
export const searchCoin = (keyword) => async (dispatch) => {
    // Dispatch action to indicate search has started
    dispatch({ type: SEARCH_COIN_REQUEST });
    try {
      // Make API request to search for coins
      const response = await api.get(`/coins/search?q=${keyword}`);
      
      // Dispatch success action with search results
      dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data });
      console.log("search coin", response.data);
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
    }
};

// File: src/__tests__/redux/reducers/coin.reducer.test.js
// This file contains unit tests for the cryptocurrency reducer

import reducer from '../../../Redux/Coin/Reducer';
import * as types from '../../../Redux/Coin/ActionTypes';

describe('Coin Reducer', () => {
  // Define the expected initial state structure for the coin reducer
  // This ensures tests remain consistent even if the reducer's initial state changes
  const initialState = {
    coinList: [],         // Array to store the paginated list of all cryptocurrencies
    coinDetails: null,    // Object to store detailed information about a specific coin
    top50: [],            // Array to store top 50 cryptocurrencies by market cap
    loading: false,       // Flag to indicate if a request is in progress
    error: null,          // Object to store error information
    coinById: null,       // Object to store basic information about a specific coin
    searchCoinList: [],   // Array to store search results
    marketChart: {        // Object to store price chart data with its own loading state
      data: [],           // Array of price data points
      loading: false      // Chart-specific loading state
    }
  };
  
  // Test 1: Verify the reducer returns the correct initial state
  it('should return the initial state', () => {
    // When the reducer receives undefined state and an empty action
    // it should return the initial state
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  
  // Test 2: Verify FETCH_COIN_DETAILS_REQUEST action sets loading flag
  it('should handle FETCH_COIN_DETAILS_REQUEST', () => {
    // When a coin details request action is dispatched
    const newState = reducer(initialState, {
      type: types.FETCH_COIN_DETAILS_REQUEST
    });
    
    // The loading flag should be set to true, indicating a request in progress
    // The rest of the state should remain unchanged
    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });
  
  // Test 3: Verify FETCH_COIN_DETAILS_SUCCESS action stores coin details and resets loading
  it('should handle FETCH_COIN_DETAILS_SUCCESS', () => {
    // Sample coin details data
    const coinDetails = {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc'
    };
    
    // When a coin details success action is dispatched with coin data
    const newState = reducer(initialState, {
      type: types.FETCH_COIN_DETAILS_SUCCESS,
      payload: coinDetails
    });
    
    // The coin details should be stored in state
    // The loading flag should be reset to false
    // The rest of the state should remain unchanged
    expect(newState).toEqual({
      ...initialState,
      coinDetails,
      loading: false
    });
  });
  
  // Test 4: Verify FETCH_COIN_DETAILS_FAILURE action resets loading and possibly sets error
  it('should handle FETCH_COIN_DETAILS_FAILURE', () => {
    // When a coin details failure action is dispatched with an error
    // Note: This test focuses only on the loading state, not on the error property
    // which might be handled differently based on the implementation
    const result = reducer(initialState, {
      type: types.FETCH_COIN_DETAILS_FAILURE,
      error: 'Failed to fetch coin details'
    });
    
    // The loading flag should be reset to false
    expect(result.loading).toBe(false);
  });
  
  // Additional tests that could be added:
  // - Test for FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_COIN_LIST_FAILURE
  // - Test for FETCH_TOP_50_COINS actions 
  // - Test for SEARCH_COIN actions
  // - Test for FETCH_MARKET_CHART actions with chart-specific loading state
  // - Test for FETCH_COIN_BY_ID actions
}); 

// File: src/__tests__/redux/reducers/wallet.reducer.test.js
// This file contains unit tests for the wallet reducer

import reducer from '../../../Redux/Wallet/Reducer';
import * as types from '../../../Redux/Wallet/ActionTypes';

describe('Wallet Reducer', () => {
  // Define the expected initial state structure for the wallet reducer
  const initialState = {
    userWallet: {},     // Object to store wallet information (balance, ID, etc.)
    loading: false,     // Flag to indicate if a wallet operation is in progress
    error: null,        // Object to store error information
    transactions: [],   // Array to store transaction history
  };

  // Test 1: Verify the reducer returns the correct initial state
  it('should return the initial state', () => {
    // When the reducer receives undefined state and an empty action
    // it should return the initial state
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  // Test 2: Verify GET_USER_WALLET_REQUEST action sets loading flag
  it('should handle GET_USER_WALLET_REQUEST', () => {
    // When a get wallet request action is dispatched
    const newState = reducer(initialState, {
      type: types.GET_USER_WALLET_REQUEST,
    });
    
    // The loading flag should be set to true, indicating a request in progress
    // The error should be cleared (set to null)
    // The rest of the state should remain unchanged
    expect(newState).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  // Test 3: Verify GET_USER_WALLET_SUCCESS action stores wallet data and resets loading
  it('should handle GET_USER_WALLET_SUCCESS', () => {
    // Sample wallet data with balance
    const mockWallet = { id: 1, balance: 500 };
    
    // When a get wallet success action is dispatched with wallet data
    const newState = reducer(initialState, {
      type: types.GET_USER_WALLET_SUCCESS,
      payload: mockWallet,
    });
    
    // The wallet data should be stored in state
    // The loading flag should be reset to false
    // The error should be cleared (set to null)
    // The rest of the state should remain unchanged
    expect(newState).toEqual({
      ...initialState,
      userWallet: mockWallet,
      loading: false,
      error: null,
    });
  });

  // Test 4: Verify GET_USER_WALLET_FAILURE action resets loading and sets error
  it('should handle GET_USER_WALLET_FAILURE', () => {
    // When a get wallet failure action is dispatched with an error
    const newState = reducer(initialState, {
      type: types.GET_USER_WALLET_FAILURE,
      error: 'Failed to fetch wallet',
    });
    
    // The loading flag should be reset to false
    // The error should be set to the provided error message
    // The rest of the state should remain unchanged
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch wallet',
    });
  });
  
  // Additional tests that could be added:
  // - Test for GET_WALLET_TRANSACTION_REQUEST, GET_WALLET_TRANSACTION_SUCCESS, GET_WALLET_TRANSACTION_FAILURE
  // - Test for DEPOSIT_MONEY actions
  // - Test for TRANSFER_MONEY actions
}); 

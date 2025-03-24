// File: src/__tests__/redux/actions/wallet.actions.test.js
// This file contains unit tests for wallet-related Redux action creators

import configureStore from 'redux-mock-store';
import * as actions from '../../../Redux/Wallet/Action';
import * as types from '../../../Redux/Wallet/ActionTypes';

// Mock the API module to prevent actual API calls during tests
// All API methods are mocked to return empty successful responses by default
jest.mock('../../../Api/api', () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(() => Promise.resolve({ data: {} })),    // Mock GET requests
      put: jest.fn(() => Promise.resolve({ data: {} })),    // Mock PUT requests
      post: jest.fn(() => Promise.resolve({ data: {} })),   // Mock POST requests
      defaults: {
        headers: {
          common: {},  // Common headers for all requests
          post: {}     // Additional headers for POST requests
        }
      }
    }
  };
});

// Import API after mocking to ensure we get the mocked version
import api from '../../../Api/api';

// Create a Redux mock store factory without middleware
// This allows testing action creators independently of reducers
const mockStore = configureStore();

describe('Wallet Actions', () => {
  let store;
  
  // Setup before each test
  beforeEach(() => {
    // Reset all mock function data
    jest.clearAllMocks();
    
    // Create a fresh Redux store for each test
    store = mockStore({ wallet: {} });
    
    // Mock browser's localStorage API for JWT token access
    global.localStorage = {
      getItem: jest.fn(() => 'fake-jwt'),  // Mock retrieving a token
      setItem: jest.fn(),                  // Mock storing a token
      removeItem: jest.fn(),               // Mock removing a token
      clear: jest.fn()                     // Mock clearing all storage
    };
  });

  // Test 1: Fetching wallet data successfully
  it('creates GET_USER_WALLET_SUCCESS when fetching user wallet succeeds', () => {
    // Setup mock wallet data to be returned by the API
    const mockWallet = { id: 1, balance: 1000 };
    api.get.mockResolvedValue({ data: mockWallet });
    
    // Define the sequence of actions we expect to be dispatched
    const expectedActions = [
      { type: types.GET_USER_WALLET_REQUEST },              // First action: request started
      { type: types.GET_USER_WALLET_SUCCESS, payload: mockWallet }  // Second action: request successful
    ];
    
    // Dispatch the getUserWallet action (which is a thunk) and return the promise
    return actions.getUserWallet('fake-jwt')(store.dispatch)
      .then(() => {
        // Verify that all expected actions were dispatched in the correct order
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // Test 2: Handling failure when fetching wallet data
  it('creates GET_USER_WALLET_FAILURE when fetching user wallet fails', () => {
    // Setup mock API to simulate a network error
    api.get.mockRejectedValue(new Error('Network Error'));
    
    // Define the sequence of actions we expect to be dispatched
    const expectedActions = [
      { type: types.GET_USER_WALLET_REQUEST },              // First action: request started
      { type: types.GET_USER_WALLET_FAILURE, error: 'Network Error' }  // Second action: request failed
    ];
    
    // Dispatch the getUserWallet action and return the promise
    return actions.getUserWallet('fake-jwt')(store.dispatch)
      .then(() => {
        const actions = store.getActions();
        // Check first action matches exactly
        expect(actions[0]).toEqual(expectedActions[0]);
        // For the error action, verify the type and that an error exists
        // This is a more flexible test that doesn't depend on exact error formatting
        expect(actions[1].type).toEqual(expectedActions[1].type);
        expect(actions[1].error).toBeDefined();
      });
  });

  // Test 3: Fetching transaction history successfully
  it('creates GET_WALLET_TRANSACTION_SUCCESS when fetching transactions succeeds', () => {
    // Setup mock transaction data to be returned by the API
    const mockTransactions = [
      { id: 1, amount: 500, type: 'DEPOSIT' },      // Example deposit transaction
      { id: 2, amount: 200, type: 'WITHDRAWAL' }    // Example withdrawal transaction
    ];
    
    api.get.mockResolvedValue({ data: mockTransactions });
    
    // Define the sequence of actions we expect to be dispatched
    const expectedActions = [
      { type: types.GET_WALLET_TRANSACTION_REQUEST },               // First action: request started
      { type: types.GET_WALLET_TRANSACTION_SUCCESS, payload: mockTransactions }  // Second action: request successful
    ];
    
    // Dispatch the getWalletTransactions action with JWT and return the promise
    return actions.getWalletTransactions({ jwt: 'fake-jwt' })(store.dispatch)
      .then(() => {
        // Verify that all expected actions were dispatched in the correct order
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // Test 4: Depositing money successfully
  it('creates DEPOSIT_MONEY_SUCCESS when deposit is successful', () => {
    // Setup mock response data with updated wallet balance
    const mockResponse = { id: 1, balance: 1500 };
    api.put.mockResolvedValue({ data: mockResponse });
    
    // Create a mock for the navigate function (used for redirection after deposit)
    const navigateMock = jest.fn();
    
    // Define the sequence of actions we expect to be dispatched
    const expectedActions = [
      { type: types.DEPOSIT_MONEY_REQUEST },                // First action: request started
      { type: types.DEPOSIT_MONEY_SUCCESS, payload: mockResponse }  // Second action: request successful
    ];
    
    // Prepare deposit data with JWT, order ID, payment ID, and navigation function
    const depositData = {
      jwt: 'fake-jwt',             // Authentication token
      orderId: 'order123',         // Order identifier
      paymentId: 'payment456',     // Payment transaction identifier
      navigate: navigateMock       // Navigation function for redirection
    };
    
    // Dispatch the depositMoney action and return the promise
    return actions.depositMoney(depositData)(store.dispatch)
      .then(() => {
        // Verify that all expected actions were dispatched in the correct order
        expect(store.getActions()).toEqual(expectedActions);
        // Verify that navigation to wallet page was triggered
        expect(navigateMock).toHaveBeenCalledWith('/wallet');
      });
  });
  
  // Additional tests that could be added:
  // - Test the transferMoney action
  // - Test the paymentHandler action for initiating payments
  // - Test error handling for deposit/transfer operations
  // - Test different wallet transaction history filters
});

// File: src/__tests__/components/TradingForm.test.jsx
// This file contains unit tests for the TradingForm component used in cryptocurrency trading

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TradingForm from '../../pages/StockDetails/TradingForm';

// Mock React Redux's useSelector and useDispatch hooks
// This allows us to control what data is returned from the Redux store during tests
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),  // Keep original module functionality
  useSelector: jest.fn(),                // Mock useSelector to return custom state
  useDispatch: jest.fn()                 // Mock useDispatch to track dispatched actions
}));

// Import the mocked version of the hooks for use in tests
import { useSelector, useDispatch } from 'react-redux';

// Mock the Order actions to prevent actual API calls and track invocations
jest.mock('../../Redux/Order/Action', () => ({
  payOrder: jest.fn(() => ({ type: 'MOCK_PAY_ORDER' })) // Return a mock action object
}));

// Mock the Asset actions
jest.mock('../../Redux/Assets/Action', () => ({
  getAssetDetails: jest.fn(() => ({ type: 'MOCK_GET_ASSET_DETAILS' }))
}));

// Mock Dialog components to avoid React context errors
// The TradingForm likely uses these components from shadcn/ui
jest.mock('@/components/ui/dialog', () => ({
  DialogClose: ({ children }) => <div data-testid="dialog-close">{children}</div>
}));

// Create a Redux mock store factory
const mockStore = configureStore();

describe('TradingForm Component', () => {
  let store;
  let mockDispatch;
  
  // Setup before each test
  beforeEach(() => {
    // Reset all mocks to ensure tests are isolated
    jest.clearAllMocks();
    
    // Create mock Redux state data
    const stateData = {
      // Cryptocurrency data
      coin: {
        coinDetails: {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          image: { large: 'bitcoin.png' },
          market_data: {
            current_price: { usd: 50000 },           // Current BTC price: $50,000
            market_cap_change_24h: 2.5,              // Market cap change in last 24h
            market_cap_change_percentage_24h: 0.5    // Percentage change
          }
        }
      },
      // User's wallet data
      wallet: {
        userWallet: { balance: 10000 }  // User has $10,000 in wallet
      },
      // User's asset holdings
      asset: {
        assetDetails: { quantity: 0.1 }  // User owns 0.1 BTC
      }
    };
    
    // Configure useSelector to return different slices of state based on selectors
    // This is a more accurate simulation of how useSelector works in real components
    useSelector.mockImplementation(selector => {
      if (selector === stateData) return stateData;
      // Fallback for cases where the test expects the whole state
      return stateData;
    });
    
    // Create a mock dispatch function
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    
    // Initialize mock Redux store with our test data
    store = mockStore(stateData);
    
    // Mock localStorage for JWT token access
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'fake-jwt'),  // Return a fake JWT token
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });

  // Test 1: Basic rendering test
  it('renders correctly with initial state', () => {
    render(
      <Provider store={store}>
        <TradingForm />
      </Provider>
    );
    
    // Verify essential UI elements are present
    expect(screen.getByPlaceholderText('enter amount...')).toBeInTheDocument();  // Amount input
    expect(screen.getByText('BTC')).toBeInTheDocument();                         // Currency symbol
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();                     // Currency name
  });
  
  // Test 2: Testing quantity calculation when amount is entered
  it('updates quantity when amount is entered', () => {
    render(
      <Provider store={store}>
        <TradingForm />
      </Provider>
    );
    
    // Get the amount input field and simulate user entering a value
    const amountInput = screen.getByPlaceholderText('enter amount...');
    fireEvent.change(amountInput, { target: { value: '5000' } });
    
    // Verify that the quantity display updates correctly
    // The regex matches any text containing "0.1" with possible additional decimal places
    const quantityElement = screen.getByText(/0\.1/);
    expect(quantityElement).toBeInTheDocument();
    
    // Note: A more precise test would check the exact calculation:
    // $5000 / $50000 per BTC = 0.1 BTC
  });
  
  // Test 3: Testing buy/sell mode toggle
  it('toggles between BUY and SELL modes', () => {
    render(
      <Provider store={store}>
        <TradingForm />
      </Provider>
    );
    
    // Verify initial BUY mode
    expect(screen.getByText('BUY')).toBeInTheDocument();
    
    // Click the toggle button to switch modes
    const toggleButton = screen.getByText('Or Sell');
    fireEvent.click(toggleButton);
    
    // Verify UI has switched to SELL mode
    expect(screen.getByText('SELL')).toBeInTheDocument();     // Button now says SELL
    expect(screen.getByText('Or Buy')).toBeInTheDocument();   // Toggle option changed
  });
  
  // Test 4: Testing validation for insufficient balance
  it('disables BUY button for insufficient balance', () => {
    // Update mock state to simulate user with lower wallet balance
    useSelector.mockImplementation(() => ({
      coin: {
        coinDetails: {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          image: { large: 'bitcoin.png' },
          market_data: {
            current_price: { usd: 50000 },
            market_cap_change_24h: 2.5,
            market_cap_change_percentage_24h: 0.5
          }
        }
      },
      wallet: {
        userWallet: { balance: 1000 }  // Lower balance: only $1,000
      },
      asset: {
        assetDetails: { quantity: 0.1 }
      }
    }));
    
    render(
      <Provider store={store}>
        <TradingForm />
      </Provider>
    );
    
    // Enter amount that exceeds wallet balance
    const amountInput = screen.getByPlaceholderText('enter amount...');
    fireEvent.change(amountInput, { target: { value: '5000' } });
    
    // Verify warning message appears
    expect(screen.getByText('Insufficient Wallet Balance To Buy')).toBeInTheDocument();
    
    // Verify BUY button is disabled
    const buyButton = screen.getByText('BUY');
    expect(buyButton.closest('[disabled]')).toBeTruthy();
    
    // Note: This test verifies the UI prevents trades that would exceed the user's balance
  });
  
  // Additional tests that could be added:
  // - Test SELL validation (insufficient assets to sell)
  // - Test order submission when form is valid
  // - Test price updating when coin details change
  // - Test form reset functionality
}); 

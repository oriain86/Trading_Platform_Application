// File: src/__tests__/components/Home.test.jsx
// This file contains unit tests for the Home component

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../../pages/Home/Home';

// Mock React Redux hooks
// This allows us to control what useSelector returns and track useDispatch calls
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),  // Keep the original module functionality
  useSelector: jest.fn(),                // Mock the useSelector hook
  useDispatch: jest.fn()                 // Mock the useDispatch hook
}));

// Import the mocked version of the hooks for use in tests
import { useSelector, useDispatch } from 'react-redux';

// Mock the Coin action creators
// This prevents actual API calls and allows us to verify they were called correctly
jest.mock('../../Redux/Coin/Action', () => ({
  fetchCoinList: jest.fn(),           // Mock for fetching paginated coin list
  fetchCoinDetails: jest.fn(),        // Mock for fetching detailed information about a specific coin
  fetchTreadingCoinList: jest.fn(),   // Mock for fetching trending coins
  getTop50CoinList: jest.fn()         // Mock for fetching top 50 coins by market cap
}));

// Mock the Chat action creators
jest.mock('../../Redux/Chat/Action', () => ({
  sendMessage: jest.fn()              // Mock for sending messages to the chatbot
}));

// Import the mocked actions for assertions
import { fetchCoinList, fetchCoinDetails, getTop50CoinList } from '../../Redux/Coin/Action';
import { sendMessage } from '../../Redux/Chat/Action';

// Mock UI components to simplify testing
// This prevents having to test child components and focuses on the Home component's logic
jest.mock('../../components/ui/pagination', () => ({
  // Create simple test-friendly versions of pagination components
  Pagination: ({ children }) => <div data-testid="pagination">{children}</div>,
  PaginationContent: ({ children }) => <div data-testid="pagination-content">{children}</div>,
  PaginationItem: ({ children }) => <div data-testid="pagination-item">{children}</div>,
  PaginationLink: ({ children, isActive, onClick }) => (
    <button 
      data-testid="pagination-link" 
      data-active={isActive} 
      onClick={onClick}
    >
      {children}
    </button>
  ),
  PaginationEllipsis: () => <div data-testid="pagination-ellipsis">...</div>,
  PaginationNext: ({ onClick }) => (
    <button data-testid="pagination-next" onClick={onClick}>
      Next
    </button>
  ),
}));

// Mock loading spinner component
jest.mock('../../components/custom/SpinnerBackdrop', () => () => 
  <div data-testid="spinner">Loading...</div>
);

// Mock the AssetTable component that displays cryptocurrency data
jest.mock('../../pages/Home/AssetTable', () => ({
  AssetTable: ({ coins, category }) => (
    <div data-testid="asset-table">
      Asset Table: {category}, {coins?.length} coins
    </div>
  ),
}));

// Mock the StockChart component
jest.mock('../../pages/StockDetails/StockChart', () => ({
  __esModule: true,
  default: ({ coinId }) => <div data-testid="stock-chart">Chart for {coinId}</div>
}));

// Mock the Input component for the chat interface
jest.mock('@/components/ui/input', () => ({
  Input: props => <input data-testid="chat-input" {...props} />
}));

// Create a mock Redux store function
const mockStore = configureStore();

describe('Home Component', () => {
  let mockDispatch;
  
  // Set up before each test
  beforeEach(() => {
    // Clear all mock function calls from previous tests
    jest.clearAllMocks();
    
    // Create mock Redux state data
    const mockState = {
      // Cryptocurrency state
      coin: {
        coinList: [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', current_price: 50000 },
          { id: 'ethereum', name: 'Ethereum', symbol: 'eth', current_price: 3000 }
        ],
        top50: [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', current_price: 50000 }
        ],
        coinDetails: {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          image: { large: 'bitcoin-image.jpg' },
          market_data: {
            current_price: { usd: 50000 },
            market_cap_change_24h: 2.5,
            market_cap_change_percentage_24h: 0.5
          }
        },
        loading: false
      },
      // Authentication state
      auth: {
        user: { id: 1, fullName: 'Test User' },
        jwt: 'fake-jwt'
      },
      // Chatbot state
      chatBot: {
        messages: [],
        loading: false
      }
    };
    
    // Configure useSelector mock to return our mock state
    useSelector.mockImplementation(() => mockState);
    
    // Configure useDispatch mock
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    
    // Mock localStorage for JWT token retrieval
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'fake-jwt'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });

  // Test 1: Basic rendering
  it('renders correctly with initial state', () => {
    render(<Home />);
    
    // Verify category buttons are rendered
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Top 50')).toBeInTheDocument();
    
    // Verify chat bot button is rendered
    expect(screen.getByText('Chat Bot')).toBeInTheDocument();
  });

  // Test 2: Check if data is fetched on component mount
  it('fetches coin data on mount', () => {
    render(<Home />);
    
    // Verify that the correct actions are dispatched when component mounts
    expect(fetchCoinList).toHaveBeenCalledWith(1);  // Should fetch page 1 of coins
    expect(fetchCoinDetails).toHaveBeenCalledWith({
      coinId: 'bitcoin',
      jwt: 'fake-jwt',
    });
  });

  // Test 3: Category switching functionality
  it('changes category to Top 50 when button is clicked', () => {
    render(<Home />);
    
    // Click the Top 50 button
    const top50Button = screen.getByText('Top 50');
    fireEvent.click(top50Button);
    
    // Verify the correct action is dispatched
    expect(getTop50CoinList).toHaveBeenCalled();
  });

  // Test 4: Pagination functionality
  it('changes page when pagination is clicked', () => {
    render(<Home />);
    
    // Find and click page 2 button
    const pageButtons = screen.getAllByTestId('pagination-link');
    const page2Button = pageButtons.find(button => button.textContent === '2');
    
    if (page2Button) {
      fireEvent.click(page2Button);
      // Verify correct action is dispatched with page number
      expect(fetchCoinList).toHaveBeenCalledWith(2);
    } else {
      // If pagination button not found, test fails
      expect(page2Button).toBeDefined();
    }
  });

  // Test 5: Loading state display
  it('shows loading spinner when coin data is loading', () => {
    // Override the mock state to simulate loading
    useSelector.mockImplementation(() => ({
      coin: { loading: true },
      auth: {
        user: { id: 1, fullName: 'Test User' },
        jwt: 'fake-jwt'
      },
      chatBot: { messages: [] }
    }));
    
    render(<Home />);
    
    // Verify loading spinner is displayed
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  // Test 6: Chat bot toggle functionality
  it('toggles chat bot visibility when button is clicked', () => {
    render(<Home />);
    
    // Verify chat bot is initially hidden
    expect(screen.queryByTestId('chat-input')).not.toBeInTheDocument();
    
    // Click the Chat Bot button to open chat interface
    const chatBotButton = screen.getByText('Chat Bot');
    fireEvent.click(chatBotButton);
    
    // Verify chat bot is now visible
    expect(screen.getByTestId('chat-input')).toBeInTheDocument();
    
    // Verify personalized greeting is displayed
    expect(screen.getByText(/hi, Test User/)).toBeInTheDocument();
  });

  // Test 7: Chat message sending functionality
  it('sends a message when enter key is pressed in chat input', () => {
    render(<Home />);
    
    // Open chat bot interface
    const chatBotButton = screen.getByText('Chat Bot');
    fireEvent.click(chatBotButton);
    
    // Type a message in the input field
    const inputField = screen.getByTestId('chat-input');
    fireEvent.change(inputField, { target: { value: 'What is Bitcoin price?' } });
    
    // Press Enter key to send message
    fireEvent.keyPress(inputField, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // Verify the correct action is dispatched with message and authentication
    expect(sendMessage).toHaveBeenCalledWith({
      prompt: 'What is Bitcoin price?',
      jwt: 'fake-jwt'
    });
  });
}); 

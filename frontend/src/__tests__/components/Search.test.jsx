// File: src/__tests__/components/Search.test.jsx
// This file contains unit tests for the Search component

import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Search from '../../pages/Search/Search';

// Mock Redux hooks to control their behavior during tests
// This allows us to simulate different Redux states without an actual store
jest.mock('react-redux', () => ({
  useSelector: jest.fn(), // Mock useSelector to return our test data
  useDispatch: jest.fn()  // Mock useDispatch to track when actions are dispatched
}));

// Mock the search action creator
// This prevents actual API calls during tests
jest.mock('../../Redux/Coin/Action', () => ({
  searchCoins: jest.fn() // Mock the function that would normally fetch search results
}));

// Mock the React Router useNavigate hook
// This prevents navigation during tests and lets us verify navigation would happen
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Keep the rest of the module's functionality
  useNavigate: () => jest.fn() // Replace useNavigate with a mock function
}));

describe('Search Component', () => {
  let mockDispatch;
  
  // Setup before each test
  beforeEach(() => {
    // Reset all mocks to ensure tests are isolated
    jest.clearAllMocks();
    
    // Create a mock dispatch function to track actions
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    
    // Configure useSelector to return mock data representing search results
    useSelector.mockImplementation(() => ({
      coin: {
        // Sample search results
        searchCoinList: [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
        ],
        loading: false // Set loading state to false initially
      }
    }));
  });
  
  // Test 1: Verify search input rendering
  it('renders search input correctly', () => {
    // Render component with Router context since it might use navigation
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    
    // Verify that the search input exists with the expected placeholder text
    expect(screen.getByPlaceholderText(/explore market/i)).toBeInTheDocument();
  });
  
  // Test 2: Verify search results display
  it('displays search results correctly', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    
    // Verify that each search result item is visible in the document
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
  });
  
  // Test 3: Verify loading state UI
  it('shows loading state while searching', () => {
    // Override the mock state to simulate loading
    useSelector.mockImplementation(() => ({
      coin: {
        searchCoinList: [], // Empty results during loading
        loading: true       // Set loading to true
      }
    }));
    
    // Render component and capture container for DOM queries
    const { container } = render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    
    // Check for loading overlay with semi-transparent background
    // Using DOM query since this might be styled with Tailwind classes
    const loadingOverlay = container.querySelector('.bg-black.bg-opacity-50');
    expect(loadingOverlay).not.toBeNull();
    
    // Verify the spinner animation is present
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).not.toBeNull();
  });
  
  // Additional tests that could be added:
  // - Test search functionality when input changes
  // - Test navigation when a search result is clicked
  // - Test empty state when no results are found
  // - Test error state if search fails
});

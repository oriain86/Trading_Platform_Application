// File: src/setupTests.js

// This file configures the Jest testing environment with necessary mocks and extensions

// Import Jest DOM matchers
// This adds custom matchers like toBeInTheDocument() to make testing DOM elements easier
import '@testing-library/jest-dom';

// Mock the browser's localStorage API
// Since Jest runs in Node.js which doesn't have localStorage, we create a mock implementation
// This allows tests that use localStorage to run without errors
global.localStorage = {
  getItem: jest.fn(),     // Mock function for retrieving items from localStorage
  setItem: jest.fn(),     // Mock function for storing items in localStorage
  removeItem: jest.fn(),  // Mock function for removing items from localStorage
  clear: jest.fn()        // Mock function for clearing all localStorage items
};

// Additional mocks could be added here for other browser APIs like:
// - fetch
// - navigator
// - window.location
// - sessionStorage
// - IndexedDB
// etc. 

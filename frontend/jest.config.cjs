// File: jest.config.js
// This file configures Jest for testing the React application

module.exports = {
  // Sets the test environment to jsdom, which provides browser-like globals
  // This is essential for testing React components that interact with the DOM
  testEnvironment: "jsdom",
  
  // Files to run after Jest is initialized but before tests are executed
  // setupTests.js typically imports testing libraries and sets up global mocks
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  
  // Maps module paths to different locations or mock files
  moduleNameMapper: {
    // Maps imports starting with "@/" to the src directory
    // This supports the path alias pattern used in the application
    "^@/(.*)$": "<rootDir>/src/$1",
    
    // Maps CSS/SCSS imports to a mock module
    // This prevents style imports from causing errors during testing
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  
  // Specifies transformers for different file types
  transform: {
    // Transforms JS/JSX/TS/TSX files using babel-jest
    // This enables testing files that use modern JavaScript features and JSX syntax
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  
  // Glob patterns to detect test files
  testMatch: [
    // Files inside __tests__ directories
    "**/__tests__/**/*.js?(x)",
    
    // Files that end with .spec.js, .test.js, .spec.jsx, or .test.jsx
    "**/?(*.)+(spec|test).js?(x)"
  ],
  
  // Paths to exclude from code coverage reporting
  coveragePathIgnorePatterns: [
    // External dependencies
    "/node_modules/",
    
    // Static resources
    "/public/"
  ]
  
  // Additional configurations that could be added:
  // collectCoverage: true, // Automatically collect coverage
  // coverageThreshold: { global: { statements: 80 } }, // Enforce minimum coverage
  // testTimeout: 10000, // Increase timeout for tests (in milliseconds)
  // verbose: true, // Display individual test results with the test suite hierarchy
};

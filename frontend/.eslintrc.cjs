// File: .eslintrc.cjs

// This file contains ESLint configuration for the project

module.exports = {
  root: true,                              // Indicates this is the root ESLint configuration file
  env: { 
    browser: true,                         // Enable browser global variables
    es2020: true                           // Enable ES2020 features
  },
  extends: [
    'eslint:recommended',                  // Use ESLint recommended rules
    'plugin:react/recommended',            // Use recommended React rules
    'plugin:react/jsx-runtime',            // Configure for React JSX runtime
    'plugin:react-hooks/recommended',      // Use recommended React Hooks rules
  ],
  ignorePatterns: [
    'dist',                                // Ignore the distribution directory
    '.eslintrc.cjs'                        // Ignore this config file itself
  ],
  parserOptions: { 
    ecmaVersion: 'latest',                 // Use the latest ECMAScript version
    sourceType: 'module'                   // Treat code as ECMAScript modules
  },
  settings: { 
    react: { 
      version: '18.2'                      // Specify React version for proper validation
    } 
  },
  plugins: [
    'react-refresh'                        // Include React Refresh plugin for HMR support
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',                              // Set rule level to warning
      { 
        allowConstantExport: true          // Allow constant exports alongside components
      },
    ],
  },
}

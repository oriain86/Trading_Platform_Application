// File: babel.config.js
// This file configures Babel to properly transpile modern JavaScript and React code

module.exports = {
  // Presets are pre-configured sets of Babel plugins
  presets: [
    // @babel/preset-env automatically determines which transformations/polyfills are needed
    // based on your target browser/environment support
    '@babel/preset-env',
    
    // @babel/preset-react handles JSX transformation and React-specific features
    // The 'automatic' runtime setting enables the new JSX Transform from React 17+
    // which eliminates the need to import React in files that only use JSX
    ['@babel/preset-react', {runtime: 'automatic'}]
  ],
  
  // Additional plugins can be added here if needed
  // plugins: []
}; 

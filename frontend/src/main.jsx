// File: src/main.jsx

// This is the main entry point for the React application

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'

/**
 * Application initialization
 * 
 * This code:
 * 1. Creates a React root at the 'root' DOM element
 * 2. Renders the application with necessary providers:
 *    - React.StrictMode: Enables additional development checks and warnings
 *    - BrowserRouter: Enables client-side routing with React Router
 *    - Provider: Makes the Redux store available to all components
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems in the application
  // It renders components twice in development to detect side effects
  <React.StrictMode>
    {/* BrowserRouter enables routing with clean URLs */}
    <BrowserRouter>
      {/* Provider connects the Redux store to the React component tree */}
      <Provider store={store}>
        {/* Main application component */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

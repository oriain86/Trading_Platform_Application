// File: src/Redux/Store.js
// This file configures the Redux store for the application

import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk} from "redux-thunk";

// Import all reducers
import authReducer from "./Auth/Reducer";           // Authentication state management
import coinReducer from "./Coin/Reducer";           // Cryptocurrency data management
import walletReducer from "./Wallet/Reducer";       // User wallet management
import orderReducer from "./Order/Reducer";         // Order processing management
import assetReducer from "./Assets/Reducer";        // Asset management
import watchlistReducer from "./Watchlist/Reducer"; // User's watchlist management
import withdrawalReducer from "./Withdrawal/Reducer"; // Withdrawal processing management
import chatBotReducer from "./Chat/Reducer";        // Chatbot conversation management

/**
 * Combine all reducers into a single root reducer
 * Each reducer manages a specific slice of the application state
 */
const rootReducers = combineReducers({
    // User authentication state (login, registration, profile)
    auth: authReducer,
    
    // Cryptocurrency data (listings, prices, charts)
    coin: coinReducer,
    
    // User wallet state (balance, transactions)
    wallet: walletReducer,
    
    // Order state (buy/sell orders, history)
    order: orderReducer,
    
    // Asset state (user holdings, asset details)
    asset: assetReducer,
    
    // Watchlist state (user's saved cryptocurrencies)
    watchlist: watchlistReducer,
    
    // Withdrawal state (withdrawal requests, history, payment details)
    withdrawal: withdrawalReducer,
    
    // Chatbot state (conversation history, messages)
    chatBot: chatBotReducer,
});

/**
 * Create the Redux store with the root reducer and middleware
 * 
 * Using legacy_createStore as recommended by Redux for compatibility
 * Thunk middleware enables asynchronous actions (API calls)
 */
export const store = legacy_createStore(
    rootReducers,
    applyMiddleware(thunk)
); 

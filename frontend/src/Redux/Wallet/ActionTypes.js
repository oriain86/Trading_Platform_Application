// File: src/Redux/Wallet/ActionTypes.js 
// This file defines constants for Redux action types used in wallet operations

// ========== USER WALLET FETCH ACTION TYPES ==========
// Action types for retrieving the user's wallet information
export const GET_USER_WALLET_REQUEST = 'GET_USER_WALLET_REQUEST';  // Dispatched when wallet fetch starts
export const GET_USER_WALLET_SUCCESS = 'GET_USER_WALLET_SUCCESS';  // Dispatched when wallet is successfully retrieved
export const GET_USER_WALLET_FAILURE = 'GET_USER_WALLET_FAILURE';  // Dispatched when wallet fetch fails

// ========== WALLET TRANSACTIONS ACTION TYPES ==========
// Action types for retrieving transaction history
export const GET_WALLET_TRANSACTION_REQUEST = 'GET_WALLET_TRANSACTION_REQUEST';  // Dispatched when transaction history fetch starts
export const GET_WALLET_TRANSACTION_SUCCESS = 'GET_WALLET_TRANSACTION_SUCCESS';  // Dispatched when transaction history is successfully retrieved
export const GET_WALLET_TRANSACTION_FAILURE = 'GET_WALLET_TRANSACTION_FAILURE';  // Dispatched when transaction history fetch fails

// ========== MONEY DEPOSIT ACTION TYPES ==========
// Action types for depositing money into the wallet
export const DEPOSIT_MONEY_REQUEST = 'DEPOSIT_MONEY_REQUEST';  // Dispatched when deposit process starts
export const DEPOSIT_MONEY_SUCCESS = 'DEPOSIT_MONEY_SUCCESS';  // Dispatched when deposit is successful
export const DEPOSIT_MONEY_FAILURE = 'DEPOSIT_MONEY_FAILURE';  // Dispatched when deposit fails

// ========== MONEY TRANSFER ACTION TYPES ==========
// Action types for transferring money from the wallet
export const TRANSFER_MONEY_REQUEST = 'TRANSFER_MONEY_REQUEST';  // Dispatched when transfer process starts
export const TRANSFER_MONEY_SUCCESS = 'TRANSFER_MONEY_SUCCESS';  // Dispatched when transfer is successful
export const TRANSFER_MONEY_FAILURE = 'TRANSFER_MONEY_FAILURE';  // Dispatched when transfer fails

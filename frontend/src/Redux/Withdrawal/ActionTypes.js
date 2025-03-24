// File: src/Redux/Withdrawal/ActionTypes.js
// This file defines constants for Redux action types used in withdrawal operations

// ========== WITHDRAWAL REQUEST ACTION TYPES ==========
// Action types for initiating a withdrawal request
export const WITHDRAWAL_REQUEST = 'WITHDRAWAL_REQUEST';  // Dispatched when withdrawal request starts
export const WITHDRAWAL_SUCCESS = 'WITHDRAWAL_SUCCESS';  // Dispatched when withdrawal request succeeds
export const WITHDRAWAL_FAILURE = 'WITHDRAWAL_FAILURE';  // Dispatched when withdrawal request fails

// ========== WITHDRAWAL PROCESSING ACTION TYPES ==========
// Action types for admin to approve/reject a withdrawal request
export const WITHDRAWAL_PROCEED_REQUEST = 'WITHDRAWAL_PROCEED_REQUEST';  // Dispatched when withdrawal processing starts
export const WITHDRAWAL_PROCEED_SUCCESS = 'WITHDRAWAL_PROCEED_SUCCESS';  // Dispatched when withdrawal processing succeeds
export const WITHDRAWAL_PROCEED_FAILURE = 'WITHDRAWAL_PROCEED_FAILURE';  // Dispatched when withdrawal processing fails

// ========== WITHDRAWAL HISTORY ACTION TYPES ==========
// Action types for fetching user's withdrawal history
export const GET_WITHDRAWAL_HISTORY_REQUEST = 'GET_WITHDRAWAL_HISTORY_REQUEST';  // Dispatched when withdrawal history fetch starts
export const GET_WITHDRAWAL_HISTORY_SUCCESS = 'GET_WITHDRAWAL_HISTORY_SUCCESS';  // Dispatched when withdrawal history is successfully retrieved
export const GET_WITHDRAWAL_HISTORY_FAILURE = 'GET_WITHDRAWAL_HISTORY_FAILURE';  // Dispatched when withdrawal history fetch fails

// ========== ALL WITHDRAWAL REQUESTS ACTION TYPES ==========
// Action types for admin to fetch all pending withdrawal requests
export const GET_WITHDRAWAL_REQUEST_REQUEST = 'GET_WITHDRAWAL_REQUEST_REQUEST';  // Dispatched when all withdrawal requests fetch starts
export const GET_WITHDRAWAL_REQUEST_SUCCESS = 'GET_WITHDRAWAL_REQUEST_SUCCESS';  // Dispatched when all withdrawal requests are successfully retrieved
export const GET_WITHDRAWAL_REQUEST_FAILURE = 'GET_WITHDRAWAL_REQUEST_FAILURE';  // Dispatched when all withdrawal requests fetch fails

// ========== PAYMENT DETAILS ADD/UPDATE ACTION TYPES ==========
// Action types for adding or updating payment details for withdrawals
export const ADD_PAYMENT_DETAILS_REQUEST = 'ADD_PAYMENT_DETAILS_REQUEST';  // Dispatched when payment details update starts
export const ADD_PAYMENT_DETAILS_SUCCESS = 'ADD_PAYMENT_DETAILS_SUCCESS';  // Dispatched when payment details are successfully updated
export const ADD_PAYMENT_DETAILS_FAILURE = 'ADD_PAYMENT_DETAILS_FAILURE';  // Dispatched when payment details update fails

// ========== PAYMENT DETAILS FETCH ACTION TYPES ==========
// Action types for fetching user's saved payment details
export const GET_PAYMENT_DETAILS_REQUEST = 'GET_PAYMENT_DETAILS_REQUEST';  // Dispatched when payment details fetch starts
export const GET_PAYMENT_DETAILS_SUCCESS = 'GET_PAYMENT_DETAILS_SUCCESS';  // Dispatched when payment details are successfully retrieved
export const GET_PAYMENT_DETAILS_FAILURE = 'GET_PAYMENT_DETAILS_FAILURE';  // Dispatched when payment details fetch fails 

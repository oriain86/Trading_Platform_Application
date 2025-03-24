// File: src/Redux/Order/ActionTypes.js (Order section)
// This file defines constants for Redux action types used in order operations

// ========== ORDER PAYMENT ACTION TYPES ==========
export const PAY_ORDER_REQUEST = 'PAY_ORDER_REQUEST';  // Dispatched when order payment process starts
export const PAY_ORDER_SUCCESS = 'PAY_ORDER_SUCCESS';  // Dispatched when order payment succeeds
export const PAY_ORDER_FAILURE = 'PAY_ORDER_FAILURE';  // Dispatched when order payment fails

// ========== SINGLE ORDER FETCH ACTION TYPES ==========
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';  // Dispatched when specific order fetch starts
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';  // Dispatched when specific order is successfully retrieved
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE';  // Dispatched when specific order fetch fails

// ========== ALL ORDERS FETCH ACTION TYPES ==========
export const GET_ALL_ORDERS_REQUEST = 'GET_ALL_ORDERS_REQUEST';  // Dispatched when user orders fetch starts
export const GET_ALL_ORDERS_SUCCESS = 'GET_ALL_ORDERS_SUCCESS';  // Dispatched when user orders are successfully retrieved
export const GET_ALL_ORDERS_FAILURE = 'GET_ALL_ORDERS_FAILURE';  // Dispatched when user orders fetch fails

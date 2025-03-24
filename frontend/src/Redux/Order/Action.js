// File: src/Redux/Order/Action.js
// This file contains Redux action creators for order-related operations

import api from '@/Api/api';
import * as types from './ActionTypes';

/**
 * Action creator to process payment for an order
 * 
 * @param {Object} params - Parameters for payment processing
 * @param {string} params.jwt - JWT token for authentication
 * @param {Object} params.orderData - Order data including payment details
 * @param {number} params.amount - Payment amount
 * @returns {Function} - Thunk function that handles order payment
 */
export const payOrder = ({jwt, orderData, amount}) => async (dispatch) => {
  // Dispatch action to indicate payment processing has started
  dispatch({ type: types.PAY_ORDER_REQUEST });

  try {
    // Make authenticated API request to process payment
    const response = await api.post('/api/orders/pay', orderData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
    });

    // Dispatch success action with payment response and amount
    dispatch({
      type: types.PAY_ORDER_SUCCESS,
      payload: response.data,
      amount
    });
    console.log("order success", response.data);
  } catch (error) {
    console.log("error", error);
    
    // Dispatch failure action with error message
    dispatch({
      type: types.PAY_ORDER_FAILURE,
      error: error.message,
    });
  }
};

/**
 * Action creator to fetch a specific order by ID
 * 
 * @param {string} jwt - JWT token for authentication
 * @param {string} orderId - ID of the order to retrieve
 * @returns {Function} - Thunk function that fetches order details
 */
export const getOrderById = (jwt, orderId) => async (dispatch) => {
  // Dispatch action to indicate order fetch has started
  dispatch({ type: types.GET_ORDER_REQUEST });

  try {
    // Make authenticated API request to get order by ID
    const response = await api.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
    });

    // Dispatch success action with order data
    dispatch({
      type: types.GET_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Dispatch failure action with error message
    dispatch({
      type: types.GET_ORDER_FAILURE,
      error: error.message,
    });
  }
};

/**
 * Action creator to fetch all orders for the current user
 * Can be filtered by order type and asset symbol
 * 
 * @param {Object} params - Parameters for orders retrieval
 * @param {string} params.jwt - JWT token for authentication
 * @param {string} [params.orderType] - Optional filter for order type (e.g., 'buy', 'sell')
 * @param {string} [params.assetSymbol] - Optional filter for specific cryptocurrency symbol
 * @returns {Function} - Thunk function that fetches filtered orders
 */
export const getAllOrdersForUser = ({jwt, orderType, assetSymbol}) => async (dispatch) => {
  // Dispatch action to indicate orders fetch has started
  dispatch({ type: types.GET_ALL_ORDERS_REQUEST });

  try {
    // Make authenticated API request to get all orders with optional filters
    const response = await api.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      params: {
        order_type: orderType,    // Filter by order type (buy/sell)
        asset_symbol: assetSymbol, // Filter by cryptocurrency symbol
      },
    });

    // Dispatch success action with orders data
    dispatch({
      type: types.GET_ALL_ORDERS_SUCCESS,
      payload: response.data,
    });
    console.log("order success", response.data);
  } catch (error) {
    console.log("error ", error);
    
    // Dispatch failure action with error message
    dispatch({
      type: types.GET_ALL_ORDERS_FAILURE,
      error: error.message,
    });
  }
}; 

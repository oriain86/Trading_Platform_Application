// File: src/Redux/Withdrawal/Actions.js 

// This file contains Redux action creators for withdrawal-related operations

import api from '@/Api/api';
import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_PROCEED_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  ADD_PAYMENT_DETAILS_FAILURE,
  GET_PAYMENT_DETAILS_REQUEST,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_FAILURE,
  GET_WITHDRAWAL_REQUEST_SUCCESS,
  GET_WITHDRAWAL_REQUEST_FAILURE,
  GET_WITHDRAWAL_REQUEST_REQUEST
} from './ActionTypes';

/**
 * Action creator to initiate a withdrawal request
 * 
 * @param {Object} params - Parameters for the withdrawal request
 * @param {number} params.amount - Amount to withdraw
 * @param {string} params.jwt - JWT token for authentication
 * @returns {Function} - Thunk function that handles the withdrawal request
 */
export const withdrawalRequest = ({amount, jwt}) => async dispatch => {
  // Dispatch action to indicate withdrawal request has started
  dispatch({ type: WITHDRAWAL_REQUEST });
  try {
    // Make authenticated API request to initiate withdrawal
    const response = await api.post(`/api/withdrawal/${amount}`, null, {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("withdrawal ---- ", response.data);
    
    // Dispatch success action with withdrawal request data
    dispatch({
      type: WITHDRAWAL_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Dispatch failure action with error message
    dispatch({
      type: WITHDRAWAL_FAILURE,
      payload: error.message
    });
  }
};

/**
 * Action creator for an admin to approve or reject a withdrawal request
 * 
 * @param {Object} params - Parameters for processing the withdrawal
 * @param {string} params.id - ID of the withdrawal request
 * @param {string} params.jwt - JWT token for authentication
 * @param {boolean} params.accept - Whether to approve (true) or reject (false) the withdrawal
 * @returns {Function} - Thunk function that handles the withdrawal processing
 */
export const proceedWithdrawal = ({id, jwt, accept}) => async dispatch => {
  // Dispatch action to indicate withdrawal processing has started
  dispatch({ type: WITHDRAWAL_PROCEED_REQUEST });
  try {
    // Make authenticated API request to approve/reject withdrawal
    const response = await api.patch(`/api/admin/withdrawal/${id}/proceed/${accept}`, null, {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("procceed withdrawal ---- ", response.data);
    
    // Dispatch success action with processed withdrawal data
    dispatch({
      type: WITHDRAWAL_PROCEED_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
    
    // Dispatch failure action with error message
    dispatch({
      type: WITHDRAWAL_PROCEED_FAILURE,
      payload: error.message
    });
  }
};

/**
 * Action creator to fetch withdrawal history for the current user
 * 
 * @param {string} jwt - JWT token for authentication
 * @returns {Function} - Thunk function that fetches withdrawal history
 */
export const getWithdrawalHistory = jwt => async dispatch => {
  // Dispatch action to indicate withdrawal history fetch has started
  dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });
  try {
    // Make authenticated API request to get withdrawal history
    const response = await api.get('/api/withdrawal', {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("get withdrawal history ---- ", response.data);
    
    // Dispatch success action with withdrawal history data
    dispatch({
      type: GET_WITHDRAWAL_HISTORY_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Dispatch failure action with error message
    dispatch({
      type: GET_WITHDRAWAL_HISTORY_FAILURE,
      payload: error.message
    });
  }
};

/**
 * Action creator for admin to fetch all pending withdrawal requests
 * 
 * @param {string} jwt - JWT token for authentication
 * @returns {Function} - Thunk function that fetches all withdrawal requests
 */
export const getAllWithdrawalRequest = jwt => async dispatch => {
  // Dispatch action to indicate withdrawal requests fetch has started
  dispatch({ type: GET_WITHDRAWAL_REQUEST_REQUEST });
  try {
    // Make authenticated API request to get all withdrawal requests
    const response = await api.get('/api/admin/withdrawal', {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("get withdrawal requests ---- ", response.data);
    
    // Dispatch success action with withdrawal requests data
    dispatch({
      type: GET_WITHDRAWAL_REQUEST_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log("error ", error);
    
    // Dispatch failure action with error message
    dispatch({
      type: GET_WITHDRAWAL_REQUEST_FAILURE,
      payload: error.message
    });
  }
};

/**
 * Action creator to add or update user's payment details for withdrawals
 * 
 * @param {Object} params - Parameters for adding payment details
 * @param {Object} params.paymentDetails - Payment details object (bank account, PayPal, etc.)
 * @param {string} params.jwt - JWT token for authentication
 * @returns {Function} - Thunk function that adds payment details
 */
export const addPaymentDetails = ({paymentDetails, jwt}) => async dispatch => {
  // Dispatch action to indicate payment details update has started
  dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });
  try {
    // Make authenticated API request to add payment details
    const response = await api.post(`/api/payment-details`, paymentDetails, {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("withdrawal ---- ", response.data);
    
    // Dispatch success action with updated payment details
    dispatch({
      type: ADD_PAYMENT_DETAILS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
    
    // Dispatch failure action with error message
    dispatch({
      type: ADD_PAYMENT_DETAILS_FAILURE,
      payload: error.message
    });
  }
};

/**
 * Action creator to fetch user's saved payment details
 * 
 * @param {Object} params - Parameters for getting payment details
 * @param {string} params.jwt - JWT token for authentication
 * @returns {Function} - Thunk function that fetches payment details
 */
export const getPaymentDetails = ({jwt}) => async dispatch => {
  // Dispatch action to indicate payment details fetch has started
  dispatch({ type: GET_PAYMENT_DETAILS_REQUEST });
  try {
    // Make authenticated API request to get payment details
    const response = await api.get(`/api/payment-details`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    console.log("get payment details ---- ", response.data);
    
    // Dispatch success action with payment details data
    dispatch({
      type: GET_PAYMENT_DETAILS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
    
    // Dispatch failure action with error message
    dispatch({
      type: GET_PAYMENT_DETAILS_FAILURE,
      payload: error.message
    });
  }
};

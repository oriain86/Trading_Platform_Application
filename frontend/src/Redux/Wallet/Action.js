// File: src/Redux/Wallet/Action.js
// This file contains Redux action creators for wallet-related operations

import api from "@/Api/api";
import * as types from "./ActionTypes";

/**
 * Action creator to fetch the user's wallet information
 * 
 * @param {string} jwt - JWT token for authentication
 * @returns {Function} - Thunk function that fetches wallet data
 */
export const getUserWallet = (jwt) => async (dispatch) => {
  // Dispatch action to indicate wallet fetch has started
  dispatch({ type: types.GET_USER_WALLET_REQUEST });

  try {
    // Make authenticated API request to get wallet information
    const response = await api.get("/api/wallet", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    // Dispatch success action with wallet data
    dispatch({
      type: types.GET_USER_WALLET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    
    // Dispatch failure action with error message
    dispatch({
      type: types.GET_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};

/**
 * Action creator to fetch the user's wallet transaction history
 * 
 * @param {Object} params - Parameters for transaction history request
 * @param {string} params.jwt - JWT token for authentication
 * @returns {Function} - Thunk function that fetches transaction history
 */
export const getWalletTransactions =
  ({ jwt }) =>
  async (dispatch) => {
    // Dispatch action to indicate transaction history fetch has started
    dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST });

    try {
      // Make authenticated API request to get transaction history
      const response = await api.get("/api/wallet/transactions", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Dispatch success action with transaction data
      dispatch({
        type: types.GET_WALLET_TRANSACTION_SUCCESS,
        payload: response.data,
      });
      console.log("wallet transaction", response.data);
    } catch (error) {
      console.log(error);
      
      // Dispatch failure action with error message
      dispatch({
        type: types.GET_WALLET_TRANSACTION_FAILURE,
        error: error.message,
      });
    }
  };

/**
 * Action creator to process a deposit into the user's wallet
 * 
 * @param {Object} params - Parameters for deposit operation
 * @param {string} params.jwt - JWT token for authentication
 * @param {string} params.orderId - ID of the order associated with the deposit
 * @param {string} params.paymentId - ID of the payment associated with the deposit
 * @param {Function} params.navigate - Navigation function to redirect after successful deposit
 * @returns {Function} - Thunk function that processes the deposit
 */
export const depositMoney =
  ({ jwt, orderId, paymentId, navigate }) =>
  async (dispatch) => {
    // Dispatch action to indicate deposit process has started
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
      // Make authenticated API request to process deposit
      const response = await api.put(`/api/wallet/deposit`, null, {
        params: {
          order_id: orderId,
          payment_id: paymentId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Dispatch success action with deposit response
      dispatch({
        type: types.DEPOSIT_MONEY_SUCCESS,
        payload: response.data,
      });
      
      // Navigate to wallet page after successful deposit
      navigate("/wallet")
      console.log(response.data);
    } catch (error) {
      console.error(error);
      
      // Dispatch failure action with error message
      dispatch({
        type: types.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

/**
 * Action creator to initiate a payment process
 * 
 * @param {Object} params - Parameters for payment initiation
 * @param {string} params.jwt - JWT token for authentication
 * @param {number} params.amount - Amount to be paid
 * @param {string} params.paymentMethod - Payment method to be used (e.g., "stripe", "paypal")
 * @returns {Function} - Thunk function that initiates the payment
 */
export const paymentHandler =
  ({ jwt, amount, paymentMethod }) =>
  async (dispatch) => {
    // Dispatch action to indicate payment process has started
    dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

    try {
      // Make authenticated API request to initiate payment
      const response = await api.post(
        `/api/payment/${paymentMethod}/amount/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Redirect to payment provider's URL
      window.location.href = response.data.payment_url;

      // Dispatch success action with payment response
      dispatch({
        type: types.DEPOSIT_MONEY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error", error);
      
      // Dispatch failure action with error message
      dispatch({
        type: types.DEPOSIT_MONEY_FAILURE,
        error: error.message,
      });
    }
  };

/**
 * Action creator to transfer money from the user's wallet to another account
 * 
 * @param {Object} params - Parameters for money transfer
 * @param {string} params.jwt - JWT token for authentication
 * @param {string} params.walletId - ID of the source wallet
 * @param {Object} params.reqData - Transfer details (amount, recipient, etc.)
 * @returns {Function} - Thunk function that processes the transfer
 */
export const transferMoney =
  ({ jwt, walletId, reqData }) =>
  async (dispatch) => {
    // Dispatch action to indicate transfer process has started
    dispatch({ type: types.TRANSFER_MONEY_REQUEST });

    try {
      // Make authenticated API request to process transfer
      const response = await api.put(
        `/api/wallet/${walletId}/transfer`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Dispatch success action with transfer response
      dispatch({
        type: types.TRANSFER_MONEY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: types.TRANSFER_MONEY_FAILURE,
        error: error.message,
      });
    }
  };
  
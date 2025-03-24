// File: src/Redux/Auth/Action.js
// This file contains Redux action creators for authentication-related operations

import axios from "axios";
import * as actionTypes from "./ActionTypes";
import api, { API_BASE_URL } from "@/Api/api";

/**
 * Action creator for user registration
 * 
 * @param {Object} userData - User registration data including email, password, and navigate function
 * @returns {Function} - Thunk function that handles the registration process
 */
export const register = (userData) => async (dispatch) => {
  // Dispatch action to indicate registration request has started
  dispatch({ type: actionTypes.REGISTER_REQUEST });
  try {
    // Make API request to register user
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    
    // Save JWT token to localStorage if present
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    console.log("registerr :- ", user);
    
    // Navigate to home page after successful registration
    userData.navigate("/");
    
    // Dispatch success action with JWT token
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: user.jwt });
  } catch (error) {
    console.log("error ", error);
    
    // Dispatch failure action with error details
    dispatch({
      type: actionTypes.REGISTER_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

/**
 * Action creator for user login
 * 
 * @param {Object} userData - User login credentials and navigate function
 * @returns {Function} - Thunk function that handles the login process
 */
export const login = (userData) => async (dispatch) => {
  // Dispatch action to indicate login request has started
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  try {
    // Make API request to authenticate user
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    
    // If two-factor authentication is enabled, redirect to 2FA page
    if (user.twoFactorAuthEnabled) {
      userData.navigate(`/two-factor-auth/${user.session}`);
    }
    
    // If JWT is present, save to localStorage and navigate to home page
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      console.log("login ", user);
      userData.navigate("/");
    }
    
    // Dispatch success action with JWT token
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user.jwt });
  } catch (error) {
    console.log("catch error", error);
    
    // Dispatch failure action with error details
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload: error.response?.data ? error.response.data : error,
    });
  }
};

/**
 * Action creator for two-step verification during login
 * 
 * @param {Object} params - Object containing OTP, session ID, and navigate function
 * @returns {Function} - Thunk function that handles the 2FA verification
 */
export const twoStepVerification =
  ({ otp, session, navigate }) =>
  async (dispatch) => {
    // Dispatch action to indicate two-step verification request has started
    dispatch({ type: actionTypes.LOGIN_TWO_STEP_REQUEST });
    try {
      // Make API request to verify OTP
      const response = await axios.post(
        `${API_BASE_URL}/auth/two-factor/otp/${otp}`,
        {},
        {
          params: { id: session },
        }
      );
      const user = response.data;

      // If JWT is present, save to localStorage and navigate to home page
      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
        console.log("login ", user);
        navigate("/");
      }
      
      // Dispatch success action with JWT token
      dispatch({ type: actionTypes.LOGIN_TWO_STEP_SUCCESS, payload: user.jwt });
    } catch (error) {
      console.log("catch error", error);
      
      // Dispatch failure action with error details
      dispatch({
        type: actionTypes.LOGIN_TWO_STEP_FAILURE,
        payload: error.response?.data ? error.response.data : error,
      });
    }
  };

/**
 * Action creator to fetch user profile using JWT token
 * 
 * @param {string} token - JWT token for authentication
 * @returns {Function} - Thunk function that fetches the user profile
 */
export const getUser = (token) => {
  return async (dispatch) => {
    // Dispatch action to indicate user fetch request has started
    dispatch({ type: actionTypes.GET_USER_REQUEST });
    try {
      // Make API request to get user profile with authentication header
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      
      // Dispatch success action with user data
      dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = null;
      
      // Dispatch failure action
      dispatch({ type: actionTypes.GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

/**
 * Action creator to send verification OTP for email/phone verification
 * 
 * @param {Object} params - Object containing JWT token and verification type
 * @returns {Function} - Thunk function that sends verification OTP
 */
export const sendVerificationOtp = ({ jwt, verificationType }) => {
  return async (dispatch) => {
    // Dispatch action to indicate OTP send request has started
    dispatch({ type: actionTypes.SEND_VERIFICATION_OTP_REQUEST });
    try {
      // Make API request to send verification OTP
      const response = await api.post(
        `/api/users/verification/${verificationType}/send-otp`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const user = response.data;
      
      // Dispatch success action with response data
      dispatch({
        type: actionTypes.SEND_VERIFICATION_OTP_SUCCESS,
        payload: user,
      });
      console.log("send otp ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      
      // Dispatch failure action with error message
      dispatch({
        type: actionTypes.SEND_VERIFICATION_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

/**
 * Action creator to verify OTP for email/phone verification
 * 
 * @param {Object} params - Object containing JWT token and OTP
 * @returns {Function} - Thunk function that verifies OTP
 */
export const verifyOtp = ({ jwt, otp }) => {
  console.log("jwt", jwt);
  return async (dispatch) => {
    // Dispatch action to indicate OTP verification request has started
    dispatch({ type: actionTypes.VERIFY_OTP_REQUEST });
    try {
      // Make API request to verify OTP
      const response = await api.patch(
        `/api/users/verification/verify-otp/${otp}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const user = response.data;
      
      // Dispatch success action with user data
      dispatch({ type: actionTypes.VERIFY_OTP_SUCCESS, payload: user });
      console.log("verify otp ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      
      // Dispatch failure action with error message
      dispatch({ type: actionTypes.VERIFY_OTP_FAILURE, payload: errorMessage });
    }
  };
};

/**
 * Action creator to enable two-step authentication for a user
 * 
 * @param {Object} params - Object containing JWT token and OTP
 * @returns {Function} - Thunk function that enables 2FA
 */
export const enableTwoStepAuthentication = ({ jwt, otp }) => {
  console.log("jwt", jwt);
  return async (dispatch) => {
    // Dispatch action to indicate 2FA enable request has started
    dispatch({ type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_REQUEST });
    try {
      // Make API request to enable 2FA
      const response = await api.patch(
        `/api/users/enable-two-factor/verify-otp/${otp}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const user = response.data;
      
      // Dispatch success action with user data
      dispatch({
        type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
        payload: user,
      });
      console.log("enable two step authentication ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      
      // Dispatch failure action with error message
      dispatch({
        type: actionTypes.ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

/**
 * Action creator to send reset password OTP
 * 
 * @param {Object} params - Object containing email/phone, verification type, and navigate function
 * @returns {Function} - Thunk function that sends reset password OTP
 */
export const sendResetPassowrdOTP = ({
  sendTo,
  verificationType,
  navigate,
}) => {
  console.log("send otp ", sendTo);
  return async (dispatch) => {
    // Dispatch action to indicate reset password OTP request has started
    dispatch({ type: actionTypes.SEND_RESET_PASSWORD_OTP_REQUEST });
    try {
      // Make API request to send reset password OTP
      const response = await axios.post(
        `${API_BASE_URL}/auth/users/reset-password/send-otp`,
        {
          sendTo,
          verificationType,
        }
      );
      const user = response.data;
      
      // Navigate to reset password page with session ID
      navigate(`/reset-password/${user.session}`);
      
      // Dispatch success action with response data
      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_OTP_SUCCESS,
        payload: user,
      });
      console.log("otp sent successfully ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      
      // Dispatch failure action with error message
      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

/**
 * Action creator to verify reset password OTP and update password
 * 
 * @param {Object} params - Object containing OTP, new password, session ID, and navigate function
 * @returns {Function} - Thunk function that verifies OTP and updates password
 */
export const verifyResetPassowrdOTP = ({
  otp,
  password,
  session,
  navigate,
}) => {
  return async (dispatch) => {
    // Dispatch action to indicate reset password verification request has started
    dispatch({ type: actionTypes.VERIFY_RESET_PASSWORD_OTP_REQUEST });
    try {
      // Make API request to verify OTP and update password
      const response = await axios.patch(
        `${API_BASE_URL}/auth/users/reset-password/verify-otp`,
        {
          otp,
          password,
        },
        {
          params: {
            id: session,
          },
        }
      );
      const user = response.data;
      
      // Dispatch success action with response data
      dispatch({
        type: actionTypes.VERIFY_RESET_PASSWORD_OTP_SUCCESS,
        payload: user,
      });
      
      // Navigate to success page
      navigate("/password-update-successfully");
      console.log("VERIFY otp successfully ", user);
    } catch (error) {
      console.log("error ", error);
      const errorMessage = error.message;
      
      // Dispatch failure action with error message
      dispatch({
        type: actionTypes.VERIFY_RESET_PASSWORD_OTP_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

/**
 * Action creator for user logout
 * 
 * @returns {Function} - Thunk function that handles logout
 */
export const logout = () => {
  return async (dispatch) => {
    // Dispatch logout action
    dispatch({ type: actionTypes.LOGOUT });
    
    // Clear all items from localStorage
    localStorage.clear();
  };
}; 

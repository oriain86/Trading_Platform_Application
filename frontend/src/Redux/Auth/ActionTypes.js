// File: src/Redux/Auth/ActionTypes.js
// This file defines constants for all Redux action types used in the authentication flow

// ========== REGISTRATION ACTION TYPES ==========
// Action types for the user registration process
export const REGISTER_REQUEST = 'REGISTER_REQUEST';  // Dispatched when registration API call starts
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';  // Dispatched when registration succeeds
export const REGISTER_FAILURE = 'REGISTER_FAILURE';  // Dispatched when registration fails

// ========== LOGIN ACTION TYPES ==========
// Action types for the standard login process
export const LOGIN_REQUEST = 'LOGIN_REQUEST';        // Dispatched when login API call starts
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';        // Dispatched when login succeeds
export const LOGIN_FAILURE = 'LOGIN_FAILURE';        // Dispatched when login fails

// ========== TWO-STEP LOGIN ACTION TYPES ==========
// Action types for the two-factor authentication login step
export const LOGIN_TWO_STEP_REQUEST = 'LOGIN_TWO_STEP_REQUEST';  // Dispatched when 2FA verification starts
export const LOGIN_TWO_STEP_SUCCESS = 'LOGIN_TWO_STEP_SUCCESS';  // Dispatched when 2FA verification succeeds
export const LOGIN_TWO_STEP_FAILURE = 'LOGIN_TWO_STEP_FAILURE';  // Dispatched when 2FA verification fails

// ========== USER PROFILE ACTION TYPES ==========
// Action types for fetching user profile data
export const GET_USER_REQUEST = "GET_USER_REQUEST";  // Dispatched when user profile API call starts
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";  // Dispatched when user profile fetch succeeds
export const GET_USER_FAILURE = "GET_USER_FAILURE";  // Dispatched when user profile fetch fails

// ========== VERIFICATION OTP ACTION TYPES ==========
// Action types for sending verification OTP (for email/phone verification)
export const SEND_VERIFICATION_OTP_REQUEST = "SEND_VERIFICATION_OTP_REQUEST";  // Dispatched when sending verification OTP starts
export const SEND_VERIFICATION_OTP_SUCCESS = "SEND_VERIFICATION_OTP_SUCCESS";  // Dispatched when sending verification OTP succeeds
export const SEND_VERIFICATION_OTP_FAILURE = "SEND_VERIFICATION_OTP_FAILURE";  // Dispatched when sending verification OTP fails

// ========== TWO-FACTOR AUTHENTICATION SETUP ACTION TYPES ==========
// Action types for enabling two-factor authentication
export const ENABLE_TWO_STEP_AUTHENTICATION_REQUEST = "ENABLE_TWO_STEP_AUTHENTICATION_REQUEST";  // Dispatched when enabling 2FA starts
export const ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS = "ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS";  // Dispatched when enabling 2FA succeeds
export const ENABLE_TWO_STEP_AUTHENTICATION_FAILURE = "ENABLE_TWO_STEP_AUTHENTICATION_FAILURE";  // Dispatched when enabling 2FA fails

// ========== OTP VERIFICATION ACTION TYPES ==========
// Action types for verifying OTP (general purpose)
export const VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST";  // Dispatched when OTP verification starts
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";  // Dispatched when OTP verification succeeds
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";  // Dispatched when OTP verification fails

// ========== PASSWORD RESET OTP ACTION TYPES ==========
// Action types for sending password reset OTP
export const SEND_RESET_PASSWORD_OTP_REQUEST = "SEND_RESET_PASSWORD_OTP_REQUEST";  // Dispatched when sending password reset OTP starts
export const SEND_RESET_PASSWORD_OTP_SUCCESS = "SEND_RESET_PASSWORD_OTP_SUCCESS";  // Dispatched when sending password reset OTP succeeds
export const SEND_RESET_PASSWORD_OTP_FAILURE = "SEND_RESET_PASSWORD_OTP_FAILURE";  // Dispatched when sending password reset OTP fails

// ========== PASSWORD RESET VERIFICATION ACTION TYPES ==========
// Action types for verifying password reset OTP and updating password
export const VERIFY_RESET_PASSWORD_OTP_REQUEST = "VERIFY_RESET_PASSWORD_OTP_REQUEST";  // Dispatched when verifying password reset OTP starts
export const VERIFY_RESET_PASSWORD_OTP_SUCCESS = "VERIFY_RESET_PASSWORD_OTP_SUCCESS";  // Dispatched when verifying password reset OTP succeeds
export const VERIFY_RESET_PASSWORD_OTP_FAILURE = "VERIFY_RESET_PASSWORD_OTP_FAILURE";  // Dispatched when verifying password reset OTP fails

// ========== LOGOUT ACTION TYPE ==========
export const LOGOUT = "LOGOUT";  // Dispatched when user logs out 

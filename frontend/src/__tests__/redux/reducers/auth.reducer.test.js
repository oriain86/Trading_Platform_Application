// File: src/__tests__/redux/reducers/auth.reducer.test.js
// This file contains unit tests for the authentication reducer

import reducer from '../../../Redux/Auth/Reducer';
import * as types from '../../../Redux/Auth/ActionTypes';

describe('Auth Reducer', () => {
  // Get the actual initial state from the reducer by dispatching an empty action
  // This is better than hardcoding expected initial state values in the test
  const initialState = reducer(undefined, {});
  
  // Test 1: Verify the reducer returns the correct initial state
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  
  // Test 2: Verify LOGIN_REQUEST action sets loading flag
  it('should handle LOGIN_REQUEST', () => {
    // Dispatch a login request action
    const newState = reducer(initialState, {
      type: types.LOGIN_REQUEST
    });
    
    // Verify that loading flag is set to true, indicating an in-progress login
    expect(newState.loading).toBe(true);
  });
  
  // Test 3: Verify LOGIN_SUCCESS action stores JWT and resets loading
  it('should handle LOGIN_SUCCESS', () => {
    const jwt = 'fake-jwt-token';
    
    // Dispatch a login success action with a JWT payload
    const result = reducer(initialState, {
      type: types.LOGIN_SUCCESS,
      payload: jwt
    });
    
    // Verify that JWT is stored and loading is reset
    expect(result.jwt).toBe(jwt);       // JWT should be stored in state
    expect(result.loading).toBe(false); // Loading should be complete
  });
  
  // Test 4: Verify LOGIN_FAILURE action stores error and resets loading
  it('should handle LOGIN_FAILURE', () => {
    const error = 'Invalid credentials';
    
    // Dispatch a login failure action with an error message
    const result = reducer(initialState, {
      type: types.LOGIN_FAILURE,
      payload: error
    });
    
    // Verify that error is stored and loading is reset
    expect(result.error).toBe(error);    // Error should be stored in state
    expect(result.loading).toBe(false);  // Loading should be complete
  });
  
  // Test 5: Verify GET_USER_SUCCESS action stores user profile data
  it('should handle GET_USER_SUCCESS', () => {
    const user = { id: 1, fullName: 'Test User' };
    
    // Dispatch a get user success action with user profile data
    const result = reducer(initialState, {
      type: types.GET_USER_SUCCESS,
      payload: user
    });
    
    // Verify that user data is stored in state
    expect(result.user).toEqual(user);
  });
  
  // Test 6: Verify LOGOUT action clears authentication state
  it('should handle LOGOUT', () => {
    // Create a state that simulates an authenticated user
    const authenticatedState = {
      ...initialState,
      user: { id: 1 },           // User is logged in
      jwt: 'token'               // JWT token is present
    };
    
    // Dispatch a logout action
    const result = reducer(authenticatedState, {
      type: types.LOGOUT
    });
    
    // Verify that authentication data is cleared
    expect(result.user).toBeNull();  // User should be null after logout
    expect(result.jwt).toBeNull();   // JWT should be null after logout
  });
  
  // Additional tests that could be added:
  // - Test for REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
  // - Test for GET_USER_REQUEST and GET_USER_FAILURE
  // - Test for two-factor authentication actions
  // - Test for password reset actions
}); 

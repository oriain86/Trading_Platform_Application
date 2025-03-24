/**
 * File: src/Api/api.js
 * Description: Axios API configuration for handling HTTP requests
 */

import axios from 'axios';

// API endpoint configurations
const DEPLOYED = 'https://e-commerce-server-production-0873.up.railway.app';
const LOCALHOST = 'http://localhost:5454';

// Set the base URL for API requests
// Currently using localhost for development
// TODO: Consider using an environment variable to switch between environments
export const API_BASE_URL = LOCALHOST;

/**
 * Create an axios instance with predefined configuration
 * This enables consistent API calls throughout the application
 */
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Get authentication token from local storage
// Note: This runs only once when the file is imported
// For dynamic token updates, consider using interceptors
const token = localStorage.getItem('jwt');

// Set authorization header with JWT token
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Set default content type for POST requests
api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;

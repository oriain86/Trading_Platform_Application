/**
 * File: src/pages/Home/fetchData.js
 * Description: Utility function for fetching stock data from Alpha Vantage API
 */

import axios from 'axios';

/**
 * Constant that defines the expected data format from the API
 * Used to access the appropriate property in the response
 */
export const dataType = "Time Series (Daily)";

/**
 * Fetches financial data from the Alpha Vantage API
 * 
 * @param {string} keyword - The API function to call (e.g., 'TIME_SERIES_DAILY', 'GLOBAL_QUOTE')
 * @param {string} symbol - The stock symbol to fetch data for (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object|null>} - The API response data or null if an error occurs
 * 
 * @example
 * // Fetch daily time series for Apple stock
 * const data = await fetchData('TIME_SERIES_DAILY', 'AAPL');
 */
const fetchData = async (keyword, symbol) => {
  try {
    // Make GET request to Alpha Vantage API with query parameters
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: keyword,  // API function to call
        symbol: symbol,     // Stock symbol to fetch data for
        apikey: 'my api keyd', // API key (note: appears to have a typo - 'keyd')
        market: "EUR"       // Market to fetch data from (European market)
      }
    });

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      return response.data; // Return the API response data
    } else {
      // Throw an error if the status code is not 200
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    // Log any errors that occur during the request
    console.error('Error fetching data:', error);
    return null; // Return null if there's an error
  }
};

export default fetchData; 

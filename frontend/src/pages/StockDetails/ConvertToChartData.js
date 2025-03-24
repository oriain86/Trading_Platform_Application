// src/pages/StockDetails/ConvertToChartData.js 

/**
 * Converts date-based time series data to Unix timestamp format
 * 
 * @param {Object} data - Object containing date strings as keys and price data as values
 * @return {Array} Array of [timestamp, openPrice] pairs suitable for charting libraries
 */
export function convertToUnixTimestamp(data) {
    const convertedData = [];
    
    // Iterate through each key-value pair in the data object
    for (const [key, value] of Object.entries(data)) {
        // Convert the date string to Unix timestamp (milliseconds since epoch)
        const timestamp = new Date(key).getTime();
        
        // Extract the opening price and create a [timestamp, price] pair
        // Assumes the value object has a '1. open' property containing the opening price
        convertedData.push([timestamp, parseFloat(value['1. open'])]);
    }
    
    return convertedData;
} 

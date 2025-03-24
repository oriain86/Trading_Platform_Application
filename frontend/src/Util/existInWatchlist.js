// File: src/Util/existInWatchlist.js

// This utility function checks if a coin already exists in a user's watchlist

/**
 * Determines if a cryptocurrency already exists in the watchlist
 * 
 * This function iterates through an array of watchlist items and
 * checks if any item has the same ID as the provided coin.
 * Used to prevent duplicate entries and for toggling coins on/off the watchlist.
 * 
 * @param {Array} items - Array of cryptocurrency objects in the watchlist
 * @param {Object} coin - The cryptocurrency object to check for existence
 * @param {string} coin.id - Unique identifier of the cryptocurrency
 * @returns {boolean} - True if the coin exists in the watchlist, false otherwise
 */
export const existInWatchlist = (items, coin) => {
    // Iterate through each item in the watchlist
    for(let item of items) {
        // Use optional chaining (?.) to safely check if IDs match
        if(item?.id === coin?.id) return true;
    }
    
    // Return false if no match is found
    return false;
}

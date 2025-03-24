// File: src/Util/readableDate.js 

// This utility function formats dates into a human-readable format

/**
 * Converts a date string into a readable format, separating date and time
 * 
 * This function takes an ISO date string or any valid date input and formats
 * it into a standardized representation with separate date and time components.
 * The date is formatted as YYYY/MM/DD and time as HH:MM:SS.
 * 
 * @param {string} dateString - The date string to be formatted (ISO format preferred)
 * @returns {Object} - An object containing formatted date and time strings
 * @returns {string} returns.date - Formatted date in YYYY/MM/DD format
 * @returns {string} returns.time - Formatted time in HH:MM:SS format
 */
export function readableDate(dateString) {
    // Parse the input string to create a Date object
    const date = new Date(dateString);

    // Format the date components with zero-padding
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based in JS (0-11)
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Construct the formatted date string (YYYY/MM/DD)
    const formattedDate = `${year}/${month}/${day} `;
    
    // Construct the formatted time string (HH:MM:SS)
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Return an object with separate date and time properties
    return {
        date: formattedDate,
        time: formattedTime
    };
} 

// File: src/Util/readableTimestamp.js

// This utility function formats timestamps into human-readable dates and times

/**
 * Converts a timestamp into a formatted, human-readable date and time string
 * 
 * This function takes a timestamp (either a UNIX timestamp or a valid date string)
 * and formats it using locale-specific formatting for better readability.
 * The output includes the full month name, day, year, and 24-hour time.
 * 
 * Example: "1620000000000" becomes "May 3, 2021, 08:40"
 * 
 * @param {number|string} timestamp - The timestamp to format (UNIX timestamp or date string)
 * @returns {string} - A formatted date and time string in "Month Day, Year, HH:MM" format
 */
export const readableTimestamp = (timestamp) => {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Define formatting options for toLocaleString
  const options = {
    year: "numeric",      // Full year (e.g., 2023)
    month: "long",        // Full month name (e.g., January)
    day: "numeric",       // Day of the month (e.g., 1)
    hour: "2-digit",      // Hours in 2-digit format (e.g., 08)
    minute: "2-digit",    // Minutes in 2-digit format (e.g., 05)
    // seconds omitted for cleaner display
    hour12: false,        // Use 24-hour format instead of AM/PM
  };
  
  // Format the date using the US English locale and specified options
  const formattedDate = date.toLocaleString("en-US", options);
  
  // Return the formatted date string
  return formattedDate;
} 

// File: src/Util/maskAccountNumber.js

// This utility function masks sensitive account numbers for security 

/**
 * Masks an account number for privacy and security
 * 
 * This function hides all but the last 4 digits of an account number
 * by replacing the preceding digits with asterisks (*). If the account
 * number is 4 or fewer characters, it returns the original number unchanged.
 * 
 * Example: "1234567890123456" becomes "************3456"
 * 
 * @param {string} accountNumber - The full account number to be masked
 * @returns {string} - The masked account number with only last 4 digits visible
 */
export function maskAccountNumber(accountNumber) {
  // Check if the account number is longer than 4 digits
  if (accountNumber.length > 4) {
    // Extract the last 4 digits
    const lastFourDigits = accountNumber.slice(-4);
    
    // Create a string of asterisks matching the length of hidden digits
    const maskedDigits = "*".repeat(accountNumber.length - 4);
    
    // Combine the masked portion with the last 4 digits
    return maskedDigits + lastFourDigits;
  } else {
    // If 4 or fewer digits, return unchanged
    // This prevents masking short account identifiers
    return accountNumber;
  }
} 

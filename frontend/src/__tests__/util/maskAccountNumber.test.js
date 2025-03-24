// File: src/__tests__/util/maskAccountNumber.test.js
// This file contains unit tests for the maskAccountNumber utility function

import { maskAccountNumber } from '../../Util/maskAccountNumber';

describe('maskAccountNumber utility', () => {
  // Test 1: Verify standard account number masking
  it('should mask account number correctly', () => {
    // Test with a 10-digit account number
    // Expected result: all but the last 4 digits replaced with asterisks
    expect(maskAccountNumber('1234567890')).toBe('******7890');
  });
  
  // Test 2: Verify handling of short account numbers
  it('should handle short account numbers', () => {
    // Test with a 4-digit account number (edge case)
    // When 4 or fewer digits, the function should return the original number unchanged
    expect(maskAccountNumber('1234')).toBe('1234');
  });
  
  // Additional tests that could be added:
  // - Test with numbers longer than 10 digits
  // - Test with non-numeric characters
  // - Test with empty strings
  // - Test with null or undefined input
}); 

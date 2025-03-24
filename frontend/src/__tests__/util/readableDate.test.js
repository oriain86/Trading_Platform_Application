// File: src/__tests__/util/readableDate.test.js
// This file contains unit tests for the readableDate utility function

import { readableDate } from '../../Util/readableDate';

describe('readableDate utility', () => {
  // Test 1: Verify standard ISO date string formatting
  it('formats ISO date strings correctly', () => {
    // Test with standard ISO 8601 date-time format
    const isoDate = '2023-01-15T12:30:45Z';
    const result = readableDate(isoDate);
    
    // Verify the result structure has both date and time properties
    expect(result).toHaveProperty('date');
    expect(result).toHaveProperty('time');
    
    // Verify the date contains the expected year
    // This is a more flexible test that doesn't break if format changes slightly
    expect(result.date).toContain('2023');
  });
  
  // Test 2: Verify handling of alternative date formats
  it('handles different date formats', () => {
    // Test with a non-ISO date format
    const date = '2023/05/20';
    const result = readableDate(date);
    
    // Verify the result has the expected properties
    expect(result).toHaveProperty('date');
    
    // Verify the date part contains the expected formatting
    expect(result.date).toContain('2023/05/20');
  });
  
  // Test 3: Verify graceful handling of invalid inputs
  it('handles invalid dates gracefully', () => {
    // Test with a completely invalid date string
    const result = readableDate('invalid-date');
    
    // Verify the function still returns an object with the expected properties
    // instead of throwing an error or returning null/undefined
    expect(result).toHaveProperty('date');
    expect(result).toHaveProperty('time');
    
    // Note: We don't check the exact values since JavaScript's Date handling of
    // invalid dates can vary across environments, but we ensure the function
    // returns something structured correctly
  });
  
  // Additional tests that could be added:
  // - Test with timestamps (numeric milliseconds since epoch)
  // - Test with Date objects directly
  // - Test timezone handling (if relevant)
  // - Test with null or undefined inputs
}); 

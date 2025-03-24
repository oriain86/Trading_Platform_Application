// File: src/__tests__/util/existInWatchlist.test.js
// This file contains unit tests for the existInWatchlist utility function

import { existInWatchlist } from '../../Util/existInWatchlist';

describe('existInWatchlist utility', () => {
  // Create sample watchlist with two cryptocurrencies
  const watchlistItems = [
    { id: 'bitcoin' },
    { id: 'ethereum' }
  ];
  
  // Test 1: Verify function returns true for existing coins
  it('should return true when coin exists in watchlist', () => {
    // Check if bitcoin is in the watchlist (it is)
    const result = existInWatchlist(watchlistItems, { id: 'bitcoin' });
    expect(result).toBe(true);
  });
  
  // Test 2: Verify function returns false for non-existing coins
  it('should return false when coin does not exist in watchlist', () => {
    // Check if litecoin is in the watchlist (it isn't)
    const result = existInWatchlist(watchlistItems, { id: 'litecoin' });
    expect(result).toBe(false);
  });
  
  // Test 3: Verify function handles empty watchlist correctly
  it('should handle empty watchlist', () => {
    // Check any coin against an empty watchlist
    const result = existInWatchlist([], { id: 'bitcoin' });
    expect(result).toBe(false);
  });
  
  // Additional tests that could be added:
  // - Test with null or undefined parameters
  // - Test with coins that have matching properties other than id
  // - Test with case sensitivity (if relevant)
}); 

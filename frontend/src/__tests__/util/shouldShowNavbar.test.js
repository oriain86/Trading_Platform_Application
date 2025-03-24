// File: src/__tests__/util/shouldShowNavbar.test.js
// This file contains unit tests for the shouldShowNavbar utility function

import { shouldShowNavbar } from '../../Util/shouldShowNavbar';

describe('shouldShowNavbar utility', () => {
  // Define sample routes configuration for testing
  // Each route has a path pattern and a required user role
  const routes = [
    { path: '/', role: 'ROLE_USER' },                // Home page (user access)
    { path: '/portfolio', role: 'ROLE_USER' },       // Portfolio page (user access)
    { path: '/market/:id', role: 'ROLE_USER' },      // Market detail page with dynamic parameter (user access)
    { path: '/admin/withdrawal', role: 'ROLE_ADMIN' } // Admin withdrawal page (admin access only)
  ];

  // Test 1: Verify routes that match user's role show navbar
  it('returns true when user accesses route matching their role', () => {
    // Regular user accessing user routes
    expect(shouldShowNavbar('/', routes, 'ROLE_USER')).toBe(true);
    expect(shouldShowNavbar('/portfolio', routes, 'ROLE_USER')).toBe(true);
    
    // Admin accessing admin route
    expect(shouldShowNavbar('/admin/withdrawal', routes, 'ROLE_ADMIN')).toBe(true);
  });

  // Test 2: Verify routes requiring different role hide navbar
  it('returns false when user accesses route requiring different role', () => {
    // Regular user trying to access admin route
    expect(shouldShowNavbar('/admin/withdrawal', routes, 'ROLE_USER')).toBe(false);
  });

  // Test 3: Verify dynamic route parameters are handled correctly
  it('handles dynamic path parameters correctly', () => {
    // Test different values for the :id parameter in /market/:id
    expect(shouldShowNavbar('/market/bitcoin', routes, 'ROLE_USER')).toBe(true);
    expect(shouldShowNavbar('/market/ethereum', routes, 'ROLE_USER')).toBe(true);
  });

  // Test 4: Verify unknown routes hide navbar
  it('returns false for unknown routes', () => {
    // Routes that don't exist in the configuration
    expect(shouldShowNavbar('/unknown-route', routes, 'ROLE_USER')).toBe(false);
    expect(shouldShowNavbar('/unknown-route', routes, 'ROLE_ADMIN')).toBe(false);
  });

  // Test 5: Verify admin privilege inheritance (admins can access user routes)
  it('handles admin users accessing user routes correctly', () => {
    // Test that admins can see navbar for user routes
    // This tests the role hierarchy where admins have more privileges
    expect(shouldShowNavbar('/', routes, 'ROLE_ADMIN')).toBe(true);
    expect(shouldShowNavbar('/portfolio', routes, 'ROLE_ADMIN')).toBe(true);
  });
  
  // Additional tests that could be added:
  // - Test with null/undefined routes or roles
  // - Test with custom role hierarchies
  // - Test with more complex route patterns
}); 

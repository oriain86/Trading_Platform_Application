// File: src/Util/shouldShowNavbar.js

// This utility function determines whether to display the navigation bar based on route and user role

/**
 * Determines if the navbar should be displayed for the current route and user role
 * 
 * This function checks if the current path matches any of the routes where
 * the navbar should be shown, considering the user's role permissions.
 * It handles dynamic route segments (like :id) by converting them to regex patterns.
 * 
 * @param {string} currentPath - The current application path/URL
 * @param {Array} routes - Array of route objects that should display the navbar
 * @param {string} [userRole="ROLE_USER"] - The role of the current user
 * @returns {boolean} - True if the navbar should be shown, false otherwise
 */
export function shouldShowNavbar(currentPath, routes, userRole) {
  // Default to regular user role if not specified
  if (!userRole) userRole = "ROLE_USER";
  
  /**
   * Converts a route path pattern to a regular expression
   * Replaces dynamic segments like ':id' with a regex pattern that matches any word character
   * 
   * @param {string} path - The route path pattern (e.g., "/user/:id/profile")
   * @returns {RegExp} - Regular expression that matches the path with any values for dynamic segments
   */
  const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/:\w+/g, "\\w+") + "$");
  
  // Check if any route matches both the current path and user role
  return routes.some(
    (route) =>
      // Check if route is accessible by current user role (admins can access all routes)
      (route.role === userRole || userRole === "ROLE_ADMIN") &&
      // Check if current path matches the route pattern
      pathToRegex(route.path).test(currentPath)
  );
} 

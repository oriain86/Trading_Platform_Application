/**
 * File: src/pages/Notfound/NotFound.jsx
 * Description: Error page displayed when a route doesn't exist or user lacks access
 */

/**
 * NotFound - Simple 401 error page component
 * 
 * Displays a centered error message with a 401 status code and "Page Not Found" text.
 * Note: Typically 401 indicates "Unauthorized" rather than "Not Found" (which would be 404),
 * so there might be some confusion in the error code usage.
 * 
 * @returns {JSX.Element} The 401 error page component
 */
const NotFound = () => {
  return (
    <div className="flex gap-3 flex-col min-h-screen items-center justify-center">
      {/* Error status code */}
      <p className="text-6xl">401</p>
      
      {/* Error message */}
      <h1 className="text-6xl">Page Not found</h1>
    </div>
  )
}

export default NotFound 

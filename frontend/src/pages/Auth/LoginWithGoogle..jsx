/**
 * File: src/pages/Auth/LoginWithGoogle.jsx 
 * Description: Component for Google OAuth authentication
 */

import { Button } from '@/components/ui/button'; // UI button component
import { useState } from 'react'; // React state hook

/**
 * LoginWithGoogle - Component that provides Google OAuth login functionality
 * 
 * Features:
 * - Button to initiate Google login flow
 * - Error handling and display
 * - API integration with backend authentication endpoint
 * 
 * @returns {JSX.Element} The Google login component
 */
const LoginWithGoogle = () => {
  // State to track and display authentication errors
  const [error, setError] = useState(null);

  /**
   * Handler for Google login button click
   * Initiates the OAuth flow by calling the backend endpoint
   */
  const handleGoogleLogin = async () => {
    try {
      // Call the backend endpoint for Google authentication
      const response = await fetch('http://localhost:5454/login/google');
      const data = await response.json();
      
      // Check if authentication was successful
      if (data.token) {
        // Token handling is commented out but prepared for implementation
        // localStorage.setItem('token', data.token);
        
        // Redirection logic is commented out but prepared for implementation
        // Example: history.push('/dashboard');
        
        console.log("Redirect user to dashboard", data);
      } else {
        // Set error state if no token is returned
        setError('Authentication failed');
      }
    } catch (error) {
      // Handle any exceptions that occur during the authentication process
      setError('Error logging in with Google');
    }
  };

  return (
    <div className='flex h-screen justify-center items-center flex-col space-y-10'>
      {/* Page title */}
      <h2>Login</h2>
      
      {/* Google login button */}
      <Button onClick={handleGoogleLogin}>Login with Google</Button>
      
      {/* Conditional error message display */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginWithGoogle; 

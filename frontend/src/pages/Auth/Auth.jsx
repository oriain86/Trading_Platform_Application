/**
 * File: src/pages/Auth/Auth.jsx
 * Description: Main authentication container component for login, signup, and forgot password flows
 * This component handles the routing between different authentication forms and provides a consistent UI wrapper
 */

/* eslint-disable no-unused-vars */
import "./Auth.css"; // Styles for authentication container
import { Button } from "@/components/ui/button";

// Authentication form components
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordForm from "./ForgotPassword"; // Note: Duplicate import

// React and routing
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// UI components
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SpinnerBackdrop from "@/components/custom/SpinnerBackdrop";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

// Toast notifications
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import CustomToast from "@/components/custom/CustomToast.jsx";

// Redux
import { useSelector } from "react-redux";

/**
 * Auth - Main authentication component that renders different auth forms based on current route
 * 
 * Features:
 * - Route-based conditional rendering (login, signup, forgot password)
 * - Consistent styling and layout for all auth forms
 * - Navigation between authentication flows
 * - Error handling with toast notifications
 * - Background styling with blur effect
 * 
 * @returns {JSX.Element} The authentication container with the appropriate form based on route
 */
const Auth = () => {
  // Hooks for routing and navigation
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get authentication state from Redux
  const { auth } = useSelector((store) => store);
  
  // Toast hook for notifications
  const { toast } = useToast();

  // State for animation (currently not fully implemented)
  const [animate, setAnimate] = useState(false);

  /**
   * Navigate to a different auth route with optional animation
   * Animation is currently commented out but prepared for future use
   * 
   * @param {string} path - The route path to navigate to
   */
  const handleNavigation = (path) => {
    // Animation logic is commented out but kept for future implementation
    // setAnimate(true);
    // setTimeout(() => {
    navigate(path);
    //   setAnimate(false);
    // }, 500);
    // Adjust the delay as needed to match your animation duration
    // setAnimate(false)
  };

  // State for custom toast visibility
  const [showToast, setShowToast] = useState(false);

  /**
   * Show a toast notification
   * Currently not used but kept for future implementation
   */
  const handleShowToast = () => {
    setShowToast(true);
  };

  // Debug logging for authentication errors
  console.log("---------- ", auth.error);

  return (
    <div className={`authContainer h-screen relative`}>
      {/* Dark overlay to enhance readability of content against background */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50"></div>

      {/* Main authentication card/container with blur effect */}
      <div
        className={`bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white`}
      >
        {/* Error toast notification - shown when auth.error exists */}
        <CustomToast show={auth.error} message={auth.error?.error}/>
     
        {/* App title/branding */}
        <h1 className="text-6xl font-bold pb-9">Treu Trading</h1>
        
        {/* Logo avatar (currently commented out) */}
        {/* <Avatar>
          <AvatarImage src="https://cdn.pixabay.com/photo/2019/04/15/20/42/bitcoin-4130299_1280.png"/>
          <AvatarFallback>BTC</AvatarFallback>
        </Avatar> */}

        {/* Conditional rendering based on current route */}
        {location.pathname == "/signup" ? (
          // SIGNUP FORM SECTION
          <section
            className={`w-full login ${animate ? "slide-down" : "slide-up"}`}
          >
            <div className={`loginBox w-full px-10 space-y-5`}>
              {/* Signup form component */}
              <SignupForm />

              {/* Link to switch to sign in */}
              <div className="flex items-center justify-center">
                <span>{"Already have an account?"}</span>
                <Button
                  onClick={() => handleNavigation("/signin")}
                  variant="ghost"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </section>
        ) : location.pathname == "/forgot-password" ? (
          // FORGOT PASSWORD SECTION
          <section className="p-5 w-full">
            {/* Forgot password form component */}
            <ForgotPasswordForm />
            
            {/* Commented out alternative option */}
            {/* <Button variant="outline" className="w-full py-5 mt-5">
              Try Using Mobile Number
            </Button> */}
            
            {/* Link to return to login */}
            <div className="flex items-center justify-center mt-5">
              <span>Back To Login? </span>
              <Button onClick={() => navigate("/signin")} variant="ghost">
                Sign In
              </Button>
            </div>
          </section>
        ) : (
          // LOGIN FORM SECTION (default)
          <>
            <section className={`w-full login`}>
              <div className={`loginBox w-full px-10 space-y-5`}>
                {/* Login form component */}
                <LoginForm />

                {/* Link to switch to sign up */}
                <div className="flex items-center justify-center">
                  <span>Don't have an account? </span>
                  <Button
                    onClick={() => handleNavigation("/signup")}
                    variant="ghost"
                  >
                    Sign Up
                  </Button>
                </div>
                
                {/* Link to forgot password */}
                <div className="">
                  <Button
                    onClick={() => navigate("/forgot-password")}
                    variant="outline"
                    className="w-full py-5"
                  >
                    Forgot Password?
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;

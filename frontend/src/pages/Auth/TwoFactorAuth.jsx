/**
 * File: src/pages/Auth/TwoFactorAuth.jsx
 * Description: Two-factor authentication component for verifying user identity with OTP
 */

// Redux
import { twoStepVerification } from "@/Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";

// Custom components
import CustomToast from "@/components/custom/CustomToast.jsx";

// UI components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Imported but not used
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// React hooks
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * TwoFactorAuth - Component for handling two-factor authentication with OTP
 * 
 * Features:
 * - Specialized OTP input with 6 digits
 * - Error handling with toast notifications
 * - Avatar for visual identity
 * - Session-based authentication flow
 * 
 * @returns {JSX.Element} The two-factor authentication component
 */
const TwoFactorAuth = () => {
  // State to store the OTP value
  const [value, setValue] = useState("");
  
  // Hooks for Redux, routing, and navigation
  const dispatch = useDispatch();
  const { session } = useParams(); // Get session ID from URL parameters
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store); // Get auth state from Redux

  /**
   * Handle OTP verification submission
   * Dispatches action to verify the two-factor authentication code
   */
  const handleTwoFactoreAuth = () => { 
    dispatch(twoStepVerification({
      otp: value,     // The OTP entered by the user
      session,        // Session ID from URL parameters
      navigate        // For redirection after successful verification
    }));
    console.log(value); // Debug log
  };
  
  return (
    <div>
      {/* Error toast notification - shown when auth.error exists */}
      <CustomToast show={auth.error} message={auth.error?.error}/>
      
      {/* Main container with centered content */}
      <div className="flex flex-col gap-5 h-screen justify-center items-center">
        {/* Card container for the 2FA interface */}
        <Card className="p-5 flex flex-col justify-center items-center">
          {/* User avatar (decorative) */}
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://cdn.dribbble.com/users/1125847/screenshots/15197732/media/7201b01895b7b60d33eea77d098eb7b3.png?resize=1600x1200&vertical=center" />
          </Avatar>
          
          {/* Card header with title */}
          <CardHeader>
            <div className="flex items-center gap-5">
              <h1 className="text-xl font-semibold">Two Step Verification</h1>
            </div>
          </CardHeader>
          
          {/* Card content with OTP input and verify button */}
          <CardContent className="space-y-5">
            <div>
              {/* OTP input with 6 slots in 3-3 format */}
              <InputOTP
                value={value}
                onChange={(value) => setValue(value)}
                maxLength={6}
              >
                {/* First group of 3 digits */}
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                {/* Visual separator */}
                <InputOTPSeparator />
                {/* Second group of 3 digits */}
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              
              {/* Helper text for user guidance */}
              <p className="mt-2 text-gray-300 text-sm text-center">
                Check your email for OTP
              </p>
            </div>
            
            {/* Verify button */}
            <Button 
              onClick={handleTwoFactoreAuth} 
              className="w-full"
            >
              Verify
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorAuth; 

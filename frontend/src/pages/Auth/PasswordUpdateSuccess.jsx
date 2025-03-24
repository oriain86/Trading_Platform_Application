/**
 * File: src/pages/Auth/PasswordUpdateSuccess.jsx
 * Description: Success page displayed after a successful password reset
 */

import { Button } from "@/components/ui/button"; // UI button component
import { Card } from "@/components/ui/card"; // UI card component
import { CheckCircle } from "lucide-react"; // Success icon from Lucide icons
import React from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation

/**
 * PasswordUpdateSuccess - Confirmation page shown after password has been successfully updated
 * 
 * Features:
 * - Visual confirmation with success icon
 * - Clear success message
 * - Button to return to login page
 * 
 * @returns {JSX.Element} The password update success component
 */
const PasswordUpdateSuccess = () => {
    // Hook for programmatic navigation
    const navigate = useNavigate();
    
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            {/* Card container for the success message */}
            <Card className="p-10 flex flex-col justify-center items-center w-[20rem] h-[20rem]">
                {/* Success icon */}
                <CheckCircle className="text-green-600 h-20 w-20" />
                
                {/* Main success message */}
                <p className="pt-5 text-xl font-semibold">Password Changed!</p>
                
                {/* Descriptive text */}
                <p className="py-2 pb-5 text-gray-400 text-center">
                    Your password has been changed successfully
                </p>
                
                {/* Button to navigate back to login page */}
                <Button 
                    onClick={() => navigate("/")} 
                    className="w-full"
                >
                    Go To Login
                </Button>
            </Card>
        </div>
    );
};

export default PasswordUpdateSuccess; 

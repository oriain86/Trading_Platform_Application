/**
 * File: src/pages/Auth/ForgotPassword.jsx
 * Description: Form for initiating password reset via email OTP
 */

// UI Components
import { Input } from "@/components/ui/input";
// import "./Login.css"; // CSS import commented out
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Form validation and state management
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Redux and routing
import { useDispatch } from "react-redux";
import { sendResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * Zod validation schema for the forgot password form
 * Validates email format
 */
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/**
 * ForgotPasswordForm - Component for initiating password reset
 * 
 * Allows users to request a password reset OTP via email
 * 
 * @returns {JSX.Element} The forgot password form component
 */
const ForgotPasswordForm = () => {
  // State to track verification method (currently only EMAIL is supported)
  const [verificationType, setVerificationType] = useState("EMAIL");
  
  // Hooks for navigation and Redux dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Initialize form with validation and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  
  /**
   * Form submission handler
   * Dispatches action to send password reset OTP to the provided email
   * 
   * @param {Object} data - Form data containing email
   */
  const onSubmit = (data) => {
    data.navigate = navigate; // Add navigate function for redirection
    dispatch(
      sendResetPassowrdOTP({ 
        sendTo: data.email, 
        navigate, 
        verificationType 
      })
    );
    console.log("login form", data); // Debug log
  };
  
  return (
    <div className="space-y-5">
      {/* Form Title */}
      <h1 className="text-center text-xl">
        Where do you want to get the code?
      </h1>
      
      {/* Password Reset Request Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter your email"
                  />
                </FormControl>
                {/* Error message will appear here if validation fails */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-slate-400 py-5">
            Send OTP
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm; 

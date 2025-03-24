/**
 * File: src/pages/Auth/ResetPasswordForm.jsx
 * Description: Form for verifying OTP and setting a new password
 * 
 * This component is the final step in the password reset flow, where users:
 * 1. Enter the OTP they received
 * 2. Create a new password
 * 3. Confirm the new password
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
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // Specialized OTP input component

// Form validation and state management
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; // Commented out Zod resolver
import { yupResolver } from "@hookform/resolvers/yup"; // Using Yup instead of Zod
// import { z } from "zod"; // Commented out Zod
import * as yup from "yup"; // Using Yup validation library

// Redux and routing
import { useDispatch } from "react-redux";
import { verifyResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Yup validation schema for the reset password form
 * Validates:
 * - Password (min 8 characters)
 * - Confirm password (must match password)
 * - OTP (must be 6 characters)
 */
const formSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords & Confirm Password must match")
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .required("OTP is required"),
});

/**
 * ResetPasswordForm - Component for the password reset final step
 * 
 * Features:
 * - OTP verification input with separate slots
 * - New password creation with confirmation
 * - Form validation with error messages
 * - Submission to reset password endpoint
 * 
 * @returns {JSX.Element} The reset password form component
 */
const ResetPasswordForm = () => {
  // Hooks for navigation, Redux dispatch, and route parameters
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useParams(); // Get session ID from URL params
  
  // Initialize form with validation and default values
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      otp: "",
    },
  });
  
  /**
   * Form submission handler
   * Dispatches action to verify OTP and reset password
   * 
   * @param {Object} data - Form data containing otp, password, and confirmPassword
   */
  const onSubmit = (data) => {
    dispatch(
      verifyResetPassowrdOTP({ 
        otp: data.otp, 
        password: data.password,
        session, // Session ID from URL params
        navigate // For redirection after successful reset
      })
    );
    console.log("login form", data); // Debug log
  };
  
  return (
    <div className={`loginContainer h-screen flex justify-center items-center`}>
      {/* Card container for the reset password form */}
      <Card
        className={`box flex flex-col items-center justify-center p-10 h-[35rem] w-[30rem] border`}
      >
        <div className="space-y-5 w-full">
          {/* Form title */}
          <h1 className="text-center text-xl pb-5">Reset Your Password</h1>
          
          {/* Reset password form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* OTP section */}
              <h1 className="pb-2">Verify OTP</h1>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* Specialized OTP input with 6 slots */}
                      <InputOTP {...field} maxLength={6}>
                        {/* First group of 3 slots */}
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        {/* Separator between groups */}
                        <InputOTPSeparator />
                        {/* Second group of 3 slots */}
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    {/* Error message will appear here if validation fails */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Password section */}
              <h1 className="pt-7 pb-2">Change Password</h1>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password" // For password masking
                        className="border w-full border-gray-700 py-5 px-5"
                        placeholder="New password"
                      />
                    </FormControl>
                    {/* Error message will appear here if validation fails */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Confirm password section */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password" // For password masking
                        className="border w-full border-gray-700 py-5 px-5"
                        placeholder="Confirm password..."
                      />
                    </FormControl>
                    {/* Error message will appear here if validation fails */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button type="submit" className="w-full py-5">
                Change Password
              </Button>
            </form>
          </Form>

          {/* Commented out sign-up link */}
          {/* <div className="flex items-center justify-center">
              <span>Don't have an account? </span>
              <Button variant="ghost">signup</Button>
            </div> */}
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordForm; 

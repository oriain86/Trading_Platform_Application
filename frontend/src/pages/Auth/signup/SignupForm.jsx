/**
 * File: src/pages/Auth/signup/SignupForm.jsx
 * Description: Signup form component with validation and state management
 */

/* eslint-disable no-unused-vars */
// UI Components
import { Input } from "@/components/ui/input";
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

// Routing
import { useNavigate } from "react-router-dom";

// Redux integration
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/Redux/Auth/Action";

// Loading state component
import SpinnerBackdrop from "@/components/custom/SpinnerBackdrop";

/**
 * Zod validation schema for the signup form
 * - Requires full name
 * - Validates email format
 * - Ensures password meets minimum length requirement
 */
const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});

/**
 * SignupForm - Component for user registration
 * 
 * Features:
 * - Full name, email, and password fields with validation
 * - Redux integration for auth state management
 * - Loading state feedback
 * - Navigation after successful registration
 * 
 * @returns {JSX.Element} The signup form component
 */
const SignupForm = () => {
  // Get authentication state from Redux store
  const {auth} = useSelector(store => store)

  // Hooks for navigation and Redux actions
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  // Initialize form with validation and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });
  
  /**
   * Form submission handler
   * Dispatches register action with form data and navigate function
   * 
   * @param {Object} data - Form data with fullName, email, and password
   */
  const onSubmit = (data) => {
    data.navigate = navigate // Add navigate function to data for redirection after registration
    dispatch(register(data)) // Dispatch Redux action
    console.log("signup form", data);
  };
  
  return (
    <div className="space-y-5">
      {/* Form Title */}
      <h1 className="text-center text-xl">Create New Account</h1>
      
      {/* Registration Form with React Hook Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter your full name"
                  />
                </FormControl>
                {/* Error message will appear here if validation fails */}
                <FormMessage />
              </FormItem>
            )}
          />
          
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
          
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password" 
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter your password"
                  />
                </FormControl>
                {/* Error message will appear here if validation fails */}
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Submit Button or Loading Spinner */}
          {!auth.loading ? 
            <Button type="submit" className="w-full py-5">
              Register
            </Button> 
            : 
            <SpinnerBackdrop show={true}/>
          }
        </form>
      </Form>
    </div>
  );
};

export default SignupForm; 

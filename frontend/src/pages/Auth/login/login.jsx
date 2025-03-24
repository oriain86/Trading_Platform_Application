/**
 * File: src/pages/Auth/login/login.jsx 
 * Description: Login form component with validation and state management
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

// Redux integration
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Auth/Action";

// Routing
import { useNavigate } from "react-router-dom";

// Loading state components
import { Skeleton } from "@/components/ui/skeleton";
import SpinnerBackdrop from "@/components/custom/SpinnerBackdrop";

// Toast notifications
// import { toast } from "@/components/ui/use-toast"; // Commented out
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

/**
 * Zod validation schema for the login form
 * Enforces valid email format and minimum password length
 */
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

/**
 * LoginForm - Component for user authentication
 * 
 * Features:
 * - Email and password validation using Zod
 * - Redux integration for auth state management
 * - Loading state feedback
 * - Navigation after successful login
 * - Toast notifications
 * 
 * @returns {JSX.Element} The login form component
 */
const LoginForm = () => {
  // Hooks for navigation, Redux state, and toast notifications
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { toast } = useToast();
  
  // Initialize form with validation and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  /**
   * Form submission handler
   * Dispatches login action with form data and navigate function
   * 
   * @param {Object} data - Form data with email and password
   */
  const onSubmit = (data) => {
    data.navigate = navigate; // Add navigate function to data for redirection after login
    dispatch(login(data));    // Dispatch Redux action
    console.log("login form", data);
  };
  
  return (
    <div className="space-y-5">
      {/* Form Title */}
      <h1 className="text-center text-xl">Login</h1>
      
      {/* Login Form with React Hook Form */}
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
          {!auth.loading ? (
            <Button type="submit" className="w-full py-5">
              Login
            </Button>
          ) : (
            <SpinnerBackdrop show={true} />
          )}
        </form>
      </Form>

      {/* Example toast notification (commented out) */}
      {/* {toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      })} */}
    </div>
  );
};

export default LoginForm; 

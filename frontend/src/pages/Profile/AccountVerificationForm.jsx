/**
 * File: src/pages/Profile/AccountVerificationForm.jsx
 * Description: Form for sending and verifying OTP for account verification
 */

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// Redux actions
import { sendVerificationOtp, verifyOtp } from "@/Redux/Auth/Action";

// UI components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// React and Redux
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Auth from "../Auth/Auth"; // Imported but not used

/**
 * AccountVerificationForm - Component for email verification via OTP
 * 
 * Features:
 * - Displays user email from auth state
 * - Button to send verification OTP to email
 * - Dialog with OTP input
 * - OTP verification submission
 * 
 * @param {Function} handleSubmit - Function to handle OTP verification, passed from parent
 * @returns {JSX.Element} The account verification form component
 */
const AccountVerificationForm = ({ handleSubmit }) => {
  // State for OTP input value
  const [value, setValue] = useState("");
  
  // Redux hooks
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  /**
   * Handle input change (currently just logs the value)
   * This function is defined but not used in the component
   * 
   * @param {Event} e - Input change event
   */
  const handleOnChange = (e) => {
    console.log(e.target.value);
  };

  /**
   * Dispatch action to send verification OTP
   * 
   * @param {string} verificationType - Type of verification (EMAIL or MOBILE)
   */
  const handleSendOtp = (verificationType) => {
    dispatch(
      sendVerificationOtp({
        verificationType,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full">
        {/* Email verification section */}
        <div className="flex justify-between items-center">
          {/* Label */}
          <p className="">Email :</p>
          
          {/* User's email from auth state */}
          <p>{auth.user?.email}</p>
          
          {/* OTP dialog */}
          <Dialog>
            {/* Trigger button to send OTP */}
            <DialogTrigger>
              <Button
                onClick={() => handleSendOtp("EMAIL")}
              >
                Send OTP
              </Button>
            </DialogTrigger>
            
            {/* OTP input dialog */}
            <DialogContent className="">
              <DialogHeader className="">
                <DialogTitle className="px-10 pt-5 text-center">
                  Enter OTP
                </DialogTitle>
              </DialogHeader>
              
              {/* OTP input section */}
              <div className="py-5 flex gap-10 justify-center items-center">
                {/* OTP input with 6 digits in 3-3 format */}
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
                
                {/* Submit button that closes the dialog */}
                <DialogClose>
                  <Button 
                    onClick={() => handleSubmit(value)} 
                    className="w-[10rem]"
                  >
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Mobile verification section (commented out) */}
        {/* <div className="flex justify-between items-center">
          <p className="">Mobile :</p>
          <p>+918987667899</p>
          
          <Button onClick={() => handleSendOtp("MOBILE")}>Sent OTP</Button>
        </div> */}
      </div>
    </div>
  );
};

export default AccountVerificationForm; 

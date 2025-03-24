/**
 * File: src/pages/Profile/Profile.jsx
 * Description: User profile page with account information and security settings
 */

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VerifiedIcon } from "lucide-react";

// Custom Components
import AccountVerificationForm from "./AccountVerificationForm.jsx";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";

/**
 * Profile - User profile page with personal information and security settings
 * 
 * Features:
 * - Personal information display
 * - Two-factor authentication management
 * - Account verification status and functionality
 * - Password change option
 * 
 * @returns {JSX.Element} The profile page component
 */
const Profile = () => {
  // Access Redux state and dispatch
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  /**
   * Handle enabling two-step verification
   * Dispatches action to enable 2FA with the provided OTP
   * 
   * @param {string} otp - The verification code entered by the user
   */
  const handleEnableTwoStepVerification = (otp) => {
    console.log("EnableTwoStepVerification", otp); // Debug log
    dispatch(enableTwoStepAuthentication({
      jwt: localStorage.getItem("jwt"),
      otp
    }));
  };

  /**
   * Handle account verification
   * Dispatches action to verify the user's account with the provided OTP
   * 
   * @param {string} otp - The verification code entered by the user
   */
  const handleVerifyOtp = (otp) => {
    console.log("otp  - ", otp); // Debug log
    dispatch(verifyOtp({
      jwt: localStorage.getItem("jwt"),
      otp
    }));
  };
  
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        {/* Personal Information Card */}
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              {/* Left column - Basic info */}
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email : </p>
                  <p className="text-gray-500">{auth.user?.email} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Full Name : </p>
                  <p className="text-gray-500">{"code with zosh"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Date Of Birth : </p>
                  <p className="text-gray-500">{"25/09/2000"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Nationality : </p>
                  <p className="text-gray-500">{"indian"} </p>
                </div>
              </div>
              
              {/* Right column - Address info */}
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address : </p>
                  <p className="text-gray-500">{"code with zosh"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">City : </p>
                  <p className="text-gray-500">{"mumbai"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Postcode : </p>
                  <p className="text-gray-500">{345020} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Country : </p>
                  <p className="text-gray-500">{"india"} </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Two-Factor Authentication Card */}
        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>

                {/* Status badge changes based on whether 2FA is enabled */}
                {auth.user.twoFactorAuth?.enabled ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>{"Enabled"}</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Dialog to enable 2FA */}
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enable Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader className="">
                      <DialogTitle className="px-10 pt-5 text-center">
                        Verify your account
                      </DialogTitle>
                    </DialogHeader>
                    {/* OTP verification form for enabling 2FA */}
                    <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom row with two cards side by side on larger screens */}
        <div className="lg:flex gap-5 mt-5">
          {/* Change Password Card */}
          <Card className="w-full">
            <CardHeader className="pb-7">
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 ">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{auth.user.email}</p>
              </div>
              {/* Commented out mobile section */}
              {/* <div className="flex items-center">
                <p className="w-[8rem]">Mobile :</p>
                <p>+918987667899</p>
              </div> */}
              <div className="flex items-center">
                <p className="w-[8rem]">Password :</p>
                <Button variant="secondary">Change Password</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Commented out Close Account Card */}
          {/* <Card className="w-full">
            <CardHeader>
              <CardTitle>Close Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 ">
              <div className="flex items-center">
                <p className="w-[8rem]">Customer Id :</p>
                <p>#53DKJ736</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Account :</p>
                <Button variant="secondary">Close Account</Button>
              </div>
            </CardContent>
          </Card> */}
          
          {/* Account Verification Status Card */}
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>Account Status</CardTitle>

                {/* Status badge changes based on verification status */}
                {auth.user.verified ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>verified</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">pending</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{auth.user.email}</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Mobile :</p>
                <p>+918987667899</p>
              </div>
              {/* Dialog to verify account */}
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Verify Account</Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader className="">
                      <DialogTitle className="px-10 pt-5 text-center">
                        verify your account
                      </DialogTitle>
                    </DialogHeader>
                    {/* OTP verification form for account verification */}
                    <AccountVerificationForm handleSubmit={handleVerifyOtp}/>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 

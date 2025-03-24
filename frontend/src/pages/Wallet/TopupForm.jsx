// src/pages/Wallet/TopupForm.jsx

import { paymentHandler } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * TopupForm Component - Form for adding funds to the user's wallet
 * Allows user to enter an amount and select a payment method
 * 
 * @returns {JSX.Element} Rendered TopupForm component
 */
const TopupForm = () => {
  // Local state for form values
  const [amount, setAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY"); // Default payment method
  
  // Access wallet state from Redux store
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  /**
   * Handle amount input change
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  /**
   * Handle form submission
   * Dispatches payment action with selected amount and payment method
   */
  const handleSubmit = () => {
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );
    console.log(amount, paymentMethod);
  };
  
  return (
    <div className="pt-10 space-y-5">
      {/* Amount input section */}
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-lg"
          placeholder="$9999"
        />
      </div>

      {/* Payment method selection section */}
      <div>
        <h1 className="pb-1">Select payment method</h1>
        <RadioGroup
          onValueChange={(value) => {
            setPaymentMethod(value);
          }}
          className="flex"
          defaultValue="RAZORPAY"
        >
          {/* Razorpay option */}
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              iconClassName="h-8 w-8"
              className="h-9 w-9"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
                  alt=""
                />
              </div>
            </Label>
          </div>
          
          {/* Stripe option */}
          <div className="flex items-center space-x-2 rounded-md border p-3 px-5">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              iconClassName="h-8 w-8"
              value="STRIPE"
              id="r2"
            />
            <Label htmlFor="r2">
              <div className="bg-white rounded-md px-5 py- w-32">
                <img
                  className="h-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt=""
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Submit button or loading skeleton */}
      {wallet.loading ? (
        <Skeleton className="py-7 w-full" />
      ) : (
        <Button
          onClick={handleSubmit}
          variant=""
          className="w-full py-7 text-xl"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default TopupForm; 

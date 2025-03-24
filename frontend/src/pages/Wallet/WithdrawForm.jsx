// src/pages/Wallet/WithdrawForm.jsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "./WithdrawForm.css";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalRequest } from "@/Redux/Withdrawal/Action";
import { DialogClose } from "@/components/ui/dialog";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { useNavigate } from "react-router-dom";

/**
 * WithdrawForm Component - Form for withdrawing funds to a bank account
 * Allows users to enter withdrawal amount and submit withdrawal requests
 * Requires payment details to be set up first
 * 
 * @returns {JSX.Element} Rendered WithdrawForm component
 */
const WithdrawForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for amount input
  const [amount, setAmount] = useState();
  
  // Access wallet and withdrawal state from Redux store
  const { wallet, withdrawal } = useSelector((store) => store);

  /**
   * Handle amount input change with validation
   * Limits input to 5 digits maximum
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    let value = e.target.value;
    // Only update state if the value is less than 6 digits
    if (value.toString().length < 6) {
      setAmount(e.target.value);
    }
  };

  /**
   * Handle withdrawal form submission
   * Dispatches withdrawal request action
   */
  const handleSubmit = () => {
    dispatch(withdrawalRequest({ jwt: localStorage.getItem("jwt"), amount }));
  };

  // If no payment details exist, show option to add payment method
  if (!withdrawal.paymentDetails) {
    return (
      <div className="h-[20rem] flex gap-5 flex-col justify-center items-center">
        <p className="text-2xl font-bold">Add payment method</p>
        <Button onClick={() => navigate("/payment-details")}>
          Add Payment Details
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-10 space-y-5">
      {/* Available balance display */}
      <div className="flex justify-between items-center rounded-md bg-slate-900 text- text-xl font-bold px-5 py-4">
        <p>Available balance</p>
        <p>${wallet.userWallet?.balance}</p>
      </div>
      
      {/* Amount input section */}
      <div className="flex flex-col items-center">
        <h1 className="">Enter withdrawal amount</h1>
        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>

      {/* Payment destination display */}
      <div>
        <p className="pb-2">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img
            className="h-8 w-8"
            src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
            alt=""
          />
          <div>
            <p className="text-xl font-bold">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs">
              {/* Display masked account number for security */}
              {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Submit button with DialogClose to close parent dialog */}
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          variant=""
          className="w-full py-7 text-xl"
        >
          Withdraw {amount && <span className="ml-5">${amount}</span>}
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawForm; 

// src/pages/Wallet/TransferForm.jsx

import { transferMoney } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";

/**
 * TransferForm Component - Form for transferring money to another user's wallet
 * Allows users to enter amount, recipient wallet ID, and purpose of transfer
 * 
 * @returns {JSX.Element} Rendered TransferForm component
 */
const TransferForm = () => {
  const dispatch = useDispatch();
  
  // Form state with amount, wallet ID and purpose fields
  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  /**
   * Handle form input changes
   * Updates the formData state with the new value from the input field
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // setAmount(e.target.value); // Commented out code
  };

  /**
   * Handle form submission
   * Dispatches transferMoney action with form data
   */
  const handleSubmit = () => {
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );
    console.log(formData);
  };
  
  return (
    <div className="pt-10 space-y-5">
      {/* Amount input field */}
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7"
          placeholder="$9999"
        />
      </div>
      
      {/* Wallet ID input field */}
      <div>
        <h1 className="pb-1">Enter Wallet Id</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-7"
          placeholder="#ADFE34456"
        />
      </div>

      {/* Purpose input field */}
      <div>
        <h1 className="pb-1">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7"
          placeholder="gift for your friend..."
        />
      </div>

      {/* Submit button with DialogClose to close parent dialog */}
      <DialogClose>
        <Button
          onClick={handleSubmit}
          variant=""
          className="w-full p-7 text-xl"
        >
          Send
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm; 

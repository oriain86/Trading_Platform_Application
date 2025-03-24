// src/pages/Wallet/PaymentDetails.jsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";

/**
 * PaymentDetails Component - Displays user's bank account details for withdrawals
 * Shows existing payment method if available, or option to add new payment details
 * 
 * @returns {JSX.Element} Rendered PaymentDetails component
 */
const PaymentDetails = () => {
  const dispatch = useDispatch();
  // Access withdrawal state from Redux store
  const { withdrawal } = useSelector((store) => store);

  // Fetch user's payment details on component mount
  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">Payment Details</h1>
      
      {/* Conditional rendering based on whether payment details exist */}
      {withdrawal.paymentDetails ? (
        // Display existing payment details in a card
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>
              {withdrawal.paymentDetails?.bankName.toUpperCase()}
            </CardTitle>
            <CardDescription>
              A/C No:{" "}
              {/* Mask account number for security */}
              {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Account holder information */}
            <div className="flex items-center">
              <p className="w-32">A/C Holder</p>
              <p className="text-gray-400">
                : {withdrawal.paymentDetails.accountHolderName}
              </p>
            </div>
            
            {/* IFSC code information */}
            <div className="flex items-center">
              <p className="w-32">IFSC</p>
              <p className="text-gray-400">
                : {withdrawal.paymentDetails.ifsc.toUpperCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Show dialog to add payment details if none exist
        <Dialog>
          <DialogTrigger>
            <Button className="py-6">Add Payment Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="pb-5">
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails; 

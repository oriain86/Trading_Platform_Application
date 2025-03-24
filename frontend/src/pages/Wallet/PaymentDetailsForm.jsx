// src/pages/Wallet/PaymentDetailsForm.jsx

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { addPaymentDetails } from "@/Redux/Withdrawal/Action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Validation schema for payment details form
 * Defines validation rules for each form field
 */
const formSchema = yup.object().shape({
  accountHolderName: yup.string().required("Account holder name is required"),
  ifscCode: yup.string().length(11, "IFSC code must be 11 characters"),
  accountNumber: yup.string().required("Account number is required"),
  confirmAccountNumber: yup.string().test({
    name: "match",
    message: "Account numbers do not match",
    test: function (value) {
      // Check if confirmation field matches the account number field
      return value === this.parent.accountNumber;
    },
  }),
  bankName: yup.string().required("Bank name is required"),
});

/**
 * PaymentDetailsForm Component - Form for adding bank account details for withdrawals
 * Uses react-hook-form with yup validation
 * 
 * @returns {JSX.Element} Rendered PaymentDetailsForm component
 */
const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  // Access auth state from Redux store to check loading status
  const { auth } = useSelector((store) => store);
  
  // Initialize form with yup validation resolver and default values
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      ifsc: "", // Note: field name mismatch with schema (ifsc vs ifscCode)
      accountNumber: "",
      bankName: "",
    },
  });
  
  /**
   * Handle form submission
   * Dispatches action to add payment details to the backend
   * 
   * @param {Object} data - Form data containing payment details
   */
  const onSubmit = (data) => {
    dispatch(
      addPaymentDetails({
        paymentDetails: data,
        jwt: localStorage.getItem("jwt"),
      })
    );
    console.log("payment details form", data);
  };
  
  return (
    <div className="px-10 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Account Holder Name Field */}
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <Label>Account holder name</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="code with zosh"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IFSC Code Field */}
          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <Label>IFSC Code</Label>
                <FormControl>
                  <Input
                    {...field}
                    name="ifsc"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="YESB0000009"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Number Field */}
          <FormField
            control={form.control}
            name="accountNumber"
            type="password"
            render={({ field }) => (
              <FormItem>
                <Label>Account Number</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="*********5602"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Account Number Field */}
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <Label>Confirm Account Number</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Confirm Account Number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bank Name Field */}
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <Label>Bank Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="YES Bank"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button or Loading Skeleton */}
          {!auth.loading ? (
            <Button type="submit" className="w-full py-5">
              SUBMIT
            </Button>
          ) : (
            <Skeleton className="w-full py-5" />
          )}
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;

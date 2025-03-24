// src/pages/Wallet/Withdrawal.jsx

import { getWithdrawalHistory } from "@/Redux/Withdrawal/Action";
import { readableDate } from "@/Util/readableDate";
import { readableTimestamp } from "@/Util/readableTimestamp.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Withdrawal Component - Page displaying withdrawal history
 * Shows a table of past withdrawal requests with dates, amounts, and status
 * 
 * @returns {JSX.Element} Rendered Withdrawal component
 */
const Withdrawal = () => {
  const dispatch = useDispatch();
  
  // Access withdrawal state from Redux store
  const { withdrawal } = useSelector((store) => store);

  // Fetch withdrawal history on component mount
  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">Withdrawal</h1>
      
      {/* Withdrawal history table */}
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-5">Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawal.history.map((item) => (
              <TableRow key={item.id}>
                {/* Format date using utility function */}
                <TableCell className="font-medium py-5">
                  {readableTimestamp(item?.date)}
                </TableCell>
                
                {/* Payment method - currently hardcoded as Bank Account */}
                <TableCell>{"Bank Account"}</TableCell>
                
                {/* Withdrawal amount */}
                <TableCell>₹{item.amount}</TableCell>
                
                {/* Status badge with color based on status */}
                <TableCell className="text-right">
                  <Badge 
                    className={`text-white ${
                      item.status == "PENDING" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Withdrawal; 

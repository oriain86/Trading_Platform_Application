/**
 * File: src/Admin/Withdrawal/WithdrawalAdmin.jsx
 * 
 * Description: Admin panel component for managing withdrawal requests
 */

// Import Redux action creators for withdrawal operations
import {
  getAllWithdrawalRequest,  // Fetches all withdrawal requests
  getWithdrawalHistory,     // Fetches withdrawal history (not used in this component)
  proceedWithdrawal,        // Processes a withdrawal request (approve/decline)
} from "@/Redux/Withdrawal/Action";

// Utility function to format timestamps into human-readable format
import { readableTimestamp } from "@/Util/readableTimestamp.js";

// UI components from a component library (likely shadcn/ui)
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,    // Imported but not used
  DropdownMenuSeparator, // Imported but not used
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// React hooks
import { useEffect } from "react";
// Redux hooks for state management
import { useDispatch, useSelector } from "react-redux";

const WithdrawalAdmin = () => {
  // Initialize dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // Extract withdrawal data from Redux store
  const { withdrawal } = useSelector((store) => store);

  // useEffect hook to fetch withdrawal requests when component mounts
  useEffect(() => {
    // Dispatch action to fetch all withdrawal requests, passing JWT for authentication
    dispatch(getAllWithdrawalRequest(localStorage.getItem("jwt")));
  }, []); // Empty dependency array means this runs once on component mount

  // Handler function to process withdrawal requests (approve or decline)
  const handleProceedWithdrawal = (id, accept) => {
    dispatch(
      proceedWithdrawal({
        jwt: localStorage.getItem("jwt"), // Authentication token
        id,                              // ID of the withdrawal request
        accept                           // Boolean: true to approve, false to decline
      })
    );
  };

  return (
    // Main container with horizontal padding
    <div className="px-20 ">
      {/* Page title */}
      <h1 className="text-3xl font-bold py-10">All Withdrawal Requests</h1>
      <div>
        {/* Table to display withdrawal requests */}
        <Table>
          {/* Table header */}
          <TableHeader>
            <TableRow>
              <TableHead className="py-5">Date</TableHead>
              <TableHead className="py-5">User</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Proceed</TableHead>
            </TableRow>
          </TableHeader>
          
          {/* Table body - iterates through withdrawal requests */}
          <TableBody>
            {withdrawal.requests.map((item) => (
              <TableRow key={item.id}>
                {/* Format and display the request date */}
                <TableCell className="font-medium py-5">
                  {readableTimestamp(item?.date)}
                </TableCell>
                
                {/* Display user information */}
                <TableCell>
                  <p className="font-bold">{item.user.fullName}</p>
                  <p className="text-gray-300">{item.user.email}</p>
                </TableCell>
                
                {/* Display withdrawal method (hardcoded as "Bank Account") */}
                <TableCell>{"Bank Account"}</TableCell>
                
                {/* Display amount with currency and green color */}
                <TableCell className="text-green-500">{item.amount} USD</TableCell>
                
                {/* Display status with color-coded badge */}
                <TableCell className="text-right">
                  <Badge
                    className={`text-white ${
                      item.status == "PENDING"
                        ? "bg-red-500 "  // Red background for pending status
                        : "bg-green-500" // Green background for other statuses
                    }
                 `}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                
                {/* Action dropdown menu */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    {/* Dropdown trigger button */}
                    <DropdownMenuTrigger className="outline-none">
                      <Button variant="outline">PROCEED</Button>
                    </DropdownMenuTrigger>
                    
                    {/* Dropdown content with accept/decline options */}
                    <DropdownMenuContent>
                      {/* Accept option */}
                      <DropdownMenuItem className="">
                        <Button
                          onClick={() => handleProceedWithdrawal(item.id, true)} // Pass true to approve
                          className="w-full bg-green-500 text-white hover:text-black"
                        >
                          Accept
                        </Button>
                      </DropdownMenuItem>
                      
                      {/* Decline option */}
                      <DropdownMenuItem>
                        <Button
                          onClick={() =>
                            handleProceedWithdrawal(item.id, false) // Pass false to decline
                          }
                          className="w-full bg-red-500 text-white hover:text-black"
                        >
                          Decline
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WithdrawalAdmin; 

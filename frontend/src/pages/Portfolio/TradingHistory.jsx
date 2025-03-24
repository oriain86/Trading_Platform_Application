/**
 * File: src/pages/Portfolio/TradingHistory.jsx
 * Description: Component for displaying user's cryptocurrency trading history
 */

/* eslint-disable no-unused-vars */
// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"; // Imported but not used
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Imported but not used
import { Button } from "@/components/ui/button"; // Imported but not used
import { Avatar, AvatarImage } from "@/components/ui/avatar";

// Data imports
import { invoices } from "../Home/AssetTable"; // Imported but not used

// Utilities
import { calculateProfit } from "@/Util/calculateProfit"; // Note: imported as calculateProfit but used as calculateProfite
import { readableDate } from "@/Util/readableDate";

// React and Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { getAllOrdersForUser } from "@/Redux/Order/Action";

/**
 * TradingHistory - Component for displaying user's trading history
 * 
 * Features:
 * - Table of all trading orders with detailed information
 * - Profit/loss calculation and color-coding
 * - Date and time formatting
 * - Automatic data fetching when component mounts
 * 
 * @returns {JSX.Element} The trading history component
 */
const TradingHistory = () => {
  // Hooks for Redux actions and state
  const dispatch = useDispatch();
  
  // State for tab selection (appears to be unused in this component)
  const [currentTab, setCurrentTab] = useState("portfolio");
  
  // Get assets and orders from Redux store
  const { asset, order } = useSelector((store) => store);

  /**
   * Fetch user assets and orders when component mounts
   */
  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

  /**
   * Handle tab change (appears to be unused in this component)
   * 
   * @param {string} value - The tab to switch to
   */
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  // Debug log for current tab (should be removed in production)
  console.log("currentTab-----", currentTab);
  
  return (
    <div className="">
      {/* Trading history table */}
      <Table className="px-5 relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3">Date & Time</TableHead>
            <TableHead>Trading Pair</TableHead> {/* Note: Typo "Treading" in the original */}
            <TableHead>Buy Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead>Profit/Loss</TableHead> {/* Note: Typo "Profite" in the original */}
            <TableHead className="text-right">VALUE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {/* Map through user orders */}
          {order.orders?.map((item) => (
            <TableRow key={item.id}>
              {/* Date and time column with formatting */}
              <TableCell>
                <p>{readableDate(item.timestamp).date}</p>
                <p className="text-gray-400">
                  {readableDate(item.timestamp).time}
                </p>
              </TableCell>
              
              {/* Trading pair with coin icon */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item.orderItem.coin.image}
                    alt={item.orderItem.coin.symbol}
                  />
                </Avatar>
                <span> {item.orderItem.coin.name}</span>
              </TableCell>

              {/* Buy price */}
              <TableCell>${item.orderItem.buyPrice}</TableCell>
              
              {/* Sell price (or dash if not available) */}
              <TableCell>{"$" + item.orderItem.sellPrice || "-"}</TableCell>
              
              {/* Order type (BUY or SELL) */}
              <TableCell>{item.orderType}</TableCell>
              
              {/* Profit/Loss calculation - only shown for SELL orders */}
              <TableCell
                className={`${
                  calculateProfite(item) < 0 ? "text-red-600" : "" // NOTE: Error - function name mismatch
                }`}
              >
                {item.orderType == "SELL" ? calculateProfite(item) : "-"} {/* NOTE: Error - function name mismatch */}
              </TableCell>
              
              {/* Total order value */}
              <TableCell className="text-right">${item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradingHistory; 

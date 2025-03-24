/**
 * File: src/pages/Portfolio/Portfolio.jsx
 * Description: Portfolio page displaying user's crypto assets and trading history
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
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"; // Used in commented-out code
import { Avatar, AvatarImage } from "@/components/ui/avatar";

// Data imports
import { invoices } from "../Home/AssetTable"; // Imported but not used

// React and routing
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";

// Components
import TradingHistory from "./TradingHistory.jsx";

/**
 * Array of available tabs (used in commented-out code)
 */
const tab = ["portfolio", "history"];

/**
 * Portfolio - Component for displaying user's crypto assets and trading history
 * 
 * Features:
 * - Tab-based navigation between portfolio and trading history views
 * - Table of owned crypto assets with current values and performance
 * - Clickable rows to navigate to detailed coin view
 * - Asset value calculations
 * 
 * @returns {JSX.Element} The portfolio component
 */
const Portfolio = () => {
  // Hooks for navigation, Redux actions, and state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State for tracking which tab is currently active
  const [currentTab, setCurrentTab] = useState("portfolio");
  
  // Get user assets from Redux store
  const { asset } = useSelector((store) => store);
  
  // Alternative state for tab tracking (commented out)
  // const [activeTab, setActiveTab] = useState("portfolio");

  /**
   * Fetch user assets when component mounts
   */
  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  /**
   * Handle tab change from the dropdown
   * 
   * @param {string} value - The tab to switch to ('portfolio' or 'history')
   */
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  // Debug log for current tab
  console.log("currentTab-----", currentTab);
  
  return (
    <div className="px-10 py-5 mt-10">
      {/* Tab selection dropdown */}
      <div className="pb-5 flex items-center gap-5">
        <Select
          onValueChange={handleTabChange}
          defaultValue="portfolio"
          className=""
        >
          <SelectTrigger className="w-[180px] py-[1.2rem] ">
            <SelectValue placeholder="Select Portfolio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio">Portfilio</SelectItem> {/* Typo: should be "Portfolio" */}
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>

        {/* Alternative tab buttons (commented out) */}
        {/* {tab.map((item) => (
          <Button
          key={item}
            className="rounded-full"
            size="lg"
            onClick={() => setActiveTab(item)}
            variant={activeTab == item ? "secondary" : "outline"}
          >
            {item.toUpperCase()}
          </Button>
        ))} */}
      </div>
      
      {/* Conditional rendering based on selected tab */}
      {
        currentTab == "portfolio" ? (
          // Portfolio assets table
          <Table className="px-5 relative">
            <TableHeader className="py-9">
              <TableRow className="sticky top-0 left-0 right-0 bg-background ">
                <TableHead className="py-3">Assets</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>UNIT</TableHead>
                <TableHead>CHANGE</TableHead>
                <TableHead>CHANGE(%)</TableHead>
                <TableHead className="text-right">VALUE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {/* Map through user assets */}
              {asset.userAssets?.map((item) => (
                <TableRow
                  onClick={() => navigate(`/market/${item.coin.id}`)} // Navigate to coin detail on click
                  key={item.id}
                >
                  {/* Asset name with logo */}
                  <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                      <AvatarImage
                        src={item.coin.image}
                        alt={item.coin.symbol}
                      />
                    </Avatar>
                    <span> {item.coin.name}</span>
                  </TableCell>
                  
                  {/* Current price */}
                  <TableCell>{item.coin.current_price}</TableCell>
                  
                  {/* Quantity owned */}
                  <TableCell>{item.quantity}</TableCell>
                  
                  {/* 24h price change (colored based on direction) */}
                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"  // Red for negative change
                        : "text-green-600" // Green for positive change
                    }`}
                  >
                    {item.coin.price_change_24h}
                  </TableCell>
                  
                  {/* 24h price change percentage (colored based on direction) */}
                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"  // Red for negative change
                        : "text-green-600" // Green for positive change
                    }`}
                  >
                    {item.coin.price_change_percentage_24h}%
                  </TableCell>

                  {/* Total asset value (price × quantity) */}
                  <TableCell className="text-right">
                    {item.coin.current_price * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // Trading history view
          <TradingHistory />
        )
        // Alternative empty state for history (commented out)
        // <div className="flex items-center justify-center h-[70vh]">
        //   <h1 className="text-3xl font-semibold">No History Available</h1>
        //   </div>
      }
    </div>
  );
};

export default Portfolio; 

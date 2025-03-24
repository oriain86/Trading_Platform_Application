/**
 * File: src/pages/Search/Search.jsx
 * Description: Search page for finding cryptocurrencies by name or symbol
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import SpinnerBackdrop from "@/components/custom/SpinnerBackdrop";

// Icons
import { SearchIcon } from "lucide-react";

// React and routing
import { useEffect, useState } from "react"; // useEffect imported but not used
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { searchCoin } from "@/Redux/Coin/Action";
import { getUserAssets } from "@/Redux/Assets/Action"; // Imported but not used
import { getAllOrdersForUser } from "@/Redux/Order/Action"; // Imported but not used

// Utilities
import { invoices } from "../Home/AssetTable"; // Imported but not used
import { calculateProfit } from "@/Util/calculateProfit"; // Imported but not used
import { readableDate } from "@/Util/readableDate"; // Imported but not used

/**
 * SearchCoin - Component for searching and displaying cryptocurrency results
 * 
 * Features:
 * - Search input field with button
 * - Results table showing matching cryptocurrencies
 * - Clickable rows to navigate to detailed coin view
 * - Loading state with spinner
 * 
 * @returns {JSX.Element} The search coin component
 */
const SearchCoin = () => {
  // Hooks for Redux, routing, and state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for search keyword
  const [keyword, setKeyword] = useState("keyword");
  
  // Get Redux state
  const { asset, order, coin } = useSelector((store) => store);

  /**
   * Handle search button click
   * Dispatches action to search for coins matching the keyword
   */
  const handleSearchCoin = () => {
    dispatch(searchCoin(keyword));
  };

  // Show loading spinner while fetching data
  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="p-10 lg:p=[50%]">
      {/* Search input and button */}
      <div className="flex items-center justify-center pb-16">
        <Input
          className="p-5 w-[90%] lg:w-[50%] rounded-r-none"
          placeholder="explore market..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearchCoin} className="p-5 rounded-l-none">
          <SearchIcon />
        </Button>
      </div>
      
      {/* Results table */}
      <Table className="px-5 relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3">Market Cap Rank</TableHead>
            <TableHead>Trading Pair</TableHead> {/* Note: Typo "Treading" in original */}
            <TableHead className="text-right">SYMBOL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {/* Map through search results */}
          {coin.searchCoinList?.map((item) => (
            <TableRow 
              onClick={() => navigate(`/market/${item.id}`)} // Navigate to coin detail page
              key={item.id}
            >
              {/* Market cap rank */}
              <TableCell>
                <p className="">
                  {item.market_cap_rank}
                </p>
              </TableCell>
              
              {/* Coin name with logo */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item.large}
                    alt={""}
                  />
                </Avatar>
                <span>{item.name}</span>
              </TableCell>

              {/* Coin symbol */}
              <TableCell className="text-right">${item.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchCoin; 

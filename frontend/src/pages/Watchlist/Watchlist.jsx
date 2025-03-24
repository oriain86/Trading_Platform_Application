// src/pages/Watchlist/Watchlist.jsx

import { useEffect, useState } from "react";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

/**
 * Watchlist Component - Displays user's saved cryptocurrency watchlist
 * Shows a table of watched coins with market data and actions
 * 
 * @returns {JSX.Element} Rendered Watchlist component
 */
const Watchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for pagination
  const [page, setPage] = useState(1);
  
  // Access watchlist and coin data from Redux store
  const { watchlist, coin } = useSelector((store) => store);

  // Fetch user's watchlist when component mounts or page changes
  useEffect(() => {
    dispatch(getUserWatchlist());
  }, [page]);

  /**
   * Toggle item in watchlist (remove since it's already in the list)
   * 
   * @param {string} id - Coin ID to remove from watchlist
   */
  const handleAddToWatchlist = (id) => {
    dispatch(addItemToWatchlist(id));
  };
  
  return (
    <div className="pt-8 lg:px-10">
      {/* Watchlist header */}
      <div className="flex items-center pt-5 pb-10 gap-5">
        <BookmarkFilledIcon className="h-10 w-10"/>
        <h1 className="text-4xl font-semibold">Watchlist</h1> 
      </div>
       
      {/* Watchlist table */}
      <Table className="px-5 lg:px-20 border-t relative border-x border-b p-10">
        <ScrollArea className={""}>
          {/* Table header */}
          <TableHeader>
            <TableRow className="sticky top-0 left-0 right-0 bg-background">
              <TableHead className="py-4">Coin</TableHead>
              <TableHead>SYMBOL</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>MARKET CAP</TableHead>
              <TableHead>24H</TableHead>
              <TableHead className="">PRICE</TableHead>
              <TableHead className="text-right text-red-700">Remove</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table body with watchlist items */}
          <TableBody className="">
            {watchlist.items.map((item) => (
              <TableRow className="" key={item.id}>
                {/* Coin name and image with navigation */}
                <TableCell
                  onClick={() => navigate(`/market/${item.id}`)}
                  className="font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Avatar className="-z-50">
                    <AvatarImage src={item.image} alt={item.symbol} />
                  </Avatar>
                  <span> {item.name}</span>
                </TableCell>
                
                {/* Coin symbol */}
                <TableCell>{item.symbol.toUpperCase()}</TableCell>
                
                {/* Trading volume */}
                <TableCell>{item.total_volume}</TableCell>
                
                {/* Market capitalization */}
                <TableCell>{item.market_cap}</TableCell>
                
                {/* 24-hour change percentage with color coding */}
                <TableCell
                  className={`${
                    item.market_cap_change_percentage_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.market_cap_change_percentage_24h}%
                </TableCell>
                
                {/* Current price */}
                <TableCell>{item.current_price}</TableCell>

                {/* Remove from watchlist button */}
                <TableCell className="text-right">
                  <Button 
                    onClick={() => handleAddToWatchlist(item.id)} 
                    className="h-10 w-10" 
                    variant="outline" 
                    size="icon"
                  >
                    <BookmarkFilledIcon className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </Table>
    </div>
  );
};

export default Watchlist; 

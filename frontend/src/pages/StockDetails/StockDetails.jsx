// src/pages/StockDetails/StockDetails.jsx

/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import StockChart from "./StockChart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TradingForm from "./TradingForm.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinById, fetchCoinDetails } from "@/Redux/Coin/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { existInWatchlist } from "@/Util/existInWatchlist";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { getAssetDetails } from "@/Redux/Assets/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import SpinnerBackdrop from "@/components/custom/SpinnerBackdrop";

/**
 * StockDetails Component - Displays detailed information about a cryptocurrency
 * Includes price information, price chart, and trading functionality
 *
 * @returns {JSX.Element} Rendered StockDetails component
 */
const StockDetails = () => {
  // Get coin ID from URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Access required Redux state
  const { coin, watchlist, auth } = useSelector((store) => store);

  // Fetch coin details when component mounts or ID changes
  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: auth.jwt || localStorage.getItem("jwt"), // Use stored JWT if not in Redux
      })
    );
  }, [id]);

  // Fetch user watchlist and wallet data on component mount
  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);

  /**
   * Handler to add/remove current coin to/from user's watchlist
   */
  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist(coin.coinDetails?.id));
  };

  // Show loading spinner while data is being fetched
  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <>
      {coin.loading ? (
        "loading..." // Redundant check (already handled above)
      ) : (
        <div className="p-5 mt-5">
          {/* Coin header section with price info and actions */}
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              {/* Coin logo */}
              <div>
                <Avatar>
                  <AvatarImage src={coin.coinDetails?.image?.large} />
                </Avatar>
              </div>
              
              {/* Coin name and symbol */}
              <div>
                <div className="flex items-center gap-2">
                  <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                  <DotIcon className="text-gray-400" />
                  <p className="text-gray-400">{coin.coinDetails?.name}</p>
                </div>
                
                {/* Current price and 24h change */}
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">
                    {coin.coinDetails?.market_data.current_price.usd}
                  </p>
                  <p
                    className={`${
                      coin.coinDetails?.market_data.market_cap_change_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    <span className="">
                      {coin.coinDetails?.market_data.market_cap_change_24h}
                    </span>
                    <span>
                      (
                      {
                        coin.coinDetails?.market_data
                          .market_cap_change_percentage_24h
                      }
                      %)
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action buttons - Add to watchlist and Trade */}
            <div className="flex items-center gap-5">
              {/* Watchlist toggle button */}
              <Button
                onClick={handleAddToWatchlist}
                className="h-10 w-10"
                variant="outline"
                size="icon"
              >
                {existInWatchlist(watchlist.items, coin.coinDetails) ? (
                  <BookmarkFilledIcon className="h-6 w-6" />
                ) : (
                  <BookmarkIcon className="h-6 w-6" />
                )}
              </Button>

              {/* Trading dialog */}
              <Dialog>
                <DialogTrigger>
                  <Button size="lg">TREAD</Button>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader className="">
                    <DialogTitle className="px-10 pt-5 text-center">
                      how much do you want to spend?
                    </DialogTitle>
                  </DialogHeader>
                  <TradingForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Chart section */}
          <div className="mt-10">
            <StockChart coinId={coin.coinDetails?.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default StockDetails; 

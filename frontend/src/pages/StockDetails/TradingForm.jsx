// src/pages/StockDetails/TradingForm.jsx 

import { getAssetDetails } from "@/Redux/Assets/Action";
import { payOrder } from "@/Redux/Order/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DotIcon } from "@radix-ui/react-icons";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * TradingForm Component - Provides interface for buying and selling cryptocurrency
 * Handles calculations for quantity based on amount, validation of funds/assets, and order submission
 * 
 * @returns {JSX.Element} Rendered TradingForm component
 */
const TradingForm = () => {
  // Access required Redux state
  const { coin, asset, wallet } = useSelector((store) => store);
  
  // Local state for form values and order type
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [orderType, setOrderType] = useState("BUY"); // Default to BUY
  
  const dispatch = useDispatch();

  /**
   * Handle amount input change and calculate corresponding crypto quantity
   * 
   * @param {Event} e - Input change event
   */
  const handleOnChange = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    const volume = calculateBuyCost(amount, coin.coinDetails.market_data.current_price.usd);
    setQuantity(volume);
  };

  /**
   * Calculate how much cryptocurrency can be bought with a given USD amount
   * 
   * @param {number} amountUSD - Amount in USD to spend
   * @param {number} cryptoPrice - Current price of the cryptocurrency
   * @returns {string} - Formatted quantity of cryptocurrency
   */
  function calculateBuyCost(amountUSD, cryptoPrice) {
    let volume = amountUSD / cryptoPrice;

    // Determine appropriate decimal places based on crypto price
    let decimalPlaces = Math.max(
      2,
      cryptoPrice.toString().split(".")[0].length
    );

    return volume.toFixed(decimalPlaces);
  }

  /**
   * Submit buy/sell order to the backend
   */
  const handleBuyCrypto = () => {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
  };

  // Fetch user's existing asset details for this coin on component mount
  useEffect(() => {
    dispatch(getAssetDetails({
      coinId: coin.coinDetails.id, 
      jwt: localStorage.getItem("jwt")
    }));
  }, []);

  return (
    <div className="space-y-10 p-5">
      {/* Amount and quantity input section */}
      <div>
        <div className="flex gap-4 items-center justify-between">
          {/* USD amount input */}
          <Input
            className="py-7 focus:outline-none"
            placeholder="enter amount..."
            onChange={handleOnChange}
            type="number"
          />
          {/* Resulting crypto quantity display */}
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>
        
        {/* Error messages for insufficient funds/assets */}
        {orderType == "SELL" ?
          (asset.assetDetails?.quantity * coin.coinDetails?.current_price < amount) && (
            <h1 className="text-red-800 text-center pt-4">
              Insufficient quantity to sell
            </h1>
          ) : (quantity * coin.coinDetails?.market_data.current_price.usd > wallet.userWallet?.balance) && (
            <h1 className="text-red-800 text-center pt-4">
              Insufficient Wallet Balance To Buy
            </h1>
          )
        }
      </div>

      {/* Coin information display */}
      <div className="flex gap-5 items-center">
        {/* Coin logo */}
        <div>
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image.large} />
          </Avatar>
        </div>
        
        {/* Coin details */}
        <div>
          {/* Symbol and name */}
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
                ({coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order details section */}
      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>
      
      {/* Available balance/quantity section */}
      <div className="flex items-center justify-between">
        <p>{orderType == "BUY" ? "Available Case" : "Available Quantity"}</p>
        <div>
          {orderType == "BUY" ? (
            <div className="flex items-center">
              <DollarSign />
              <span className="text-2xl font-semibold">
                {wallet.userWallet?.balance}
              </span>
            </div>
          ) : (
            <p>{asset.assetDetails?.quantity || 0}</p>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="">
        {/* Buy/Sell button with DialogClose to close modal on click */}
        <DialogClose className="w-full">
          <Button
            onClick={handleBuyCrypto}
            className={`w-full py-6 ${
              orderType == "SELL" ? "bg-red-600 text-white" : ""
            }`}
            disabled={
              quantity == 0 ||
              (orderType == "SELL" && !asset.assetDetails?.quantity) ||
              (orderType == "SELL" ?
                (asset.assetDetails?.quantity * coin.coinDetails?.market_data.current_price.usd < amount)
                : quantity * coin.coinDetails?.market_data.current_price.usd > wallet.userWallet?.balance)
            }
          >
            {orderType}
          </Button>
        </DialogClose>
        
        {/* Toggle between Buy/Sell modes */}
        <Button
          onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}
          className="w-full mt-5 text-xl"
          variant="link"
        >
          {orderType == "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TradingForm; 

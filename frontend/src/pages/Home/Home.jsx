/**
 * File: src/pages/Home/Home.jsx
 * Description: Main dashboard page for cryptocurrency market data with chat bot integration
 */

/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { AssetTable } from "./AssetTable"; // Component for displaying crypto assets in table format
import { Button } from "@/components/ui/button";
import StockChart from "../StockDetails/StockChart"; // Chart component for price visualization

// Icons
import {
  ChatBubbleIcon,
  ChevronLeftIcon,
  Cross1Icon,
  DotIcon,
} from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoinDetails,
  fetchCoinList,
  fetchTreadingCoinList,
  getTop50CoinList,
} from "@/Redux/Coin/Action";
import { sendMessage } from "@/Redux/Chat/Action";

// UI Components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Imported but not used
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area"; // Imported but not used
import SpinnerBackdrop from "@/components/custom/SpinnerBackdrop";

/**
 * Home - Main dashboard component for cryptocurrency market data
 * 
 * Features:
 * - Cryptocurrency market data in table format
 * - Detailed view of selected cryptocurrency (Bitcoin by default)
 * - Interactive price chart
 * - Category filtering (All, Top 50)
 * - Pagination for browsing through coin lists
 * - AI chat bot for crypto-related questions
 * 
 * @returns {JSX.Element} The home dashboard component
 */
const Home = () => {
  const dispatch = useDispatch();
  
  // State for pagination, category filter, and chat bot visibility
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [isBotRelease, setIsBotRelease] = useState(false); // Controls chat bot visibility
  
  // State for chat input
  const [inputValue, setInputValue] = useState("");
  
  // Redux state
  const { coin, chatBot, auth } = useSelector((store) => store);
  
  // Reference for auto-scrolling chat
  const chatContainerRef = useRef(null);

  /**
   * Fetch coin list when page changes
   */
  useEffect(() => {
    dispatch(fetchCoinList(page));
  }, [page]);

  /**
   * Fetch Bitcoin details on initial load
   */
  useEffect(() => {
    dispatch(fetchCoinDetails({
      coinId: "bitcoin", // Default to Bitcoin
      jwt: auth.jwt || localStorage.getItem("jwt"),
    }))
  }, []);

  /**
   * Fetch category-specific data when category changes
   */
  useEffect(() => {
    if (category == "top50") {
      dispatch(getTop50CoinList());
    } else if (category == "trading") {
      dispatch(fetchTreadingCoinList())
    }
  }, [category]);

  /**
   * Auto-scroll chat to bottom when new messages arrive
   */
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatBot.messages]);

  /**
   * Handle pagination changes
   * @param {number} newPage - The page number to navigate to
   */
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  /**
   * Toggle chat bot visibility
   */
  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  /**
   * Handle Enter key press in chat input
   * @param {Object} event - Keyboard event
   */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed:", inputValue);
      dispatch(
        sendMessage({
          prompt: inputValue,
          jwt: auth.jwt || localStorage.getItem("jwt"),
        })
      );
      setInputValue(""); // Clear input after sending
    }
  };

  /**
   * Handle chat input changes
   * @param {Object} event - Input change event
   */
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Show loading spinner while fetching data
  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="relative">
      {/* Main content layout - split into two columns on large screens */}
      <div className="lg:flex">
        {/* Left column - Cryptocurrency table */}
        <div className="lg:w-[50%] border-r">
          {/* Category filter buttons */}
          <div className="p-3 flex items-center gap-4">
            <Button
              variant={category == "all" ? "default" : "outline"}
              onClick={() => setCategory("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={category == "top50" ? "default" : "outline"}
              onClick={() => setCategory("top50")}
              className="rounded-full"
            >
              Top 50
            </Button>
          </div>
          
          {/* Asset table with filtered data */}
          <AssetTable
            category={category}
            coins={category == "all" ? coin.coinList : coin.top50}
          />
          
          {/* Pagination - only shown for "all" category */}
          {category == "all" && (
            <Pagination className="border-t py-3">
              <PaginationContent>
                {/* Previous page button */}
                <PaginationItem>
                  <Button
                    variant="ghost"
                    disabled={page == 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </PaginationItem>
                
                {/* Page number buttons */}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={page == 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(2)}
                    isActive={page == 2}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(3)}
                    isActive={page == 3}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                
                {/* Show current page if it's beyond page 3 */}
                {page > 3 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(3)}
                      isActive
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                
                {/* Next page button */}
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        {/* Right column - Chart and coin details */}
        <div className="hidden lg:block lg:w-[50%] p-5">
          {/* Price chart for selected coin (default: Bitcoin) */}
          <StockChart coinId={"bitcoin"} />
          
          {/* Coin details section */}
          <div className="flex gap-5 items-center">
            {/* Coin logo */}
            <div>
              <Avatar>
                <AvatarImage src={coin.coinDetails?.image?.large} />
              </Avatar>
            </div>
            
            {/* Coin information */}
            <div>
              {/* Symbol and name */}
              <div className="flex items-center gap-2">
                <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">{coin.coinDetails?.name}</p>
              </div>
              
              {/* Price and 24h change */}
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">
                  {coin.coinDetails?.market_data.current_price.usd}
                </p>
                <p
                  className={`${
                    coin.coinDetails?.market_data.market_cap_change_24h < 0
                      ? "text-red-600"  // Red for negative change
                      : "text-green-600" // Green for positive change
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
        </div>
      </div>

      {/* Chat bot section - fixed position */}
      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {/* Chat bot dialog - conditionally rendered */}
        {isBotRelease && (
          <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900">
            {/* Chat header */}
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p>Chat Bot</p>
              <Button onClick={handleBotRelease} size="icon" variant="ghost">
                <Cross1Icon />
              </Button>
            </div>

            {/* Chat messages container */}
            <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
              {/* Welcome message */}
              <div className="self-start pb-5 w-auto">
                <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                  {`hi, ${auth.user?.fullName}`}
                  <p>you can ask crypto related any question</p>
                  <p>like, price, market cap extra...</p>
                </div>
              </div>
              
              {/* Message history */}
              {chatBot.messages.map((item, index) => (
                <div
                  ref={chatContainerRef}
                  key={index}
                  className={`${
                    item.role == "user" ? "self-end" : "self-start"
                  } pb-5 w-auto`}
                >
                  {/* User messages */}
                  {item.role == "user" ? (
                    <div className="justify-end self-end px-5 py-2 rounded-full bg-slate-800 w-auto">
                      {item.prompt}
                    </div>
                  ) : (
                    /* Bot responses */
                    <div className="w-full">
                      <div className="bg-slate-700 flex gap-2 py-4 px-4 rounded-md min-w-[15rem] w-full">
                        <p className="">{item.ans}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {chatBot.loading && <p>fetching data...</p>}
            </div>

            {/* Chat input */}
            <div className="h-[12%] border-t">
              <Input
                className="w-full h-full border-none outline-none"
                placeholder="write prompt"
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}
        
        {/* Chat bot toggle button */}
        <div
          onClick={handleBotRelease}
          className="relative w-[10rem] cursor-pointer group"
        >
          <Button className="w-full h-[3rem] gap-2 items-center">
            <MessageCircle
              fill=""
              className="fill-[#1e293b] -rotate-[90deg] stroke-none group-hover:fill-[#1a1a1a]"
              size={30}
            />
            <span className="text-2xl">
              Chat Bot
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

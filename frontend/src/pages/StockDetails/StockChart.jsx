// src/pages/StockDetails/StockChart.jsx 

import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { convertToUnixTimestamp } from "./ConvertToChartData";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/Redux/Coin/Action";
import SpinnerBackdrop from "@/components/custom/SpinnerBackdrop";

/**
 * Time series options for cryptocurrency chart display
 * Each option includes the API keyword, response key, display label, and day value
 */
const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    lable: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6",
    key: "6 Month Time Series",
    lable: "6 Month",
    value: 180,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 year",
    value: 365,
  },
];

/**
 * StockChart Component - Displays cryptocurrency price charts with time period selection
 * 
 * @param {Object} props - Component props
 * @param {string} props.coinId - ID of the cryptocurrency to display
 * @returns {JSX.Element} Rendered StockChart component
 */
const StockChart = ({ coinId }) => {
  // Local state for storing chart data and UI state
  const [stockData, setStockData] = useState(null);
  const [activeType, setActiveType] = useState(timeSeries[0]); // Default to daily view
  const [loading, setLoading] = useState(false);
  
  // Redux state and dispatch
  const { coin, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  
  // Chart data series configuration for ApexCharts
  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  // Chart options configuration for ApexCharts
  const [options] = useState({
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      // Placeholder for future annotations
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      // min: new Date('01 Dec 2023').getTime(), // Uncomment to set min date
      tickAmount: 6,
    },
    colors: ["#758AA2"], // Line color
    markers: {
      colors: ["#fff"], // Dot color
      strokeColors: "#fff", // Dot border color
      strokeWidth: 1, // Dot border width
      size: 0,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E", // Color of the grid lines
      strokeDashArray: 4, // Width of the grid lines
      show: true,
    },
  });

  // Fetch market chart data when component mounts or time period changes
  useEffect(() => {
    // Legacy code kept for reference
    // const fetchStockData = async () => {
    //   setLoading(true);
    //   setStockData(null)
    //   const data = await fetchData(activeType.keyword, coinId );
    //   console.log("stock data ", data);
    //   const chartData = convertToUnixTimestamp(data[activeType.key]);
    //   console.log("chartData ", chartData);
    //   setStockData(chartData);
    //   setLoading(false);
    // };
    // fetchStockData();
    
    // Only dispatch if coinId is available
    if (coinId) {
      // Fetch market chart data with authentication
      dispatch(fetchMarketChart({ 
        coinId, 
        days: activeType.value,
        jwt: localStorage.getItem("jwt") || auth.jwt 
      }));
    }
  }, [coinId, activeType.value]); // Re-run when coinId or time period changes

  // Show loading spinner while data is being fetched
  if (coin.marketChart.loading) {
    return (
      <div className="h-full w-full inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-t-gray-200 border-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("coin reducer", coin); // Debug log

  return (
    <div>
      <div id="charts">
        {/* Time period selection buttons */}
        <div className="toolbars space-x-2">
          {timeSeries.map((item) => (
            <Button
              onClick={() => setActiveType(item)}
              key={item.lable}
              variant={activeType.lable !== item.lable ? "outline" : ""}
            >
              {item.lable}
            </Button>
          ))}
        </div>
        
        {/* ApexCharts area chart */}
        <div id="chart-timelines">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={450}
          />
        </div>
      </div>
      {/* <div id="html-dist"></div> */}
    </div>
  );
};

export default StockChart; 

/**
 * File: src/pages/StockDetails/Chart.jsx
 * Description: Interactive stock chart component using ApexCharts
 */

import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"; // ApexCharts React wrapper
import fetchData, { dataType } from "../Home/fetchMarketData"; // Utility for fetching market data
import { convertToUnixTimestamp } from "./ConvertToChartData"; // Utility for data conversion

/**
 * Chart - Component for displaying stock price data in an interactive chart
 * 
 * Features:
 * - Fetches real stock data
 * - Interactive time-series chart with zoom capabilities
 * - Customized styling for dark theme compatibility
 * - Loading state while data is being fetched
 * 
 * @returns {JSX.Element} The chart component
 */
const Chart = () => {
  // State to store the fetched stock data
  const [stockData, setStockData] = useState(null);

  /**
   * Fetch stock data when component mounts
   */
  useEffect(() => {
    const fetchStockData = async () => {
      // Fetch data from API
      const data = await fetchData();
      console.log("stock data ", data[dataType]); // Debug log
      
      // Convert data to Unix timestamp format for chart
      const chartData = convertToUnixTimestamp(data[dataType]);
      console.log("chartData ", chartData); // Debug log
      
      // Update state with fetched data
      setStockData(data);
    };
    
    fetchStockData();
  }, []);

  // Show loading indicator while data is being fetched
  if (!stockData) {
    return <div>Loading...</div>;
  }

  // Extract and process data for the chart
  // - Get dates from the data object keys
  // - Map each date to its corresponding closing price
  const dates = Object.keys(stockData[dataType]);
  const closePrices = dates.map((date) =>
    parseFloat(stockData[dataType][date]["4. close"])
  );

  // Chart configuration options
  const options = {
    chart: {
      type: "area",       // Chart type - area chart with fill below line
      stacked: false,     // Disable stacking
      height: 350,        // Chart height
      zoom: {
        enabled: true,    // Enable zoom functionality
      },
    },
    dataLabels: {
      enabled: false,     // Disable data point labels
    },
    xaxis: {
      type: "datetime",   // X-axis represents time data
      categories: dates,  // Use extracted dates for x-axis
      title: {
        // text: 'Date',  // X-axis title (commented out)
      },
      pan: {
        enabled: true,    // Enable panning on x-axis
      },
    },
    yaxis: {
      title: {
        // text: 'Closing Price (USD)', // Y-axis title (commented out)
      },
    },
    title: {
      text: "IBM Stock Weekly Closing Prices", // Chart title
      align: "center",    // Center-align title
    },
    colors: ["#fff"],     // Line color (white)
    markers: {
      colors: ["#fff"],   // Data point marker color
      strokeColors: "#fff", // Data point marker border color
      strokeWidth: 2,     // Data point marker border width
    },
    tooltip: {
      theme: "dark",      // Dark theme for tooltips
    },
    toolbar: {
      show: true,         // Show the chart toolbar
    },
    grid: {
      borderColor: "#cccccc", // Grid line color
      strokeDashArray: 4,     // Grid line dash pattern
      show: true,             // Show grid lines
    },
    series: [{
        name: 'Series 1',     // Series name
        data: closePrices,    // Price data
        fill: {
            type: 'solid',    // Solid fill below the line
            color: '#3367d6', // Fill color (blue)
            opacity: 0.5      // Fill opacity
        }
    }]
  };

  // Series data definition
  // Note: This is redundant with the series property in options above
  // and could be removed since it's overridden by the options.series
  const series = [
    {
      name: "Close Prices",
      data: closePrices,
    },
  ];

  return (
    <div className="stock-chart">
      <ReactApexChart
        options={options}
        series={series}    // Using the defined series
        type="line"        // Chart type override (line instead of area)
        height={640}       // Chart height in pixels
      />
    </div>
  );
};

export default Chart; 

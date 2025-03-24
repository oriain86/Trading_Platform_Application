/**
 * File: src/pages/Home/StockChart.jsx
 * Description: A responsive line chart component for displaying stock price data
 * 
 * This component uses the Recharts library to create a simple but effective
 * visualization of stock closing prices over time.
 */

import React from 'react';
// Import components from Recharts library
import { 
  LineChart,          // The main chart component for line charts
  Line,               // Component to draw the actual line
  XAxis,              // X-axis component
  YAxis,              // Y-axis component
  CartesianGrid,      // Grid lines in the background
  Tooltip,            // Hover tooltips for data points
  Legend,             // Chart legend
  ResponsiveContainer  // Wrapper for responsive behavior
} from 'recharts';

/**
 * StockChart - A responsive line chart for stock price visualization
 * 
 * Features:
 * - Responsive design that adapts to container width
 * - Displays stock closing prices over time
 * - Interactive tooltips on hover
 * - Grid lines for easier value reading
 * - Fixed height of 400px
 * 
 * @returns {JSX.Element} The stock chart component
 */
const StockChart = () => {
  // Sample stock price data
  // In a real application, this would likely be passed as props or fetched from an API
  const data = [
    { date: '2024-01-30', close: 187.87 },
    { date: '2024-01-26', close: 187.42 },
    { date: '2024-01-19', close: 171.48 },
    { date: '2024-01-12', close: 165.80 },
    { date: '2024-01-05', close: 159.16 },
    { date: '2023-12-29', close: 163.55 }
  ];

  return (
    <div className="stock-chart">
      {/* ResponsiveContainer ensures the chart resizes with its parent element */}
      <ResponsiveContainer width="100%" height={400}>
        {/* LineChart is the main component that renders the chart */}
        <LineChart data={data}>
          {/* CartesianGrid adds background grid lines with a dashed pattern */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* XAxis configures the horizontal axis with dates */}
          <XAxis dataKey="date" />
          
          {/* YAxis configures the vertical axis for price values */}
          <YAxis />
          
          {/* Tooltip provides interactive data display on hover */}
          <Tooltip />
          
          {/* Legend identifies what the line represents */}
          <Legend />
          
          {/* Line defines how to display the data series */}
          <Line 
            type="monotone"      // Creates a smooth curve between points
            dataKey="close"      // Uses the "close" property from data
            stroke="#8884d8"     // Sets the line color to purple
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart; 

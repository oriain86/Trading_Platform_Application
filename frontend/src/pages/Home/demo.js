/**
 * File: src/pages/Home/chartOptions.js
 * Description: Configuration options for ApexCharts area chart
 * 
 * This configuration is tailored for financial data visualization,
 * specifically for displaying stock price movements over time.
 */

export const options = {
  chart: {
    type: 'area',      // Area chart type - shows filled area under the line
    stacked: false,    // Disable stacking of multiple series
    height: 350,       // Chart height in pixels
    zoom: {
      type: 'x',       // Allow zooming only on x-axis (time)
      enabled: true,   // Enable zoom functionality
      autoScaleYaxis: true // Automatically adjust y-axis scale when zooming
    },
    toolbar: {
      autoSelected: 'zoom' // Pre-select zoom tool in the chart toolbar
    }
  },
  
  dataLabels: {
    enabled: false     // Hide data point labels for cleaner appearance
  },
  
  markers: {
    size: 0,           // Hide data point markers for smoother line
  },
  
  title: {
    text: 'Stock Price Movement', // Chart title
    align: 'left'      // Left-align the title
  },
  
  fill: {
    type: 'gradient',  // Use gradient fill under the line
    gradient: {
      shadeIntensity: 1,       // Maximum shade intensity
      inverseColors: false,    // Don't invert gradient colors
      opacityFrom: 0.5,        // Starting opacity (at the line)
      opacityTo: 0,            // Ending opacity (at the bottom)
      stops: [0, 90, 100]      // Gradient stops for smooth transition
    },
  },
  
  yaxis: {
    labels: {
      formatter: function (val) {
        // Format y-axis labels to millions with no decimal places
        return (val / 1000000).toFixed(0);
      },
    },
    title: {
      text: 'Price'    // Y-axis title
    },
  },
  
  xaxis: {
    type: 'datetime',  // X-axis represents time data (for time series chart)
  },
  
  tooltip: {
    shared: false,     // Individual tooltips for each data point
    y: {
      formatter: function (val) {
        // Format tooltip values to millions with no decimal places
        return (val / 1000000).toFixed(0)
      }
    }
  }
}; 

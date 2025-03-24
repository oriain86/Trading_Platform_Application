// File: src/Util/calculateProfit.js

// This utility function calculates the profit from a cryptocurrency order

/**
 * Calculate the profit from a sell order
 * 
 * This function determines the profit by subtracting the buy price 
 * from the sell price of an order. It performs safety checks to ensure
 * all required data is present before attempting the calculation.
 * 
 * @param {Object} order - The order object containing transaction details
 * @param {Object} order.orderItem - Contains price information for the order
 * @param {number} order.orderItem.buyPrice - The price at which the asset was bought
 * @param {number} order.orderItem.sellPrice - The price at which the asset was sold
 * @returns {number|string} - The calculated profit or "-" if calculation cannot be performed
 */
export const calculateProfit = (order) => {
    // Log the relevant price information for debugging
    console.log(
        "order --------- ", 
        order.orderItem.sellPrice,
        order.orderItem?.buyPrice, 
        order.orderItem.buyPrice
    );

    // Validate that all required data exists
    if(order && order.orderItem && order.orderItem.buyPrice && order.orderItem.sellPrice) {
        // Calculate profit as (sell price - buy price)
        return order.orderItem.sellPrice - order.orderItem.buyPrice;
    }
    
    // Return placeholder if data is incomplete
    return "-";
} 

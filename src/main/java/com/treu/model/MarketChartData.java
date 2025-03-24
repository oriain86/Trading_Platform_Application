package com.treu.model;

// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

// Automatically generates getters, setters, and other utility methods
@Data
// Generates a default constructor with no parameters
@NoArgsConstructor
// Generates a constructor with all fields as parameters
@AllArgsConstructor
public class MarketChartData {
    // Timestamp of the market data point, typically in milliseconds
    private long timestamp;

    // Price of the asset at the given timestamp
    private double price;
}

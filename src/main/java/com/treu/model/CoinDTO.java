package com.treu.model;

// Jackson annotation to ignore unknown JSON properties during deserialization
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

import java.util.Date;

// Generates getters, setters, and other utility methods automatically
@Data
// Ignores any unknown JSON properties to prevent deserialization errors
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoinDTO {
    // Unique identifier for the cryptocurrency
    private String id;
    // Trading symbol of the cryptocurrency (e.g., BTC)
    private String symbol;
    // Full name of the cryptocurrency
    private String name;
    // URL or path to the coin's image
    private String image;
    // Current market price of the coin
    private double currentPrice;
    // Total market capitalization
    private double marketCap;
    // Ranking based on market capitalization
    private int marketCapRank;
    // Total trading volume in the last 24 hours
    private double totalVolume;
    // Highest price in the last 24 hours
    private double high24h;
    // Lowest price in the last 24 hours
    private double low24h;
    // Price change in the last 24 hours
    private double priceChange24h;
    // Percentage price change in the last 24 hours
    private double priceChangePercentage24h;
    // Market cap change in the last 24 hours
    private double marketCapChange24h;
    // Percentage market cap change in the last 24 hours
    private double marketCapChangePercentage24h;
    // Amount of coin currently in circulation
    private double circulatingSupply;
    // Total existing supply of the coin
    private double totalSupply;
    // All-time high price of the coin
    private long ath;
    // Percentage change from the all-time high
    private long athChangePercentage;
    // Date when the all-time high was reached
    private Date athDate;
    // All-time low price of the coin
    private long atl;
    // Percentage change from the all-time low
    private long atlChangePercentage;
    // Date when the all-time low was reached
    private Date atlDate;
    // Timestamp of the last data update
    private Date lastUpdated;

    // Custom toString method to format the object as a JSON-like string
    @Override
    public String toString() {
        return "{\n" +
                "\"id\": \"" + id + "\",\n" +
                "\"symbol\": \"" + symbol + "\",\n" +
                "\"name\": \"" + name + "\",\n" +
                "\"image\": \"" + image + "\",\n" +
                "\"current_price\": " + currentPrice + ",\n" +
                "\"market_cap\": " + marketCap + ",\n" +
                "\"market_cap_rank\": " + marketCapRank + ",\n" +
                "\"total_volume\": " + totalVolume + ",\n" +
                "\"high_24h\": " + high24h + ",\n" +
                "\"low_24h\": " + low24h + ",\n" +
                "\"price_change_24h\": " + priceChange24h + ",\n" +
                "\"price_change_percentage_24h\": " + priceChangePercentage24h + ",\n" +
                "\"market_cap_change_24h\": " + marketCapChange24h + ",\n" +
                "\"market_cap_change_percentage_24h\": " + marketCapChangePercentage24h + ",\n" +
                "\"circulating_supply\": " + circulatingSupply + ",\n" +
                "\"total_supply\": " + totalSupply + ",\n" +
                "}";
    }
}

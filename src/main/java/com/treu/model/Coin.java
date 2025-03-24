package com.treu.model;

// Jackson annotation to exclude fields from JSON serialization
import com.fasterxml.jackson.annotation.JsonIgnore;
// Jackson annotation to map JSON properties to Java fields
import com.fasterxml.jackson.annotation.JsonProperty;
// JPA annotations for database persistence
import jakarta.persistence.*;
// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

import java.util.Date;

// Defines this class as a JPA entity mapped to the "coins" table in the database
@Entity
@AllArgsConstructor                 // Generates a constructor with all fields
@NoArgsConstructor                  // Generates a no-args constructor
@Data                               // Generates getters, setters, toString, equals, and hashCode
@Table(name = "coins")             // Specifies the table name in the database
public class Coin {

    // Primary key field, also mapped to JSON "id" property
    @Id
    @JsonProperty("id")
    private String id;

    // Cryptocurrency symbol (e.g., BTC), mapped to JSON "symbol"
    @JsonProperty("symbol")
    private String symbol;

    // Full name of the cryptocurrency, mapped to JSON "name"
    @JsonProperty("name")
    private String name;

    // URL or path to the coin's image, mapped to JSON "image"
    @JsonProperty("image")
    private String image;

    // Current market price, mapped to JSON "current_price"
    @JsonProperty("current_price")
    private double currentPrice;

    // Total market capitalization, mapped to JSON "market_cap"
    @JsonProperty("market_cap")
    private long marketCap;

    // Ranking based on market cap, mapped to JSON "market_cap_rank"
    @JsonProperty("market_cap_rank")
    private int marketCapRank;

    // Fully diluted market value, mapped to JSON "fully_diluted_valuation"
    @JsonProperty("fully_diluted_valuation")
    private long fullyDilutedValuation;

    // 24-hour trading volume, mapped to JSON "total_volume"
    @JsonProperty("total_volume")
    private long totalVolume;

    // Highest price in last 24 hours, mapped to JSON "high_24h"
    @JsonProperty("high_24h")
    private double high24h;

    // Lowest price in last 24 hours, mapped to JSON "low_24h"
    @JsonProperty("low_24h")
    private double low24h;

    // Price change in last 24 hours, mapped to JSON "price_change_24h"
    @JsonProperty("price_change_24h")
    private double priceChange24h;

    // Percentage price change in last 24 hours, mapped to JSON "price_change_percentage_24h"
    @JsonProperty("price_change_percentage_24h")
    private double priceChangePercentage24h;

    // Market cap change in last 24 hours, mapped to JSON "market_cap_change_24h"
    @JsonProperty("market_cap_change_24h")
    private long marketCapChange24h;

    // Percentage market cap change in last 24 hours, mapped to JSON "market_cap_change_percentage_24h"
    @JsonProperty("market_cap_change_percentage_24h")
    private double marketCapChangePercentage24h;

    // Amount of coin currently in circulation, mapped to JSON "circulating_supply"
    @JsonProperty("circulating_supply")
    private long circulatingSupply;

    // Total existing supply of the coin, mapped to JSON "total_supply"
    @JsonProperty("total_supply")
    private long totalSupply;

    // Maximum possible supply of the coin, mapped to JSON "max_supply"
    @JsonProperty("max_supply")
    private long maxSupply;

    // All-time high price, mapped to JSON "ath"
    @JsonProperty("ath")
    private double ath;

    // Percentage change from all-time high, mapped to JSON "ath_change_percentage"
    @JsonProperty("ath_change_percentage")
    private double athChangePercentage;

    // Date of all-time high price, mapped to JSON "ath_date"
    @JsonProperty("ath_date")
    private Date athDate;

    // All-time low price, mapped to JSON "atl"
    @JsonProperty("atl")
    private double atl;

    // Percentage change from all-time low, mapped to JSON "atl_change_percentage"
    @JsonProperty("atl_change_percentage")
    private double atlChangePercentage;

    // Date of all-time low price, mapped to JSON "atl_date"
    @JsonProperty("atl_date")
    private Date atlDate;

    // Return on investment data, mapped to JSON "roi" but ignored in JSON serialization
    @JsonProperty("roi")
    @JsonIgnore
    private String roi;

    // Timestamp of last data update, mapped to JSON "last_updated"
    @JsonProperty("last_updated")
    private Date lastUpdated;
}

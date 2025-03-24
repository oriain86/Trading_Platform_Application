package com.treu.service;

// Jackson exception for JSON processing issues
import com.fasterxml.jackson.core.JsonProcessingException;
// Entity class representing a cryptocurrency in the system
import com.treu.model.Coin;

import java.util.List;             // Interface for ordered collections

// Defines a service interface for coin-related operations
public interface CoinService {
    // Retrieves a paginated list of coins, throws exception if the operation fails
    List<Coin> getCoinList(int page) throws Exception;

    // Fetches market chart data for a specific coin over a number of days, throws exception if it fails
    String getMarketChart(String coinId, int days) throws Exception;

    // Gets detailed information about a specific coin, throws JsonProcessingException if JSON parsing fails
    String getCoinDetails(String coinId) throws JsonProcessingException;

    // Finds a coin by its ID, throws exception if not found or operation fails
    Coin findById(String coinId) throws Exception;

    // Searches for coins based on a keyword, returns results as a string
    String searchCoin(String keyword);

    // Retrieves the top 50 coins by market cap rank, returned as a string
    String getTop50CoinsByMarketCapRank();

    // Fetches trending coins, returned as a string
    String getTreadingCoins();
}

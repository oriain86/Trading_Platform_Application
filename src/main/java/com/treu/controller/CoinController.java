package com.treu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.treu.model.Coin;
import com.treu.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST controller, handling coin-related requests under /coins
@RestController
@RequestMapping("/coins")
public class CoinController {

    // Service for handling coin-related business logic, injected via @Autowired
    @Autowired
    private CoinService coinService;

    // ObjectMapper for parsing JSON strings into JsonNode objects, injected via @Autowired
    @Autowired
    private ObjectMapper objectMapper;

    // Handles GET requests to retrieve a paginated list of coins
    @GetMapping
    ResponseEntity<List<Coin>> getCoinList(@RequestParam("page") int page) throws Exception {
        // Fetches a list of coins for the specified page
        List<Coin> coins = coinService.getCoinList(page);
        // Returns the coin list with HTTP 200 (OK)
        return new ResponseEntity<>(coins, HttpStatus.OK);
    }

    // Handles GET requests to retrieve market chart data for a specific coin
    @GetMapping("/{coinId}/chart")
    ResponseEntity<JsonNode> getMarketChart(
            @PathVariable String coinId,       // Coin ID from the URL path
            @RequestParam("days") int days     // Number of days for the chart data
    ) throws Exception {
        // Fetches the market chart data as a JSON string
        String coins = coinService.getMarketChart(coinId, days);
        // Parses the JSON string into a JsonNode object
        JsonNode jsonNode = objectMapper.readTree(coins);
        // Returns the parsed JSON data with HTTP 200 (OK)
        return ResponseEntity.ok(jsonNode);
    }

    // Handles GET requests to search for coins by keyword
    @GetMapping("/search")
    ResponseEntity<JsonNode> searchCoin(@RequestParam("q") String keyword) throws JsonProcessingException {
        // Searches for coins based on the provided keyword and returns JSON data
        String coin = coinService.searchCoin(keyword);
        // Parses the JSON string into a JsonNode object
        JsonNode jsonNode = objectMapper.readTree(coin);
        // Returns the parsed JSON data with HTTP 200 (OK)
        return ResponseEntity.ok(jsonNode);
    }

    // Handles GET requests to retrieve the top 50 coins by market cap rank
    @GetMapping("/top50")
    ResponseEntity<JsonNode> getTop50CoinByMarketCapRank() throws JsonProcessingException {
        // Fetches the top 50 coins by market cap rank as a JSON string
        String coin = coinService.getTop50CoinsByMarketCapRank();
        // Parses the JSON string into a JsonNode object
        JsonNode jsonNode = objectMapper.readTree(coin);
        // Returns the parsed JSON data with HTTP 200 (OK)
        return ResponseEntity.ok(jsonNode);
    }

    // Handles GET requests to retrieve trending coins
    @GetMapping("/trading")
    ResponseEntity<JsonNode> getTreadingCoin() throws JsonProcessingException {
        // Fetches trending coins as a JSON string (note: "trading" might be intended as "trending")
        String coin = coinService.getTreadingCoins();
        // Parses the JSON string into a JsonNode object
        JsonNode jsonNode = objectMapper.readTree(coin);
        // Returns the parsed JSON data with HTTP 200 (OK)
        return ResponseEntity.ok(jsonNode);
    }

    // Handles GET requests to retrieve detailed information for a specific coin
    @GetMapping("/details/{coinId}")
    ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId) throws JsonProcessingException {
        // Fetches detailed coin data as a JSON string
        String coin = coinService.getCoinDetails(coinId);
        // Parses the JSON string into a JsonNode object
        JsonNode jsonNode = objectMapper.readTree(coin);
        // Returns the parsed JSON data with HTTP 200 (OK)
        return ResponseEntity.ok(jsonNode);
    }
}

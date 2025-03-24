package com.treu.service;

// Jackson exception for JSON processing issues
import com.fasterxml.jackson.core.JsonProcessingException;
// Jackson type reference for deserializing generic types
import com.fasterxml.jackson.core.type.TypeReference;
// Jackson node for parsing JSON trees
import com.fasterxml.jackson.databind.JsonNode;
// Jackson object mapper for JSON serialization/deserialization
import com.fasterxml.jackson.databind.ObjectMapper;
// Entity class representing a cryptocurrency
import com.treu.model.Coin;
// Repository interface for coin data access
import com.treu.repository.CoinRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation for injecting property values
import org.springframework.beans.factory.annotation.Value;
// Spring HTTP utilities
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;
// Spring exceptions for HTTP client/server errors
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
// Spring HTTP client for REST calls
import org.springframework.web.client.RestTemplate;

import java.util.List;             // Interface for ordered collections
import java.util.Optional;        // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class CoinServiceImpl implements CoinService {
    // Repository for performing CRUD operations on Coin entities
    @Autowired
    private CoinRepository coinRepository;

    // Object mapper for converting between JSON and Java objects
    @Autowired
    private ObjectMapper objectMapper;

    // Injects the CoinMarketCap API key from application properties
    @Value("${coingecko.api.key}")
    private String API_KEY;

    // Fetches a paginated list of coins from CoinGecko API
    @Override
    public List<Coin> getCoinList(int page) throws Exception {
        // Constructs URL for fetching coin markets with pagination
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=" + page;

        RestTemplate restTemplate = new RestTemplate(); // HTTP client for API calls
        try {
            HttpHeaders headers = new HttpHeaders();    // Headers for the request
            headers.set("x-cg-demo-api-key", API_KEY);  // Sets API key header

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers); // Request entity with headers

            // Executes GET request and retrieves response as a string
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            System.out.println(response.getBody());     // Logs response for debugging
            // Deserializes JSON response into a List of Coin objects
            List<Coin> coins = objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {});

            return coins;                               // Returns the list of coins

        } catch (HttpClientErrorException | HttpServerErrorException | JsonProcessingException e) {
            System.err.println("Error: " + e);          // Logs error
            // Throws custom exception for free plan rate limits
            throw new Exception("please wait for time because you are using free plan");
        }
    }

    // Fetches market chart data for a coin over a specified number of days
    @Override
    public String getMarketChart(String coinId, int days) throws Exception {
        // Constructs URL for market chart data
        String url = "https://api.coingecko.com/api/v3/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + days;

        RestTemplate restTemplate = new RestTemplate(); // HTTP client for API calls
        try {
            HttpHeaders headers = new HttpHeaders();    // Headers for the request
            headers.set("x-cg-demo-api-key", API_KEY);  // Sets API key header

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers); // Request entity with headers

            // Executes GET request and retrieves response as a string
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();                  // Returns raw JSON response

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("Error: " + e);          // Logs error
            // Throws custom exception for free plan issues
            throw new Exception("you are using free plan");
        }
    }

    // Utility method to convert various numeric types to double
    private double convertToDouble(Object value) {
        if (value instanceof Integer) {
            return ((Integer) value).doubleValue();
        } else if (value instanceof Long) {
            return ((Long) value).doubleValue();
        } else if (value instanceof Double) {
            return (Double) value;
        } else {
            throw new IllegalArgumentException("Unsupported data type: " + value.getClass().getName());
        }
    }

    // Fetches and saves detailed coin information from CoinGecko API
    @Override
    public String getCoinDetails(String coinId) throws JsonProcessingException {
        // Constructs base URL for coin details
        String baseUrl = "https://api.coingecko.com/api/v3/coins/" + coinId;

        System.out.println("------------------ get coin details base url " + baseUrl); // Logs URL for debugging
        HttpHeaders headers = new HttpHeaders();    // Headers for the request
        headers.set("x-cg-demo-api-key", API_KEY);  // Sets API key header

        HttpEntity<String> entity = new HttpEntity<>(headers); // Request entity with headers

        RestTemplate restTemplate = new RestTemplate(); // HTTP client for API calls
        // Executes GET request and retrieves response as a string
        ResponseEntity<String> response = restTemplate.exchange(baseUrl, HttpMethod.GET, entity, String.class);

        // Parses JSON response into a tree structure
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        jsonNode.get("image").get("large");         // Accesses image node (not used further here)
        System.out.println(jsonNode.get("image").get("large")); // Logs large image URL

        Coin coin = new Coin();                     // Creates new Coin instance
        coin.setId(jsonNode.get("id").asText());    // Sets coin ID
        coin.setSymbol(jsonNode.get("symbol").asText()); // Sets coin symbol
        coin.setName(jsonNode.get("name").asText());     // Sets coin name
        coin.setImage(jsonNode.get("image").get("large").asText()); // Sets large image URL

        JsonNode marketData = jsonNode.get("market_data"); // Extracts market data node
        coin.setCurrentPrice(marketData.get("current_price").get("usd").asDouble()); // Sets current price
        coin.setMarketCap(marketData.get("market_cap").get("usd").asLong()); // Sets market cap
        coin.setMarketCapRank(jsonNode.get("market_cap_rank").asInt()); // Sets market cap rank
        coin.setTotalVolume(marketData.get("total_volume").get("usd").asLong()); // Sets total volume
        coin.setHigh24h(marketData.get("high_24h").get("usd").asDouble()); // Sets 24h high
        coin.setLow24h(marketData.get("low_24h").get("usd").asDouble()); // Sets 24h low
        coin.setPriceChange24h(marketData.get("price_change_24h").asDouble()); // Sets 24h price change
        coin.setPriceChangePercentage24h(marketData.get("price_change_percentage_24h").asDouble()); // Sets 24h % change
        coin.setMarketCapChange24h(marketData.get("market_cap_change_24h").asLong()); // Sets 24h market cap change
        coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h").asDouble()); // Sets 24h % market cap change
        coin.setCirculatingSupply(marketData.get("circulating_supply").asLong()); // Sets circulating supply
        coin.setTotalSupply(marketData.get("total_supply").asLong()); // Sets total supply

        coinRepository.save(coin);                  // Saves the coin to the database
        return response.getBody();                  // Returns raw JSON response
    }

    // Finds a coin by its ID from the repository
    @Override
    public Coin findById(String coinId) throws Exception {
        Optional<Coin> optionalCoin = coinRepository.findById(coinId); // Queries database for coin
        if (optionalCoin.isEmpty()) throw new Exception("invalid coin id"); // Throws exception if not found
        return optionalCoin.get();                  // Returns the found coin
    }

    // Searches for coins by keyword using CoinGecko API
    @Override
    public String searchCoin(String keyword) {
        // Constructs URL for search query
        String baseUrl = "https://api.coingecko.com/api/v3/search?query=" + keyword;

        HttpHeaders headers = new HttpHeaders();    // Headers for the request
        headers.set("x-cg-demo-api-key", API_KEY);  // Sets API key header

        HttpEntity<String> entity = new HttpEntity<>(headers); // Request entity with headers

        RestTemplate restTemplate = new RestTemplate(); // HTTP client for API calls
        // Executes GET request and retrieves response as a string
        ResponseEntity<String> response = restTemplate.exchange(baseUrl, HttpMethod.GET, entity, String.class);

        System.out.println(response.getBody());     // Logs response for debugging
        return response.getBody();                  // Returns raw JSON response
    }

    // Fetches the top 50 coins by market cap rank from CoinGecko API
    @Override
    public String getTop50CoinsByMarketCapRank() {
        // Constructs URL for top 50 coins by market cap
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=50";

        RestTemplate restTemplate = new RestTemplate(); // HTTP client for API calls
        try {
            HttpHeaders headers = new HttpHeaders();    // Headers for the request
            headers.set("x-cg-demo-api-key", API_KEY);  // Sets API key header

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers); // Request entity with headers

            // Executes GET request and retrieves response as a string
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();                  // Returns raw JSON response

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("Error: " + e);          // Logs error
            return null;                                // Returns null on error
        }
    }

    // Fetches trending coins from CoinGecko API
    @Override
    public String getTreadingCoins() {
        // Constructs URL for trending coins
        String url = "https://api.coingecko.com/api/v3/search/trending";

        RestTemplate restTemplate = new RestTemplate(); // HTTP client for API calls
        try {
            HttpHeaders headers = new HttpHeaders();    // Headers for the request
            headers.set("x-cg-demo-api-key", API_KEY);  // Sets API key header

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers); // Request entity with headers

            // Executes GET request and retrieves response as a string
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();                  // Returns raw JSON response

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.err.println("Error: " + e);          // Logs error
            return null;                                // Returns null on error
        }
    }
}

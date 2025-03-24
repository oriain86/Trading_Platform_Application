package com.treu.service;

// Library for parsing JSON using JsonPath expressions
import com.jayway.jsonpath.JsonPath;
// Context for reading JSON data with JsonPath
import com.jayway.jsonpath.ReadContext;
// Data transfer object for coin details
import com.treu.model.CoinDTO;
// Response object for API interactions
import com.treu.response.ApiResponse;
// Custom response object for function call results
import com.treu.response.FunctionResponse;
// JSON processing classes from org.json package
import org.json.JSONArray;
import org.json.JSONObject;
// Spring annotations and HTTP utilities
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

// Marks this class as a Spring service bean
@Service
public class ChatBotServiceImpl implements ChatBotService{

    // Injects the Gemini API key from application properties
    @Value("${gemini.api.key}")
    private String API_KEY;

    // Converts various numeric types to double, throws exception for unsupported types
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

    // Makes an API request to CoinGecko to fetch coin data by name
    public CoinDTO makeApiRequest(String currencyName) {
        System.out.println("coin name "+currencyName);
        // Constructs the CoinGecko API URL with the currency name in lowercase
        String url = "https://api.coingecko.com/api/v3/coins/"+currencyName.toLowerCase();

        // HTTP client for making the API request
        RestTemplate restTemplate = new RestTemplate();

        // Headers for the HTTP request
        HttpHeaders headers = new HttpHeaders();

        // Request entity with dummy body and headers
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        // Executes GET request and maps response to a Map
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> responseBody = responseEntity.getBody();
        if (responseBody != null) { // Checks if response body is not null
            // Extracts image data from response
            Map<String, Object> image = (Map<String, Object>) responseBody.get("image");

            // Extracts market data from response
            Map<String, Object> marketData = (Map<String, Object>) responseBody.get("market_data");

            // Creates a new CoinDTO instance to store coin data
            CoinDTO coinInfo = new CoinDTO();
            coinInfo.setId((String) responseBody.get("id")); // Sets coin ID
            coinInfo.setSymbol((String) responseBody.get("symbol")); // Sets coin symbol
            coinInfo.setName((String) responseBody.get("name")); // Sets coin name
            coinInfo.setImage((String) image.get("large")); // Sets large image URL

            // Sets current price in USD, converting from various numeric types
            coinInfo.setCurrentPrice(convertToDouble(((Map<String, Object>) marketData.get("current_price")).get("usd")));
            // Sets market cap in USD
            coinInfo.setMarketCap(convertToDouble(((Map<String, Object>) marketData.get("market_cap")).get("usd")));
            coinInfo.setMarketCapRank((int) responseBody.get("market_cap_rank")); // Sets market cap rank
            // Sets 24-hour total volume in USD
            coinInfo.setTotalVolume(convertToDouble(((Map<String, Object>) marketData.get("total_volume")).get("usd")));
            // Sets 24-hour high price in USD
            coinInfo.setHigh24h(convertToDouble(((Map<String, Object>) marketData.get("high_24h")).get("usd")));
            // Sets 24-hour low price in USD
            coinInfo.setLow24h(convertToDouble(((Map<String, Object>) marketData.get("low_24h")).get("usd")));
            coinInfo.setPriceChange24h(convertToDouble(marketData.get("price_change_24h")) ); // Sets 24-hour price change
            // Sets 24-hour price change percentage
            coinInfo.setPriceChangePercentage24h(convertToDouble(marketData.get("price_change_percentage_24h")));
            coinInfo.setMarketCapChange24h(convertToDouble(marketData.get("market_cap_change_24h"))); // Sets 24-hour market cap change
            // Sets 24-hour market cap change percentage
            coinInfo.setMarketCapChangePercentage24h(convertToDouble( marketData.get("market_cap_change_percentage_24h")));
            coinInfo.setCirculatingSupply(convertToDouble(marketData.get("circulating_supply"))); // Sets circulating supply
            coinInfo.setTotalSupply(convertToDouble(marketData.get("total_supply"))); // Sets total supply

            return coinInfo; // Returns populated CoinDTO
        }
        return null; // Returns null if response body is empty
    }

    // Calls Gemini API to interpret prompt and extract function call details
    public FunctionResponse getFunctionResponse(String prompt){
        // Constructs Gemini API URL with API key
        String GEMINI_API_URL =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="
                        + API_KEY;

        // Headers for POST request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // Sets content type to JSON

        // JSON request body defining the prompt and function declaration for getCoinDetails
        String requestBody = "{\n" +
                "  \"contents\": [\n" +
                "    {\n" +
                "      \"parts\": [\n" +
                "        {\n" +
                "          \"text\": \"" + prompt + "\"\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ],\n" +
                "  \"tools\": [\n" +
                "    {\n" +
                "      \"functionDeclarations\": [\n" +
                "        {\n" +
                "          \"name\": \"getCoinDetails\",\n" +
                "          \"description\": \"Get the coin details from given currency object\",\n" +
                "          \"parameters\": {\n" +
                "            \"type\": \"OBJECT\",\n" +
                "            \"properties\": {\n" +
                "              \"currencyName\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"The currency name, id, symbol.\"\n" +
                "              },\n" +
                "              \"currencyData\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"Currency Data id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply, ath, ath_change_percentage, ath_date, atl, atl_change_percentage, atl_date, last_updated.\"\n" +
                "              }\n" +
                "            },\n" +
                "            \"required\": [\"currencyName\", \"currencyData\"]\n" +
                "          }\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}";
        // Creates HTTP entity with request body and headers
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody.toString(), headers);

        // HTTP client for making the POST request
        RestTemplate restTemplate = new RestTemplate();
        // Executes POST request to Gemini API
        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity, String.class);

        // Extracts response body as a string
        String responseBody = response.getBody();

        // Parses JSON response for extraction
        ReadContext ctx = JsonPath.parse(responseBody);

        // Extracts specific values from the response using JsonPath
        String currencyName = ctx.read("$.candidates[0].content.parts[0].functionCall.args.currencyName");
        String currencyData = ctx.read("$.candidates[0].content.parts[0].functionCall.args.currencyData");
        String name = ctx.read("$.candidates[0].content.parts[0].functionCall.name");

        // Creates and populates a FunctionResponse object with extracted data
        FunctionResponse res=new FunctionResponse();
        res.setCurrencyName(currencyName); // Sets currency name
        res.setCurrencyData(currencyData); // Sets currency data
        res.setFunctionName(name);         // Sets function name

        // Logs the extracted values for debugging
        System.out.println(name +" ------- "+currencyName+"-----"+currencyData);

        return res; // Returns the FunctionResponse object
    }

    // Fetches coin details by interpreting prompt and integrating CoinGecko data
    @Override
    public ApiResponse getCoinDetails(String prompt) {
        // Gets function response from Gemini API based on prompt
        FunctionResponse res=getFunctionResponse(prompt);
        // Fetches coin data from CoinGecko and converts to string
        String apiResponse=makeApiRequest(res.getCurrencyName()).toString();

        // Constructs Gemini API URL with API key
        String GEMINI_API_URL =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="
                        + API_KEY;

        // Headers for POST request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // Sets content type to JSON

        // JSON body with prompt, function call, and CoinGecko response
        String body="{\n" +
                "  \"contents\": [\n" +
                "    {\n" +
                "      \"role\": \"user\",\n" +
                "      \"parts\": [\n" +
                "        {\n" +
                "          \"text\": \"" + prompt + "\"\n" +
                "        }\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"role\": \"model\",\n" +
                "      \"parts\": [\n" +
                "        {\n" +
                "          \"functionCall\": {\n" +
                "            \"name\": \"getCoinDetails\",\n" +
                "            \"args\": {\n" +
                "              \"currencyName\": \"" +res.getCurrencyName() +"\",\n" +
                "              \"currencyData\": \""+ res.getCurrencyData() + "\"\n" +
                "            }\n" +
                "          }\n" +
                "        }\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"role\": \"function\",\n" +
                "      \"parts\": [\n" +
                "        {\n" +
                "          \"functionResponse\": {\n" +
                "            \"name\": \"getCoinDetails\",\n" +
                "            \"response\": {\n" +
                "              \"name\": \"getCoinDetails\",\n" +
                "              \"content\": " + apiResponse + "\n" +
                "            }\n" +
                "          }\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ],\n" +
                "  \"tools\": [\n" +
                "    {\n" +
                "      \"functionDeclarations\": [\n" +
                "        {\n" +
                "          \"name\": \"getCoinDetails\",\n" +
                "          \"description\": \"Get crypto currency data from given currency object.\",\n" +
                "          \"parameters\": {\n" +
                "            \"type\": \"OBJECT\",\n" +
                "            \"properties\": {\n" +
                "              \"currencyName\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"The currency Name, id, symbol .\"\n" +
                "              },\n" +
                "              \"currencyData\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"The currency data id, symbol, current price, image, market cap extra... \"\n" +
                "              }\n" +
                "            },\n" +
                "            \"required\": [\"currencyName\",\"currencyData\"]\n" +
                "          }\n" +
                "        },\n" +
                "        {\n" +
                "          \"name\": \"find_theaters\",\n" +
                "          \"description\": \"find theaters based on location and optionally movie title which is currently playing in theaters\",\n" +
                "          \"parameters\": {\n" +
                "            \"type\": \"OBJECT\",\n" +
                "            \"properties\": {\n" +
                "              \"location\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"The city and state, e.g. San Francisco, CA or a zip code e.g. 95616\"\n" +
                "              },\n" +
                "              \"movie\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"Any movie title\"\n" +
                "              }\n" +
                "            },\n" +
                "            \"required\": [\"location\"]\n" +
                "          }\n" +
                "        },\n" +
                "        {\n" +
                "          \"name\": \"get_showtimes\",\n" +
                "          \"description\": \"Find the start times for movies playing in a specific theater\",\n" +
                "          \"parameters\": {\n" +
                "            \"type\": \"OBJECT\",\n" +
                "            \"properties\": {\n" +
                "              \"location\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"The city and state, e.g. San Francisco, CA or a zip code e.g. 95616\"\n" +
                "              },\n" +
                "              \"movie\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"Any movie title\"\n" +
                "              },\n" +
                "              \"theater\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"Name of the theater\"\n" +
                "              },\n" +
                "              \"date\": {\n" +
                "                \"type\": \"STRING\",\n" +
                "                \"description\": \"Date for requested showtime\"\n" +
                "              }\n" +
                "            },\n" +
                "            \"required\": [\"location\", \"movie\", \"theater\", \"date\"]\n" +
                "          }\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}";

        // Creates HTTP entity with request body and headers
        HttpEntity<String> request = new HttpEntity<>(body, headers);
        // HTTP client for making the POST request
        RestTemplate restTemplate = new RestTemplate();
        // Executes POST request to Gemini API
        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, request, String.class);

        // Logs the raw response for debugging
        System.out.println("Response: " + response.getBody());
        // Parses JSON response for extraction
        ReadContext ctx = JsonPath.parse(response.getBody());

        // Extracts the text response from the Gemini API
        String text = ctx.read("$.candidates[0].content.parts[0].text");
        // Creates an ApiResponse object to return the result
        ApiResponse ans=new ApiResponse();
        ans.setMessage(text); // Sets the response message

        return ans; // Returns the ApiResponse
    }

    // Fetches CoinDTO directly by coin name using makeApiRequest
    @Override
    public CoinDTO getCoinByName(String coinName) {
        return this.makeApiRequest(coinName); // Delegates to makeApiRequest to fetch coin data
//        return null;
    }

    // Handles simple chat interactions with Gemini API
    @Override
    public String simpleChat(String prompt) {
        // Constructs Gemini API URL with API key
        String GEMINI_API_URL =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="
                        + API_KEY;

        // Headers for POST request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // Sets content type to JSON

        // Constructs the request body using JSONObject for a simple chat prompt
        JSONObject requestBody = new JSONObject();
        JSONArray contentsArray = new JSONArray();
        JSONObject contentsObject = new JSONObject();
        JSONArray partsArray = new JSONArray();
        JSONObject textObject = new JSONObject();
        textObject.put("text", prompt); // Adds the prompt text
        partsArray.put(textObject);     // Adds text part to parts array
        contentsObject.put("parts", partsArray); // Adds parts to content object
        contentsArray.put(contentsObject);       // Adds content to contents array
        requestBody.put("contents", contentsArray); // Adds contents to request body

        // Creates HTTP entity with request body and headers
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody.toString(), headers);

        // HTTP client for making the POST request
        RestTemplate restTemplate = new RestTemplate();
        // Executes POST request to Gemini API
        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity, String.class);

        // Extracts response body as a string
        String responseBody = response.getBody();

        // Logs the response body for debugging
        System.out.println("Response Body: " + responseBody);

        return responseBody; // Returns the raw response string
    }
}

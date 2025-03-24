package com.treu.service;

// Data transfer object representing coin details
import com.treu.model.CoinDTO;
// Response object for API interactions
import com.treu.response.ApiResponse;

// Defines a service interface for chatbot-related operations
public interface ChatBotService {
    // Retrieves detailed information about a specific cryptocurrency
    ApiResponse getCoinDetails(String coinName);

    // Fetches a CoinDTO object for a given cryptocurrency name
    CoinDTO getCoinByName(String coinName);

    // Handles simple chat interactions based on a user-provided prompt
    String simpleChat(String prompt);
}

package com.treu.controller;

import com.treu.model.CoinDTO;
import com.treu.request.PromptBody;
import com.treu.response.ApiResponse;
import com.treu.service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Marks this class as a REST controller, handling chatbot-related requests under /chat
@RestController()
@RequestMapping("/chat")
public class ChatBotController {

    // Service for handling chatbot-related business logic, injected via @Autowired
    @Autowired
    private ChatBotService chatBotService;

    // Handles GET requests to retrieve details of a specific coin by name
    @GetMapping("/coin/{coinName}")
    public ResponseEntity<CoinDTO> getCoinDetails(@PathVariable String coinName) {
        // Fetches coin details using the provided coin name
        CoinDTO coinDTO = chatBotService.getCoinByName(coinName);
        // Returns the coin details in the response body with HTTP 200 (OK)
        return new ResponseEntity<>(coinDTO, HttpStatus.OK);
    }

    // Handles POST requests for a simple chatbot interaction
    @PostMapping("/bot")
    public ResponseEntity<String> simpleChat(@RequestBody PromptBody promptBody) {
        // Processes the prompt and gets a response from the chatbot service
        String res = chatBotService.simpleChat(promptBody.getPrompt());
        // Returns the chatbot response as a string with HTTP 200 (OK)
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // Handles POST requests to retrieve real-time coin details via chatbot
    @PostMapping("/bot/coin")
    public ResponseEntity<ApiResponse> getCoinRealtimeTime(@RequestBody PromptBody promptBody) {
        // Fetches real-time coin details based on the prompt
        ApiResponse res = chatBotService.getCoinDetails(promptBody.getPrompt());
        // Returns the API response with HTTP 200 (OK)
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}

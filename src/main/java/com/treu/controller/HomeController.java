package com.treu.controller;

import com.treu.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Marks this class as a REST controller, handling requests at the root path
@RestController
public class HomeController {

    // Handles GET requests to the root URL ("/")
    @GetMapping("")
    public ResponseEntity<ApiResponse> homeController() {
        // Creates a simple API response with a welcome message and success status
        ApiResponse res = new ApiResponse(
                "welcome to crypto treading platform working fine", // Message (note: "treading" might be intended as "trading")
                true                                                // Success flag
        );
        // Returns the response with HTTP 202 (Accepted)
        return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
    }
}

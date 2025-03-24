package com.treu.controller;

import com.treu.exception.UserException;
import com.treu.model.PaymentDetails;
import com.treu.model.User;
import com.treu.service.PaymentDetailsService;
import com.treu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Marks this class as a REST controller, handling payment details requests under /api
@RestController
@RequestMapping("/api")
public class PaymentDetailsController {

    // Service for handling user-related operations, injected via @Autowired
    @Autowired
    private UserService userService;

    // Service for handling payment details operations, injected via @Autowired
    @Autowired
    private PaymentDetailsService paymentDetailsService;

    // Handles POST requests to add payment details for a user
    @PostMapping("/payment-details")
    public ResponseEntity<PaymentDetails> addPaymentDetails(
            @RequestBody PaymentDetails paymentDetailsRequest, // Payment details from the request body
            @RequestHeader("Authorization") String jwt         // JWT from the Authorization header
    ) throws UserException {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);

        // Adds payment details for the user using the service
        PaymentDetails paymentDetails = paymentDetailsService.addPaymentDetails(
                paymentDetailsRequest.getAccountNumber(),    // Bank account number
                paymentDetailsRequest.getAccountHolderName(), // Account holder's name
                paymentDetailsRequest.getIfsc(),             // IFSC code (e.g., for Indian banks)
                paymentDetailsRequest.getBankName(),         // Name of the bank
                user                                         // Associated user
        );
        // Returns the created payment details with HTTP 201 (Created)
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }

    // Handles GET requests to retrieve a user's payment details
    @GetMapping("/payment-details")
    public ResponseEntity<PaymentDetails> getUsersPaymentDetails(
            @RequestHeader("Authorization") String jwt // JWT from the Authorization header
    ) throws UserException {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);

        // Fetches the user's payment details using the service
        PaymentDetails paymentDetails = paymentDetailsService.getUsersPaymentDetails(user);
        // Returns the payment details with HTTP 201 (Created) - likely should be 200 (OK)
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }
}

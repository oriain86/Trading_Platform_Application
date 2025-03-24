package com.treu.controller;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.treu.domain.PaymentMethod;
import com.treu.exception.UserException;
import com.treu.model.PaymentOrder;
import com.treu.model.User;
import com.treu.response.PaymentResponse;
import com.treu.service.PaymentService;
import com.treu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

// Marks this class as a REST controller, handling payment-related requests
@RestController
public class PaymentController {

    // Service for handling user-related operations, injected via @Autowired
    @Autowired
    private UserService userService;

    // Service for handling payment-related operations, injected via @Autowired
    @Autowired
    private PaymentService paymentService;

    // Handles POST requests to create a payment order and generate a payment link
    @PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,      // Payment method (e.g., RAZORPAY or STRIPE) from the URL
            @PathVariable Long amount,                      // Payment amount from the URL
            @RequestHeader("Authorization") String jwt      // JWT from the Authorization header
    ) throws UserException, RazorpayException, StripeException {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);

        // Declares a PaymentResponse object to hold the payment link details
        PaymentResponse paymentResponse;

        // Creates a payment order for the user with the specified amount and method
        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

        // Generates a payment link based on the payment method
        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            // Creates a Razorpay payment link for the order
            paymentResponse = paymentService.createRazorpayPaymentLink(user, amount, order.getId());
        } else {
            // Creates a Stripe payment link for the order (assumes STRIPE as the alternative)
            paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId());
        }

        // Returns the payment response with HTTP 201 (Created)
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}

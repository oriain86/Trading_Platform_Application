package com.treu.response;

// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
public class PaymentResponse {

    // URL for redirecting the user to complete the payment
    private String payment_url;
}

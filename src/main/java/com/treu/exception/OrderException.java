package com.treu.exception;

// Custom exception class specifically for order-related errors
public class OrderException extends Exception {

    // Constructor that takes a message parameter
    public OrderException(String message) {
        super(message);             // Passes the message to the parent Exception class
    }
}
